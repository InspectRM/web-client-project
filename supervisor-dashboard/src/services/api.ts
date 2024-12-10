// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://673b92c296b8dcd5f3f6d10a.mockapi.io/api/v1'; // Replace with your MockAPI base URL

export const fetchUsers = () => axios.get(`${API_BASE_URL}/users`);
export const fetchSales = () => axios.get(`${API_BASE_URL}/sales`);
export const fetchKPIs = () => axios.get(`${API_BASE_URL}/kpis`);
export const fetchNotifications = () => axios.get(`${API_BASE_URL}/notifications`);
export const fetchProducts = () => axios.get(`${API_BASE_URL}/products`);
