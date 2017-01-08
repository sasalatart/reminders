import React from 'react';
import TextInput from '../common/TextInput';
import SubmitInput from '../common/SubmitInput';
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
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit() {
    this.setState({ loading: true });

    axios.post('/login', {
      email: this.state.form.email,
      password: this.state.form.password,
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

  onChange(event) {
    const field = event.target.name;
    let form = this.state.form;
    form[field] = event.target.value;
    this.setState({ form: form });
  }

  render() {
    return(
      <form>
        <TextInput
          name="email"
          placeholder="e-mail"
          value={this.state.form.email}
          onChange={this.onChange} />

        <TextInput
          name="password"
          placeholder="password"
          value={this.state.form.password}
          onChange={this.onChange}
          isPassword={true} />

        <SubmitInput
          loading={this.state.loading}
          onSubmit={this.onSubmit} />
      </form>
    )
  }
}

export default LoginForm;
