import axios from 'axios';

const apiCall = (
  endUrl = '',
  method = 'GET',
  body = {}
) => {
  return new Promise((resolve, reject) => {
    axios({url: `https://react-menu-app-e4c8b.firebaseio.com${endUrl}`, method, data: body})
      .then(responce => resolve(responce))
      .catch(err => reject(err));
  });
};

export default apiCall;