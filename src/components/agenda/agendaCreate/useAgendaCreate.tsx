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
        value: ''
    });

    const auth = useSelector((state: AuthState) => state.auth);

    const putAgendaCretae = useCallback(async (agenda: CreateAgendaForm) => {
        console.log(auth.uid);
        console.log(auth.displayName);
        console.log(auth.photoURL);
        if (auth.uid === null || auth.displayName === null || auth.photoURL === null) {
            return;
        }
        setLoading(true);
        try {
            let createAgenda = firebase.functions().httpsCallable('createAgenda');
            console.log('createagenda')
            await createAgenda({
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
                setResulted({ code: 200, value: '投稿に成功しました' });
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
            setResulted({ code: 500, value: error.message });
        }
    }, [loading, resulted]);

    return [putAgendaCretae, loading, resulted];
};