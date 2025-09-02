import { useMemo } from 'react';

import { calculateAge, useUser } from '~/entities/user';

import { useBmiCalculatorStore } from './bmiCalculatorStore';
import { calculateBmi } from './lib/calculateBmi';
import { calculateBmr } from './lib/calculateBmr';
import { calculateLeanBodyMass } from './lib/calculateLeanBodyMass';

export const useBaseBmiCalculations = () => {
  const { form } = useBmiCalculatorStore();
  const { user, isUserPending } = useUser();

  const baseCalculatedData = useMemo(() => {
    if (!user || !form.height || !form.fullWeight) {
      return null;
    }

    const age = calculateAge(user.bornDate);
    const bmi = calculateBmi({ height: form.height, weight: form.fullWeight });

    const { leanBodyMass } = calculateLeanBodyMass({
      bmi,
      gender: user.sex,
      age,
      weight: form.fullWeight,
    });

    const bmr = calculateBmr({
      bmi,
      gender: user.sex,
      age,
      height: form.height,
      weight: form.fullWeight,
      leanBodyMass,
    });

    return {
      age,
      gender: user.sex,
      bmi,
      bmr,
    };
  }, [user, form.height, form.fullWeight]);

  return {
    baseCalculatedData,
    isLoading: isUserPending || !baseCalculatedData,
  };
};
