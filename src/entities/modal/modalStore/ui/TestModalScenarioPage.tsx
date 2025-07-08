import { JSX } from 'react';

import { useModalStore } from '~/entities/modal/modalStore/model/modalStore';

type EditExerciseModalProps = {
  exerciseId: number;
};

export function TestScenarioPage(): JSX.Element {
  const { openModal } = useModalStore();

  return (
    <div>
      <h1>Сторінка для тренувань</h1>
      <button onClick={() => openModal(<CreateTrainingModal />)}>
        Створення тренування
      </button>
    </div>
  );
}

function CreateTrainingModal(): JSX.Element {
  const { closeModal, openModal } = useModalStore();

  return (
    <div>
      <h2>Створення тренування</h2>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>

      <button onClick={() => openModal(<SelectExercisesModal />)}>
        Додати вправи
      </button>
      <button onClick={() => openModal(<EditExerciseModal exerciseId={1} />)}>
        Редагувати вправу
      </button>
      <button onClick={closeModal}>Зберегти</button>
    </div>
  );
}

function SelectExercisesModal(): JSX.Element {
  const { closeModal } = useModalStore();

  return (
    <div>
      <h2>Вибір вправ</h2>
      <p>Тут буде список вправ...</p>
      <button onClick={closeModal}>Повернутись</button>
    </div>
  );
}

function EditExerciseModal({
  exerciseId,
}: EditExerciseModalProps): JSX.Element {
  const { closeModal } = useModalStore();

  return (
    <div>
      <h2>Редагування вправи</h2>
      <p>id: {exerciseId}</p>
      <button onClick={closeModal}>Повернутись</button>
    </div>
  );
}
