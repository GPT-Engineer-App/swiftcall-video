import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'http://localhost:3000/api';
let socket;

export const initializeSocket = () => {
  socket = io(API_URL);
  
  socket.on('connect', () => {
    console.log('Connected to signaling server');
  });

  return socket;
};

export const startCall = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/calls/start`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.callId;
};

export const joinCall = async (callId) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/calls/join`, { callId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const endCall = async (callId) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/calls/end`, { callId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const sendSignal = (signal) => {
  if (socket) {
    socket.emit('signal', signal);
  }
};

export const onSignal = (callback) => {
  if (socket) {
    socket.on('signal', callback);
  }
};
