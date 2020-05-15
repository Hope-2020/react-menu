export const SORT_MENU = 'SORT_MENU';
export const SEARCH_ITEM = 'SEARCH_ITEM';
export const CURRENT_PAGE = 'CURRENT_PAGE';

const sortMenu = type => ({
  type: SORT_MENU,
  payload: type
});

const updateSearch = value => ({
  type: SEARCH_ITEM,
  payload: value
});

const pageChange = page => ({
  type: CURRENT_PAGE,
  payload: page
});

export {
  sortMenu,
  updateSearch,
  pageChange
};