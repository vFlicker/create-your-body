type UserSession = {
  userQuery: string;
  tgId: number;
  userImage?: string;
};

const USER_SESSION_KEY_NAME = 'create-user-body';

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
};
