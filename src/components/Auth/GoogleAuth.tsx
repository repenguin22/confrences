/** library */
import React, { FC } from 'react';
//import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase lib */
import * as firebase from 'firebase/app';
import 'firebase/auth';

/** action */
import { signIn } from '../../store/auth/action';
import { Auth, AuthState } from '../../store/auth/types';

/** Material UI Components */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const GoogleAuth: FC = () => {

    const classes = useStyles();

    const loginedUserId: string | null = useSelector((state: AuthState) => state.auth.uid);

    const dispatch = useDispatch();

    const onSignIn = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            if (!result.user) {
                throw Object.assign(
                    new Error('Google Auth Fatal Error'),
                    { code: 500 }
                );
            }
            const auth: Auth = {
                uid: result.user.uid,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
            dispatch(signIn(auth));
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    };

    const renderButton = () => {

        if (loginedUserId) {
            return null;
        }
        return (
            <Button onClick={onSignIn} variant="contained" color="secondary" className={classes.button}>
                Sign In With Google
            </Button>
        );
    };

    return renderButton();
};

export default GoogleAuth;