import React from 'react';
import ToggleTilesButton from './ToggleTilesButton';
import ReminderGallery from '../reminder_gallery/ReminderGallery';
import * as axios from 'axios';
import * as iziToast from '../../../node_modules/izitoast/dist/js/iziToast.min.js';

class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      reminders: {
        withDate: [],
        withoutDate: []
      },
      showingWithDate: true,
      loadingReminders: true
    }

    this.getReminders = this.getReminders.bind(this);
    this.toggleTiles = this.toggleTiles.bind(this);
    this.filterById = this.filterById.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.getReminders();
  }

  getReminders() {
    axios.defaults.headers.common['token'] = localStorage.getItem('token');
    axios.get('/reminders').then(response => {
      this.setState({
        reminders: response.data.reminders,
        loadingReminders: false,
        showingWithDate: true
      });
    }).catch(error => {
      this.setState({ loadingReminders: false });
      iziToast.error({ title: 'Error retrieving reminders.' });
    });
  }

  toggleTiles(withDate) {
    this.setState({ showingWithDate: withDate });
  }

  filterById(reminders, deletedReminder) {
    return reminders.filter(reminder => { return reminder.id !== deletedReminder.id });
  }

  onDelete(deletedReminder) {
    let reminders = this.state.reminders;

    if (deletedReminder.dueDate) {
      reminders.withDate = this.filterById(reminders.withDate, deletedReminder);
    } else {
      reminders.withoutDate = this.filterById(reminders.withoutDate, deletedReminder);
    }

    this.setState({ reminders: reminders });
  }

  render() {
    const remindersToRender = this.state.showingWithDate ? this.state.reminders.withDate : this.state.reminders.withoutDate;

    return(
      <div className="dashboard-page">
        <div className="container">
          <h1 className="title is-1">Dashboard</h1>

          <div className="tabs is-fullwidth is-boxed is-large">
            <ul>
              <ToggleTilesButton
                title="With Date"
                isActiveClass={this.state.showingWithDate ? 'is-active' : ''}
                toggleTiles={() => { this.toggleTiles(true) }}
                icon="calendar" />
              <ToggleTilesButton
                title="Without Date"
                isActiveClass={this.state.showingWithDate ? '' : 'is-active'}
                toggleTiles={() => { this.toggleTiles(false) }}
                icon="lightbulb-o" />
            </ul>
          </div>

          <ReminderGallery
            reminders={remindersToRender}
            maxPerRow={3}
            loading={this.state.loadingReminders}
            onDelete={this.onDelete} />
        </div>
      </div>
    );
  }
}

export default DashboardPage;
