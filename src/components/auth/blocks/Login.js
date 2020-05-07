import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { login } from 'Redux/actions/auth';
import regExpDictionary from 'helpers/regExpDictionary';

const Login = ({ login }) => {
  const history = useHistory();
  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmitLogin = (value) => {
    login(value, history);
    reset();
  };

  return (
    <div className="user_forms-login">
      <h2 className="forms_title">Login</h2>
      <form className="forms_form" onSubmit={handleSubmit(onSubmitLogin)}>
        <fieldset className="forms_fieldset">
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
                  message: "Please, only letters and numbers, minlength 6 characters"
                }
              })}
            />
            {errors.password && <p className="forms_field-error">{errors.password.message}</p>}
          </div>
        </fieldset>
        <div className="forms_buttons">
          <input type="submit" value="Log In" className="forms_buttons-action"/>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  login
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(Login);