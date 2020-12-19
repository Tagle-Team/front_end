import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import { signOut } from 'api/auth';

const SET_USER_INFO = 'user/SET_USER_INFO';
const LOGOUT = 'user/LOGOUT';

export const setUserInfo = createAction(SET_USER_INFO, (userInfo) => userInfo);
export const logout = createAction(LOGOUT);

function* logoutSaga() {
  try {
    yield call(signOut); // signOut API 호출
    localStorage.removeItem('user'); // localStorage 에서 user 제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  userName: null,
  email: null,
  image: null,
};

const user = handleActions(
  {
    [SET_USER_INFO]: (state, { payload: { userName, email, image } }) => {
      return {
        ...state,
        userName,
        email,
        image,
      };
    },
    [LOGOUT]: (state) => ({
      ...state,
      userName: null,
      email: null,
      image: null,
    }),
  },
  initialState
);

export default user;
