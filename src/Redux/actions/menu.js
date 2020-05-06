import apiCall from 'helpers/api-call';

export const MENU_LOADED = 'MENU_LOADED';
export const LOADING = 'LOADING';
export const HAS_ERROR = 'HAS_ERROR';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const DECREASE_IN_CART = 'DECREASE_IN_CART';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const REFRESH_ORDER = 'REFRESH_ORDER';

const menuLoaded = () => async dispatch => {
  dispatch({
    type: LOADING,
  });

  try {
    const { data } = await apiCall('/menu.json');
    const payload = data.map(item => ({
      ...item,
      inCart: false
    }));

    dispatch({
      type: MENU_LOADED,
      payload
    });
  } catch (error) {
    dispatch({
      type: HAS_ERROR,
    });
  }
};

const sendOrder = (order, history) => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    const { data } = await apiCall('/orders.json');
    const orderNumber = Object.values(data).length + 1;
    const newOrder = {
      id: orderNumber,
      order
    };
    const responce = await apiCall('/orders.json', 'POST', newOrder);

    if (responce.status === 200) {
      dispatch({
        type: ORDER_SUCCESS
      });

      setTimeout(() => {
        history.push("/react-menu-app/");

        dispatch({
          type: REFRESH_ORDER
        });
      }, 5000);
    }
  } catch (error) {
    dispatch({
      type: HAS_ERROR
    });
  }
}

const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    payload: id
  };
};

const deleteFromCart = (id) => {
  return {
    type: DELETE_FROM_CART,
    payload: id
  };
};

const decreaseInCart = (id) => {
  return {
    type: DECREASE_IN_CART,
    payload: id
  };
};

export {
  menuLoaded,
  addToCart,
  deleteFromCart,
  decreaseInCart,
  sendOrder
};