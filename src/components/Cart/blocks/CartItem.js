import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  deleteFromCart,
  addToCart,
  decreaseInCart
} from 'Redux/actions/cart';

const CartItem = ({
  item,
  deleteFromCart,
  addToCart,
  decreaseInCart 
}) => {
  const { title, price, url, quantity } = item;

  const handlerAddItem = useCallback(() =>
    addToCart(item),
    [addToCart, item]
  );

  const handlerDeleteItem = useCallback(() =>
    deleteFromCart(item),
    [deleteFromCart, item]
  );

  const handlerDecreaseItem = useCallback(() =>
    decreaseInCart(item),
    [decreaseInCart, item]
  );

  return (
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
            onClick={handlerDecreaseItem}
            disabled={quantity <= 1 && true}>
            -
          </button>
          <button
            className="cart__btn"
            onClick={handlerAddItem}>
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
        onClick={handlerDeleteItem}>
        &times;
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  deleteFromCart,
  addToCart,
  decreaseInCart
};

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
}).isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseInCart: PropTypes.func.isRequired
};

export default connect(
  null, 
  mapDispatchToProps
)(CartItem);