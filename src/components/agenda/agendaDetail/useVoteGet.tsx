/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';

/** action */
import { Vote, AllAgendaState } from '../../../store/agenda/set/types';
import { setAgendaDetailVoteList } from '../../../store/agenda/set/action';

export enum ResultedCodeVariation {
    not_found = '404',
    internal_server_error = '500'
}

export const useVoteGet = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const voteList = useSelector((state: AllAgendaState) => state.agenda.voteList);

    const dispatch = useDispatch();

    const getVoteList = useCallback(async (agendaId: string) => {
        setLoading(true);
        try {
            let db = firebase.firestore();
            let resVoteList: Vote[] = [];
            let resVoteCreateUserRefAry: any = [];
            const voteRef = db.collection('agenda').doc(agendaId).collection('vote');
            await voteRef.where('delFlg', '==', false).orderBy('createdAt', 'desc').limit(10000).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    resVoteCreateUserRefAry.push(doc.data().createUser);
                    const tmpVoteObj: Vote = {
                        id: doc.data().id,
                        choice: doc.data().choice,
                        reason: doc.data().reason,
                        goodCount: doc.data().goodCount,
                        createUserId: doc.data().createUserId,
                        createUserName: doc.data().createUserName,
                        createUserPhotoURL: doc.data().createUserPhotoURL,
                        createdAt: doc.data().createdAt.seconds,
                        delFlg: doc.data().delFlg
                    };
                    resVoteList.push(tmpVoteObj);
                });
            });
            dispatch(setAgendaDetailVoteList(resVoteList));
            setLoading(false);
        } catch (error) {
            setError('データの取得に失敗しました');
            setLoading(false);
        }
    }, [voteList, loading, error]);

    return [voteList, getVoteList, loading, error];
};