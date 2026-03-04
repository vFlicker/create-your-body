import axios, { AxiosInstance } from 'axios';

import { userSession } from '../libs/userSession';

export const BASE_API_URL = 'https://cybapp.ru';
export const CMS2_API_URL = 'https://admin.cybapp.ru/api';

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: () => void) {
  refreshSubscribers.push(cb);
}

export const createHttpClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const currentUserSession = userSession.getCurrentUser();

    // initData as fallback header for legacy endpoints
    if (currentUserSession?.userQuery && config.headers) {
      config.headers['x-telegram-init'] = currentUserSession.userQuery;
    }

    // config.headers['x-dev-mode'] = 'true';
    // config.headers['x-dev-mode-tg-id'] = '476040746';

    return config;
  });

  // Refresh token interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/v2/api/auth/')
      ) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve) => {
            addRefreshSubscriber(() => {
              resolve(api(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          // Cookie flies automatically via withCredentials
          await axios.post(
            `${baseURL}/v2/api/auth/refresh`,
            {},
            { withCredentials: true },
          );

          onRefreshed();
          return api(originalRequest);
        } catch {
          // Refresh failed — try re-auth via initData
          return reAuthViaTelegram(api, originalRequest);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function reAuthViaTelegram(api: AxiosInstance, originalRequest: any) {
  try {
    const initData =
      typeof Telegram !== 'undefined' ? Telegram?.WebApp?.initData : undefined;

    if (!initData) {
      return Promise.reject(new Error('No auth method available'));
    }

    // Server sets httpOnly cookies in response
    await axios.post(
      `${BASE_API_URL}/v2/api/auth/telegram`,
      { initData },
      { withCredentials: true },
    );

    return api(originalRequest);
  } catch {
    return Promise.reject(new Error('Re-authentication failed'));
  }
}

export const httpClient = createHttpClient(BASE_API_URL);
