import React, { PropTypes } from 'react';
import ReminderTile from './ReminderTile';

const ReminderTileRow = ({ reminders, index, onDelete }) => {
  let difference = reminders.length - index;
  let iterate = Math.min(difference, 3);
  let rows = [];

  for (let i = index; i < index + iterate; i++) {
    rows.push(<ReminderTile key={reminders[i].id} {...reminders[i]} onDelete={onDelete} />)
  }

  return(
    <div key={index} className="tile is-ancestor">{ rows }</div>
  );
}

ReminderTileRow.propTypes = {
  reminders: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ReminderTileRow;
