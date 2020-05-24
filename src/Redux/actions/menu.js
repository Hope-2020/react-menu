import apiCall from 'helpers/api-call';

export const MENU_LOADED = 'MENU_LOADED';
export const LOADING = 'LOADING';
export const HAS_ERROR = 'HAS_ERROR';

export const menuLoaded = () => async dispatch => {
  dispatch({ type: LOADING });

  try {
    const { data } = await apiCall('/menu.json');

    dispatch({
      type: MENU_LOADED,
      payload: data
    });
  } catch (error) {
    dispatch({ type: HAS_ERROR });
  }
};