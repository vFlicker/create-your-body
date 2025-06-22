import axios, { AxiosInstance } from 'axios';

import { userSession } from '../libs/userSession';

export const BASE_API_URL = 'https://cybapp.ru';

const createHttpClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_API_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.interceptors.request.use((config) => {
    const currentUserSession = userSession.getCurrentUser();

    if (currentUserSession && config.headers) {
      config.headers['x-telegram-init'] = currentUserSession.userQuery;
    }

    return config;
  });

  return api;
};

export const httpClient = createHttpClient();
