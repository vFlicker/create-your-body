import { create } from 'zustand';

type UserSessionStore = {
  query: string | null;
  id: number | null;
  image: string | null;
  setUserSession: (session: {
    query: string;
    id: number;
    image: string;
  }) => void;
};

export const useUserSession = create<UserSessionStore>((set) => ({
  query: null,
  id: null,
  image: null,
  setUserSession: ({ query, id, image }) => {
    set({ query, id, image });
  },
}));
