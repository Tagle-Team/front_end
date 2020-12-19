import { combineReducers } from 'redux';
import user, { userSaga } from './user';
import loading from './loading';
import { all } from 'redux-saga/effects';

import reducers from 'reducers/reducers';

const rootReducer = combineReducers({
  user,
  loading,
  ...reducers,
});

export function* rootSaga() {
  yield all([userSaga()]);
}

export default rootReducer;
