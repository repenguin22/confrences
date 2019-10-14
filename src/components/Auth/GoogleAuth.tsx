/** library */
import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase lib */
import * as firebase from 'firebase/app';
import 'firebase/auth';

/** Custom Components */
import { CustomSnackBar } from '../common/CustomSnackBar';

/** action */
import { Auth, AuthState } from '../../store/auth/types';
import { signIn } from '../../store/auth/action';
import { NoticeState } from '../../store/notice/types';

/** useAgendaCreate */
import { useGoogleAuth } from './useGoogleAuth';

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

    const dispatch = useDispatch();

    const loginedUserId: string | null = useSelector((state: AuthState) => state.auth.uid);

    const notice = useSelector((state: NoticeState) => state.notice);

    const [putAuth, loading, resulted] = useGoogleAuth();

    if (typeof putAuth !== 'function' || typeof loading !== 'boolean' || typeof resulted !== 'object') {
        return null;
    }

    const onSignIn = async () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await firebase.auth().signInWithPopup(provider);
            if (!result.user) {
                throw new Error('googole auth fatal error');
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

    const renderCustomSnackBar = () => {
        if (notice.target === 'all') {
            return <CustomSnackBar />;
        }
        return null;
    };

    const renderButton = () => {
        if (loginedUserId) {
            return null;
        }
        const currentUser = firebase.auth().currentUser;
        if (!loginedUserId && currentUser !== null) {
            const auth: Auth = {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            };
            dispatch(signIn(auth));
        }
        return (
            <React.Fragment>
                <Button onClick={onSignIn} variant="contained" color="secondary" className={classes.button}>
                    Sign In With Google
                </Button>
                {renderCustomSnackBar()}
            </React.Fragment>
        );
    };

    return renderButton();
};

export default GoogleAuth;