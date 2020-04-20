const initialState = {
  menu: [],
  itemsInCart: [],
  isLoading: false,
  isError: false,
  totalPrice: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_REQUSTED':
      return {
        ...state,
        isLoading: true
      };
    
    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload.map(item => {
          return {
            ...item, 
            quantity: 0
          };
        }),
        isLoading: false
      };

    case 'MENU_ERROR':
      return {
        ...state,
        isError: true,
        isLoading: false
      };

    case 'ADD_TO_CART':
      const item = state.menu.find(item => item.id === action.payload);
      const itemsInCart = state.itemsInCart.filter(item => item.id !== action.payload);

      const newItem = {
        ...item,
        quantity: ++item.quantity
      };
      

      return {
        ...state,
        itemsInCart: [...itemsInCart, newItem],
        totalPrice: state.totalPrice + newItem.price
      };

    case 'DELETE_FROM_CART':
      const itemForDelete = state.itemsInCart.find(item => item.id === action.payload);

      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(item => item.id !== action.payload),
        totalPrice: state.totalPrice - (itemForDelete.price * itemForDelete.quantity)
      };
    
    default:
      return state;
  }
};

export default reducer;