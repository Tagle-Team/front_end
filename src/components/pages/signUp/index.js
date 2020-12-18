import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import AvatarDropzone from 'components/UI/atoms/AvatarDropzone';
import Form from 'components/templates/auth/Form';
import { signUp, confirmId } from 'api/auth';
import routes from 'resources/routes';

const useStyles = makeStyles((theme) => ({
  background: {
    background: `linear-gradient(90deg, ${deepPurple[500]} 9%, ${blue[500]} 93%)`,
  },
  inner: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '60px 50px 90px',
    marginBottom: '50px',
    borderRadius: '10px',
    boxShadow: '14px 18px 5px 0px rgba(0,0,0,0.3)',
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginTop: '15px',
    },
  },
  submitButton: {
    marginTop: '40px',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
  },
}));

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    userName: '',
    email: '',
  });

  const model = useRef({
    userId: '',
    password: '',
    confirmPassword: '',
    userName: '',
    email: '',
    avatar: null,
  });

  const getModel = () => {
    return model.current;
  };

  const setModel = ({ name, value }) => {
    model.current = {
      ...getModel(),
      [name]: value,
    };
  };

  const handleChange = async (e) => {
    const {
      name,
      value: inputValue,
      // ,
    } = e.target;
    const value = inputValue.trim();

    if (name === 'userId') {
      if (value !== '') {
        const res = await confirmId({ id: value });

        if (res.data.result === false) {
          setError({
            ...error,
            [name]: '중복된 아이디 입니다.',
          });
        } else {
          setError({
            ...error,
            [name]: '',
          });
        }
      }
    }

    if (name === 'confirmPassword' || name === 'password') {
      const { password, confirmPassword } = getModel();
      const compareVal = name === 'password' ? confirmPassword : password;

      if (value !== compareVal) {
        setError({
          ...error,
          confirmPassword: '비밀번호가 일치하지 않습니다.',
        });
      } else {
        setError({
          ...error,
          confirmPassword: '',
        });
      }
    }

    setModel({ name, value });
  };

  const handleSignUpClick = () => {
    const { userId, password, userName, email, avatar } = getModel();

    signUp({ userId, password, userName, email, avatar }).then((res) => {
      if (res.data) {
        history.push(routes.signin);
      }
    });
    history.push(routes.signin);
  };

  const handleChangeAvatar = (file) => {
    setModel({ name: 'avatar', value: file });
  };

  return (
    <Form title="Sign Up">
      <AvatarDropzone onChangeAvatar={handleChangeAvatar} />
      <FormControl error={!!error.userId}>
        <InputLabel htmlFor="component-error">ID</InputLabel>
        <Input
          id="component-error"
          name="userId"
          label="ID"
          onChange={handleChange}
          // onBlur={handleBlur}
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">
          {error.userId}
        </FormHelperText>
      </FormControl>
      <TextField
        name="password"
        type="password"
        label="Password"
        onChange={handleChange}
      />
      <FormControl error={!!error.confirmPassword}>
        <TextField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          onChange={handleChange}
        />
        <FormHelperText>{error.confirmPassword}</FormHelperText>
      </FormControl>
      <TextField name="userName" label="Name" onChange={handleChange} />
      <TextField name="email" label="Email" onChange={handleChange} />
      <Button
        variant="contained"
        color="primary"
        className={classes.submitButton}
        size="large"
        onClick={handleSignUpClick}
      >
        Sign Up
      </Button>
    </Form>
  );
}

export default SignUp;
