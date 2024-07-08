const SET_FLASH_MESSAGE_ACTION = 'SET_FLASH_MESSAGE_ACTION';
const RESET_FLASH_MESSAGE_ACTION = 'RESET_FLASH_MESSAGE_ACTION';

const initialState = {
    type: '',
    message: '',
};

//=============================================================================
// Reducers
//=============================================================================

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FLASH_MESSAGE_ACTION:
            return {
                type: action.payload.type,
                message: action.payload.message,
            };
        case RESET_FLASH_MESSAGE_ACTION:
            return initialState;
        default:
            return state;
    }
};

//=============================================================================
// Actions
//=============================================================================

export const setFlashMessage = (type, message) => ({
    type: SET_FLASH_MESSAGE_ACTION,
    payload: { type, message },
});

export const resetFlashMessage = () => ({
    type: RESET_FLASH_MESSAGE_ACTION,
});
