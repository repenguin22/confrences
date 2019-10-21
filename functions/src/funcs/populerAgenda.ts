import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { BigQuery } from '@google-cloud/bigquery';
import { Agenda } from '../model/Agenda';

module.exports = functions.https.onCall(async (data, context) => {
    try {
        // bigquery search
        const bigqueryClient = new BigQuery();
        const query = `SELECT
                            agenda.id,
                            agenda.subject,
                            agenda.createUserPhotoURL,
                            agenda.updateAt,
                            COUNT(vote.id) as voteCount
                        FROM
                            search.agenda agenda
                            INNER JOIN
                            search.vote vote
                        ON
                            agenda.id = vote.agendaId
                        WHERE
                            agenda.delFlg = FALSE AND
                            vote.delFlg = false AND
                            vote.createdAt >= (SELECT TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 15 HOUR)) AND
                            vote.createdAt <= (SELECT TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 33 HOUR))
                        GROUP BY
                            agenda.id,
                            agenda.subject,
                            agenda.createUserPhotoURL,
                            agenda.updateAt
                        ORDER BY
                            voteCount DESC,
                            agenda.updateAt DESC
                        LIMIT 50`;
        const options = {
            query: query,
            location: 'asia-northeast1',
        };
        console.log(`SelectedQuery: ${query}`);
        const [job] = await bigqueryClient.createQueryJob(options);
        console.log(`Job ${job.id} started.`);
        // Wait for the query to finish
        const [rows] = await job.getQueryResults();
        const agendaList: Agenda[] = [];
        rows.forEach(row => {
            const tmpAgenda: Agenda = {
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
            tmpAgenda.id = row.id;
            tmpAgenda.subject = row.subject;
            tmpAgenda.Postscript1 = '';
            tmpAgenda.Postscript2 = '';
            tmpAgenda.Postscript3 = '';
            tmpAgenda.overview = '';
            tmpAgenda.choice1 = '';
            tmpAgenda.choice1Count = 0;
            tmpAgenda.choice2 = '';
            tmpAgenda.choice2Count = 0;
            tmpAgenda.choice3 = '';
            tmpAgenda.choice3Count = 0;
            tmpAgenda.choice4 = '';
            tmpAgenda.choice4Count = 0;
            tmpAgenda.openDate = new Date();
            tmpAgenda.closeDate = new Date();
            tmpAgenda.favoriteCount = 0;
            tmpAgenda.createUserId = '';
            tmpAgenda.createUserName = '';
            tmpAgenda.createUserPhotoURL = row.createUserPhotoURL;
            tmpAgenda.createdAt = new Date();
            tmpAgenda.updateAt = new Date();
            tmpAgenda.delFlg = false;
            agendaList.push(tmpAgenda);
        });
        let idList = agendaList.map(agenda => {
            return agenda.id;
        });
        if (agendaList.length < 50) {
            const lackNum = 50 - agendaList.length;
            let db = admin.firestore();
            const querySnapshot = await db.collection('agenda').where('delFlg', '==', false).orderBy('createdAt', 'desc').limit(lackNum).get();
            querySnapshot.forEach(doc => {
                const tmpAgendaId = doc.data().id;
                const tmpAgenda: Agenda = {
                    id: tmpAgendaId,
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
                    openDate: new Date(),
                    closeDate: new Date(),
                    favoriteCount: 0,
                    createUserId: '',
                    createUserName: '',
                    createUserPhotoURL: doc.data().createUserPhotoURL,
                    createdAt: new Date(),
                    updateAt: new Date(),
                    delFlg: false
                };
                if (!idList.includes(tmpAgendaId)) {
                    agendaList.push(tmpAgenda);
                }
            });
        }
        return {
            code: '200',
            value: agendaList
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
            code: '500',
            value: []
        };
    }
});