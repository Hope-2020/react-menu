import apiCall from 'helpers/api-call';

export const IS_ORDERING = 'IS_ORDERING';
export const ERROR = 'ERROR';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const DECREASE_IN_CART = 'DECREASE_IN_CART';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const REFRESH_ORDER = 'REFRESH_ORDER';

const sendOrder = (order, history) => async dispatch => {
  dispatch({ type: IS_ORDERING });

  try {
    const { data } = await apiCall('/orders.json');
    const orderNumber = Object.values(data).length + 1;
    const newOrder = {
      id: orderNumber,
      order
    };
    const responce = await apiCall('/orders.json', 'POST', newOrder);

    if (responce.status === 200) {
      dispatch({ type: ORDER_SUCCESS });

      setTimeout(() => {
        history.push("/react-menu-app/");

        dispatch({ type: REFRESH_ORDER });
      }, 5000);
    }
  } catch (error) {
    dispatch({ type: ERROR });
  }
};

const addToCart = item => ({
  type: ADD_TO_CART,
  payload: item

});

const deleteFromCart = item => ({
  type: DELETE_FROM_CART,
  payload: item
});

const decreaseInCart = item => ({
  type: DECREASE_IN_CART,
  payload: item
});

export {
  sendOrder,
  addToCart,
  deleteFromCart,
  decreaseInCart
};