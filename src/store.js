import { applyMiddleware, createStore } from 'redux';
import reducer from './Redux/reducers';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['itemsInCart', 'totalPrice']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer,
  applyMiddleware(ReduxThunk)
);

export const persistor = persistStore(store);
