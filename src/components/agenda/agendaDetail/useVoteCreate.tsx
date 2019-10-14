/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/functions';

/** model */
import { AuthState } from '../../../store/auth/types';
import { AllAgendaState } from '../../../store/agenda/set/types';
import { setReload } from '../../../store/agenda/set/action';
import { CreateVoteForm } from '../../../store/agenda/put/types';

/** action */
import { NoticeState, SnackBarTypeVariation } from '../../../store/notice/types';
import { setNotice } from '../../../store/notice/action';

export enum ResultedCodeVariation {
    success = '200',
    error = '500'
}

export const useVoteCreate = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [resulted, setResulted] = useState({
        code: '',
        msg: '',
        value: ''
    });

    const auth = useSelector((state: AuthState) => state.auth);
    const notice = useSelector((state: NoticeState) => state.notice);
    const reloadCount = useSelector((state: AllAgendaState) => state.agenda.reloadCount);

    const putVoteCreate = useCallback(async (agendaId: string, choiceList: string[], formValues: CreateVoteForm) => {
        setLoading(true);
        if (auth.uid === null || auth.displayName === null || auth.photoURL === null) {
            setLoading(false);
            setResulted({ code: ResultedCodeVariation.error, msg: 'サインインしてください', value: '' });
            dispatch(setNotice({
                target: `/agenda/${agendaId}`,
                count: notice.count + 1,
                type: SnackBarTypeVariation.error,
                message: 'サインインしてください',
                vertical: 'top',
                horizontal: 'center'
            }));
            return;
        }
        try {
            const choiceIndex = ['choice1Count', 'choice2Count', 'choice3Count', 'choice4Count'];
            let createVote = firebase.functions().httpsCallable('createVote');
            const result = await createVote({
                agendaId: agendaId,
                choice: formValues.choice.value,
                reason: formValues.reason.value,
                selectedChoiceIndex: choiceIndex[choiceList.indexOf(formValues.choice.value)],
                displayName: auth.displayName,
                photoURL: auth.photoURL
            });
            if (result.data.code === ResultedCodeVariation.error) {
                throw new Error(ResultedCodeVariation.error);
            }
            setResulted({ code: ResultedCodeVariation.success, msg: '投票に成功しました', value: result.data.value });
            setLoading(false);
            dispatch(setNotice({
                target: `/agenda/${agendaId}`,
                count: notice.count + 1,
                type: SnackBarTypeVariation.success,
                message: '投票に成功しました',
                vertical: 'top',
                horizontal: 'center'
            }));
            dispatch(setReload(reloadCount + 1));
        } catch (error) {
            setResulted({ code: ResultedCodeVariation.error, msg: '投票に失敗しました。時間をおいて再実施してください', value: '' });
            setLoading(false);
            dispatch(setNotice({
                target: `/agenda/${agendaId}`,
                count: notice.count + 1,
                type: SnackBarTypeVariation.error,
                message: '投票に失敗しました。時間をおいて再実施してください',
                vertical: 'top',
                horizontal: 'center'
            }));
        }
    }, [loading, resulted]);

    return [putVoteCreate, loading, resulted];
};