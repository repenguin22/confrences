/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

/** model */
import { NoticeState, SnackBarTypeVariation } from '../../../store/notice/types';
import { setNotice } from '../../../store/notice/action';
import { CreateAgendaForm } from '../../../store/agenda/put/types';


export enum ResultedCodeVariation {
    success = '200',
    error = '500'
}

export const useAgendaCreate = () => {
    const [loading, setLoading] = useState(false);
    const [resulted, setResulted] = useState({
        code: '',
        msg: '',
        value: ''
    });

    const dispatch = useDispatch();

    const notice = useSelector((state: NoticeState) => state.notice);

    const putAgendaCretae = useCallback(async (agenda: CreateAgendaForm) => {
        setLoading(true);
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            setResulted({ code: ResultedCodeVariation.error, msg: 'サインインしてください', value: '' });
            setLoading(false);
            dispatch(setNotice({
                target: '/agenda/create',
                count: notice.count + 1,
                type: SnackBarTypeVariation.error,
                message: 'サインインしてください',
                vertical: 'bottom',
                horizontal: 'center'
            }));
            return;
        }
        let choiceList = [agenda.choice1.value, agenda.choice2.value];
        if (agenda.choice3.value !== '') {
            choiceList.push(agenda.choice3.value);
        }
        if (agenda.choice4.value !== '') {
            choiceList.push(agenda.choice4.value);
        }
        choiceList.sort();
        let error = false;
        if (choiceList[0] === choiceList[1]) {
            error = true;
        }
        if (agenda.choice3.value !== '' && choiceList[1] === choiceList[2]) {
            error = true;
        }
        if (agenda.choice4.value !== '' && choiceList[2] === choiceList[3]) {
            error = true;
        }
        if (error) {
            setResulted({ code: ResultedCodeVariation.error, msg: '同じ選択肢が含まれています', value: '' });
            setLoading(false);
            dispatch(setNotice({
                target: '/agenda/create',
                count: notice.count + 1,
                type: SnackBarTypeVariation.error,
                message: '同じ選択肢が含まれています',
                vertical: 'bottom',
                horizontal: 'center'
            }));
            return;
        }
        try {
            let createAgenda = firebase.functions().httpsCallable('createAgenda');
            const result = await createAgenda({
                subject: agenda.subject.value,
                overview: agenda.overview.value,
                choice1: agenda.choice1.value,
                choice2: agenda.choice2.value,
                choice3: agenda.choice3.value,
                choice4: agenda.choice4.value,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            });
            if (result.data.code === ResultedCodeVariation.error) {
                throw new Error(ResultedCodeVariation.error);
            }
            setResulted({ code: ResultedCodeVariation.success, msg: '投稿に成功しました', value: result.data.value });
            dispatch(setNotice({
                target: '/agenda/create',
                count: notice.count + 1,
                type: SnackBarTypeVariation.success,
                message: '投稿に成功しました',
                vertical: 'bottom',
                horizontal: 'center'
            }));
        } catch (error) {
            setResulted({ code: ResultedCodeVariation.error, msg: '投稿に失敗しました。時間をおいて再実施してください', value: '' });
            dispatch(setNotice({
                target: '/agenda/create',
                count: notice.count + 1,
                type: SnackBarTypeVariation.error,
                message: '投稿に失敗しました。時間をおいて再実施してください',
                vertical: 'bottom',
                horizontal: 'center'
            }));
            setLoading(false);
        }
    }, [loading, resulted]);



    return [putAgendaCretae, loading, resulted];
};