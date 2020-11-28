import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import routes from 'resources/routes';

function App() {
  return (
    <Router>
      <Route exact path={routes.root} render={() => 'root'} />
      <Route exact path={routes.signup} render={() => 'sign up'} />
      <Route exact path={routes.signin} render={() => 'sgin in'} />
    </Router>
  );
}

export default App;
