import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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

exports.createAgenda = functions.https.onCall(async (data: any, context: any) => {
    try {
        // 認証済みユーザーかどうかチェックする
        if (!context.auth || !context.auth.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated.');
        }
        // 一括書き込みを実施する
        console.log(data);
        let batch = admin.firestore().batch();
        let generateId = getRandomId('');
        let agendaRef = admin.firestore().collection('agenda').doc(generateId);
        batch.set(agendaRef, {
            id: generateId,
            subject: data.subject.replace(/\r?\n/g, '\n'),
            overview: data.overview.replace(/\r?\n/g, '\n'),
            choice1: data.choice1,
            choice2: data.choice2,
            choice3: data.choice3,
            choice4: data.choice4,
            closeDate: '',
            favoriteCount: 0,
            createUserId: context.auth.uid,
            createUserName: data.displayName,
            createUserPhotoURL: data.photoURL,
            createdAt: admin.firestore.Timestamp.now().toDate(),
            delFlg: false
        });
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
        console.log('commit');
        return {
            code: '200',
            value: generateId
        };
    } catch (error) {
        console.error(error);
        return {
            code: '500',
            value: 'internal server error'
        };
    }
});

exports.createVote = functions.https.onCall(async (data, context) => {
    try {
        // 認証済みユーザーかどうかチェックする
        if (!context.auth || !context.auth.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated.')
        }
        // 一括書き込みを実施する
        console.info(data);
        let batch = admin.firestore().batch();
        const agendaId = data.agendaId;
        let generateId = getRandomId(agendaId);
        let voteRef = admin.firestore().collection('agenda').doc(agendaId).collection('vote').doc(generateId);
        // add Data
        batch.set(voteRef, {
            id: generateId,
            choice: data.choice,
            reason: data.reason.replace(/\r?\n/g, '\n'),
            goodCount: 0,
            createUserId: context.auth.uid,
            createUserName: data.displayName,
            createUserPhotoURL: data.photoURL,
            createdAt: admin.firestore.Timestamp.now().toDate(),
            delFlg: false
        });

        const MAXSHAREDID = 10;
        let countShardsRef = admin.firestore().collection('agenda').doc(agendaId).collection('countShards').doc(getSharedId(MAXSHAREDID).toString());
        const selectedChoiceIndex = data.selectedChoiceIndex;
        batch.update(countShardsRef, {
            [selectedChoiceIndex]: admin.firestore.FieldValue.increment(1)
        });
        await batch.commit();
        return {
            code: '200',
            value: generateId
        };
    } catch (error) {
        console.error(error);
        return {
            code: '500',
            value: 'internal server error'
        };
    }
});
