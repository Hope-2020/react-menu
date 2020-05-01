import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';
import { menuLoaded, requested, hasError, addToCart } from '../../Redux/actions';
import PropTypes from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import './menu-item.scss';

const MenuItem = (props) => {
  const { 
    RestoService, 
    menuItems, 
    menuLoaded, 
    requested, 
    hasError, 
    isLoading, 
    isError, 
    addToCart 
  } = props;

  const params = useParams();
  const history = useHistory();
  const item = menuItems.find(elem => elem.id === Number(params.id));
  const errorMessage = isError && <Error />;
  const loader = isLoading && <Spinner />;

  const getMenu = () => {
    requested();

    RestoService.getMenuItems()
      .then(result => menuLoaded(result))
      .catch(() => hasError());
  };

  useEffect(() => {
    !menuItems.length && getMenu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <div className="item__page">
      {errorMessage || loader ||
        <div className="menu__item item__block">
          <div className="menu__title">{item.title}</div>
          <img className="menu__img" src={item.url} alt={item.title}></img>
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
              {item.inCart ?
                <Link 
                    to='/react-menu-app/cart/' 
                    className="menu__btn menu__link">
                    Go to Cart
                </Link> :
                <button 
                    className="menu__btn" 
                    onClick={() => addToCart(item.id)}>
                    Add to cart
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

const mapStateToProps = (state) => {
  return {
    menuItems: state.menu,
    isLoading: state.isLoading,
    isError: state.isError
  };
};

const mapDispatchToProps = {
  menuLoaded, 
  requested, 
  hasError, 
  addToCart 
};

MenuItem.propTypes = {
  RestoService: PropTypes.object.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  menuLoaded: PropTypes.func.isRequired,
  requested: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

export default WithRestoService()(connect(
  mapStateToProps, 
  mapDispatchToProps
)(MenuItem));