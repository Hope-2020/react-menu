const menuLoaded = (newMenu) => {
  return {
    type: 'MENU_LOADED',
    payload: newMenu
  };
};

const menuRequested = () => {
  return {
    type: 'MENU_REQUSTED',
  };
};

const menuError = () => {
  return {
    type: 'MENU_ERROR',
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

export { menuLoaded, menuRequested, menuError, addToCart, deleteFromCart };