import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './constants/GlobalUITheme';
import thunk from 'redux-thunk';

import routes from 'resources/routes';

import SignUp from 'components/pages/signUp';
import UploadProfileImg from 'components/pages/profile/UploadProfileImg';
import Tag from 'components/pages/tag';
import ElevateAppBar from 'components/UI/organisms/Navigation';
import {Provider} from 'react-redux';

import reducers from 'reducers/reducers';

function App(req, res) {
  const store = createStore(combineReducers(reducers), {}, applyMiddleware(thunk));
  const context = {};

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route exact path={routes.root} render={() => 'Hello'} />
          <Route
            exact
            path={routes.tag}
            render={(props) => (
              <ElevateAppBar>
                <Tag />
              </ElevateAppBar>
            )}
          />
          <Route exact path={routes.signup} component={SignUp} />
          <Route exact path={routes.profile} component={UploadProfileImg} />
          <Route exact path={routes.signin} render={() => 'sign in'} />
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
