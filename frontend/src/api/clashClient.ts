import axios from 'axios';

const API_BASE_URL = "https://clashstats-szy0.onrender.com/api";

export const clashClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});