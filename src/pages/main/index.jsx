import PageLoading from '@/components/loading/page';
import BasicLayout from '@/layouts/BasicLayout';
import NotPage from '@/pages/404';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Component = lazy(() => import('./component'));
const Menu = lazy(() => import('./menu'));
const Client = lazy(() => import('./client'));
const ClientEditorAndAdd = lazy(() => import('./client/ClientEditorAndAdd'));

const Main = ({ match }) => {
  const { path } = match;

  return (
    <BasicLayout>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route path={`${path}/component`} component={Component} />
          <Route path={`${path}/menu`} component={Menu} />
          <Route path={`${path}/client/new/:id?/:highSeasId?`} component={ClientEditorAndAdd} />
          <Route path={`${path}/client`} component={Client} />

          <Route exact path={path}>
            <Redirect to={`${path}/component`} />
          </Route>

          <Route component={NotPage} />
        </Switch>
      </Suspense>
    </BasicLayout>
  );
};

export default Main;
