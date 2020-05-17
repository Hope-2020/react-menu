import { combineReducers } from 'redux';

import menu from './menu';
import cart from './cart';
import auth from './auth';
import filter from './filter-menu';

const reducer = combineReducers({
  menu, cart, auth, filter
});

export default reducer;