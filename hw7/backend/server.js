import http from 'http';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import WebSocket, { WebSocketServer } from 'ws';
import wsConnect from './wsConnect.js';
import express from 'express';
import mongo from './mongo.js'



mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        ws.onmessage = wsConnect.onMessage(ws); 
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { 
    console.log(`Listening on http://localhost:${PORT}`);
 });