import { createSelector } from "reselect";

export const getItemsInCart = state => state.menu.itemsInCart;

export const getTotalPrice = createSelector([getItemsInCart],
  itemsInCart => itemsInCart.reduce((total, item) => {
    return total += item.quantity * item.price;
  }, 0)
);