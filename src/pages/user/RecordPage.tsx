import styled from '@emotion/styled';
import { ChangeEvent, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateBodyMeasurements } from '~/entities/user';
import { CreateBodyMeasurementsSchema } from '~/entities/user';
import { userSession } from '~/shared/libs/userSession';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/Button';
import { Input } from '~/shared/ui/Input';
import { UserPageLayout } from '~/widgets/UserPageLayout';

import { bodyMeasurementsInputs } from './userPageConfig';

export function RecordPage(): JSX.Element {
  const navigate = useNavigate();

  const [bodyMeasurements, setBodyMeasurements] = useState({
    chest: '',
    waist: '',
    abdominalCircumference: '',
    hips: '',
    legs: '',
    weight: '',
  });

  const currentUserSession = userSession.getCurrentUser();
  const { createBodyMeasurements } = useCreateBodyMeasurements();

  const handleChange = (name: string) => {
    return (evt: ChangeEvent<HTMLInputElement>) => {
      setBodyMeasurements((prev) => ({ ...prev, [name]: evt.target.value }));
    };
  };

  const handleSubmit = async () => {
    try {
      if (!currentUserSession) return;

      const { tgId } = currentUserSession;
      const parsed = CreateBodyMeasurementsSchema.parse(bodyMeasurements);

      await createBodyMeasurements({
        dto: { tg_id: tgId!, ...parsed },
      });

      navigate(AppRoute.Profile);
    } catch (error) {
      console.error('Error saving measurements:', error);
    }
  };

  return (
    <UserPageLayout hasUserLevel={false} isLoading={false}>
      <StyledRecordPageWrapper>
        <StyledTitle>Запишите свой прогресс</StyledTitle>
        <StyledInputsWrapper>
          {bodyMeasurementsInputs.map((props) => (
            <Input
              key={props.name}
              type="number"
              placeholder="0"
              value={bodyMeasurements[props.name]}
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
