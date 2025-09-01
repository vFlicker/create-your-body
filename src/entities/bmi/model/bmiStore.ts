import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Goal } from '../bmiTypes';

type BmiStore = {
  form: {
    proteinRatio: number;
    goal: Goal;
    height?: number;
    fullWeight?: number;
    hasExtraWeight: boolean;
    activityCoefficient?: number;
  };

  setForm: (form: BmiStore['form']) => void;
};

export const useBmiStore = create<BmiStore>()(
  immer((set) => ({
    form: {
      goal: 'maintain',
      proteinRatio: 0.5,
      height: undefined,
      fullWeight: undefined,
      hasExtraWeight: true,
      activityCoefficient: undefined,
    },
    setForm: (form) =>
      set((state) => {
        state.form = form;
      }),
  })),
);
