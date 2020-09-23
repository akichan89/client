import cookie from 'js-cookie'
import { fetchApi } from './../api'

export const LOGIN_USER = 'LOGIN_USER'
export const SIGNUP_USER = 'SIGNUP_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const AUTH_USER = 'AUTH_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export const loginUser = (dispatch, data, cb) => {
  dispatch({ type: LOGIN_USER })
  fetchApi({
    url: '/auth/login',
    method: 'POST',
    data,
  })
    .then(res => {
      const { role, username, _id: userId } = res.data.user
      updateToken(res.data.token)
      dispatch(receiveUser({ role, username, userId }))
      cb(null)
    })
    .catch(cb)
}

export const signupUser = (dispatch, data, cb) => {
  dispatch({ type: SIGNUP_USER })
  fetchApi({
    url: '/auth/signup',
    data,
    method: 'POST',
  })
    .then(res => {
      const { role, username, _id: userId } = res.data.user
      updateToken(res.data.token)
      dispatch(receiveUser({ role, username, userId }))
      cb(null)
    })
    .catch(cb)
}

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
})

export const authUser = dispatch => {
  dispatch({ type: AUTH_USER })
  fetchApi({ url: '/auth' }).then(res => {
    const { role, username, userId } = res.data.user
    dispatch(receiveUser({ role, username, userId }))
  })
}

export const logoutUser = () => ({
  type: LOGOUT_USER,
})

export const updateToken = token =>
  cookie.set('token', token)
