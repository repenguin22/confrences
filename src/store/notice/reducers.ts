import { Notice, SET_NOTICE, NoticeActionTypes } from './types';

export const initialState: Notice = {
    count: 0,
    type: null,
    message: null,
    vertical: null,
    horizontal: null
};

export const noticeReducer = (state = initialState, action: NoticeActionTypes): Notice => {
    switch (action.type) {
        case SET_NOTICE:
            return {
                ...state,
                count: action.payload.count,
                type: action.payload.type,
                message: action.payload.message,
                vertical: action.payload.vertical,
                horizontal: action.payload.horizontal
            };
        default:
            return state;
    }
};