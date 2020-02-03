import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div className="signForm">
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  rememberMe: false
};



class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  componentDidMount(){
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const email = rememberMe ? localStorage.getItem('email') : '';
    const password = rememberMe ? localStorage.getItem('password') : '';
  
    this.setState({ email, password, rememberMe });
  };
  onSubmit = event => {
    const { email, password, rememberMe } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.GAME);
      })
      .catch(error => {
        this.setState({ error });
      });
      localStorage.setItem('rememberMe', rememberMe);
      localStorage.setItem('email', rememberMe ? email : '');
      localStorage.setItem('password', rememberMe ? password : '');

    event.preventDefault();
  };

  onChange = event => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
 
    this.setState({ [input.name]: value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button className="button-primery" disabled={isInvalid} type="submit">
          Sign In
        </button>
        <label>
          <input name="rememberMe" checked={this.state.rememberMe} onChange={this.onChange} type="checkbox"/> Remember me
        </label>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };