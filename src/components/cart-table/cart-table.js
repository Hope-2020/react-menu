import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requested, hasError, deleteFromCart, clearCart } from '../../actions';
import WithRestoService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';
import PropTypes from 'prop-types';

import './cart-table.scss';

class CartTable extends Component {
    onTakeOrder = () => {
        const { RestoService, itemsInCart, clearCart, requested, hasError } = this.props;

        requested();

        RestoService.setOrder(generateOrder(itemsInCart))
            .then(() => clearCart())
            .catch(() => hasError());
    }

    render() {
        const { itemsInCart, isOrderTook, deleteFromCart, isLoading, isError } = this.props;

        if (!itemsInCart.length && !isOrderTook) {
            return <div className="cart__title">Your cart is empty!</div>
        }
    
        if (isOrderTook) {
            return <div className="cart__title">We have accepted your order!</div>
        }

        if (isError) {
            return <Error />
        }

        if (isLoading) {
            return <Spinner />
        }

        return (
            <>
                <div className="cart__title">Your order:</div>
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
                        );
                    })}
                </div>
                <button
                    className="order"
                    onClick={() => this.onTakeOrder()}
                >
                    Make order
                </button>
            </>
        );
    }
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            name: item.title,
            portions: item.quantity
        };
    });

    return newOrder;
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
    isOrderTook: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
};

export default WithRestoService()(connect(
    mapStateToProps, 
    { deleteFromCart, clearCart, requested, hasError }
)(CartTable));