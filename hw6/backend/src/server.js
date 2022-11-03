import express from 'express';
import cors from 'cors';
import db from './db.js';
import router from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';


const app = express();

//init middleware
app.use(cors())
app.use(express.json())
app.use('/', router)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//connect to db
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('mongo db connection created'));


const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);




