const menuLoaded = (newMenu) => {
  return {
    type: 'MENU_LOADED',
    payload: newMenu
  };
};

const requested = () => {
  return {
    type: 'REQUSTED',
  };
};

const hasError = () => {
  return {
    type: 'HAS_ERROR',
  };
};

const addToCart = (id) => {
  return {
    type: 'ADD_TO_CART',
    payload: id
  };
};

const deleteFromCart = (id) => {
  return {
    type: 'DELETE_FROM_CART',
    payload: id
  };
};

const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};

export { menuLoaded, requested, hasError, addToCart, deleteFromCart, clearCart };