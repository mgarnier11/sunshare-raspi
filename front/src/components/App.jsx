import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Admin from './Admin/Admin';
import Display from './Display/Display';

const App = () => (
  <div className="app container">
    <Switch>
      <Route exact path="/admin" component={Admin} />
      <Route path="/" component={Display} />
    </Switch>
  </div>
);

export default App;
