import apiCall from 'helpers/api-call';
import app from "../../firebase";

export const PROVIDE_USER = 'PROVIDE_USER';
export const REGISTRATION = 'REGISTRATION';
export const IS_ERROR = 'IS_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const REFRESH_ERROR = 'REFRESH_ERROR';

const getUserData =  async (id) => {
  try {
    const { data } = await apiCall(`/users/${id}.json`);
    const [ user ] = Object.values(data);

    return user;
  } catch (error) {
    return error;
  }
};

const checkUserIsLogin = () => async dispatch => {
  dispatch({
    type: REGISTRATION
  });

  app.auth().onAuthStateChanged(user => {
    if (user) {
      getUserData(user.uid)
        .then(user => {
          dispatch({
            type: PROVIDE_USER,
            payload: user
          });
        })
        .catch(error => {
          dispatch({
            type: IS_ERROR,
            payload: error.message
          });
        })
    } else {
      dispatch({
        type: USER_LOGOUT
      });
    }
  });
};

const login = (value, history) => async dispatch => {
  dispatch({
    type: REGISTRATION
  });

  try {
    const { user } = await app
      .auth()
      .signInWithEmailAndPassword(value.email, value.password);
    
    const currentUser = await getUserData(user.uid);

    dispatch({
      type: PROVIDE_USER,
      payload: currentUser
    });

    setTimeout(() => {
      history.push("/react-menu-app/dashboard/");
    }, 2000);
    
  } catch (error) {
    dispatch({
      type: IS_ERROR,
      payload: error.message
    });

    setTimeout(() => {
      dispatch({
        type: REFRESH_ERROR
      });
    }, 5000);
  }
};

const signUp = (value, history) => async dispatch=> {
  const { email, password, name, phone } = value;

  dispatch({
    type: REGISTRATION
  });

  try {
    const uid = await app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => res.user.uid);

    const user = {
      name,
      email,
      phone,
      uid
    };

    const responce = await apiCall(`/users/${uid}.json`, 'POST', user);

    if (responce.status === 200) {
      dispatch({
        type: PROVIDE_USER,
        payload: user
      });
    }

    setTimeout(() => {
      history.push("/react-menu-app/dashboard/");
    }, 2000);
  } catch (error) {
    dispatch({
      type: IS_ERROR,
      payload: error.message
    });

    setTimeout(() => {
      dispatch({
        type: REFRESH_ERROR
      });
    }, 5000);
  }
};

const signOut = () => {
  app.auth().signOut();
};

export { checkUserIsLogin, login, signUp, signOut };
