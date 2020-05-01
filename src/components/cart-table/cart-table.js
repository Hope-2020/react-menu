import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  requested, 
  hasError, 
  deleteFromCart, 
  clearCart, 
  addToCart, 
  decreaseInCart
} from '../../Redux/actions';
import WithRestoService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './cart-table.scss';

const CartTable = (props) => {
  const { 
    RestoService, 
    itemsInCart, 
    clearCart, 
    requested, 
    hasError, 
    isOrderTook, 
    deleteFromCart, 
    addToCart, 
    decreaseInCart,
    isLoading, 
    isError 
  } = props;

  const errorMessage = isError && <Error />;
  const loader = isLoading && <Spinner />;

  const generateOrder = (items) => {
    const newOrder = items.map(item => {
      return {
        name: item.title,
        portions: item.quantity
      };
    });

    return newOrder;
  };

  const onTakeOrder = () => {
    requested();

    RestoService.setOrder(generateOrder(itemsInCart))
      .then(() => clearCart())
      .catch(() => hasError());
  }

  if (!itemsInCart.length && !isOrderTook) {
    return (
      <>
        <div className="cart__title">Your cart is empty!</div>
          <Link to='/react-menu-app/' className="order__link">
            <button className="order__btn">Back to menu</button>
          </Link>
      </>
    );
  }

  if (isOrderTook) {
    return <div className="cart__title">We have accepted your order!</div>
  }

  return (
    errorMessage || loader ||
      <>
        <div className="cart__title">Your order:</div>
        <TransitionGroup className="cart__list">
          {itemsInCart.map(item => {
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
          className="order__btn"
          onClick={() => onTakeOrder()}>
          Make order
        </button>
      </>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsInCart: state.itemsInCart,
    isOrderTook: state.isOrderTook,
    isLoading: state.isLoading,
    isError: state.isError
  };
};

CartTable.propTypes = {
  RestoService: PropTypes.object.isRequired,
  itemsInCart: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  clearCart: PropTypes.func.isRequired,
  requested: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseInCart: PropTypes.func.isRequired,
  isOrderTook: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

export default WithRestoService()(connect(
  mapStateToProps, 
  { deleteFromCart, addToCart, clearCart, requested, hasError, decreaseInCart }
)(CartTable));