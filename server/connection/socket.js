import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import config from '../config.js';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.use((socket, next) => {
      const { token } = socket.handshake.auth;
      if (!token) {
        return next(new Error('Not Found Token'));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Raised Error decoding token'));
        }
        next();
      });
    });

    this.io.on('connection', (socket) => {
      console.log(`Connected Socket client`);
    });
  }
}

let socket;

export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO() {
  if (!socket) {
    throw new Error('please call init first');
  }
  return socket.io;
}
