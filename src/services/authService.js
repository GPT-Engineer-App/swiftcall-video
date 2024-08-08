import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token;
};

export const register = async (email, name, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, name, password });
  return response.data;
};

export const verifyEmail = async (email, otp) => {
  const response = await axios.post(`${API_URL}/verify-email`, { email, otp });
  return response.data;
};

export const isUserEmailFound = async (email) => {
  const response = await axios.post(`${API_URL}/is-user-email-found`, { email });
  return response.data;
};

export const forgetPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forget-password`, { email });
  return response.data;
};

export const resendOtp = async (email) => {
  const response = await axios.post(`${API_URL}/resend-otp`, { email });
  return response.data;
};

export const retrievePassword = async (email, otp, newPassword) => {
  const response = await axios.post(`${API_URL}/retrieve-password`, { email, otp, newPassword });
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
  return response.data;
};

export const changePassword = async (oldPassword, newPassword) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/change-password`, { oldPassword, newPassword }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
