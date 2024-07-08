import axios from 'axios';
import { BASEURL_API } from '../constants';
import { delay } from '../helper';

const AUTH_BEGIN_LOADING = 'AUTH_BEGIN_LOADING',
    AUTH_FETCH_USER_SUCCESS = 'AUTH_FETCH_USER_SUCCESS',
    AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
    AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
    AUTH_ERROR = 'AUTH_ERROR';

const initialState = {
    token: localStorage.getItem('token') || '',
    error: '',
    loading: false,
};

//=============================================================================
// Reducers
//=============================================================================
const _getCommonState = (state) => ({
    ...state,
    error: '',
    loading: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_BEGIN_LOADING:
            return {
                ..._getCommonState(state),
                loading: true,
            };
        case AUTH_LOGIN_SUCCESS:
        case AUTH_REGISTER_SUCCESS:
            return {
                ..._getCommonState(state),
                token: action.payload,
            };
        case AUTH_ERROR:
            return {
                ..._getCommonState(state),
                error: action.payload,
            };
        case AUTH_LOGOUT:
            return {
                ..._getCommonState(state),
                token: '',
            };
        default:
            return state;
    }
};

//=============================================================================
// Actions
//=============================================================================

export const authBeginLoading = () => ({
    type: AUTH_BEGIN_LOADING,
});

export const fetchAuthedUserSuccess = (token) => ({
    type: AUTH_FETCH_USER_SUCCESS,
    payload: token,
});

export const authRegisterSuccess = (token) => ({
    type: AUTH_REGISTER_SUCCESS,
    payload: token,
});

export const authLoginSuccess = (token) => ({
    type: AUTH_LOGIN_SUCCESS,
    payload: token,
});

export const authLogOut = () => ({
    type: AUTH_LOGOUT,
});

export const authError = (err) => ({
    type: AUTH_ERROR,
    payload: Array.isArray(err.response?.data?.message)
        ? err.response.data.message[0]
        : err.response?.data?.message || err,
});

//=============================================================================
// Async Operations
//=============================================================================

export const login = (user) => async (dispatch) => {
    dispatch(authBeginLoading());
    await delay(1000);

    try {
        const response = await axios.post(`${BASEURL_API}/auth/login`, user);
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch(authLoginSuccess(token));
    } catch (error) {
        dispatch(authError(error));
    }
};

export const register = (user) => async (dispatch) => {
    dispatch(authBeginLoading());
    await delay(1000);

    try {
        const response = await axios.post(`${BASEURL_API}/auth/register`, user);
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch(authRegisterSuccess(token));
    } catch (error) {
        dispatch(authError(error));
    }
};

export const logout = () => async (dispatch) => {
    dispatch(authBeginLoading());
    await delay(1000);
    localStorage.removeItem('token');
    dispatch(authLogOut());
};
