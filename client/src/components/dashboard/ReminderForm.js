import React from 'react';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import SubmitInput from '../common/SubmitInput';
import DatePickerInput from '../common/DatePickerInput';

let moment = require('moment');

class ReminderForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.constructState = this.constructState.bind(this);
    this.onToggleMoreFields = this.onToggleMoreFields.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDueDateChange = this.onDueDateChange.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.checkDisabled = this.checkDisabled.bind(this);
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
      errors: {
        title: false,
        body: false,
        dueDate: false
      },
      moreFields: moreFields,
      disabled: true,
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
    const title = event.target.value;

    let errors = this.state.errors;
    errors.title = (title ? false : 'Title can not be blank.');
    this.setState({errors: errors});

    this.onAttributeChange('title', title);
  }

  onDueDateChange(date) {
    let errors = this.state.errors;
    errors.dueDate = (moment().diff(moment(date)) < 0 ? false : 'Date can not be in the past.');
    this.setState({errors: errors});

    this.onAttributeChange('dueDate', date);
  }

  onAttributeChange(attribute, value) {
    let reminder = this.state.reminder;
    reminder[attribute] = value;
    this.setState({ reminder: reminder, disabled: this.checkDisabled() });
  }

  checkDisabled() {
    let errors = this.state.errors;
    errors = errors.title || !this.state.reminder.title || errors.dueDate || errors.body;

    return this.state.loading || errors;
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
            onChange={this.onTitleChange}
            errors={this.state.errors.title} />

            { this.state.moreFields &&
              <DatePickerInput
                selected={reminder.dueDate}
                onChange={date => { this.onDueDateChange(date) }}
                errors={this.state.errors.dueDate} />
            }

            { this.state.moreFields &&
              <TextAreaInput
                name="body"
                value={reminder.body}
                placehodler="body"
                onChange={event => { this.onAttributeChange('body', event.target.value) }}
                errors={this.state.errors.body} />
            }

            <SubmitInput
              disabled={this.state.disabled}
              loading={this.state.loading}
              onSubmit={this.onSubmit} />
        </form>
      </div>
    );
  }
}

export default ReminderForm;
