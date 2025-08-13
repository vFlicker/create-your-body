import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type BmiStore = {
  form: {
    height?: number;
    weight?: number;
    hasExtraWeight: boolean;
  };

  setForm: (form: BmiStore['form']) => void;
};

export const useBmiStore = create<BmiStore>()(
  immer((set) => ({
    form: {
      height: undefined,
      weight: undefined,
      hasExtraWeight: false,
    },
    setForm: (form) =>
      set((state) => {
        state.form = form;
      }),
  })),
);
