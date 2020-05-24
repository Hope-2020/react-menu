import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const PrivateRoute = ({ 
  component: RouteComponent, 
  isUserLogin, 
  ...rest 
}) => (
  <Route
    {...rest}
    render={routeProps =>
      isUserLogin ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to='/react-menu-app/authorization/' />
      )
    }
  />
);

const mapStateToProps = ({ auth }) => {
  return {
    isUserLogin: auth.isUserLogin
  };
};

PrivateRoute.propTypes = {
  isUserLogin: PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);