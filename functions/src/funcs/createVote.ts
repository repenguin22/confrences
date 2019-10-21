import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { BigQuery } from '@google-cloud/bigquery';
import { Vote } from '../model/Vote';

const getRandomId = (value: string) => {
    var c = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var cl = c.length;
    var r = '';
    for (var i = 0; i < 20; i++) {
        r += c[Math.floor(Math.random() * cl)];
    }
    if (value !== '') {
        r = value + '_';
    }
    r = r + Date.now();
    return r;
};

const getSharedId = (MAXVALUE: number) => {
    return Math.floor(Math.random() * MAXVALUE);
};

module.exports = functions.https.onCall(async (data, context) => {
    const agendaId = data.agendaId;
    let generateId = getRandomId(agendaId);

    const vote: Vote = {
        agendaId: '',
        id: '',
        choice: '',
        reason: '',
        goodCount: 0,
        createUserId: '',
        createUserName: '',
        createUserPhotoURL: '',
        createdAt: new Date(),
        updateAt: new Date(),
        delFlg: false
    };
    try {
        // 認証済みユーザーかどうかチェックする
        if (!context.auth || !context.auth.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated.')
        }
        // 一括書き込みを実施する
        console.info(data);
        let batch = admin.firestore().batch();
        let voteRef = admin.firestore().collection('agenda').doc(agendaId).collection('vote').doc(generateId);
        vote.agendaId = agendaId;
        vote.id = generateId;
        vote.choice = data.choice;
        let resaon = data.reason.replace(/\r?\n/g, '\n');
        resaon = resaon.replace('http', '');
        vote.reason = resaon;
        vote.goodCount = 0;
        vote.createUserId = context.auth.uid;
        vote.createUserName = data.displayName;
        vote.createUserPhotoURL = data.photoURL;
        vote.createdAt = admin.firestore.Timestamp.now().toDate();
        vote.updateAt = admin.firestore.Timestamp.now().toDate();
        vote.delFlg = false;
        // add Data
        batch.set(voteRef, vote);
        const MAXSHAREDID = 10;
        let countShardsRef = admin.firestore().collection('agenda').doc(agendaId).collection('countShards').doc(getSharedId(MAXSHAREDID).toString());
        const selectedChoiceIndex = data.selectedChoiceIndex;
        batch.update(countShardsRef, {
            [selectedChoiceIndex]: admin.firestore.FieldValue.increment(1)
        });
        await batch.commit();
    } catch (error) {
        console.error(error);
        return {
            code: '500',
            value: 'internal server error'
        };
    }
    try {
        // bigquery insert 
        // Create a client
        if (vote.id === '') {
            throw new Error('firestore stored fail exception');
        }
        const bigqueryClient = new BigQuery();
        await bigqueryClient.dataset('search').table('vote').insert(vote);
        console.log('Inserted');
        return {
            code: '200',
            value: generateId
        };
    } catch (err) {
        if (err.name === 'PartialFailureError') {
            //err.errors[].row(original row object passed to `insert`)
            err.errors.forEach((air: any) => {
                air.errors.forEach((air2: any) => {
                    console.error(air2.reason);
                    console.error(air2.message);
                });
            });
        }
        console.error(err);
        return {
            code: '200',
            value: generateId
        };
    }
});