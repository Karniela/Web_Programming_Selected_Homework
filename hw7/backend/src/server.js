import mongo from './mongo.js';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import wsConnect from './wsConnect.js';
import {WebSocketServer} from 'ws';

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });
const db = mongoose.connection;

db.once('open', () => {
    wss.on('connection', (ws) => {
        ws.box = '';
        ws.onmessage = (evt) => wsConnect.onMessage(evt, ws, wss);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});