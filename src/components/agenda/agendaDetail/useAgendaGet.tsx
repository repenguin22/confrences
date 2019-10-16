/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';

/** action */
import { Agenda, AllAgendaState } from '../../../store/agenda/set/types';
import { setAgendaDetail } from '../../../store/agenda/set/action';
import { NoticeState, SnackBarTypeVariation } from '../../../store/notice/types';
import { setNotice } from '../../../store/notice/action';

export enum ResultedCodeVariation {
    not_found = '404',
    internal_server_error = '500'
}

export const useAgendaGet = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const agendaDetail = useSelector((state: AllAgendaState) => state.agenda.agendaDetail);
    const notice = useSelector((state: NoticeState) => state.notice);

    const dispatch = useDispatch();

    const getAgendaDetail = useCallback(async (agendaId: string) => {
        setLoading(true);
        try {
            let db = firebase.firestore();
            //Get the whole
            const agendaDoc = await db.collection('agenda').doc(agendaId).get();
            // When there is no data
            if (!agendaDoc.exists) {
                throw new Error(ResultedCodeVariation.not_found);
            }
            // get data()
            const agenda = agendaDoc.data();
            // When there is no data
            if (agenda === undefined) {
                throw new Error(ResultedCodeVariation.not_found);
            }
            const agendaDetail: Agenda = {
                id: '',
                subject: '',
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
                openDate: new Date(),
                closeDate: new Date(),
                favoriteCount: 0,
                createUserId: '',
                createUserName: '',
                createUserPhotoURL: '',
                createdAt: new Date(),
                updateAt: new Date(),
                delFlg: false
            };
            agendaDetail.id = agenda.id;
            agendaDetail.subject = agenda.subject;
            agendaDetail.Postscript1 = agenda.Postscript1;
            agendaDetail.Postscript2 = agenda.Postscript2;
            agendaDetail.Postscript3 = agenda.Postscript3;
            agendaDetail.overview = agenda.overview;
            agendaDetail.choice1 = agenda.choice1;
            agendaDetail.choice2 = agenda.choice2;
            agendaDetail.choice3 = agenda.choice3;
            agendaDetail.choice4 = agenda.choice4;
            agendaDetail.openDate = agenda.openDate;
            agendaDetail.closeDate = agenda.closeDate;
            agendaDetail.favoriteCount = agenda.favoriteCount;
            agendaDetail.createdAt = agenda.createdAt.seconds;
            agendaDetail.updateAt = agenda.updateAt.seconds;
            agendaDetail.delFlg = agenda.delFlg;
            const createUserId = agenda.createUserId;

            // Get creation user data
            const createUserDoc = await db.collection('user').doc(createUserId).get();
            if (!createUserDoc.exists) {
                throw new Error(ResultedCodeVariation.not_found);
            }

            const createUserData = createUserDoc.data();
            if (createUserData === undefined) {
                throw new Error(ResultedCodeVariation.not_found);
            }
            //agendaDetail.uid = createUserData.uid;
            agendaDetail.createUserName = createUserData.displayName;
            agendaDetail.createUserPhotoURL = createUserData.photoURL;

            // Get ChiceCount
            const choiceCountSnapshot = await db.collection('agenda').doc(agendaId).collection('countShards').get();
            if (choiceCountSnapshot.empty) {
                throw new Error(ResultedCodeVariation.not_found);
            }
            choiceCountSnapshot.forEach(doc => {
                agendaDetail.choice1Count += doc.data().choice1Count;
                agendaDetail.choice2Count += doc.data().choice2Count;
                agendaDetail.choice3Count += doc.data().choice3Count;
                agendaDetail.choice4Count += doc.data().choice4Count;
            });
            dispatch(setAgendaDetail(agendaDetail));
            setLoading(false);
        } catch (error) {
            if (error.message === ResultedCodeVariation.not_found) {
                setError('データが存在しません');
                dispatch(setNotice({
                    target: `/agenda/${agendaId}`,
                    count: notice.count + 1,
                    type: SnackBarTypeVariation.error,
                    message: 'データが存在しません',
                    vertical: 'top',
                    horizontal: 'center'
                }));
            } else {
                setError('データの取得に失敗しました');
                dispatch(setNotice({
                    target: `/agenda/${agendaId}`,
                    count: notice.count + 1,
                    type: SnackBarTypeVariation.error,
                    message: 'データの取得に失敗しました',
                    vertical: 'top',
                    horizontal: 'center'
                }));
            }
            setLoading(false);
        }
    }, [agendaDetail, loading, error]);

    return [agendaDetail, getAgendaDetail, loading, error];
};