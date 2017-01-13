import React from 'react';
import TextInput from '../common/TextInput';
import SubmitInput from '../common/SubmitInput';
import { checkDisabled } from '../../utilities/checking';
import * as axios from 'axios';
import * as iziToast from '../../../node_modules/izitoast/dist/js/iziToast.min.js';

class SignupForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      form: {
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {
        email: false,
        password: false,
        passwordConfirmation: false
      },
      disabled: true,
      loading: false
    }

    this.EMAILREGEX = /([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+/i;

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordConfirmationChange = this.onPasswordConfirmationChange.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(event) {
    const value = event.target.value;

    let errors = this.state.errors;
    errors.email = this.EMAILREGEX.test(value) ? false : 'Email must be in correct format.';
    this.setState({ errors: errors });

    this.onAttributeChange('email', event.target.value);
  }

  onPasswordConfirmationChange(event) {
    const value = event.target.value;

    let errors = this.state.errors;
    errors.passwordConfirmation = (value === this.state.form.password ? false : 'Password and confirmation must match.');
    this.setState({ errors: errors });

    this.onAttributeChange('passwordConfirmation', value);
  }

  onAttributeChange(attribute, value) {
    let form = this.state.form;
    form[attribute] = value;
    this.setState({
      form: form,
      disabled: checkDisabled(this.state.errors, form, this.state.loading)
    });
  }

  onSubmit() {
    this.setState({ loading: true });

    axios.post('/signup', this.state.form).then(response => {
      this.props.onSignup(response.data.jwt);
    }).catch(error => {
      iziToast.error({
        title: 'Error signing up.',
        message: error.response.data.message
      });
      this.setState({ loading: false });
    });
  }

  render() {
    return(
      <form>
        <TextInput
          name="email"
          placeholder="e-mail"
          value={this.state.form.email}
          icon="envelope"
          errors={this.state.errors.email}
          onChange={this.onEmailChange} />

        <TextInput
          name="password"
          placeholder="password"
          value={this.state.form.password}
          isPassword={true}
          icon="lock"
          errors={this.state.errors.password}
          onChange={event => {this.onAttributeChange('password', event.target.value)}} />

        <TextInput
          name="passwordConfirmation"
          placeholder="password confirmation"
          value={this.state.form.passwordConfirmation}
          isPassword={true}
          icon="lock"
          errors={this.state.errors.passwordConfirmation}
          onChange={this.onPasswordConfirmationChange} />

        <SubmitInput
          disabled={this.state.disabled}
          loading={this.state.loading}
          onSubmit={this.onSubmit} />
      </form>
    );
  }
}

export default SignupForm;
