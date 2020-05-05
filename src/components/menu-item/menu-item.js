import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import Spinner from '../spinner';
import Error from '../error';
import { menuLoaded, addToCart } from '../../Redux/actions/menu';

import './menu-item.scss';

const MenuItem = ({
  menuItems, 
  menuLoaded,
  isLoading,
  hasError,
  addToCart
}) => {
  const params = useParams();
  const history = useHistory();
  const item = menuItems.find(elem => elem.id === Number(params.id));
  const errorMessage = hasError && <Error />;
  const loader = isLoading && <Spinner />;

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
          <span className={`menu__category_img alert ${item.category}`}></span>
          <div className="menu__buttons">
            <SwitchTransition>
              <CSSTransition
                key={item.inCart}
                addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                classNames='fade'
              >
              {item.inCart
                ? <Link 
                    to='/react-menu-app/cart/' 
                    className="menu__btn menu__link">
                    CART
                </Link>
                : <button 
                    className="menu__btn" 
                    onClick={() => addToCart(item.id)}>
                    ORDER
                </button>
              }
              </CSSTransition>
            </SwitchTransition>
            <button 
              onClick = {() => history.goBack()} 
              className="menu__btn menu__link">
              Back
            </button>
          </div>
        </div>
      }
    </div>
  );
};

const mapStateToProps = ({menu}) => {
  return {
    menuItems: menu.menu,
    isLoading: menu.isLoading,
    hasError: menu.hasError
  };
};

const mapDispatchToProps = {
  menuLoaded,
  addToCart 
};

MenuItem.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  menuLoaded: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MenuItem);