import { create } from 'zustand';

type UserSessionStore = {
  userQuery?: string;
  tgId?: number;
  userImage?: string;
  setUserSession: (session: {
    userQuery: string;
    tgId: number;
    userImage: string;
  }) => void;
};

export const useUserSession = create<UserSessionStore>((set) => ({
  setUserSession: ({ userQuery, tgId, userImage }) => {
    set({ userQuery, tgId, userImage });
  },
}));
