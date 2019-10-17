import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { BigQuery } from '@google-cloud/bigquery';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://confrence-1568633251505.firebaseio.com'
});

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

interface Agenda {
    id: string;
    subject: string;
    Postscript1: string;
    Postscript2: string;
    Postscript3: string;
    overview: string;
    choice1: string;
    choice1Count: number;
    choice2: string;
    choice2Count: number;
    choice3: string;
    choice3Count: number;
    choice4: string;
    choice4Count: number;
    openDate: Date;
    closeDate: Date;
    favoriteCount: number;
    createUserId: string;
    createUserName: string;
    createUserPhotoURL: string;
    createdAt: Date;
    updateAt: Date;
    delFlg: boolean;
}

exports.createAgenda = functions.https.onCall(async (data: any, context: any) => {
    const agenda: Agenda = {
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

    let generateId = getRandomId('');

    try {
        // 認証済みユーザーかどうかチェックする
        if (!context.auth || !context.auth.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated.');
        }
        // 一括書き込みを実施する
        console.log(data);
        let batch = admin.firestore().batch();

        let agendaRef = admin.firestore().collection('agenda').doc(generateId);

        agenda.id = generateId;
        // valid newline
        let subject = data.subject.replace(/\r?\n/g, '\n');
        // valid url
        subject = subject.replace('http', '');
        agenda.subject = subject;
        agenda.Postscript1 = '';
        agenda.Postscript2 = '';
        agenda.Postscript3 = '';
        // valid newline
        let overview = data.overview.replace(/\r?\n/g, '\n');
        // valid url
        overview = overview.replace('http', '');
        agenda.overview = overview;
        agenda.choice1 = data.choice1;
        agenda.choice2 = data.choice2;
        agenda.choice3 = data.choice3;
        agenda.choice4 = data.choice4;
        agenda.openDate = admin.firestore.Timestamp.fromDate(new Date('2000')).toDate();
        agenda.closeDate = admin.firestore.Timestamp.fromDate(new Date('9999')).toDate();
        agenda.favoriteCount = 0;
        agenda.createUserId = context.auth.uid;
        agenda.createUserName = data.displayName;
        agenda.createUserPhotoURL = data.photoURL;
        agenda.createdAt = admin.firestore.Timestamp.now().toDate();
        agenda.updateAt = admin.firestore.Timestamp.now().toDate();
        agenda.delFlg = false;

        batch.set(agendaRef, agenda);
        let countShardsBaseRef = admin.firestore().collection('agenda').doc(generateId);
        for (let i = 0; i < 10; i++) {
            let countShardsRef = countShardsBaseRef.collection('countShards').doc(i.toString());
            batch.set(countShardsRef, {
                choice1Count: 0,
                choice2Count: 0,
                choice3Count: 0,
                choice4Count: 0
            });
        }
        await batch.commit();
        console.log('firestore_commit');
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
        if (agenda.id === '') {
            throw new Error('firestore stored fail exception');
        }
        const bigqueryClient = new BigQuery();
        await bigqueryClient.dataset('search').table('agenda').insert(agenda);
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

interface Vote {
    id: string;
    choice: string;
    reason: string;
    goodCount: number;
    createUserId: string;
    createUserName: string;
    createUserPhotoURL: string;
    createdAt: Date;
    updateAt: Date;
    delFlg: boolean
}

exports.createVote = functions.https.onCall(async (data, context) => {
    const agendaId = data.agendaId;
    let generateId = getRandomId(agendaId);

    const vote: Vote = {
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
