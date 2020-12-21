import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer, { rootSaga } from 'modules';
import { setUserInfo } from 'modules/user';

// redux middleware 용 saga
const sagaMiddleware = createSagaMiddleware();
// redux store 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

/**
 * 로그인 상태인지 확인
 */
function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      // 로컬스토리지에 로그인한 유저 정보가 있으면 Redux store에 담도록 dispatch
      // fetchUserInfo().then((res) => {
      store.dispatch(setUserInfo(JSON.parse(user)));
      // });
    }
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
