import React from 'react';

let moment = require('moment');

class ReminderTile extends React.Component {
  render() {
    return(
      <div className="tile is-parent is-4">
        <article className="tile is-child box notification is-info">
          <p className="title">{this.props.title}</p>

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
