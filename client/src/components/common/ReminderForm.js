import React, { PropTypes } from 'react';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import SubmitInput from './SubmitInput';
import DatePickerInput from './DatePickerInput';
import RingLoader from './RingLoader';
import { errorChecking } from '../../utilities/checking';

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
    const reminder = props.reminder;
    const moreFields = !!(reminder.body || reminder.dueDate);

    return {
      reminder: {
        title: reminder.title,
        body: reminder.body,
        dueDate: reminder.dueDate
      },
      errors: {
        title: false,
        body: false,
        dueDate: false
      },
      loadingReminder: props.loadingReminder || false,
      moreFields: moreFields,
      disabled: true,
      loading: props.loading || false
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
    this.setState({
      reminder: reminder,
      disabled: this.checkDisabled()
    });
  }

  checkDisabled() {
    const errors = errorChecking(this.state.errors) || !this.state.reminder.title;
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
        {
          this.state.loadingReminder ?
            <RingLoader color="#26A65B" size="256px" /> :
            <div>
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
        }
      </div>
    );
  }
}

ReminderForm.propTypes = {
  reminder: PropTypes.object.isRequired
}

export default ReminderForm;
