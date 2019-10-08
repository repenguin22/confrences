/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/firestore';

/** action */
import { Agenda, AllAgendaState } from '../../../../store/agenda/types';
import { setAgendaList } from '../../../../store/agenda/action';

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
            await db.collection('theme').where('delFlg', '==', false).orderBy('createdAt', 'desc').limit(100).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const tmpAgenda: Agenda = {
                        id: doc.data().id,
                        subject: doc.data().subject,
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
                        createdAt: '',
                        delFlg: false
                    };
                    agendaNewList.push(tmpAgenda);
                });
            });
            console.log(agendaNewList);
            dispatch(setAgendaList(agendaNewList));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }, [loading, error, agendaList]);

    return [agendaList, getAgendaListNew, loading, error];
};