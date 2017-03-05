import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import SignupPage from './components/Signup/SignupPage';
import LoginPage from './components/Login/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import NewReminderPage from './components/NewReminderPage/NewReminderPage';
import EditReminderPage from './components/EditReminderPage/EditReminderPage';

function requireAuth() {
  let currentToken = localStorage.getItem('token');
  if (currentToken === "null" || currentToken === null) {
    browserHistory.push('/login');
  }
}

export default(
  <Route path="/" component={App}>
    <IndexRoute component={DashboardPage} onEnter={requireAuth} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="new_reminder" component={NewReminderPage} />
    <Route path="edit_reminder/:id" component={EditReminderPage} />
  </Route>
)
