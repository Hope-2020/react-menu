import {
  PROVIDE_USER,
  USER_LOGOUT,
  REGISTRATION,
  IS_ERROR,
  REFRESH_ERROR
} from '../actions/auth';

const initialState = {
  currentUser: null,
  isUserLogin: false,
  isRecording: false,
  isError: false,
  errorMessage: ''
};

const handlers = {
  [PROVIDE_USER]: (state, action) => ({
    ...state,
    currentUser: action.payload,
    isUserLogin: true,
    isRecording: false
  }),
  [REGISTRATION]: state => ({
    ...state,
    isRecording: true
  }),
  [IS_ERROR]: (state, action) => ({
    ...state,
    isError: true,
    errorMessage: action.payload,
    isRecording: false
  }),
  [REFRESH_ERROR]: state => ({
    ...state,
    isError: false
  }),
  [USER_LOGOUT]: state => ({
    ...state,
    isUserLogin: false,
    isRecording: false
  }),
  DEFAULT: state => state
};

const auth = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action);
};

export default auth;