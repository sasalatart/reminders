import React from 'react';

let DatePicker = require('react-datepicker');

const DatePickerInput = ({ selected, errors=false, onChange }) => {
  return(
    <div className={errors ? 'control has-icon has-icon-right' : 'control'}>
      <DatePicker
        selected={selected}
        onChange={date => { onChange(date) }}
        dateFormat="DD/MM/YYYY"
        className={errors ? 'input is-danger' : 'input'} />

      {
        errors &&
        <span className="icon is-small">
          <i className="fa fa-warning"></i>
        </span>
      }

      { errors && <span className="help is-danger">{errors}</span> }
    </div>
  );
}

export default DatePickerInput;
