import React, {PureComponent} from 'react';
import {Errors} from '../../const.js';
import PropTypes from "prop-types";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._formRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.rendeErrors = this.rendeErrors.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();

    const form = this._formRef.current;
    const login = form.querySelector(`#user-email`).value;
    const password = form.querySelector(`#user-password`).value;
    const formData = {
      login,
      password
    };
    this.props.onSignInSubmit(formData);
  }

  rendeErrors() {
    if (this.props.authorizationCode === Errors.BAD_REQUEST) {
      return (
        <div className="sign-in__message">
          <p>Please enter a valid email address</p>
        </div>
      );
    }

    if (this.props.authorizationCode === Errors.UNAUTHORIZED) {
      return (
        <div className="sign-in__message">
          <p>We can’t recognize this email<br/>and password combination. Please try again.</p>
        </div>
      );
    }

    return null;
  }

  render() {
    const {authorizationCode} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" ref={this._formRef} onSubmit={this.onSubmit}>
            {this.rendeErrors()}
            <div className='sign-in__fields'>
              <div className={`sign-in__field ${authorizationCode === Errors.BAD_REQUEST ? `sign-in__field--error` : ``}`}>
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  authorizationCode: PropTypes.string,
  onSignInSubmit: PropTypes.func.isRequired,
};

export default SignIn;
