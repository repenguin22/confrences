import { Auth, SIGN_IN, SIGN_OUT } from './types';

export const signIn = (user: Auth) => {
    return {
        type: SIGN_IN,
        payload: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        }
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
        payload: {
            uid: null,
            displayName: null,
            photoURL: null
        }
    };
};
