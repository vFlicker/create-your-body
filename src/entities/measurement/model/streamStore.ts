import { create } from 'zustand';

type StreamState = {
  stream?: number;
  setStream: (steam: number) => void;
};

export const useStreamStore = create<StreamState>((set) => ({
  stream: undefined,
  setStream: (stream) => set({ stream }),
}));
