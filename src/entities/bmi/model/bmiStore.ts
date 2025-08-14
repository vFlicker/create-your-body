import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Goal } from '../bmiTypes';

type BmiStore = {
  form: {
    height?: number;
    weight?: number;
    hasExtraWeight: boolean;
    activityCoefficient?: number;
    goal: Goal;
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
      goal: 'weight loss',
    },
    setForm: (form) =>
      set((state) => {
        state.form = form;
      }),
  })),
);
