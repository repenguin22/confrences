/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/auth';

/** action */
import { AgendaDetailFavo, AllAgendaState } from '../../../store/agenda/set/types';
import { setAgendaDetailFavo } from '../../../store/agenda/set/action';
import { NoticeState, SnackBarTypeVariation } from '../../../store/notice/types';
import { AuthState } from '../../../store/auth/types';
import { setNotice } from '../../../store/notice/action';

export enum ResultedCodeVariation {
    not_found = '404',
    internal_server_error = '500'
}

export const useAgendaDetailFavo = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loginedUser = useSelector((state: AuthState) => state.auth);
    const agendaDetailFavo = useSelector((state: AllAgendaState) => state.agenda.favo);
    const notice = useSelector((state: NoticeState) => state.notice);

    const dispatch = useDispatch();

    const getAgendaDetailFavo = useCallback(async (agendaId: string) => {
        setLoading(true);
        try {
            let db = firebase.firestore();
            if (loginedUser.uid !== null) {
                // get favo
                let agendaDetailFavo: AgendaDetailFavo = {
                    agenda: false,
                    voteList: []
                };
                const favoRef = db.collection('user').doc(loginedUser.uid).collection('good').doc(agendaId);
                const favoGet = await favoRef.get();
                if (favoGet.exists) {
                    const favoData = favoGet.data();
                    if (favoData !== undefined) {
                        agendaDetailFavo.agenda = favoData.agenda;
                        agendaDetailFavo.voteList = favoData.voteList;
                    }
                }
                dispatch(setAgendaDetailFavo(agendaDetailFavo));
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('データの取得に失敗しました');
            dispatch(setNotice({
                target: `/agenda/${agendaId}`,
                count: notice.count + 1,
                type: SnackBarTypeVariation.error,
                message: 'データの取得に失敗しました',
                vertical: 'top',
                horizontal: 'center'
            }));
            setLoading(false);
        }
    }, [agendaDetailFavo, loading, error]);

    return [agendaDetailFavo, getAgendaDetailFavo, loading, error];
};