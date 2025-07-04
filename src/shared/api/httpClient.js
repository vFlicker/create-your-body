import axios from 'axios';

export const BASE_API_URL = 'https://cybapp.ru';

const createHttpClient = () => {
  const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return api;
};

export const httpClient = createHttpClient();
