import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSucess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCESS,
    authData: authData
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBcN3QVdOSrVnhb2HQeXe1EJelVkY725IQ';
    if(!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBcN3QVdOSrVnhb2HQeXe1EJelVkY725IQ';
    }
    axios.post(url, authData)
    .then(response => {
      dispatch(authSucess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error));
    })
  }
}