import { getRandomColor } from '../utils/colors.js';

const players = {};

export function addPlayer(id, name) {
  const color = getRandomColor();
  players[id] = { id, name, x: 0, y: 0.5, z: 0, color };
  return players[id];
}

export function movePlayer(id, pos) {
  if (!players[id]) return;
  players[id].x = pos.x;
  players[id].y = pos.y;
  players[id].z = pos.z;
}

export function removePlayer(id) {
  delete players[id];
}

export function getAllPlayers() {
  return players;
}