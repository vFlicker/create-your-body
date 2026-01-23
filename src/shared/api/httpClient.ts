import axios, { AxiosInstance } from 'axios';

import { userSession } from '../libs/userSession';

export const BASE_API_URL = 'https://cybapp.ru';
export const CMS2_API_URL = 'https://admin.cybapp.ru/api';

export const createHttpClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.interceptors.request.use((config) => {
    const currentUserSession = userSession.getCurrentUser();

    if (currentUserSession && config.headers) {
      config.headers['x-telegram-init'] = currentUserSession.userQuery;
      // config.headers['x-dev-mode'] = 'true';
      // config.headers['x-dev-mode-tg-id'] = '476040746';
    }

    return config;
  });

  return api;
};

export const httpClient = createHttpClient(BASE_API_URL);
