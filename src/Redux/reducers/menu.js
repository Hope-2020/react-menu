import {
  MENU_LOADED, 
  LOADING,
  HAS_ERROR
} from '../actions/menu';

const initialState = {
  menu: [],
  isLoading: true,
  hasError: false
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
  DEFAULT: state => state
};

const menu = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action);
};

export default menu;