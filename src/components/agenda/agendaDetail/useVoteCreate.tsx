/** library */
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/functions';

/** model */
import { AuthState } from '../../../store/auth/types';
import { CreateVoteForm } from '../../../store/agenda/put/types';

export enum ResultedCodeVariation {
    success = 200,
    error = 500
}

export const useVoteCreate = () => {
    const [loading, setLoading] = useState(false);
    const [resulted, setResulted] = useState({
        code: 0,
        msg: '',
        value: ''
    });

    const auth = useSelector((state: AuthState) => state.auth);

    const putVoteCreate = useCallback(async (agendaId: string, choiceList: string[], formValues: CreateVoteForm) => {
        setLoading(true);
        if (auth.uid === null || auth.displayName === null || auth.photoURL === null) {
            setLoading(false);
            setResulted({ code: ResultedCodeVariation.error, msg: 'サインインしてください', value: '' });
            return;
        }
        try {
            const choiceIndex = ['choice1Count', 'choice2Count', 'choice3Count', 'choice4Count'];
            let createVote = firebase.functions().httpsCallable('createVote');
            const result = await createVote({
                themeId: agendaId,
                choice: formValues.choice.value,
                reason: formValues.reason.value,
                selectedChoiceIndex: choiceIndex[choiceList.indexOf(formValues.choice.value)]
            });
            setResulted({ code: ResultedCodeVariation.success, msg: '投稿に成功しました', value: result.data.value });
        } catch (error) {
            setLoading(false);
            setResulted({ code: ResultedCodeVariation.error, msg: '投稿に失敗しました。時間をおいて再実施してください', value: '' });
        }
    }, [loading, resulted]);

    return [putVoteCreate, loading, resulted];
};