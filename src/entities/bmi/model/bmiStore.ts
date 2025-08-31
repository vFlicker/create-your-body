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

const BMR_LEAN_MASS_PERCENTAGES = {
  // ИМТ ≥35: высокий избыточный вес
  highBMI: {
    male: { min: 0.6, max: 0.65 }, // 60-65% сухой массы для мужчин
    female: { min: 0.55, max: 0.6 }, // 55-60% сухой массы для женщин
  },
  // ИМТ 30-35: умеренный избыточный вес
  moderateBMI: {
    male: { min: 0.7, max: 0.75 }, // 70-75% сухой массы для мужчин
    female: { min: 0.65, max: 0.7 }, // 65-70% сухой массы для женщин
  },
  // ИМТ 25-30: небольшой избыточный вес
  mildBMI: {
    male: { min: 0.8, max: 0.85 }, // 80-85% сухой массы для мужчин
    female: { min: 0.75, max: 0.8 }, // 75-80% сухой массы для женщин
  },
};

const activityCoefficients = [1.2, 1.375, 1.46, 1.55, 1.64, 1.72, 1.9];

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
