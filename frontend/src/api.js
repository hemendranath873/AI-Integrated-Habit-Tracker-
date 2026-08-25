import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const instance = axios.create({ baseURL: API_BASE });

export function setAuthToken(token) {
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete instance.defaults.headers.common['Authorization'];
}

export const register = (data) => instance.post('/auth/register/', data);
export const token = (data) => instance.post('/auth/token/', data);
export const me = () => instance.get('/auth/me/');
export const listHabits = () => instance.get('/habits/');
export const createHabit = (data) => instance.post('/habits/', data);
export const updateHabit = (id, data) => instance.put(`/habits/${id}/`, data);
export const deleteHabit = (id) => instance.delete(`/habits/${id}/`);
export const markHabit = (id, data) => instance.post(`/habits/${id}/mark/`, data);
export const suggestHabits = (data) => instance.post('/ai/suggest/', data);
export const summarizeProgress = (data) => instance.post('/ai/summarize/', data);
