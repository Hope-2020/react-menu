import {
  PROVIDE_USER,
  USER_LOGOUT,
  REGISTRATION,
  IS_ERROR
} from '../actions/auth';

const initialState = {
  currentUser: null,
  isUserLogin: false,
  isRecording: false,
  isError: false,
  errorMessage: ''
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case PROVIDE_USER:
      return {
        ...state,
        currentUser: action.payload,
        isUserLogin: true,
        isRecording: false
      };

    case REGISTRATION:
      return {
        ...state,
        isRecording: true
      };

    case IS_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
        isRecording: false
      };

    case USER_LOGOUT:
      return {
        ...state,
        isUserLogin: false,
        isRecording: false
      };
  
    default:
      return state;
  }
};

export default auth;