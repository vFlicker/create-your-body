import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type StreamState = {
  selectedStream: number | null;
  setSelectedStream: (stream: number | null) => void;
};

export const useStreamStore = create<StreamState>()(
  persist(
    (set) => ({
      selectedStream: null,
      setSelectedStream: (newStream) => set({ selectedStream: newStream }),
    }),
    {
      name: 'user-stream-selection',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedStream: state.selectedStream }),
    },
  ),
);
