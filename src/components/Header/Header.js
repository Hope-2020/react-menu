import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from 'Redux/actions/auth';
import { getTotalPrice } from 'Redux/selectors';

import cartIcon from './shopping-cart-solid.svg';
import exitIcon from './exit.png';
import userIcon from './user.png';
import './header.scss';

const Header = ({ totalPrice, isUserLogin }) => (
    <header className="header">
        {isUserLogin &&
            <NavLink to='/react-menu-app/dashboard/' className="header__link">
                <img 
                    className="header__exit" 
                    title="DASHBOARD"
                    src={userIcon} 
                    alt="dashboard">
                </img>
            </NavLink>
        }
        <NavLink to='/react-menu-app/' className="header__link">Menu</NavLink>
        <NavLink to='/react-menu-app/cart/' className="header__link">
            <img 
                className="header__cart" 
                src={cartIcon} 
                alt="cart" 
                title='CART'>
            </img>
            Total: {totalPrice} $
        </NavLink>
        {!isUserLogin &&
            <NavLink to='/react-menu-app/authorization/' className="header__link">Login</NavLink>
        }
        {isUserLogin &&
            <NavLink to='/react-menu-app/authorization/' className="header__link">
                <img 
                    className="header__exit" 
                    onClick={() => signOut()}
                    title="EXIT"
                    src={exitIcon} 
                    alt="exit">
                </img>
            </NavLink>
        }
    </header>
);


const mapStateToProps = (state) => {
    return {
        totalPrice: getTotalPrice(state),
        isUserLogin: state.auth.isUserLogin
    };
};

Header.propTypes = {
    totalPrice: PropTypes.number.isRequired,
    isUserLogin: PropTypes.bool.isRequired
};

export default connect(
    mapStateToProps, 
    null
)(Header);