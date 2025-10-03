import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useBmi } from '~/entities/bmi';
import { BmiEmptyResultCard, BmiResultCard } from '~/entities/bmi';
import { Modal, useModalStore } from '~/entities/modal';
import { CreatePersonalBmiForm } from '~/features/bmiCalculator/createPersonalBmi';
import { AppRoute } from '~/shared/router';

export function BmiWidget(): JSX.Element {
  const navigate = useNavigate();

  const { bmi, isBmiPending } = useBmi();

  const handleCalculateProgrammaticallyClick = () => {
    navigate(AppRoute.BmiCalculator);
  };

  const { openModal, closeModal } = useModalStore();

  const onUpdateClick = () => {
    openModal(
      <Modal>
        <CreatePersonalBmiForm
          onCalculateProgrammaticallyClick={() => {
            closeModal();
            handleCalculateProgrammaticallyClick();
          }}
          onFormSubmit={closeModal}
        />
      </Modal>,
    );
  };

  if (isBmiPending) return <></>;

  const isEmptyData = !bmi?.userId;
  if (isEmptyData)
    return (
      <BmiEmptyResultCard onClick={handleCalculateProgrammaticallyClick} />
    );

  return (
    <BmiResultCard
      carbs={bmi.carbs}
      fats={bmi.fats}
      proteins={bmi.proteins}
      calories={bmi.calories}
      onClick={onUpdateClick}
    />
  );
}
