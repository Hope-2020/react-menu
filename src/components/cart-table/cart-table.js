import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  deleteFromCart,
  addToCart,
  decreaseInCart,
  sendOrder
} from '../../Redux/actions/menu';
import Spinner from '../spinner';
import Error from '../error';

import './cart-table.scss';

const CartTable = ({
  cart,
  user,
  isUserLogin,
  isOrderTook, 
  isLoading, 
  hasError,
  totalPrice,
  deleteFromCart,
  addToCart,
  decreaseInCart,
  sendOrder
}) => {
  const history = useHistory();
  const errorMessage = hasError && <Error />;
  const loader = isLoading && <Spinner />;

  const onTakeOrder = () => {
    const dish = cart.map(item => ({name: item.title, portions: item.quantity}));

    const order = {
      dish,
      price: totalPrice,
      user
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
            <Link to='/react-menu-app/authorization/' className="cart__link">Login!</Link>
          </div>
        }
        <div className="cart__title">Your order:</div>
        <TransitionGroup className="cart__list">
          {cart.map(item => {
            const { title, price, url, id, quantity } = item;

            return (
              <CSSTransition
                key={id} 
                timeout={500}
                classNames="fade"
              >
                <div className="cart__item">
                  <img src={url} className="cart__item-img" alt="Cesar salad"></img>
                  <div className="cart__item-title">{title}</div>
                  <div className="cart__item-details">
                    <span className="cart__item-ins">Price:</span>
                    <span>{price} $</span>
                  </div>
                  <div className="cart__item-details">
                    <span className="cart__item-ins">Quantity:</span>
                    <span>{quantity}</span>
                    <div className="cart__buttons">
                      <button
                        className="cart__btn"
                        onClick={() => decreaseInCart(id)}
                        disabled={quantity <= 1 && true}>
                        -
                      </button>
                      <button
                        className="cart__btn"
                        onClick={() => addToCart(id)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart__item-details">
                    <span className="cart__item-ins">Amount:</span>
                    <span>{price * quantity} $</span>
                  </div>
                  <div 
                    className="cart__close" 
                    onClick={() => deleteFromCart(id)}>
                    &times;
                  </div>
                </div>
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

const mapStateToProps = ({menu, auth}) => {
  return {
    cart: menu.itemsInCart,
    isOrderTook: menu.isOrderTook,
    isLoading: menu.isLoading,
    hasError: menu.hasError,
    totalPrice: menu.totalPrice,
    user: auth.currentUser,
    isUserLogin: auth.isUserLogin
  };
};

const mapDispatchToProps = {
  deleteFromCart,
  addToCart,
  decreaseInCart,
  sendOrder,
};

CartTable.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  user: PropTypes.object,
  isUserLogin: PropTypes.bool.isRequired,
  isOrderTook: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  totalPrice: PropTypes.number.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseInCart: PropTypes.func.isRequired,
  sendOrder: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CartTable);