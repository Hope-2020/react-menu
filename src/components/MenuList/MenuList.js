import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import MenuListItem from './MenuListItem'; 
import Spinner from 'components/UI/Spinner';
import ErrorMessage from 'components/UI/ErrorMessage';
import NothingFound from 'components/UI/NothingFound';
import { menuLoaded } from 'Redux/actions/menu';
import { inCart } from 'helpers/cart';
import { getVisibleMenu } from 'Redux/selectors';

import './menu-list.scss';

const MenuList = ({
  menuItems,
  cart,
  isLoading,
  hasError,
  menuLoaded,
  pageSize,
  currentPage
}) => {
  const errorMessage = hasError && <div className="item__page"><ErrorMessage /></div>;
  const loader = isLoading && <div className="item__page"><Spinner /></div>;
  const nothingFound = !menuItems.length && <div className="item__page"><NothingFound /></div>;
  const visibleMenu = _.chunk(menuItems, pageSize)[currentPage];

  useEffect(() => {
    !menuItems.length && menuLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    errorMessage || loader || nothingFound ||
      <ul className="menu__list">
        {visibleMenu.map(menuItem => {
          const isItemInCart = inCart(cart, menuItem.id);

          return (
            <MenuListItem
              key={menuItem.id}
              item={menuItem}
              isItemInCart={isItemInCart}
            />
          )})}
      </ul>
  );
};

const mapStateToProps = (state) => ({
  menuItems: getVisibleMenu(state),
  cart: state.cart.itemsInCart,
  isLoading: state.menu.isLoading,
  hasError: state.menu.hasError,
  pageSize: state.filter.pageSize,
  currentPage: state.filter.currentPage
});

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
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps,
  { menuLoaded }
)(MenuList);

