import React, { PropTypes } from 'react';
import ReminderTileRow from './ReminderTileRow';
import RingLoader from '../Common/RingLoader';

const getRowsToRender = (reminders, maxPerRow, onDelete) => {
  let rows = [];

  for (let i = 0; i < reminders.length; i += maxPerRow) {
    rows.push(
      <ReminderTileRow
        key={i}
        reminders={reminders}
        index={i}
        onDelete={onDelete} />
    );
  }

  return rows;
}

const ReminderGallery = ({ reminders, maxPerRow, loading, onDelete }) => {
  let renderedElement = getRowsToRender(reminders, maxPerRow, onDelete);

  if (reminders.length === 0 && loading) {
    renderedElement = <RingLoader color="#26A65B" size="256px" />
  } else if (reminders.length === 0) {
    renderedElement = <h1 className="title is-3 has-text-centered">There are no reminders in this section.</h1>
  }

  return(
    <div>
      { renderedElement }
    </div>
  )
}

ReminderGallery.propTypes = {
  reminders: PropTypes.array.isRequired,
  maxPerRow: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ReminderGallery;
