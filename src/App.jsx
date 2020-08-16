import PageLoading from '@/components/loading/page';
import NotPage from '@/pages/404';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';

const Main = lazy(() => import('@/pages/main'));
const MainClass = lazy(() => import('@/pages/main/MainClass'));
const Login = lazy(() => import('@/pages/login'));
const LoginClass = lazy(() => import('@/pages/login/LoginClass'));

const App = () => {
  return (
    <Suspense fallback={<PageLoading />}>
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
    </Suspense>
  );
};

export default App;
