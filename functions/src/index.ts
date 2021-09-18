import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const { default: next } = require('next');
const cors = require('cors');
const express = require('express');
const { fetchUsers } = require('./firestore');

export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection('users')
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});

// Declare HTTP Request Function for Next.js App
const app = next({ dev: false, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();
exports.nextApp = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});

// APIのレスポンス用関数
const sendResponse = (response: any, statusCode: any, body: any) => {
  response.send({
    statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
  });
};

// Declare HTTP Function for API request
const server = express();
server.use(cors({ origin: true }));
// getリクエストを作成。fetchUsers関数の実行結果をレスポンスのbodyとして返す
server.get('/v1/users', async (req: any, res: any) => sendResponse(res, 200, await fetchUsers()));

exports.api = functions.https.onRequest(server);