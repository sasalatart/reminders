import React from 'react';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import SubmitInput from '../common/SubmitInput';

let DatePicker = require('react-datepicker');
let moment = require('moment');

class ReminderForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.constructState = this.constructState.bind(this);
    this.onToggleMoreFields = this.onToggleMoreFields.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = this.constructState(this.props);
  }

  constructState(props) {
    let moreFields = !!(props.body || props.dueDate);
    return {
      reminder: {
        title: props.title,
        body: props.body,
        dueDate: props.dueDate
      },
      moreFields: moreFields,
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.constructState(nextProps));
  }

  onToggleMoreFields() {
    let reminder = this.state.reminder;

    if (this.state.moreFields) {
      reminder.dueDate = null;
      reminder.body = '';
    } else {
      reminder.dueDate = moment();
    }

    this.setState({ reminder: reminder, moreFields: !this.state.moreFields });
  }

  onTitleChange(event) {
    // TODO: Manage errors
    this.onAttributeChange('title', event.target.value);
  }

  onDateChange(date) {
    this.onAttributeChange('dueDate', date);
  }

  onBodyChange(event) {
    this.onAttributeChange('body', event.target.value);
  }

  onAttributeChange(attribute, value) {
    let reminder = this.state.reminder;
    reminder[attribute] = value;
    this.setState({ reminder: reminder });
  }

  onSubmit() {
    this.setState({ loading: true });
    this.props.onSubmit(this.state.reminder);
  }

  render() {
    let reminder = this.state.reminder;
    if (reminder && reminder.dueDate !== '') {
      reminder.dueDate = moment(reminder.dueDate);
    }

    return(
      <div className="reminder-form">
        <div className="control">
          <button
            className="button is-info"
            onClick={this.onToggleMoreFields}>
            { this.state.moreFields ? 'Remove due date and body' : 'Add due date and body' }
          </button>
        </div>

        <form>
          <TextInput
            name="title"
            value={reminder.title}
            placeholder="title"
            onChange={this.onTitleChange} />

            { this.state.moreFields &&
              <div className="control">
                <DatePicker
                  selected={reminder.dueDate}
                  onChange={this.onDateChange}
                  dateFormat="DD/MM/YYYY"
                  className="input" />
              </div>
            }

            { this.state.moreFields &&
              <TextAreaInput
                name="body"
                value={reminder.body}
                placehodler="body"
                onChange={this.onBodyChange} />
            }

            <SubmitInput
              loading={this.state.loading}
              onSubmit={this.onSubmit} />
        </form>
      </div>
    );
  }
}

export default ReminderForm;
