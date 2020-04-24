import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './menu-list-item.scss';

const MenuListItem = ({ menuItem, onAddToCart }) => {
    const { title, price, url, category, id, inCart } = menuItem;

    return (
        <li className="menu__item">
            <div className="menu__title">{title}</div>
            <img className="menu__img" src={url} alt={title}></img>
            <div className="menu__category">Category: <span>{category}</span></div>
            <div className="menu__price">Price: <span>{price}$</span></div>
            <span className={`menu__category_img ${category}`}></span>
            <div className="menu__buttons">
                {inCart ? 
                    <Link 
                        to='/react-menu-app/cart/' 
                        className="menu__btn menu__link">
                        Go to Cart
                    </Link> :
                    <button 
                        className="menu__btn" 
                        onClick={() => onAddToCart()}>
                        Add to cart
                    </button>
                }
                <Link 
                    to={`/react-menu-app/menu/${id}`} 
                    className="menu__link">
                    View description
                </Link>
            </div>
        </li>
    ); 
};

MenuListItem.propTypes = {
    menuItem: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default MenuListItem;