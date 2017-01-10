import React from 'react';
import TextInput from '../common/TextInput';
import SubmitInput from '../common/SubmitInput';
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
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
          value={this.state.email}
          onChange={this.onChange} />

        <TextInput
          name="password"
          placeholder="password"
          value={this.state.password}
          isPassword={true}
          onChange={this.onChange} />

        <TextInput
          name="passwordConfirmation"
          placeholder="password confirmation"
          value={this.state.passwordConfirmation}
          isPassword={true}
          onChange={this.onChange} />

        <SubmitInput
          loading={this.state.loading}
          onSubmit={this.onSubmit} />
      </form>
    );
  }
};

export default SignupForm;
