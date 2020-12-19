import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { confirmUser } from 'api/auth';
import routes from 'resources/routes';
import UserForm from 'components/UI/organisms/UserForm';
import Form from 'components/templates/auth/Form';
import ConfirmPassword from './ConfirmPassword';

function Profile() {
  const [approval, setApproval] = useState(false);
  const [userInfo, setInitUserInfo] = useState();

  return (
    <>
      {approval ? (
        <UserForm
          title="Profile"
          initModel={userInfo}
          footer={
            <Button variant="contained" color="primary" size="large">
              Save
            </Button>
          }
        />
      ) : (
        <ConfirmPassword
          setApproval={setApproval}
          setInitUserInfo={setInitUserInfo}
        />
      )}
    </>
  );
}

export default Profile;
