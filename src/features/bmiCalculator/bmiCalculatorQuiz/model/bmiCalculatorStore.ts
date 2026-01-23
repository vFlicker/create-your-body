import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Goal } from './bmiCalculatorTypes';
import { calculateBmi } from './lib/calculateBmi';

type BmiCalculatorForm = {
  goal: Goal;
  proteinRatio: number;
  fatRatio: number;
  deficitPercent: number;
  height?: number;
  fullWeight?: number;
  hasExtraWeight: boolean;
  activityCoefficient?: number;
};

type BmiCalculatorStore = {
  form: BmiCalculatorForm;
  setForm: (form: BmiCalculatorForm) => void;
  setBodyParameter: (name: 'height' | 'fullWeight', value?: number) => void;
};

const shouldHaveExtraWeight = (
  height?: number,
  weight?: number,
): boolean | null => {
  if (!height || !weight || weight < 10 || height < 100) {
    return null;
  }
  const bmi = calculateBmi({ height, weight });
  return bmi >= 25;
};

export const useBmiCalculatorStore = create<BmiCalculatorStore>()(
  immer((set) => ({
    form: {
      goal: 'maintain',
      proteinRatio: 0.9,
      fatRatio: 0.4,
      deficitPercent: 0,
      height: undefined,
      fullWeight: undefined,
      hasExtraWeight: true,
      activityCoefficient: 1.2,
    },
    setForm: (form) =>
      set((state) => {
        state.form = form;
      }),
    setBodyParameter: (name, value) =>
      set((state) => {
        state.form[name] = value;

        const height = name === 'height' ? value : state.form.height;
        const weight = name === 'fullWeight' ? value : state.form.fullWeight;
        const extraWeight = shouldHaveExtraWeight(height, weight);

        if (extraWeight !== null) {
          state.form.hasExtraWeight = extraWeight;
        }
      }),
  })),
);
