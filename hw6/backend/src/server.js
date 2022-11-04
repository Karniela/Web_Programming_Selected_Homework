import express from 'express';
import cors from 'cors';
import db from './db.js';
import route from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

const app = express();

//init middleware
app.use(cors())
app.use(express.json())
app.use('/', route)
app.get('/', (_, res) => {
  res.send('Hello, World!');
});

const port = process.env.PORT || 4000;
app.listen(port, function(err) {
  if(err) console.log("Error in server setup")
  else console.log(`Example app listening on port ${port}!`);
});

//connect to db
await db.connect();
