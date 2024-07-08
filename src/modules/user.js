import axios from 'axios';
import { BASEURL_API_USER } from '../constants';

const USER_BEGIN_LOADING = 'USER_BEGIN_LOADING',
    USER_FETCH_ALL_SUCCESS = 'USER_FETCH_ALL_SUCCESS',
    USER_ERROR = 'USER_ERROR';

export const initialState = {
    rows: [],
    loading: false,
    error: '',
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
        case USER_ERROR:
            return {
                ..._getCommonState(state),
                error: action.payload,
            };
        case USER_BEGIN_LOADING:
            return {
                ..._getCommonState(state),
                loading: true,
            };
        case USER_FETCH_ALL_SUCCESS:
            return {
                ..._getCommonState(state),
                rows: action.payload,
            };
        default:
            return state;
    }
};

//=============================================================================
// Actions
//=============================================================================

export const userBeginLoading = () => ({
    type: USER_BEGIN_LOADING,
});

export const fetchAllUsersSuccess = (users) => ({
    type: USER_FETCH_ALL_SUCCESS,
    payload: users,
});

export const userError = (err) => ({
    type: USER_ERROR,
    payload: err.response?.data?.message || err,
});

//=============================================================================
// Async Operations
//=============================================================================

// Fetch all users
export const fetchAllUsers = () => {
    return async (dispatch) => {
        dispatch(userBeginLoading());

        const token = localStorage.getItem('token');
        const auth = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(BASEURL_API_USER, auth);
            dispatch(fetchAllUsersSuccess(response.data));
        } catch (error) {
            dispatch(userError(error));
        }
    };
};
