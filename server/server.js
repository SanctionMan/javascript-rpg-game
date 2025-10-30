import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { addPlayer, movePlayer, removePlayer, getAllPlayers } from './controllers/players.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] }
});

app.use(cors());

// ☀️🌙 Day/night cycle configuration
// Server controls game time to ensure all clients stay synchronized
const DAY_CYCLE_DURATION = 600000; // 10 minutes per full day/night cycle (in ms)
let gameTime = 0; // 0 to 1 (0 = midnight, 0.25 = sunrise, 0.5 = noon, 0.75 = sunset, 1 = midnight)

// Update game time every second and broadcast to all clients
setInterval(() => {
  gameTime += 1000 / DAY_CYCLE_DURATION; // increment based on real time
  if (gameTime >= 1) gameTime = 0; // wrap around after full cycle
  
  io.emit('timeUpdate', gameTime); // broadcast current time to all clients
}, 1000);

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  // Send current game time immediately on connect
  socket.emit('timeUpdate', gameTime);

  socket.on('setName', (name) => {
    const player = addPlayer(socket.id, name);

    // Send all current players to new client
    socket.emit('currentPlayers', getAllPlayers());

    // Notify others about the new player
    socket.broadcast.emit('playerJoined', player);
  });

  socket.on('move', (pos) => {
    movePlayer(socket.id, pos);
    socket.broadcast.emit('playerMoved', { id: socket.id, ...pos });
  });

  socket.on('disconnect', () => {
    removePlayer(socket.id);
    io.emit('playerLeft', socket.id);
    console.log('Player disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));