import {
  MENU_LOADED, 
  LOADING,
  HAS_ERROR,
  ADD_TO_CART,
  DELETE_FROM_CART,
  DECREASE_IN_CART,
  ORDER_SUCCESS
} from '../actions/menu';

const initialState = {
  menu: [],
  itemsInCart: [],
  isLoading: false,
  hasError: false,
  isOrderTook: false,
  totalPrice: 0
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
      const isItemInCart = state.itemsInCart.some(elem => elem.id === action.payload);

      if (isItemInCart) {
        const item = state.itemsInCart.find(elem => elem.id === action.payload);
        const newItem = {...item, quantity: ++item.quantity};
        const items = state.itemsInCart.map(elem => elem.id === item.id ? newItem : elem);

        return {
          ...state,
          itemsInCart: items,
          totalPrice: state.totalPrice + newItem.price
        };
      }

      const item = state.menu.find(elem => elem.id === action.payload);
      const newMenu = state.menu.map(
        elem => elem.id === item.id ? {...elem, inCart: true} : elem
      );

      return {
        ...state,
        menu: newMenu,
        itemsInCart: [...state.itemsInCart, {...item, quantity: 1}],
        totalPrice: state.totalPrice + item.price,
        isOrderTook: false,
      };

    case DELETE_FROM_CART:
      const itemDelete = state.itemsInCart.find(elem => elem.id === action.payload);

      return {
        ...state,
        menu: state.menu.map(
          elem => elem.id === itemDelete.id ? {...elem, inCart: false} : elem
        ),
        itemsInCart: state.itemsInCart.filter(elem => elem.id !== itemDelete.id),
        totalPrice: state.totalPrice - (itemDelete.price * itemDelete.quantity)
      };

    case DECREASE_IN_CART:
      const itemDecr = state.itemsInCart.find(elem => elem.id === action.payload);
      const newItemDecr = {...itemDecr, quantity: --itemDecr.quantity};
    
      return {
        ...state,
        itemsInCart: state.itemsInCart.map(
          elem => elem.id === itemDecr.id ? newItemDecr : elem
        ),
        totalPrice: state.totalPrice - newItemDecr.price
      };
      
    case ORDER_SUCCESS:
      return {
        ...state,
        menu: state.menu.map(elem => ({...elem, inCart: false})),
        itemsInCart: [],
        isOrderTook: true,
        totalPrice: 0,
        isLoading: false
      };
  
    default:
      return state;
  }
};

export default menu;