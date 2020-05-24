import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './dashboard.scss';

const UserDashboard = ({ user }) => {
  const { name, phone, email } = user;
  console.log(typeof phone)

  return (
    <div className="item__page">
      <div className="menu__item user__block">
        <h4 className="menu__title">You are welcome, {name}!</h4>
        <h6 className="menu__category">Your user data:</h6>
        <p className="menu__category">Phone number: <span>{phone}</span></p>
        <p className="menu__price">Email: <span>{email}$</span></p>
        <div className="menu__buttons">
          <Link 
            to='/react-menu-app/cart/' 
            className="menu__btn menu__link">
            CART
          </Link>
          <Link 
            to='/react-menu-app/' 
            className="menu__btn menu__link">
            MENU
          </Link> 
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.currentUser
});

UserDashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}).isRequired
};

export default connect(
  mapStateToProps,
  null
)(UserDashboard);