import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { sendOrder } from 'Redux/actions/cart';
import Spinner from 'components/UI/Spinner';
import ErrorMessage from 'components/UI/ErrorMessage';
import { getTotalPrice } from 'Redux/selectors';
import CartItem from './blocks';

import './cart.scss';

const Cart = ({
  cart,
  user,
  isUserLogin,
  isOrderTook, 
  isOrdering, 
  error,
  totalPrice,
  sendOrder
}) => {
  const history = useHistory();
  const errorMessage = error && <ErrorMessage />;
  const loader = isOrdering && <Spinner />;

  const onTakeOrder = () => {
    const dish = cart.map(item => ({name: item.title, portions: item.quantity}));
    const orderTime = new Date(Date.now()).toLocaleString();

    const order = {
      dish,
      totalPrice,
      user,
      orderTime
    };

    sendOrder(order, history);
  };

  if (!cart.length && !isOrderTook) {
    return (
      <>
        <p className="cart__title">Your cart is empty!</p>
        <Link to='/react-menu-app/' className="order__link">
          <button className="order__btn">MENU</button>
        </Link>
      </>
    );
  }

  if (isOrderTook) {
    return (
      <p className="cart__title">
        Thank you, we have accepted your order! <br/>
        We will contact you shortly!
      </p>
    );
  }

  return (
    errorMessage || loader ||
      <>
        {!isUserLogin &&
          <div className="cart__login">
            <p className="cart__item-title">Before placing an order, please </p>
            <Link to='/react-menu-app/authorization/' className="cart__link">
              Login!
            </Link>
          </div>
        }
        <div className="cart__title">Your order:</div>
        <TransitionGroup className="cart__list">
          {cart.map(item => {

            return (
              <CSSTransition
                key={item.id} 
                timeout={500}
                classNames="fade"
              >
                <CartItem item={item} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <button
          disabled={!isUserLogin && 'disabled'}
          title={isUserLogin ? 'Make order' : 'Please, login!'}
          className="order__btn"
          onClick={() => onTakeOrder()}
        >
          ORDER
        </button>
      </>
  );
};

const mapStateToProps = state => ({
  cart: state.cart.itemsInCart,
  isOrderTook: state.cart.isOrderTook,
  isOrdering: state.cart.isOrdering,
  error: state.cart.error,
  totalPrice: getTotalPrice(state),
  user: state.auth.currentUser,
  isUserLogin: state.auth.isUserLogin 
});

const mapDispatchToProps = {
  sendOrder
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  user: PropTypes.object,
  isUserLogin: PropTypes.bool.isRequired,
  isOrderTook: PropTypes.bool.isRequired,
  isOrdering: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  totalPrice: PropTypes.number.isRequired,
  sendOrder: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Cart);