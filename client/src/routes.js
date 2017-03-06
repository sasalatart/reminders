import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import DashboardPage from './components/dashboard_page/DashboardPage';
import NewReminderPage from './components/new_reminder_page/NewReminderPage';
import EditReminderPage from './components/edit_reminder_page/EditReminderPage';

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
