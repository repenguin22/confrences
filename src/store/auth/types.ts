export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export interface Auth {
    uid: string | null,
    displayName: string | null
    photoURL: string | null
}

// for useSelector
export interface AuthState {
    auth: {
        uid: string | null,
        displayName: string | null
        photoURL: string | null
    }
}

interface SignInAction {
    type: typeof SIGN_IN;
    payload: Auth;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
    payload: Auth;
}

export type AuthActionTypes = SignInAction | SignOutAction;