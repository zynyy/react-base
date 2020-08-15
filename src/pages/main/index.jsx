import BasicLayout from '@/layouts/BasicLayout';
import NotPage from '@/pages/404';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Component from './component';
import Menu from './menu';

const Main = ({ match }) => {
  const { path } = match;

  return (
    <BasicLayout>
      <Switch>
        <Route path={`${path}/component`} component={Component} />
        <Route path={`${path}/menu`} component={Menu} />

        <Route exact path={path}>
          <Redirect to={`${path}/component`} />
        </Route>

        <Route component={NotPage} />
      </Switch>
    </BasicLayout>
  );
};

export default Main;
