import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';

import routes from 'resources/routes';
import { setUserInfo } from 'modules/user';
import Form from 'components/templates/auth/Form';

import { signIn } from 'api/auth';
import GoMainButton from 'components/UI/atoms/GoMainButton';

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: '40px',
  },
}));

const initError = {
  userId: false,
  password: false,
  failed: false,
};

function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [model, setModel] = useState({
    userId: '',
    password: '',
  });
  const [error, setError] = useState({
    ...initError,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(false);

    if (value.trim() === '') {
      setError({
        ...initError,
        [name]: true,
      });
    }

    setModel({
      ...model,
      [name]: value,
    });
  };

  const handleSignInClick = () => {
    const { userId, password } = model;

    signIn({ userId, password }).then((res) => {
      const { data } = res;
      if (data.result) {
        localStorage.setItem('user', JSON.stringify(data.userInfo));
        dispatch(setUserInfo(data.userInfo));
        history.push(routes.tag);
      } else {
        setError({ ...initError, failed: true });
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSignInClick();
    }
  };

  return (
    <Form title="Sign In">
      <TextField
        error={error.userId}
        name="userId"
        id="userId-helper"
        label="ID"
        helperText={error.userId ? 'ID를 입력해 주세요' : ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <TextField
        error={error.password}
        name="password"
        id="password-helper"
        label="Password"
        type="password"
        helperText={error.password ? 'Password를 입력해 주세요' : ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <FormControl error={error.failed}>
        <FormHelperText id="failed-error-text">
          {error.failed ? 'ID또는 Password가 일치하지 않습니다.' : ''}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={classes.submitButton}
        size="large"
        onClick={handleSignInClick}
      >
        Sign In
      </Button>
      <GoMainButton />
    </Form>
  );
}

export default SignIn;
