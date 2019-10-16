/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/firestore';

/** action */
import { Agenda, AllAgendaState } from '../../../../store/agenda/set/types';
import { setAgendaList } from '../../../../store/agenda/set/action';

export const useAgendaListNew = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const agendaList = useSelector((state: AllAgendaState) => state.agenda.agendaList);
    const dispatch = useDispatch();

    const getAgendaListNew = useCallback(async () => {
        setLoading(true);
        try {
            let agendaNewList: Agenda[] = [];
            let db = firebase.firestore();
            await db.collection('agenda').where('delFlg', '==', false).orderBy('createdAt', 'desc').limit(10000).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const tmpAgenda: Agenda = {
                        id: doc.data().id,
                        subject: doc.data().subject,
                        Postscript1: '',
                        Postscript2: '',
                        Postscript3: '',
                        overview: '',
                        choice1: '',
                        choice1Count: 0,
                        choice2: '',
                        choice2Count: 0,
                        choice3: '',
                        choice3Count: 0,
                        choice4: '',
                        choice4Count: 0,
                        closeDate: '',
                        favoriteCount: 0,
                        createUserId: '',
                        createUserName: '',
                        createUserPhotoURL: '',
                        createdAt: new Date(),
                        updateAt: new Date(),
                        delFlg: false
                    };
                    agendaNewList.push(tmpAgenda);
                });
            });
            dispatch(setAgendaList(agendaNewList));
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            setLoading(false);
        }
    }, [agendaList, loading, error]);

    return [agendaList, getAgendaListNew, loading, error];
};