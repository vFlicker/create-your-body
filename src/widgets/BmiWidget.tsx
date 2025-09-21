import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useBmi } from '~/entities/bmi';
import { BmiEmptyResultCard, BmiResultCard } from '~/entities/bmi';
import { AppRoute } from '~/shared/router';

export function BmiWidget(): JSX.Element {
  const navigate = useNavigate();

  const { bmi, isBmiPending } = useBmi();

  if (isBmiPending) return <></>;

  const onClick = () => {
    navigate(AppRoute.BmiCalculator);
  };

  const isEmptyData = !bmi?.userId;
  if (isEmptyData) return <BmiEmptyResultCard onClick={onClick} />;

  return (
    <BmiResultCard
      carbs={bmi.carbs}
      fats={bmi.fats}
      proteins={bmi.proteins}
      calories={bmi.calories}
      onClick={onClick}
    />
  );
}
