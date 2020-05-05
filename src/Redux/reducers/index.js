import { combineReducers } from 'redux';
import menu from './menu';
import auth from './auth';

const reducer = combineReducers({
  menu, auth
});

export default reducer;