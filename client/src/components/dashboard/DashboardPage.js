import React from 'react';
import ReminderTileRow from './ReminderTileRow';
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
      showingWithDate: true
    }

    this.getReminders = this.getReminders.bind(this);
    this.toggleTiles = this.toggleTiles.bind(this);
    this.getRowsToRender = this.getRowsToRender.bind(this);
    this.filterById = this.filterById.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.getReminders();
  }

  getReminders() {
    axios.defaults.headers.common['token'] = localStorage.getItem('token');
    axios.get('/reminders').then(response => {
      this.setState({
        reminders: response.data.reminders,
        showingWithDate: true
      });
    }).catch(error => {
      iziToast.error({ title: 'Error retrieving reminders.' });
    });
  }

  toggleTiles(withDate) {
    this.setState({ showingWithDate: withDate });
  }

  getRowsToRender() {
    let rows = [];
    let reminders = this.state.showingWithDate ? this.state.reminders.withDate : this.state.reminders.withoutDate

    for (let i = 0; i < reminders.length; i += 3) {
      rows.push(
        <ReminderTileRow
          key={i}
          reminders={reminders}
          index={i}
          onDelete={this.onDelete} />
      );
    }

    return rows;
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
    const rowsToRender = this.getRowsToRender();

    return(
      <div className="dashboard-page">
        <h1 className="title is-1">Dashboard</h1>

        <div className="tabs is-fullwidth is-boxed is-large">
          <ul>
            <li className={this.state.showingWithDate ? 'is-active' : ''}>
              <a onClick={() => { this.toggleTiles(true) }}>
                <span className="icon is-large"><i className="fa fa-calendar"></i></span>
                <span>With Date</span>
              </a>
            </li>
            <li className={this.state.showingWithDate ? '' : 'is-active'}>
              <a onClick={() => { this.toggleTiles(false) }}>
                <span className="icon is-large"><i className="fa fa-lightbulb-o"></i></span>
                <span>Without Date</span>
              </a>
            </li>
          </ul>
        </div>

        {
          rowsToRender.length > 0 ?
          rowsToRender :
          <h1 className="title is-3 has-text-centered">There are no reminders in this section.</h1>
        }
      </div>
    );
  }
}

export default DashboardPage;
