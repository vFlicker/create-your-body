import styled from '@emotion/styled';
import { ChangeEvent, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateMeasurements } from '~/entities/measurement';
import { CreateMeasurementsSchema } from '~/entities/measurement/model/createMeasurementsSchema';
import { userSession } from '~/shared/libs/userSession';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { Input } from '~/shared/ui/molecules/Input';
import { UserPageLayout } from '~/widgets/UserPageLayout';

const measurementsInputs = [
  { name: 'chest', label: 'Обхват груди' },
  { name: 'waist', label: 'Обхват талии' },
  { name: 'abdominalCircumference', label: 'Обхват живота' },
  { name: 'hips', label: 'Обхват бедер' },
  { name: 'legs', label: 'Обхват ноги' },
  { name: 'weight', label: 'Вес' },
] as const;

export function RecordPage(): JSX.Element {
  const navigate = useNavigate();

  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    abdominalCircumference: '',
    hips: '',
    legs: '',
    weight: '',
  });

  const currentUserSession = userSession.getCurrentUser();
  const { createMeasurements } = useCreateMeasurements();

  const handleChange = (name: string) => {
    return (evt: ChangeEvent<HTMLInputElement>) => {
      setMeasurements((prev) => ({ ...prev, [name]: evt.target.value }));
    };
  };

  const handleSubmit = async () => {
    try {
      if (!currentUserSession) return;

      const { tgId } = currentUserSession;
      const parsed = CreateMeasurementsSchema.parse(measurements);

      await createMeasurements({
        dto: { tg_id: tgId!, ...parsed },
      });

      navigate(AppRoute.Profile);
    } catch (error) {
      console.error('Error saving measurements:', error);
    }
  };

  return (
    <UserPageLayout isLoading={false}>
      <StyledRecordPageWrapper>
        <StyledTitle>Запишите свой прогресс</StyledTitle>
        <StyledInputsWrapper>
          {measurementsInputs.map((props) => (
            <Input
              key={props.name}
              type="number"
              placeholder="0"
              value={measurements[props.name]}
              onChange={handleChange(props.name)}
              {...props}
            />
          ))}
        </StyledInputsWrapper>
        <Button color="secondary" onClick={handleSubmit}>
          Сохранить
        </Button>
      </StyledRecordPageWrapper>
    </UserPageLayout>
  );
}

const StyledRecordPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTitle = styled.h2`
  font-size: 18px;
  color: #0d0d0d;
`;

const StyledInputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 16px;
`;
