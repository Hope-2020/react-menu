import { createSelector } from "reselect";

export const getItemsInCart = state => state.menu.itemsInCart;
export const getMenu = state => state.menu.menu;
export const getSearchQuery = state => state.filter.searchQuery;
export const getSortType = state => state.filter.sortType;

export const getTotalPrice = createSelector([getItemsInCart],
  itemsInCart => itemsInCart.reduce((total, item) => {
    return total += item.quantity * item.price;
  }, 0)
);

export const getVisibleMenu = createSelector([getMenu, getSearchQuery, getSortType],
  (menu, searchQuery, sortType) => {
    const visibleMenu = [...menu];

    if (sortType) {
      visibleMenu.sort((a, b) => sortType === 'up' ? a.price - b.price : b.price - a.price);
    }

    if (searchQuery.length) {
      return visibleMenu.filter(item => item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim()));
    }

    return visibleMenu;
  }
);