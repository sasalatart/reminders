import React from 'react';
import { Link } from 'react-router';
import * as axios from 'axios';
import * as iziToast from '../../../node_modules/izitoast/dist/js/iziToast.min.js';

let moment = require('moment');
let swal = require('sweetalert');

class ReminderTile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDelete = this.onDelete.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
  }

  onDelete() {
    swal({
      title: 'Are you sure you wish to delete this reminder?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!" }, this.deleteRequest);
  }

  deleteRequest() {
    axios.defaults.headers.common['token'] = localStorage.getItem('token');
    axios.post('/reminders/delete/' + this.props.id).then(response => {
      this.props.onDelete(response.data.reminder);
      iziToast.success({ title: 'Reminder deleted.' });
    }).catch(error => {
      iziToast.error({
        title: 'Error deleting reminder',
        message: error.response.data.message });
    });
  }

  render() {
    return(
      <div className="tile is-parent is-4">
        <article className="tile is-child box notification is-info">
          <button onClick={this.onDelete} className="delete"></button>

          <p className="title">
            <Link to={"/edit_reminder/" + this.props.id}>{this.props.title}</Link>
          </p>

          { this.props.dueDate &&
            <p className="subtitle">
              {moment(this.props.dueDate).format('MMMM Do YYYY')}
            </p>
          }

          { this.props.body &&
            <div className="content">
              <p>{this.props.body}</p>
            </div>
          }
        </article>
      </div>
    )
  }
}

export default ReminderTile;
