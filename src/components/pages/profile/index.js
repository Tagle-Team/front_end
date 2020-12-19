import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

import routes from 'resources/routes';
import UserForm from 'components/UI/organisms/UserForm';
import ConfirmPassword from './ConfirmPassword';
import { editUser } from 'api/user';
import { setUserInfo } from 'modules/user';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [approval, setApproval] = useState(false);
  const [userInfo, setInitUserInfo] = useState();
  const [isOk, setIsOk] = useState(false);

  const model = useRef({
    userId: '',
    password: '',
    confirmPassword: '',
    userName: '',
    email: '',
    avatar: null,
    image: '',
    isChangeAvatar: false,
  });

  const getModel = () => {
    return model.current;
  };

  const setModel = ({ name, value }) => {
    const newModel = {
      ...getModel(),
      [name]: value,
    };

    if (name === 'avatar') {
      newModel.isChangeAvatar = true;
    }

    model.current = newModel;
  };

  const handleEditProfileClick = async () => {
    if (isOk) {
      try {
        const model = getModel();
        const res = await editUser(model);

        if (res && res.data) {
          const { result, userInfo } = res.data;
          if (result) {
            dispatch(setUserInfo(userInfo));
            history.push(routes.tag);
          }
        }
      } catch (err) {}
    }
  };

  const getUserInfo = (userInfo) => {
    model.current = {
      ...getModel(),
      ...userInfo,
    };
    setInitUserInfo({ ...userInfo });
  };

  return (
    <>
      {approval && userInfo ? (
        <UserForm
          title="Profile"
          initModel={userInfo}
          getModel={getModel}
          setModel={setModel}
          setIsOk={setIsOk}
          footer={
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleEditProfileClick}
            >
              Save
            </Button>
          }
        />
      ) : (
        <ConfirmPassword
          setApproval={setApproval}
          setInitUserInfo={getUserInfo}
        />
      )}
    </>
  );
}

export default Profile;
