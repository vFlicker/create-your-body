import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Goal } from './bmiCalculatorTypes';

type BmiCalculatorStore = {
  form: {
    goal: Goal;
    proteinRatio: number;
    fatRatio: number;
    deficitPercent: number;
    height?: number;
    fullWeight?: number;
    hasExtraWeight: boolean;
    activityCoefficient?: number;
  };

  setForm: (form: BmiCalculatorStore['form']) => void;
};

export const useBmiCalculatorStore = create<BmiCalculatorStore>()(
  immer((set) => ({
    form: {
      goal: 'maintain',
      proteinRatio: 0,
      fatRatio: 0,
      deficitPercent: 0,
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
