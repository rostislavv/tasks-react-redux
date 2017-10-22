import { port } from '../../config/server';
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:' + port());

export function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export function subscribeToUpdates(cb) {
  socket.on('tasks:updated', cb);
  socket.emit('tasks:updated:consumed');
}
