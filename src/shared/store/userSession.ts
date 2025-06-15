import { create } from 'zustand';

type UserSessionStore = {
  query?: string;
  id?: number;
  image?: string;
  setUserSession: (session: {
    query: string;
    id: number;
    image: string;
  }) => void;
};

export const useUserSession = create<UserSessionStore>((set) => ({
  setUserSession: ({ query, id, image }) => {
    set({ query, id, image });
  },
}));
