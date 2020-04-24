import {
  MENU_LOADED, 
  REQUSTED, 
  HAS_ERROR, 
  ADD_TO_CART, 
  DECREASE_IN_CART, 
  DELETE_FROM_CART, 
  CLEAR_CART
} from '../actions';

const initialState = {
  menu: [],
  itemsInCart: [],
  isLoading: true,
  isError: false,
  isOrderTook: false,
  totalPrice: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUSTED:
      return {
        ...state,
        isLoading: true
      };
    
    case MENU_LOADED:
      return {
        ...state,
        menu: action.payload,
        isLoading: false
      };

    case HAS_ERROR:
      return {
        ...state,
        isError: true,
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
          totalPrice: state.totalPrice + newItem.price,
          isOrderTook: false,
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

    case DECREASE_IN_CART:
      const itemForDecrease = state.itemsInCart.find(elem => elem.id === action.payload);
      const newItem = {...itemForDecrease, quantity: --itemForDecrease.quantity};
      const items = state.itemsInCart.map(
        elem => elem.id === itemForDecrease.id ? newItem : elem
      );

      return {
        ...state,
        itemsInCart: items,
        totalPrice: state.totalPrice - newItem.price
      };
      

    case DELETE_FROM_CART:
      const itemForDelete = state.itemsInCart.find(elem => elem.id === action.payload);

      return {
        ...state,
        menu: state.menu.map(
          elem => elem.id === itemForDelete.id ? {...elem, inCart: false} : elem
        ),
        itemsInCart: state.itemsInCart.filter(elem => elem.id !== itemForDelete.id),
        totalPrice: state.totalPrice - (itemForDelete.price * itemForDelete.quantity),
        isOrderTook: false,
      };

    case CLEAR_CART:
      return {
        ...state,
        menu: state.menu.map(elem => ({...elem, inCart: false})),
        itemsInCart: [],
        isOrderTook: true,
        isLoading: false,
        totalPrice: 0
      };
  
    default:
      return state;
  }
};

export default reducer;