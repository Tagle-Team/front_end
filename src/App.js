import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './constants/GlobalUITheme';

import routes from 'resources/routes';

import SignUp from 'components/pages/signUp';
import SignIn from 'components/pages/signIn';
import Tag from 'components/pages/tag';
import ElevateAppBar from 'components/UI/organisms/Navigation';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route exact path={routes.root} render={() => 'root'} />
        <Route
          exact
          path={routes.tag}
          render={() => (
            <ElevateAppBar>
              <Tag />
            </ElevateAppBar>
          )}
        />
        <Route exact path={routes.signup} component={SignUp} />
        <Route exact path={routes.signin} component={SignIn} />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
