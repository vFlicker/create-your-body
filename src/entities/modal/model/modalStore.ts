import { JSX } from 'react';
import { create } from 'zustand';

type ModalEntry = {
  id: string;
  component: JSX.Element;
};

type ModalState = {
  modals: ModalEntry[];
  canGoBack: boolean;
  openModal: (component: JSX.Element) => void;
  closeModal: () => void;
  closeAll: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  canGoBack: false,

  openModal: (component) =>
    set(({ modals }) => {
      const newModals = [...modals, { id: crypto.randomUUID(), component }];
      return {
        modals: newModals,
        canGoBack: newModals.length > 1,
      };
    }),

  closeModal: () =>
    set(({ modals }) => {
      const newModals = modals.slice(0, -1);
      return {
        modals: newModals,
        canGoBack: newModals.length > 1,
      };
    }),

  closeAll: () => set({ modals: [], canGoBack: false }),
}));
