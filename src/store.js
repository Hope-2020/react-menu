import { createStore } from 'redux';
import reducer from './Redux/reducers';

const store = createStore(reducer);

export default store;