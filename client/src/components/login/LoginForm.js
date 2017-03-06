import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import SubmitInput from '../common/SubmitInput';
import { checkEmail, checkDisabled } from '../../utilities/checking';
import * as axios from 'axios';
import * as iziToast from '../../../node_modules/izitoast/dist/js/iziToast.min.js';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      form: {
        email: '',
        password: ''
      },
      errors: {
        email: false,
        password: false
      },
      disabled: true,
      loading: false
    }

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(event) {
    let value = event.target.value;
    this.setState(checkEmail(value, this.state.errors));
    this.onAttributeChange('email', value);
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

    axios.post('/login', {
      email: this.state.form.email,
      password: this.state.form.password
    }).then(response => {
      this.props.onLogin(response.data.jwt);
    }).catch(error => {
      iziToast.error({
        title: 'Error logging in.',
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
          onChange={event => { this.onAttributeChange('password', event.target.value) }} />

        <SubmitInput
          disabled={this.state.disabled}
          loading={this.state.loading}
          onSubmit={this.onSubmit} />
      </form>
    )
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default LoginForm;
