import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './constants/GlobalUITheme';

import routes from 'resources/routes';

import Root from 'components/pages/root';
import SignUp from 'components/pages/signUp';
import SignIn from 'components/pages/signIn';
import Profile from 'components/pages/profile';
import MyTag from 'components/pages/myTag';
import Tag from 'components/pages/tag';
import ElevateAppBar from 'components/UI/organisms/Navigation';

function App(req, res) {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route exact path={routes.root} component={Root} />
        <Route
          exact
          path={routes.tag}
          render={(props) => (
            <ElevateAppBar>{<Tag {...props} />}</ElevateAppBar>
          )}
        />
        <Route exact path={routes.signup} component={SignUp} />
        <Route exact path={routes.profile} component={Profile} />
        <Route exact path={routes.signin} component={SignIn} />
        <Route exact path={routes.myTag} component={MyTag} />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
