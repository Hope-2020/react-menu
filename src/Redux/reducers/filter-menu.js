import {
  SORT_MENU,
  SEARCH_ITEM,
  CURRENT_PAGE
} from "../actions/filter-menu";

const initialState = {
  searchQuery: '',
  sortType: null,
  pageSize: 8,
  currentPage: 0
};

const handlers = {
  [SORT_MENU]: (state, action) => ({
    ...state,
    sortType: action.payload
  }),
  [SEARCH_ITEM]: (state, action) => ({
    ...state,
    searchQuery: action.payload
  }),
  [CURRENT_PAGE]: (state, action) => ({
    ...state,
    currentPage: action.payload
  }),
  DEFAULT: state => state
};

const filter = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};

export default filter;
