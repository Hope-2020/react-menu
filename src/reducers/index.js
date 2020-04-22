const initialState = {
  menu: [],
  itemsInCart: [],
  isLoading: false,
  isError: false,
  isOrderTook: false,
  totalPrice: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUSTED':
      return {
        ...state,
        isLoading: true
      };
    
    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload,
        isLoading: false
      };

    case 'HAS_ERROR':
      return {
        ...state,
        isError: true,
        isLoading: false
      };

    case 'ADD_TO_CART':
      const isItemInCart = state.itemsInCart.some(elem => elem.id === action.payload);

      if (isItemInCart) {
        const item = state.itemsInCart.find(elem => elem.id === action.payload);
        const newItem = {...item, quantity: ++item.quantity};
        const items = state.itemsInCart.filter(elem => elem.id !== item.id).concat(newItem);

        return {
          ...state,
          itemsInCart: items,
          totalPrice: state.totalPrice + newItem.price,
          isOrderTook: false,
        };
      }

      const item = state.menu.find(elem => elem.id === action.payload);
      const newItem = {...item, quantity: 1};
      const items = [...state.itemsInCart, newItem];

      return {
        ...state,
        itemsInCart: items,
        totalPrice: state.totalPrice + newItem.price,
        isOrderTook: false,
      };

    case 'DELETE_FROM_CART':
      const itemForDelete = state.itemsInCart.find(elem => elem.id === action.payload);

      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(elem => elem.id !== itemForDelete.id),
        totalPrice: state.totalPrice - (itemForDelete.price * itemForDelete.quantity),
        isOrderTook: false,
      };

    case 'CLEAR_CART':
      return {
        ...state,
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