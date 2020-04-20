import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../actions';

const CartTable = ({ itemsInCart, deleteFromCart }) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {itemsInCart.map(item => {
                    const { title, price, url, id, quantity } = item;

                    return (
                        <div key={id} className="cart__item">
                            <img src={url} className="cart__item-img" alt="Cesar salad"></img>
                            <div className="cart__item-title">{title}</div>
                            <div className="cart__item-details">
                                <span className="cart__item-ins">Price:</span>
                                <span>{price} $</span>
                            </div>
                            <div className="cart__item-details">
                                <span className="cart__item-ins">Quantity:</span>
                                <span>{quantity}</span>
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
                    )
                })}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        itemsInCart: state.itemsInCart
    };
};

export default connect(mapStateToProps, { deleteFromCart })(CartTable);