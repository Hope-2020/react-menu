import {
  MENU_LOADED, 
  LOADING,
  HAS_ERROR,
  ADD_TO_CART,
  DELETE_FROM_CART,
  DECREASE_IN_CART,
  ORDER_SUCCESS,
  REFRESH_ORDER 
} from '../actions/menu';

import { getNewCart } from 'helpers/cart';

const initialState = {
  menu: [],
  itemsInCart: [],
  isLoading: true,
  hasError: false,
  isOrderTook: false
};

const handlers = {
  [MENU_LOADED]: (state, action) => ({
    ...state,
    menu: action.payload,
    isLoading: false
  }),
  [LOADING]: state => ({
    ...state,
    isLoading: true
  }),
  [HAS_ERROR]: state => ({
    ...state,
    hasError: true,
    isLoading: false
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
    isLoading: false
  }),
  [REFRESH_ORDER]: state => ({
    ...state,
    isOrderTook: false
  }),
  DEFAULT: state => state
};

const menu = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action);
};

export default menu;