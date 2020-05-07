import { combineReducers } from 'redux';
import menu from './menu';
import auth from './auth';
import filter from './filter-menu';

const reducer = combineReducers({
  menu, auth, filter
});

export default reducer;