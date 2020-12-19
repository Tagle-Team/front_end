import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { confirmUser } from 'api/auth';
import Form from 'components/templates/auth/Form';

function ConfirmPassword({ setApproval, setInitUserInfo }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    password: '',
  });

  const handleChange = async (e) => {
    const {
      value: inputValue,
      // ,
    } = e.target;
    const value = inputValue.trim();
    setPassword(value);

    if (value === '') {
      setError({
        ...error,
        password: '비밀번호를 입력해 주세요.',
      });
    } else {
      setError({
        ...error,
        password: '',
      });
    }
  };

  const handleOkClick = async () => {
    if (!!password) {
      try {
        const res = await confirmUser({ password });

        if (res && res.data) {
          const { result, userInfo } = res.data;

          if (result) {
            setInitUserInfo({ ...userInfo });
            setApproval(true);
          } else {
            setError({
              ...error,
              password: '비밀번호가 일치하지 않습니다.',
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setError({
        ...error,
        password: '비밀번호를 입력해 주세요.',
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleOkClick();
    }
  };

  return (
    <Form title="비밀번호 확인">
      <FormControl error={!!error.password}>
        <TextField
          name="password"
          type="password"
          label="Password"
          value={password}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <FormHelperText>{error.password}</FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOkClick}
      >
        Ok
      </Button>
    </Form>
  );
}

export default ConfirmPassword;
