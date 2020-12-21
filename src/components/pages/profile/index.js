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

    // 프로필 사진 변경하는 경우
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
          // 회원정보 수정 성공 시 변경된 사용자 정보 로컬 스토리지와 redux에 담음
          const { result, userInfo } = res.data;
          if (result) {
            localStorage.setItem('user', JSON.stringify(userInfo));
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
      {/* 비밀번호 확인 및 유저정보 받아온 경우 사용자 정보 수정 페이지 보여줌 */}
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
