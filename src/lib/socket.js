import { port } from '../../config/server';
import openSocket from 'socket.io-client';
//const  socket = openSocket('https://localhost:' + port(), {secure: true});
const socket = openSocket('https://pricer.somedomain.com',{secure: true, port:port()});

export function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export function subscribeToUpdates(cb) {
  socket.on('tasks:updated', cb);
  socket.emit('tasks:updated:consumed');
}
