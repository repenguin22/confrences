/** library */
import React, { FC } from 'react';
//import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/** firebase lib */
import * as firebase from 'firebase/app';
import 'firebase/auth';

/** Custom Components */
import { CustomSnackBar, SnackBarTypeVariation } from '../common/CustomSnackBar';

/** action */
import { Auth, AuthState } from '../../store/auth/types';

/** useAgendaCreate */
import { useGoogleAuth, ResultedCodeVariation } from './useGoogleAuth';

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

    const [putAuth, loading, resulted] = useGoogleAuth();

    if (typeof putAuth !== 'function' || typeof loading !== 'boolean' || typeof resulted !== 'object') {
        return null;
    }

    const onSignIn = async () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await firebase.auth().signInWithPopup(provider);
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
            putAuth(auth);
        } catch (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
    };

    const renderButton = () => {

        if (loginedUserId) {
            return null;
        }
        return (
            <React.Fragment>
                <Button onClick={onSignIn} variant="contained" color="secondary" className={classes.button}>
                    Sign In With Google
                </Button>
                <CustomSnackBar />
            </React.Fragment>
        );
    };

    return renderButton();
};

export default GoogleAuth;