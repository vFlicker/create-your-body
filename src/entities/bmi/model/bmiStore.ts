import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type BmiStore = {
  form: {
    height?: number;
    weight?: number;
    hasExtraWeight: boolean;
    activityCoefficient?: number;
  };

  setForm: (form: BmiStore['form']) => void;
};

export const useBmiStore = create<BmiStore>()(
  immer((set) => ({
    form: {
      height: undefined,
      weight: undefined,
      hasExtraWeight: false,
      activityCoefficient: undefined,
    },
    setForm: (form) =>
      set((state) => {
        state.form = form;
      }),
  })),
);
