import {
  IS_ORDERING,
  ERROR,
  ADD_TO_CART,
  DELETE_FROM_CART,
  DECREASE_IN_CART,
  ORDER_SUCCESS,
  REFRESH_ORDER 
} from '../actions/cart';

import { getNewCart } from 'helpers/cart';

const initialState = {
  itemsInCart: [],
  isOrdering: false,
  error: false,
  isOrderTook: false
};

const handlers = {
  [IS_ORDERING]: state => ({
    ...state,
    isOrdering: true
  }),
  [ERROR]: state => ({
    ...state,
    error: true,
    isOrdering: false
  }),
  [ADD_TO_CART]: (state, action) => ({
    ...state,
    itemsInCart: getNewCart(state.itemsInCart, action.payload, 'add')
  }),
  [DELETE_FROM_CART]: (state, action) => ({
    ...state,
    itemsInCart: getNewCart(state.itemsInCart, action.payload, 'del')
  }),
  [DECREASE_IN_CART]: (state, action) => ({
    ...state,
    itemsInCart: getNewCart(state.itemsInCart, action.payload, 'decr')
  }),
  [ORDER_SUCCESS]: state => ({
    ...state,
    itemsInCart: [],
    isOrderTook: true,
    isOrdering: false
  }),
  [REFRESH_ORDER]: state => ({
    ...state,
    isOrderTook: false
  }),
  DEFAULT: state => state
};

const cart = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action);
};

export default cart;