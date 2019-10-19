import * as functions from 'firebase-functions';
import { BigQuery } from '@google-cloud/bigquery';
import { Agenda } from '../model/Agenda';

interface SearchParams {
    word: string;
}

module.exports = functions.https.onCall(async (data, context) => {

    console.log(data);

    const searchParams: SearchParams = {
        word: data.searchWord,
    };

    try {
        // bigquery search
        if (!searchParams.word || searchParams.word === '') {
            throw new Error('params undifined exception');
        }
        console.log(searchParams);
        const bigqueryClient = new BigQuery();
        const query = `SELECT 
                            agenda.id,
                            agenda.subject
                        FROM 
                            search.agenda agenda 
                        WHERE 
                            agenda.subject LIKE ('%${searchParams.word}%') AND 
                            agenda.delFlg = false 
                        ORDER BY 
                            agenda.updateAt DESC 
                        LIMIT 10000`;
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
            tmpAgenda.createUserPhotoURL = '';
            tmpAgenda.createdAt = new Date();
            tmpAgenda.updateAt = new Date();
            tmpAgenda.delFlg = false
            agendaList.push(tmpAgenda);
        });
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