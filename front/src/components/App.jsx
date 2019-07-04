import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Admin from './Admin/Admin';
import Display from './Display/Display';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/admin" component={Admin} />
      <Route
        path="/"
        component={() => (
          <DndProvider backend={HTML5Backend}>
            <Display />
          </DndProvider>
        )}
      />
    </Switch>
  </div>
);

export default App;
