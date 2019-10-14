/** library */
import { useState, useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

/** firebase */
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

/** action */
import { NoticeState, SnackBarTypeVariation } from '../../../store/notice/types';
import { setNotice } from '../../../store/notice/action';

export enum ResultedCodeVariation {
    success = '200',
    error = '500'
}

export const useThumbUp = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [resulted, setResulted] = useState({
        code: '',
        msg: '',
        value: '',
        isGood: true
    });

    const notice = useSelector((state: NoticeState) => state.notice);

    const putVoteGood = useCallback(async (agendaId: string, voteId: string, isGood: boolean) => {
        setLoading(true);
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            setLoading(false);
            setResulted({ code: ResultedCodeVariation.error, msg: 'サインインしてください', value: '', isGood: false });
            dispatch(setNotice({
                target: `/agenda/${agendaId}`,
                count: notice.count + 1,
                type: SnackBarTypeVariation.error,
                message: 'サインインしてください',
                vertical: 'top',
                horizontal: 'center'
            }));
            return;
        }
        try {
            let db = firebase.firestore();
            const userGoodVoteref = db.collection('user').doc(currentUser.uid).collection('good').doc(agendaId);
            if (!isGood) {
                await db.runTransaction(async (transaction) => {
                    const userGoodVoteDoc = await transaction.get(userGoodVoteref);
                    if (!userGoodVoteDoc.exists) {
                        transaction.set(userGoodVoteref, {
                            voteList: [voteId]
                        });
                    } else {
                        const data = userGoodVoteDoc.data();
                        if (data === undefined) {
                            throw new Error(ResultedCodeVariation.error);
                        }
                        const userGoodVoteIdList = data.voteList;
                        if (userGoodVoteIdList.includes(voteId)) {
                            throw new Error(ResultedCodeVariation.error);
                        }
                        await transaction.update(userGoodVoteref, {
                            voteList: firebase.firestore.FieldValue.arrayUnion(voteId)
                        });
                    }
                    const voteRef = db.collection('agenda').doc(agendaId).collection('vote').doc(voteId);
                    await transaction.update(voteRef, {
                        goodCount: firebase.firestore.FieldValue.increment(1)
                    });
                });
                setResulted({ code: ResultedCodeVariation.success, msg: '', value: voteId, isGood: true });
            } else {
                const bacth = db.batch();
                bacth.update(userGoodVoteref, {
                    voteList: firebase.firestore.FieldValue.arrayRemove(voteId)
                });
                const voteRef = db.collection('agenda').doc(agendaId).collection('vote').doc(voteId);
                bacth.update(voteRef, {
                    goodCount: firebase.firestore.FieldValue.increment(-1)
                });
                await bacth.commit();
                setResulted({ code: ResultedCodeVariation.success, msg: '', value: voteId, isGood: false });
            }

            setLoading(false);
        } catch (error) {
            console.error(error);
            if (error.message === ResultedCodeVariation.error) {
                setResulted({ code: ResultedCodeVariation.error, msg: 'すでに押しています', value: '', isGood: false });
                setLoading(false);
                dispatch(setNotice({
                    target: `/agenda/${agendaId}`,
                    count: notice.count + 1,
                    type: SnackBarTypeVariation.error,
                    message: 'すでに押しています',
                    vertical: 'top',
                    horizontal: 'center'
                }));
            } else {
                setResulted({ code: ResultedCodeVariation.error, msg: 'いいねに失敗しました。時間をおいて再実施してください', value: '', isGood: false });
                setLoading(false);
                dispatch(setNotice({
                    target: `/agenda/${agendaId}`,
                    count: notice.count + 1,
                    type: SnackBarTypeVariation.error,
                    message: 'いいねに失敗しました。時間をおいて再実施してください',
                    vertical: 'top',
                    horizontal: 'center'
                }));
            }

        }
    }, [loading, resulted]);

    return [putVoteGood, loading, resulted];
};