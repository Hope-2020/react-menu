import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';
import { menuLoaded, requested, hasError, addToCart } from '../../actions';
import PropTypes from 'prop-types';

import './menu-item.scss';

class MenuItem extends Component {
  componentDidMount() {
    const { RestoService, menuItems, menuLoaded, requested, hasError } = this.props;

    if (!menuItems.length) {
      requested();

      RestoService.getMenuItems()
        .then(result => menuLoaded(result))
        .catch(error => hasError());
    }
  }


  render() {
    const { menuItems, isLoading, isError, addToCart, match, history } = this.props;

    if (isError) {
      return (
        <div className="item__page">
          <Error />
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="item__page">
          <Spinner />
        </div>
      );
    }

    const item = menuItems.find(elem => elem.id === Number(match.params.id));
    const { title, url, category, price, description, id } = item;

    return (
      <div className="item__page">
        <div className="menu__item item__block">
          <div className="menu__title">{title}</div>
          <img className="menu__img" src={url} alt={title}></img>
          <div className="menu__title">{description}</div>
          <div className="menu__category">Category: <span>{category}</span></div>
          <div className="menu__price">Price: <span>{price}$</span></div>
          <span className={`menu__category_img ${category}`}></span>
          <div className="menu__buttons">
            <button onClick = {() => addToCart(id)} className="menu__btn">Add to cart</button>
            <button onClick = {() => history.goBack()} className="menu__btn">Back</button>
          </div>
        </div>
      </div>
    );
  };
}

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