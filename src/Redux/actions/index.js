export const MENU_LOADED = 'MENU_LOADED';
export const REQUSTED = 'REQUSTED';
export const HAS_ERROR = 'HAS_ERROR';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DECREASE_IN_CART = 'DECREASE_IN_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

const menuLoaded = (newMenu) => {
  return {
    type: MENU_LOADED,
    payload: newMenu
  };
};

const requested = () => {
  return {
    type: REQUSTED,
  };
};

const hasError = () => {
  return {
    type: HAS_ERROR,
  };
};

const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    payload: id
  };
};

const decreaseInCart = (id) => {
  return {
    type: DECREASE_IN_CART,
    payload: id
  };
};

const deleteFromCart = (id) => {
  return {
    type: DELETE_FROM_CART,
    payload: id
  };
};

const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export { 
  menuLoaded, 
  requested, 
  hasError, 
  addToCart, 
  deleteFromCart, 
  clearCart, 
  decreaseInCart 
};