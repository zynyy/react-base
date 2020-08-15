import NotPage from '@/pages/404';
import Login from '@/pages/login';
import LoginClass from '@/pages/login/LoginClass';
import Main from '@/pages/main';
import MainClass from '@/pages/main/MainClass';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/main-class" component={MainClass} />
        <Route path="/login" component={Login} />
        <Route path="/login-class" component={LoginClass} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route component={NotPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
