import axios from 'axios';

const API_URL = 'http://localhost:3000/api/calls';

export const startCall = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/start`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.callId;
};

export const endCall = async (callId) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/end`, { callId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
