/** library */
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/firestore';

/** model */
import { AuthState } from '../../../store/auth/types';
import { CreateAgendaForm } from '../../../store/agenda/put/types';

export const useAgendaCreate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const auth = useSelector((state: AuthState) => state.auth);

    const putAgendaCretae = useCallback(async (agenda: CreateAgendaForm) => {
        if (auth.uid === null || auth.displayName === null || auth.photoURL === null) {
            return;
        }
        setLoading(true);
        try {
            let createTheme = firebase.functions().httpsCallable('createAgenda');
            await createTheme({
                subject: agenda.subject.value,
                overview: agenda.overview.value,
                choice1: agenda.choice1.value,
                choice2: agenda.choice2.value,
                choice3: agenda.choice3.value,
                choice4: agenda.choice4.value,
                createUserName: auth.displayName,
                createUserPhotoURL: auth.photoURL
            }).then(result => {
                // Read result of the Cloud Function.
                console.log(result);
            }).catch(error => {
                // Getting the Error details
                var code = error.code;
                var message = error.message;
                var details = error.details;
                console.error(code);
                console.error(message);
                console.error(details);
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }, [loading, error]);

    return [putAgendaCretae, loading, error];
};