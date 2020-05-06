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

const menu = (state = initialState, action) => {
  switch (action.type) {
    case MENU_LOADED:
      return {
        ...state,
        menu: action.payload,
        isLoading: false
      };

    case LOADING:
      return {
        ...state,
        isLoading: true
      };

    case HAS_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false
      };

    case ADD_TO_CART:
      return {
        ...state,
        itemsInCart: getNewCart(state.itemsInCart, action.payload, 'add')
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        itemsInCart: getNewCart(state.itemsInCart, action.payload, 'del')
      };

    case DECREASE_IN_CART:
      return {
        ...state,
        itemsInCart: getNewCart(state.itemsInCart, action.payload, 'decr')
      };
      
    case ORDER_SUCCESS:
      return {
        ...state,
        itemsInCart: [],
        isOrderTook: true,
        isLoading: false
      };
    
    case REFRESH_ORDER:
      return {
        ...state,
        isOrderTook: false,
      };

    default:
      return state;
  }
};

export default menu;