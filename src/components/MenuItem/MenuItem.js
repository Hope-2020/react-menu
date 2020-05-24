import React, { useEffect, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import Spinner from 'components/UI/Spinner';
import ErrorMessage from 'components/UI/ErrorMessage';
import { menuLoaded } from 'Redux/actions/menu';
import { addToCart } from 'Redux/actions/cart';
import { inCart } from 'helpers/cart';

import './menu-item.scss';

const MenuItem = ({
  menuItems,
  cart,
  menuLoaded,
  isLoading,
  hasError,
  addToCart
}) => {
  const params = useParams();
  const history = useHistory();
  const item = menuItems.find(elem => elem.id === Number(params.id));
  const errorMessage = hasError && <ErrorMessage />;
  const loader = isLoading && <Spinner />;

  const handlerAddItem = useCallback(() =>
    addToCart(item),
    [addToCart, item]
  );

  const handlerBack = useCallback(() =>
    history.goBack(),
    [history]
  );

  useEffect(() => {
    !menuItems.length && menuLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="item__page">
      {errorMessage || loader ||
        <div className="menu__item item__block">
          <div className="menu__title">{item.title}</div>
          <img 
            className="menu__img" 
            src={item.url} 
            alt={item.title}>
          </img>
          <div className="menu__title">{item.description}</div>
          <div className="menu__category">Category: <span>{item.category}</span></div>
          <div className="menu__price">Price: <span>{item.price}$</span></div>
          <span className={`menu__category_img ${item.category}`}></span>
          <div className="menu__buttons">
            <SwitchTransition>
              <CSSTransition
                key={inCart(cart, item.id)}
                addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                classNames='fade'
              >
              {inCart(cart, item.id) ? (
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
              </CSSTransition>
            </SwitchTransition>
            <button 
              onClick = {handlerBack} 
              className="menu__btn menu__link">
              Back
            </button>
          </div>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  menuItems: state.menu.menu,
  cart: state.cart.itemsInCart,
  isLoading: state.menu.isLoading,
  hasError: state.menu.hasError
});

const mapDispatchToProps = {
  menuLoaded,
  addToCart 
};

MenuItem.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.object,
  ),
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  menuLoaded: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MenuItem);