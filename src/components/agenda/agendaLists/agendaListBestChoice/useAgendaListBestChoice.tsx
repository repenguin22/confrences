/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/firestore';

/** action */
import { AllAgendaState } from '../../../../store/agenda/set/types';
import { setAgendaList } from '../../../../store/agenda/set/action';
import { setNotice } from '../../../../store/notice/action';
import { SnackBarTypeVariation } from '../../../../store/notice/types';

export enum ResultedCodeVariation {
    success = '200',
    error = '500'
}

export const useAgendaListBestChoice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const agendaList = useSelector((state: AllAgendaState) => state.agenda.agendaList);
    const dispatch = useDispatch();

    const getAgendaListBestChoice = useCallback(async () => {
        setLoading(true);
        try {
            let populerAgenda = firebase.functions().httpsCallable('populerAgenda');
            const result = await populerAgenda();
            if (result.data.code === ResultedCodeVariation.error) {
                throw new Error(ResultedCodeVariation.error);
            }
            dispatch(setAgendaList(result.data.value));
            setLoading(false);
        } catch (error) {
            setError('エラーが発生しました');
            dispatch(setAgendaList([]));
            dispatch(setNotice({
                target: '/search',
                count: 1,
                type: SnackBarTypeVariation.error,
                message: 'エラーが発生しました',
                vertical: 'top',
                horizontal: 'center',
                displayTime: 2000
            }));
            setLoading(false);
        }
    }, [agendaList, loading, error]);

    return [agendaList, getAgendaListBestChoice, loading, error];
};