import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import userReducer from './user';
import taskReducer from './task';
import flashMessageReducer from './flashMessage';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
    flashMessage: flashMessageReducer,
});
