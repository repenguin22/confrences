/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';

/** action */
import { signIn } from '../../store/auth/action';
import { NoticeState, SnackBarTypeVariation } from '../../store/notice/types';
import { setNotice } from '../../store/notice/action';
/** model */
import { Auth } from '../../store/auth/types';

export enum ResultedCodeVariation {
    success = 200,
    error = 500
}

export const useGoogleAuth = () => {
    const dispatch = useDispatch();

    const notice = useSelector((state: NoticeState) => state.notice);
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
                throw new Error('googole auth fatal error');
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
            setResulted({ code: ResultedCodeVariation.error, msg: 'ログインに失敗しました', value: `code:${error.code} ${error.message}` });
            setLoading(false);
            dispatch(setNotice({
                target: 'all',
                count: notice.count + 1,
                type: SnackBarTypeVariation.success,
                message: '投票に成功しました',
                vertical: 'top',
                horizontal: 'center'
            }));
        }
    }, [loading, resulted]);

    return [putAuth, loading, resulted];
};