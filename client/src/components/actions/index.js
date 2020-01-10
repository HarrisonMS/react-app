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
export const ADDTABS_START = 'ADDTABS_START';
export const ADDTABS_SUCCESS = 'ADDTABS_SUCCESS';
export const ADDTABS_FAIL = 'ADDTABS_FAIL';
//////
export const LOGOUT = 'LOGOUT';
//////
export const DELETE_START = 'DELETE_START';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAIL = 'DELETE_FAIL';
//////
export const EDITTAB_START = 'EDITTAB_START';
export const EDITTAB_SUCCESS = 'EDITTAB_SUCCESS';
export const EDITTAB_FAIL = 'EDITTAB_FAIL';




export const login = (credentials) => dispatch => {
  dispatch({type: LOGIN_START});
  const baseURL = 'https://w-l-j.herokuapp.com//api/auth'
  axios
    .post(`${baseURL}/login`, credentials)
    .then(response => {
      console.log('R',response)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('user', response.data.id)
      dispatch({type: LOGIN_SUCCESS, payload: response.data.id})
    })
    .catch(err => {
      dispatch({type: LOGIN_FAIL, payload: err})
      console.log("error in handlesSub", err.response)});
  
}

export const register = (credentials) => dispatch => {
  dispatch({type: REGISTER_START});
    const baseURL = "https://w-l-j.herokuapp.com//api/auth";
    axios
      .post(`${baseURL}/register`, credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem('user', res.data.id)
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
  .get(`/workouts/${id}`)
  .then(res => {
    dispatch({type:LOADTABS_SUCCESS, payload: res.data.workouts})
  })
  .catch(err => {
    dispatch({type: LOADTABS_FAIL, payload:err});
  })
}

export const addTabs = (id,newTab) => dispatch => {
  dispatch({type: ADDTABS_START });
  axiosWithAuth()
  .post(`/tabs/${id}`, newTab)
  .then(res => {
    dispatch({type: ADDTABS_SUCCESS, payload: res.data.tabs})
  })
  .catch(err => {
    dispatch({type: ADDTABS_FAIL, payload: err})
  })
}

export const logout = () => dispatch => {
dispatch({type: LOGOUT});

}

export const deleteTab = (user_id, tab_id) => dispatch => {
  dispatch({type: DELETE_START });
  axiosWithAuth()
  .delete(`/tabs/${user_id}/${tab_id}`)
  .then(res => {
    dispatch({type: DELETE_SUCCESS, payload: res.data.tabs})
  })
  .catch(err => {
    dispatch({type: DELETE_FAIL, payload: err})
  })
}

export const updateTab = (user_id, tab_id, tab) => dispatch => {
  dispatch({type: EDITTAB_START});
  axiosWithAuth()
  .put(`/tabs/${user_id}/${tab_id}`, tab)
  .then(res => {
    dispatch({type: EDITTAB_SUCCESS, payload: res.data.tabs})
  })
  .catch(err => {
    console.log('e',err.message, tab)
    dispatch({type: EDITTAB_FAIL, payload: err})
  })
}