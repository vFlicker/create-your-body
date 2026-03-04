type UserSession = {
  userQuery: string;
};

const USER_SESSION_KEY_NAME = 'cyb:userSession';

export const userSession = {
  getCurrentUser: (): UserSession | null => {
    const userSessionRawData = localStorage.getItem(USER_SESSION_KEY_NAME);
    if (!userSessionRawData) return null;
    return JSON.parse(userSessionRawData) as UserSession;
  },

  setCurrentUser: (user: UserSession): void => {
    localStorage.setItem(USER_SESSION_KEY_NAME, JSON.stringify(user));
  },

  setInitData: (initData: string): void => {
    userSession.setCurrentUser({ userQuery: initData });
  },
};
