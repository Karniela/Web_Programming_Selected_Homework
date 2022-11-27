import http from 'http';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import wsconnect from './wsConnect';
import express from 'express';
import mongo from './mongo'

mongo.connect();

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection

db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        wsconnect.initData(ws);
        wsconnect.onMessage(ws); 
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { 
    console.log(`Listening on http://localhost:${PORT}`);
 });