// import GraphQL server
import server from './server'

import mongo from './mongo';
mongo.connect();
/*
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import wsConnect from './wsConnect'
import {v4 as uuidv4} from 'uuid';
*/


/*
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection


db.once('open', () => {  
    console.log("MongoDB connected!"); 
    wss.on('connection', (ws) => {
        //wsConnect.initData(ws);
        ws.id = uuidv4(); 
        ws.box = ''; //用來記錄目前 active ChatBox name
        ws.onmessage = wsConnect.onMessage(ws, wss);
    });
});
*/
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
}) 

