import {
  SORT_MENU,
  SEARCH_ITEM
} from "../actions/filter-menu"

const initialState = {
  searchQuery: '',
  sortType: null
}

const filter = (state = initialState, action) => {
  switch (action.type) {
    case SORT_MENU:
      return {
        ...state,
        sortType: action.payload
      }

    case SEARCH_ITEM:
      return {
        ...state,
        searchQuery: action.payload
      }

    default:
      return state
  }
};

export default filter;
