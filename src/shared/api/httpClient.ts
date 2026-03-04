import axios, { AxiosInstance } from 'axios';

import { userSession } from '../libs/userSession';

export const BASE_API_URL = 'https://cybapp.ru';
export const CMS2_API_URL = 'https://admin.cybapp.ru/api';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(newToken: string) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

export const createHttpClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.interceptors.request.use((config) => {
    const currentUserSession = userSession.getCurrentUser();

    if (currentUserSession && config.headers) {
      // JWT first, fallback to initData
      if (currentUserSession.accessToken) {
        config.headers['Authorization'] =
          `Bearer ${currentUserSession.accessToken}`;
      } else if (currentUserSession.userQuery) {
        config.headers['x-telegram-init'] = currentUserSession.userQuery;
      }

      // config.headers['x-dev-mode'] = 'true';
      // config.headers['x-dev-mode-tg-id'] = '476040746';
    }

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

        const refreshToken = userSession.getRefreshToken();

        if (!refreshToken) {
          // No refresh token — try re-auth via initData
          return reAuthViaTelegram(api, originalRequest);
        }

        if (isRefreshing) {
          return new Promise((resolve) => {
            addRefreshSubscriber((newToken: string) => {
              originalRequest.headers['Authorization'] =
                `Bearer ${newToken}`;
              resolve(api(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const { data } = await axios.post(`${baseURL}/v2/api/auth/refresh`, {
            refreshToken,
          });

          const newAccessToken = data.data.accessToken;
          userSession.setTokens(newAccessToken, refreshToken);
          onTokenRefreshed(newAccessToken);

          originalRequest.headers['Authorization'] =
            `Bearer ${newAccessToken}`;
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

    const { data } = await axios.post(`${BASE_API_URL}/v2/api/auth/telegram`, {
      initData,
    });

    const { accessToken, refreshToken } = data.data;
    userSession.setTokens(accessToken, refreshToken);

    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
    return api(originalRequest);
  } catch {
    return Promise.reject(new Error('Re-authentication failed'));
  }
}

export const httpClient = createHttpClient(BASE_API_URL);
