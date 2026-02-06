import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://money-manager-backend-dmuj.onrender.com';
const API = axios.create({ baseURL: API_BASE_URL });

// Add Token to requests
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const signup = (formData) => API.post('/auth/signup', formData);

// Transactions
export const addTransaction = (data) => API.post('/transactions', data);
export const getTransactions = (filters) => API.get('/transactions', { params: filters });
export const editTransaction = (id, data) => API.put(`/transactions/${id}`, data);

// Dashboard & Reports
export const getDashboardData = (period) => API.get('/reports', { params: { period } }); // period: week, month, year
export const getCategorySummary = () => API.get('/reports/categories');

// Accounts
export const getAccounts = () => API.get('/accounts');
export const addAccount = (data) => API.post('/accounts', data);
export const transferAmount = (data) => API.post('/accounts/transfer', data);
