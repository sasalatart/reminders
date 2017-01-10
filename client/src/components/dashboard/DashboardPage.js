import React from 'react';
import ReminderCard from './ReminderTile';
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
      let difference = reminders.length - i;

      if (difference >= 3) {
        rows.push(
          <div key={i} className="tile is-ancestor">
            <ReminderCard key={reminders[i].id} {...reminders[i]} />
            <ReminderCard key={reminders[i + 1].id} {...reminders[i + 1]} />
            <ReminderCard key={reminders[i + 2].id} {...reminders[i + 2]} />
          </div>
        )
      } else if (difference === 2) {
        rows.push(
          <div key={i} className="tile is-ancestor">
            <ReminderCard key={reminders[i].id} {...reminders[i]} />
            <ReminderCard key={reminders[i + 1].id} {...reminders[i + 1]} />
          </div>
        )
      } else if (difference === 1) {
        rows.push(
          <div key={i} className="tile is-ancestor">
            <ReminderCard key={reminders[i].id} {...reminders[i]} />
          </div>
        )
      }
    }

    return rows;
  }

  render() {
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

        { this.getRowsToRender() }
      </div>
    );
  }
}

export default DashboardPage;
