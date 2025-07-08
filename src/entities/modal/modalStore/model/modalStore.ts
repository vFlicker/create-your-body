import { JSX } from 'react';
import { create } from 'zustand';

type ModalEntry = {
  id: string;
  component: JSX.Element;
};

type ModalState = {
  modals: ModalEntry[];
  openModal: (component: JSX.Element) => void;
  closeModal: () => void;
  closeAll: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modals: [],

  openModal: (component) =>
    set(({ modals }) => ({
      modals: [...modals, { id: crypto.randomUUID(), component }],
    })),

  closeModal: () =>
    set(({ modals }) => ({
      modals: modals.slice(0, -1),
    })),

  closeAll: () => set({ modals: [] }),
}));
