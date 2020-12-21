import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import AvatarDropzone from 'components/UI/atoms/AvatarDropzone';
import Form from 'components/templates/auth/Form';
import { confirmId } from 'api/auth';
import routes from 'resources/routes';
import GoMainButton from 'components/UI/atoms/GoMainButton';
import { avatarStaticPath } from 'resources/constant';

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
  footerWrap: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '& > *:not(:first-child)': {
      marginTop: '15px',
    },
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
  },
}));

/**
 * 사용자 정보 등록 수정 컴포넌트
 * @param {json} props
 */
function UserForm({ title, initModel, footer, setModel, getModel, setIsOk }) {
  const classes = useStyles();
  const [error, setError] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    userName: '',
    email: '',
  });

  const handleChange = async (e) => {
    const { name, value: inputValue } = e.target;
    const value = inputValue.trim();
    let isOk = true;

    if (name === 'userId') {
      if (value !== '') {
        // id 중복 체크
        const res = await confirmId({ id: value });

        if (res.data.result === false) {
          isOk = false;
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

    // 비밀번호, 비밀번호 확인 일치 하는지 체크
    if (name === 'confirmPassword' || name === 'password') {
      const { password, confirmPassword } = getModel();
      const compareVal = name === 'password' ? confirmPassword : password;

      if (value !== compareVal) {
        isOk = false;
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

    setIsOk(isOk);
    setModel({ name, value });
  };

  const handleChangeAvatar = (file) => {
    setModel({ name: 'avatar', value: file });
  };

  return (
    <Form title={title}>
      <AvatarDropzone
        onChangeAvatar={handleChangeAvatar}
        src={`${avatarStaticPath}/${initModel.image}`}
      />
      <FormControl error={!!error.userId}>
        <InputLabel htmlFor="component-error">ID</InputLabel>
        <Input
          id="component-error"
          name="userId"
          label="ID"
          onChange={handleChange}
          // onBlur={handleBlur}
          defaultValue={initModel.userId}
          readOnly={!!initModel.userId}
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
      <TextField
        name="userName"
        label="Name"
        defaultValue={initModel.userName}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        defaultValue={initModel.email}
        onChange={handleChange}
      />
      <dir className={classes.footerWrap}>
        {footer}
        <GoMainButton />
      </dir>
    </Form>
  );
}

export default UserForm;
