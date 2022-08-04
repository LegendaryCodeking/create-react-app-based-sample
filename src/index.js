import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import IndexPage from './views/index';
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={IndexPage} />
        <Route path='/dashboard' component={MainLayout} />
        <Route path='/auth' component={AuthLayout} />
        <Redirect from='*' to="/" />
      </Switch>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
