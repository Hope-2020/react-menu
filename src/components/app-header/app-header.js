import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './app-header.scss';

const AppHeader = ({ totalPrice }) => (
    <header className="header">
        <NavLink to='/react-menu-app/' className="header__link">Menu</NavLink>
        <NavLink to='/react-menu-app/cart/' className="header__link">
            <img className="header__cart" src={cartIcon} alt="cart"></img>
            Total: {totalPrice} $
        </NavLink>
    </header>
);

const mapStateToProps = (state) => {
    return {
        totalPrice: state.totalPrice
    };
};

AppHeader.propTypes = {
    totalPrice: PropTypes.number.isRequired
};

export default connect(mapStateToProps, null)(AppHeader);