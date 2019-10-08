import { Auth, SIGN_IN, SIGN_OUT, AuthActionTypes } from './types';

const initialState: Auth = {
    uid: null,
    displayName: null,
    photoURL: null
};

export const authReducer = (state = initialState, action: AuthActionTypes): Auth => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL
            };
        case SIGN_OUT:
            return {
                ...state,
                uid: null,
                displayName: null,
                photoURL: null
            };
        default:
            return state;
    }
};