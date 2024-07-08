import axios from 'axios';
import { BASEURL_API_TASK } from '../constants';
import { delay } from '../helper';

const TASK_BEGIN_LOADING = 'TASK_BEGIN_LOADING',
    TASK_CREATE_SUCCESS = 'TASK_CREATE_SUCCESS',
    TASK_FETCH_ALL_SUCCESS = 'TASK_FETCH_ALL_SUCCESS',
    TASK_FETCH_BY_TITLE_SUCCESS = 'TASK_FETCH_BY_TITLE_SUCCESS',
    TASK_UPDATE_SUCCESS = 'TASK_UPDATE_SUCCESS',
    TASK_DELETE_SUCCESS = 'TASK_DELETE_SUCCESS',
    TASK_RESET_MESSAGE = 'TASK_RESET_MESSAGE',
    TASK_ERROR = 'TASK_ERROR';

export const initialState = {
    rows: [],
    loading: false,
    error: '',
    isMessage: '',
};

export const initialTask = {
    title: '',
    summary: '',
    description: '',
    assignee: { name: '', email: '', password: '' },
    status: 'ToDo',
    dueDate: '',
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
        case TASK_ERROR:
            return {
                ..._getCommonState(state),
                error: action.payload,
            };
        case TASK_RESET_MESSAGE:
            return {
                ..._getCommonState(state),
                isMessage: '',
            };
        case TASK_BEGIN_LOADING:
            return {
                ..._getCommonState(state),
                loading: true,
            };
        case TASK_FETCH_ALL_SUCCESS:
        case TASK_FETCH_BY_TITLE_SUCCESS:
            return {
                ..._getCommonState(state),
                rows: action.payload,
            };
        case TASK_CREATE_SUCCESS:
            return {
                ..._getCommonState(state),
                isMessage: 'Create Task Success.',
            };
        case TASK_UPDATE_SUCCESS:
            return {
                ..._getCommonState(state),
                isMessage: 'Update Task Success.',
            };
        case TASK_DELETE_SUCCESS:
            return {
                ..._getCommonState(state),
                isMessage: 'Delete Task Success.',
            };
        default:
            return state;
    }
};

//=============================================================================
// Actions
//=============================================================================

export const taskBeginLoading = () => ({
    type: TASK_BEGIN_LOADING,
});

export const fetchAllTasksSuccess = (tasks) => ({
    type: TASK_FETCH_ALL_SUCCESS,
    payload: tasks,
});
export const fetchByTitleSuccess = (tasks) => ({
    type: TASK_FETCH_BY_TITLE_SUCCESS,
    payload: tasks,
});

export const createTaskSuccess = () => ({
    type: TASK_CREATE_SUCCESS,
});

export const updateTaskSuccess = () => ({
    type: TASK_UPDATE_SUCCESS,
});

export const deleteTaskSuccess = () => ({
    type: TASK_DELETE_SUCCESS,
});

export const resetMessage = () => ({
    type: TASK_RESET_MESSAGE,
});

export const taskError = (err) => ({
    type: TASK_ERROR,
    payload: Array.isArray(err.response?.data?.message)
        ? err.response.data.message[0]
        : err.response?.data?.message || err,
});

//=============================================================================
// Async Operations
//=============================================================================

// Fetch all tasks
export const fetchAllTasks = () => {
    return async (dispatch, getState) => {
        dispatch(taskBeginLoading());

        const auth = {
            headers: {
                Authorization: `Bearer ${getState().auth.token}`,
            },
        };

        try {
            await delay(1000);
            const response = await axios.get(BASEURL_API_TASK, auth);
            dispatch(fetchAllTasksSuccess(response.data));
        } catch (error) {
            dispatch(taskError(error));
        }
    };
};

export const searchTasksByTitle = (title) => {
    return async (dispatch, getState) => {
        dispatch(taskBeginLoading());

        const auth = {
            headers: {
                Authorization: `Bearer ${getState().auth.token}`,
            },
        };

        try {
            await delay(1000);
            const response = await axios.get(`${BASEURL_API_TASK}/search?title=${title}`, auth);
            dispatch(fetchByTitleSuccess(response.data));
        } catch (error) {
            dispatch(taskError(error));
        }
    };
};

export const createTask = (task) => {
    return async (dispatch, getState) => {
        dispatch(taskBeginLoading());

        const auth = {
            headers: {
                Authorization: `Bearer ${getState().auth.token}`,
            },
        };

        try {
            await delay(1000);
            await axios.post(BASEURL_API_TASK, task, auth);
            dispatch(createTaskSuccess());
        } catch (error) {
            dispatch(taskError(error));
        }
    };
};

export const updateTask = (task) => {
    return async (dispatch, getState) => {
        dispatch(taskBeginLoading());

        const auth = {
            headers: {
                Authorization: `Bearer ${getState().auth.token}`,
            },
        };

        try {
            await axios.patch(`${BASEURL_API_TASK}/${task._id}`, task, auth);
            dispatch(updateTaskSuccess());
        } catch (error) {
            dispatch(taskError(error));
        }
    };
};

export const deleteTask = (id) => {
    return async (dispatch, getState) => {
        dispatch(taskBeginLoading());

        const auth = {
            headers: {
                Authorization: `Bearer ${getState().auth.token}`,
            },
        };

        try {
            await axios.delete(`${BASEURL_API_TASK}/${id}`, auth);
            dispatch(deleteTaskSuccess());
        } catch (error) {
            dispatch(taskError());
        }
    };
};
