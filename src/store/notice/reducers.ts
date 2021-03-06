import { Notice, SET_NOTICE, NoticeActionTypes } from './types';

export const initialState: Notice = {
    target: '',
    count: 0,
    type: null,
    message: null,
    vertical: null,
    horizontal: null,
    displayTime: 0
};

export const noticeReducer = (state = initialState, action: NoticeActionTypes): Notice => {
    switch (action.type) {
        case SET_NOTICE:
            return {
                ...state,
                target: action.payload.target,
                count: state.count + 1,
                type: action.payload.type,
                message: action.payload.message,
                vertical: action.payload.vertical,
                horizontal: action.payload.horizontal,
                displayTime: action.payload.displayTime
            };
        default:
            return state;
    }
};