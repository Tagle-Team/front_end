import { combineReducers } from 'redux';
import user, { userSaga } from './user';
import loading from './loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  user,
  loading,
});

export function* rootSaga() {
  yield all([userSaga()]);
}

export default rootReducer;
