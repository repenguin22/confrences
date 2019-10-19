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

export const useAgendaListSearch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const agendaList = useSelector((state: AllAgendaState) => state.agenda.agendaList);
    const dispatch = useDispatch();

    const getAgendaListSearch = useCallback(async (searchWord: string) => {
        setLoading(true);
        try {
            let searchAgenda = firebase.functions().httpsCallable('searchAgenda');
            const result = await searchAgenda({ searchWord: searchWord });
            if (result.data.code === ResultedCodeVariation.error) {
                throw new Error(ResultedCodeVariation.error);
            }
            if (result.data.value.length === 0) {
                dispatch(setNotice({
                    target: '/search',
                    count: 1,
                    type: SnackBarTypeVariation.error,
                    message: `${searchWord} に一致する情報は見つかりませんでした`,
                    vertical: 'top',
                    horizontal: 'center',
                    displayTime: 2500
                }));
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
                displayTime: 2500
            }));
            setLoading(false);
        }
    }, [agendaList, loading, error]);

    return [agendaList, getAgendaListSearch, loading, error];
};