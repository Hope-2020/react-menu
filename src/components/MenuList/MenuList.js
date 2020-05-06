import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MenuListItem from './MenuListItem'; 
import Spinner from 'components/Spinner';
import ErrorMessage from 'components/ErrorMessage';
import { menuLoaded, addToCart } from 'Redux/actions/menu';
import { inCart } from 'helpers/cart';

import './menu-list.scss';

const MenuList = ({
  menuItems,
  cart,
  isLoading,
  hasError,
  menuLoaded,
  addToCart
}) => {
  const errorMessage = hasError && <div className="item__page"><ErrorMessage /></div>;
  const loader = isLoading && <div className="item__page"><Spinner /></div>;

  useEffect(() => {
    !menuItems.length && menuLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    errorMessage || loader ||
      <ul className="menu__list">
        {menuItems.map(menuItem => {
          const itemInCart = inCart(cart, menuItem.id);

          return <MenuListItem 
            key={menuItem.id} 
            menuItem={menuItem}
            itemInCart={itemInCart}
            onAddToCart={() => addToCart(menuItem)} />
         })}
      </ul>
  );
};

const mapStateToProps = ({ menu }) => ({
  menuItems: menu.menu,
  cart: menu.itemsInCart,
  isLoading: menu.isLoading,
  hasError: menu.hasError
});

const mapDispatchToProps = {
  menuLoaded, 
  addToCart
};

MenuList.propTypes = {
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
)(MenuList);

