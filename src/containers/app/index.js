import React from 'react';
import { Route } from 'react-router-dom';
import View from '../view';
import Edit from '../edit';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={View} />
      <Route exact path="/edit" component={Edit} />
    </main>
  </div>
);

export default App;
