import { JSX } from 'react';
import { create } from 'zustand';

type ModalEntry = {
  id: string;
  component: JSX.Element;
  onClose?: () => void | Promise<void>;
};

type ModalOptions = {
  onClose?: () => void | Promise<void>;
};

type ModalState = {
  modals: ModalEntry[];
  canGoBack: boolean;
  openModal: (component: JSX.Element, options?: ModalOptions) => void;
  closeModal: () => Promise<void>;
  closeAll: () => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  modals: [],
  canGoBack: false,

  openModal: (component, options) =>
    set(({ modals }) => {
      const newModals = [
        ...modals,
        {
          id: crypto.randomUUID(),
          component,
          onClose: options?.onClose,
        },
      ];
      return {
        modals: newModals,
        canGoBack: newModals.length > 1,
      };
    }),

  closeModal: async () => {
    const modals = get().modals;
    const lastModal = modals[modals.length - 1];
    if (!lastModal) return;

    try {
      await lastModal.onClose?.();
    } catch (error) {
      console.error('Modal onClose failed:', error);
      return;
    }

    set(({ modals }) => {
      const newModals = modals.slice(0, -1);
      return {
        modals: newModals,
        canGoBack: newModals.length > 1,
      };
    });
  },

  closeAll: () => set({ modals: [], canGoBack: false }),
}));
