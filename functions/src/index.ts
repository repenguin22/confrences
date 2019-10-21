import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://confrence-1568633251505.firebaseio.com'
});

const funcs = {
    // Write function references
    createAgenda: './funcs/createAgenda',
    createVote: './funcs/createVote',
    searchAgenda: './funcs/searchAgenda',
    populerAgenda: './funcs/populerAgenda'
};

const loadFunctions = (funcsObj: any) => {
    console.log('loadFunctions ' + process.env.FUNCTION_NAME);
    for (const name in funcsObj) {
        if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
            exports[name] = require(funcsObj[name]);
        }
    }
};

loadFunctions(funcs);

export const inIndex = functions.https.onRequest((request, response) => {
    console.log('inIndex');
    response.status(200).send('inIndex');
});

console.log('index loaded');