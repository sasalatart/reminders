import React from 'react';
import { browserHistory } from 'react-router';
import ReminderForm from './ReminderForm';
import * as axios from 'axios';
import * as iziToast from '../../../node_modules/izitoast/dist/js/iziToast.min.js';

class NewReminderPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      reminder: { title: '', body: '', dueDate: '' }
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(reminder) {
    axios.defaults.headers.common['token'] = localStorage.getItem('token');
    axios.post('/reminders/create', reminder).then(response => {
      browserHistory.push('/');
      iziToast.success({ title: 'Reminder created.' });
    }).catch(error => {
      this.setState({ reminder: reminder });
      iziToast.error({
        title: 'Error creating reminder.',
        message: error.response.data.message
      });
    });
  }

  render() {
    return(
      <div className="new-reminder-page">
        <h1 className="title is-1">New Reminder</h1>
        <ReminderForm
          {...this.state.reminder}
          onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default NewReminderPage;
