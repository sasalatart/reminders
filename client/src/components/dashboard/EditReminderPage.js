import React from 'react';
import { browserHistory } from 'react-router';
import ReminderForm from './ReminderForm';
import * as axios from 'axios';
import * as iziToast from '../../../node_modules/izitoast/dist/js/iziToast.min.js';

class EditReminderPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      reminder: { id: '', title: '', body: '', dueDate: '' }
    }

    this.getReminder = this.getReminder.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.getReminder(this.props.params.id);
  }

  getReminder(id) {
    axios.defaults.headers.common['token'] = localStorage.getItem('token');
    axios.get('/reminders/' + id).then(response => {
      this.setState({ reminder: response.data.reminder });
    }).catch(error => {
      browserHistory.push('/');
      iziToast.error({ title: error.response.data.message });
    });
  }

  onSubmit(reminder) {
    reminder.id = this.state.reminder.id;

    axios.defaults.headers.common['token'] = localStorage.getItem('token');
    axios.put('/reminders/update', reminder).then(response => {
      browserHistory.push('/');
      iziToast.success({ title: 'Reminder updated.' });
    }).catch(error => {
      this.setState({ loading: false });
      iziToast.error({
        title: 'Error updating reminder.',
        message: error.response.data.message
      });
    });
  }

  render() {
    return(
      <div className="edit-reminder-page">
        <h1 className="title is-1">New Reminder</h1>
        <ReminderForm
          {...this.state.reminder}
          onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default EditReminderPage;
