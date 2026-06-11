import axios from 'axios';

// ── Base API client (ready to swap in real backend URL) ──
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── REST Countries API ──
const COUNTRIES_BASE = 'https://restcountries.com/v3.1';

export const fetchCountryByName = async (name) => {
  const res = await axios.get(`${COUNTRIES_BASE}/name/${encodeURIComponent(name)}?fullText=false&fields=name,flags,capital,region,subregion,latlng,population`);
  return res.data[0];
};

export const fetchAllCountries = async () => {
  const res = await axios.get(`${COUNTRIES_BASE}/all?fields=name,flags,region`);
  return res.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
};

export default api;
