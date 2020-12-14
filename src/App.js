import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import routes from 'resources/routes';

import SignUp from 'components/pages/signUp';
import Tag from 'components/pages/tag';
import ElevateAppBar from "./components/organisms/Navigation";

function App() {
  return (
    <Router>
      <Route exact path={routes.root} render={() => 'root'} />
      <Route exact path={routes.tag} render={() => <ElevateAppBar><Tag /></ElevateAppBar>} />
      <Route exact path={routes.signup} component={SignUp} />
      <Route exact path={routes.signin} render={() => 'sign in'} />
    </Router>
  );
}

export default App;
