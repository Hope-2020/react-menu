import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import ReactCardFlip from "react-card-flip";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addToCart } from 'Redux/actions/cart';
import './menu-list-item.scss';

const MenuListItem = memo(({ item, isItemInCart }) => {
    const { title, price, url, category, id, description } = item;
    const [isFlipped, changeFlipped] = useState(false);
    const dispatch = useDispatch();

    const handlerChangeFlip = useCallback(() =>
        changeFlipped(!isFlipped),
        [changeFlipped, isFlipped]
    );

    const handlerAddItem = useCallback(() =>
        dispatch(addToCart(item)),
        [dispatch, item]
    );

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <li className="menu__item">
                <div className="menu__title">{title}</div>
                <img 
                    className="menu__img" 
                    src={url} 
                    alt={title}
                    title="click me"
                    onClick={handlerChangeFlip}>
                </img>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <span className={`menu__category_img ${category}`}></span>
                <div className="menu__buttons">
                    {isItemInCart ? (
                        <Link
                            to='/react-menu-app/cart/' 
                            className="menu__btn menu__link">
                            CART
                        </Link>
                    ) : ( 
                        <button 
                            className="menu__btn" 
                            onClick={handlerAddItem}>
                            ORDER
                        </button>
                    )}
                    <Link 
                        to={`/react-menu-app/menu/${id}`} 
                        className="menu__link">
                        DESCRIPTION
                    </Link>
                </div>
            </li>
            <li className="menu__item menu__item__back">
                <div className="menu__title">{title}</div>
                <div 
                    className="menu__description" 
                    onClick={handlerChangeFlip}
                >
                    {description}
                </div>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <span className={`menu__category_img ${category}`}></span>
                <div className="menu__buttons">
                    {isItemInCart ? (
                        <Link 
                            to='/react-menu-app/cart/' 
                            className="menu__btn menu__link">
                            CART
                        </Link>
                    ) : (
                        <button 
                            className="menu__btn" 
                            onClick={handlerAddItem}>
                            ORDER
                        </button>
                    )}
                </div>
            </li>
        </ReactCardFlip>
    ); 
}, 
    (prev, next) => prev.isItemInCart === next.isItemInCart
);

MenuListItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    isItemInCart: PropTypes.bool.isRequired
};

export default MenuListItem;
  