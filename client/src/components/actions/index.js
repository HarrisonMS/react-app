import axiosWithAuth from "../../utils/axiosWithAuth";
import axios from 'axios';

//////
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
//////
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
//////
export const LOADTABS_START = 'LOADTABS_START';
export const LOADTABS_SUCCESS = 'LOADTABS_SUCCESS';
export const LOADTABS_FAIL = 'LOADTABS_FAIL';
//////



export const login = (credentials) => dispatch => {
  dispatch({type: LOGIN_START});
  const baseURL = 'https://tabless-be.herokuapp.com/api/auth'
  axios
    .post(`${baseURL}/login`, credentials)
    .then(response => {
      console.log('R',response)
      localStorage.setItem("token", response.data.token);
      dispatch({type: LOGIN_SUCCESS, payload: response.data.id})
    })
    .catch(err => {
      dispatch({type: LOGIN_FAIL, payload: err})
      console.log("error in handlesSub", err.response)});
  
}

export const register = (credentials) => dispatch => {
  dispatch({type: REGISTER_START});
    const baseURL = "https://tabless-be.herokuapp.com/api/auth";
    axios
      .post(`${baseURL}/register`, credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        dispatch({type: REGISTER_SUCCESS , payload: res.data.id})
      })
      .catch(err => {
        dispatch({type: REGISTER_FAIL, payload: err})
        console.log(err);
      });
}

export const loadTabs = (id) => dispatch => {
  dispatch({type: LOADTABS_START});
  axiosWithAuth()
  .get(`/tabs/${id}`)
  .then(res => {
    dispatch({type:LOADTABS_SUCCESS, payload: res.data.tabs})
  })
  .catch(err => {
    dispatch({type: LOADTABS_FAIL, payload:err});
  })
}