/** library */
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/functions';

/** model */
import { AuthState } from '../../../store/auth/types';
import { CreateAgendaForm } from '../../../store/agenda/put/types';

export enum ResultedCodeVariation {
    success = 200,
    error = 500
}

export const useAgendaCreate = () => {
    const [loading, setLoading] = useState(false);
    const [resulted, setResulted] = useState({
        code: 0,
        msg: '',
        value: ''
    });

    const auth = useSelector((state: AuthState) => state.auth);

    const putAgendaCretae = useCallback(async (agenda: CreateAgendaForm) => {
        setLoading(true);
        if (auth.uid === null || auth.displayName === null || auth.photoURL === null) {
            setLoading(false);
            setResulted({ code: ResultedCodeVariation.error, msg: 'サインインしてください', value: '' });
            return;
        }
        try {
            let createAgenda = firebase.functions().httpsCallable('createAgenda');
            const result = await createAgenda({
                subject: agenda.subject.value,
                overview: agenda.overview.value,
                choice1: agenda.choice1.value,
                choice2: agenda.choice2.value,
                choice3: agenda.choice3.value,
                choice4: agenda.choice4.value,
                createUserName: auth.displayName,
                createUserPhotoURL: auth.photoURL
            });
            setResulted({ code: ResultedCodeVariation.success, msg: '投稿に成功しました', value: result.data.value });
        } catch (error) {
            setLoading(false);
            setResulted({ code: ResultedCodeVariation.error, msg: '投稿に失敗しました。時間をおいて再実施してください', value: '' });
        }
    }, [loading, resulted]);

    return [putAgendaCretae, loading, resulted];
};