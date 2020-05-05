import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import ReactCardFlip from "react-card-flip";
import PropTypes from 'prop-types';

import './menu-list-item.scss';

const MenuListItem = memo(
    ({ menuItem, onAddToCart }) => {

    const { title, price, url, category, id, inCart, description } = menuItem;
    const [isFlipped, changeFlipped] = useState(false);

    const onClickFlip = () => {
        changeFlipped(!isFlipped);
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <li className="menu__item">
                <div className="menu__title">{title}</div>
                <img 
                    className="menu__img" 
                    src={url} 
                    alt={title}
                    title="click me"
                    onClick={onClickFlip}>
                </img>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <span className={`menu__category_img ${category}`}></span>
                <div className="menu__buttons">
                    {inCart
                        ? <Link 
                            to='/react-menu-app/cart/' 
                            className="menu__btn menu__link">
                            CART
                        </Link>
                        : <button 
                            className="menu__btn" 
                            onClick={() => onAddToCart()}>
                            ORDER
                        </button>
                    }
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
                    onClick={onClickFlip}
                >
                    {description}
                </div>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <span className={`menu__category_img ${category}`}></span>
                <div className="menu__buttons">
                    {inCart
                        ? <Link 
                            to='/react-menu-app/cart/' 
                            className="menu__btn menu__link">
                            CART
                        </Link>
                        : <button 
                            className="menu__btn" 
                            onClick={() => onAddToCart()}>
                            ORDER
                        </button>
                    }
                </div>
            </li>
        </ReactCardFlip>
    ); 
}, 
    (prev, next) => prev.menuItem === next.menuItem
);

MenuListItem.propTypes = {
    menuItem: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default MenuListItem;