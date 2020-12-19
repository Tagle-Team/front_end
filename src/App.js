import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './constants/GlobalUITheme';
import thunk from 'redux-thunk';

import routes from 'resources/routes';

import SignUp from 'components/pages/signUp';
import SignIn from 'components/pages/signIn';
import Profile from 'components/pages/profile';
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
          <Route exact path={routes.root} render={() => 'root'} />
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
          <Route exact path={routes.profile} component={Profile} />
          <Route exact path={routes.signin} component={SignIn} />
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
