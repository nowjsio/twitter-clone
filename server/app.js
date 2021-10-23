import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import tweetsRouter from './router/tweetsRouter.js';
import authRouter from './router/authRouter.js';
import config from './config.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.status(404).send(`[${req.url}] Not Found Url`);
});

app.use((error, req, res, next) => {
  console.error('[!] error found', error);
  res.status(500).send('Sorry server error occurred');
});

const server = app.listen(config.host.port);
const socketIO = new Server(server, {
  cors: {
    origin: '*',
  },
});

socketIO.on('connection', (socket) => {
  console.log('Client is here!');
  socketIO.emit('dwitter', 'Hello🤚');
});
