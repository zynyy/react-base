import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '@/pages/login';
import NotPage from '@/pages/404';
import FormItems from '@/pages/form-items';

import './assets/css/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/main" />
        <Route path="/form-item" component={FormItems} />
        <Route path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route component={NotPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
