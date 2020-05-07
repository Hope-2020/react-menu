
export const SORT_MENU = 'SORT_MENU';
export const SEARCH_ITEM = 'SEARCH_ITEM';

const sortMenu = type => ({
  type: SORT_MENU,
  payload: type
});

const updateSearch = value => dispatch => {
  dispatch({
    type: SEARCH_ITEM,
    payload: value
  })
}

export {
  sortMenu,
  updateSearch,
};