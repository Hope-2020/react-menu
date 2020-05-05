import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { signUp } from '../../Redux/actions/auth';
import regExpDictionary from './helpers/regExpDictionary';

import './auth.scss';

const SignUp = ({ signUp }) => {
  const history = useHistory();
  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmitSignUp = (value) => {
    signUp(value, history);
    reset();
  };

  return (
    <div className="user_forms-signup">
      <h2 className="forms_title">Sign Up</h2>
      <form className="forms_form" onSubmit={handleSubmit(onSubmitSignUp)}>
        <fieldset className="forms_fieldset">
          <div className="forms_field">
            <input
              autoComplete="off"
              name="name" 
              placeholder="Full Name*" 
              className="forms_field-input" 
              ref={register({
                required: "This is required field",
                pattern: {
                  value: regExpDictionary.name,
                  message: "Please, only letters, minlength 3 characters"
                }
              })}
            />
            {errors.name && <p className="forms_field-error">{errors.name.message}</p>}
          </div>
          <div className="forms_field">
            <input
              autoComplete="off"
              name="phone" 
              placeholder="Phone number*" 
              className="forms_field-input" 
              ref={register({
                required: "This is required field",
                pattern: {
                  value: regExpDictionary.phone,
                  message: "Please, only 10 numbers"
                }
              })}
            />
            {errors.phone && <p className="forms_field-error">{errors.phone.message}</p>}
          </div>
          <div className="forms_field">
          <input
              autoComplete="off"
              name="email" 
              placeholder="Email*" 
              className="forms_field-input" 
              autoFocus
              ref={register({
                required: "This is required field",
                pattern: {
                  value: regExpDictionary.email,
                  message: "Please, provide validate email, example: test@test.com"
                }
              })}
            />
            {errors.email && <p className="forms_field-error">{errors.email.message}</p>}
          </div>
          <div className="forms_field">
          <input 
              type="password"
              name="password" 
              placeholder="Password*" 
              className="forms_field-input" 
              ref={register({
                required: "This is required field",
                pattern: {
                  value: regExpDictionary.password,
                  message: "Please, only letters or numbers, minlength 6 characters"
                }
              })}
            />
            {errors.password && <p className="forms_field-error">{errors.password.message}</p>}
          </div>
        </fieldset>
        <div className="forms_buttons">
          <input type="submit" value="Sign up" className="forms_buttons-action"/>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  signUp
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);