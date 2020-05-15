import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Login, SignUp } from './blocks';
import Spinner from 'components/UI/Spinner';
import ErrorMessage from 'components/UI/ErrorMessage';

import './auth.scss';

const Auth = ({
  isUserLogin,
  isRecording,
  isError,
  errorMessage
}) => {
  const [showSignUp, setShowSignUp] = useState(false);

  const getClassLink = () => {
    return cn('user_options-forms', {'bounceLeft': showSignUp, 'bounceRight': !showSignUp});
  }

  const showError = isError && <ErrorMessage message={errorMessage} />;
  const loader = isRecording && <Spinner />;
  const successMessage = isUserLogin && <p className="user_success">Success!</p>;

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            {loader || successMessage ||
              <>
                {showError||
                  <>
                    <h2 className="user_unregistered-title">Don't have an account?</h2>
                    <p className="user_unregistered-text">Please, click the button below and go through the short registration process.</p>
                  </>
                }
                <button 
                  className="user_unregistered-signup" 
                  onClick={() => setShowSignUp(!showSignUp)}
                >
                  Sign up
                </button>
              </>
            }
          </div>

          <div className="user_options-registered">
            {loader || successMessage ||
              <>
              {showError ||
                <>
                  <h2 className="user_registered-title">Have an account?</h2>
                  <p className="user_registered-text">Please, enter your email and password.</p>
                </>
              }
                <button 
                  className="user_registered-login" 
                  onClick={() => setShowSignUp(!showSignUp)}
                >
                  Login
                </button>
              </>
            }
          </div>
        </div>
        <div 
          className={getClassLink()}>
          {showSignUp ? <SignUp /> : <Login />}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    isUserLogin: auth.isUserLogin,
    isRecording: auth.isRecording,
    isError: auth.isError,
    errorMessage: auth.errorMessage
  };
};

Auth.propTypes = {
  isUserLogin: PropTypes.bool.isRequired,
  isRecording: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps, 
  null
)(Auth);