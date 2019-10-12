/** library */
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';

/** action */
import { signIn } from '../../store/auth/action';
/** model */
import { Auth } from '../../store/auth/types';

export enum ResultedCodeVariation {
    success = 200,
    error = 500
}

export const useGoogleAuth = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [resulted, setResulted] = useState({
        code: 0,
        msg: '',
        value: ''
    });

    const putAuth = useCallback(async (auth: Auth) => {

        setLoading(true);
        try {
            const uid = auth.uid;
            if (!uid) {
                throw Object.assign(
                    new Error('Google Auth Fatal Error'),
                    { code: 500 }
                );
            }
            let db = firebase.firestore();
            await db.collection('user').doc(uid).set({
                uid: uid,
                displayName: auth.displayName,
                photoURL: auth.photoURL
            }, { merge: true });
            dispatch(signIn(auth));
            setLoading(false);
            setResulted({ code: ResultedCodeVariation.success, msg: '', value: '' });
        } catch (error) {
            setLoading(false);
            setResulted({ code: ResultedCodeVariation.error, msg: 'ログインに失敗しました', value: `code:${error.code} ${error.message}` });
        }
    }, [loading, resulted]);

    return [putAuth, loading, resulted];
};