type UserSession = {
  userQuery: string;
  accessToken?: string;
  refreshToken?: string;
};

const USER_SESSION_KEY_NAME = 'cyb:userSession';

export const userSession = {
  getCurrentUser: (): UserSession | null => {
    const userSessionRawData = localStorage.getItem(USER_SESSION_KEY_NAME);
    if (!userSessionRawData) return null;
    const userSessionData = JSON.parse(userSessionRawData);
    return userSessionData as UserSession;
  },

  setCurrentUser: (user: UserSession): void => {
    const userSessionRawData = JSON.stringify(user);
    localStorage.setItem(USER_SESSION_KEY_NAME, userSessionRawData);
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    const current = userSession.getCurrentUser();
    if (current) {
      userSession.setCurrentUser({ ...current, accessToken, refreshToken });
    } else {
      userSession.setCurrentUser({ userQuery: '', accessToken, refreshToken });
    }
  },

  getAccessToken: (): string | undefined => {
    return userSession.getCurrentUser()?.accessToken;
  },

  getRefreshToken: (): string | undefined => {
    return userSession.getCurrentUser()?.refreshToken;
  },

  clearTokens: (): void => {
    const current = userSession.getCurrentUser();
    if (current) {
      const { accessToken, refreshToken, ...rest } = current;
      userSession.setCurrentUser(rest as UserSession);
    }
  },
};
