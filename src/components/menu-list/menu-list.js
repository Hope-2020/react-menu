import React, { useEffect } from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, requested, hasError, addToCart } from '../../Redux/actions';
import Spinner from '../spinner';
import Error from '../error';
import PropTypes from 'prop-types';

import './menu-list.scss';

const MenuList = (props) => {
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

  const errorMessage = isError && <div className="item__page"><Error /></div>;
  const loader = isLoading && <div className="item__page"><Spinner /></div>;

  return (
    errorMessage || loader ||
      <ul className="menu__list">
        {menuItems.map(menuItem => {
          return <MenuListItem 
            key={menuItem.id} 
            menuItem={menuItem} 
            onAddToCart={() => addToCart(menuItem.id)} />
         })}
      </ul>
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

export default WithRestoService()(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuList));

MenuList.propTypes = {
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

