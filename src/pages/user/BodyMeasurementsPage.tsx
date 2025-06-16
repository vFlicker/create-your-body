import styled from '@emotion/styled';
import { ChangeEvent, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CreateBodyMeasurementsSchema,
  formatDateForDisplay,
  useBodyMeasurements,
  useCreateBodyMeasurements,
  useUpdateBodyMeasurements,
  useUpdateUser,
  useUser,
} from '~/entities/user';
import exampleImageSrc from '~/shared/assets/img/example.jpeg';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { AppRoute } from '~/shared/router';
import { useUserSession } from '~/shared/store';
import { Button } from '~/shared/ui/Button';
import { Input } from '~/shared/ui/Input';
import { RadioButton } from '~/shared/ui/RadioButton';
import { UserPageLayout } from '~/widgets/UserPageLayout';

import { bodyMeasurementsInputs } from './userPageConfig';
import { convertDateToBackendFormat } from './userPageLib';

const DIMENSION_LIST = ['Груди', 'Талии', 'Живота', 'Бедер', 'Ноги'];

export function BodyMeasurementsPage(): JSX.Element {
  const navigate = useNavigate();

  const { tgId: tg_id } = useUserSession();
  const { user } = useUser();

  const [bornDate, setBornDate] = useState(
    formatDateForDisplay(user?.bornDate) || '',
  );
  const [sex, setSex] = useState(user?.sex || '');

  const { bodyMeasurements, isBodyMeasurementsPending } = useBodyMeasurements();

  const hasBodyMeasurementsRecord = bodyMeasurements?.length > 0;
  const mostRecentBodyMeasurement =
    hasBodyMeasurementsRecord && bodyMeasurements[0];

  const [bodyMeasurementsForm, setBodyMeasurementsForm] = useState({
    chest: mostRecentBodyMeasurement?.chest || '',
    waist: mostRecentBodyMeasurement?.waist || '',
    abdominalCircumference:
      mostRecentBodyMeasurement?.abdominalCircumference || '',
    hips: mostRecentBodyMeasurement?.hips || '',
    legs: mostRecentBodyMeasurement?.legs || '',
    weight: mostRecentBodyMeasurement?.weight || '',
  });

  const { userQuery: userQuery } = useUserSession();
  const { updateUser } = useUpdateUser();
  const { updateBodyMeasurementsMutate, isUpdateBodyMeasurementsPending } =
    useUpdateBodyMeasurements();
  const { createBodyMeasurements, isCreateBodyMeasurementsPending } =
    useCreateBodyMeasurements();

  const handleBodyMeasurementsChange = (name: string) => {
    return (evt: ChangeEvent<HTMLInputElement>) => {
      setBodyMeasurementsForm((prev) => ({
        ...prev,
        [name]: evt.target.value,
      }));
    };
  };

  const handleSubmit = async () => {
    try {
      const parsedBodyMeasurements =
        CreateBodyMeasurementsSchema.parse(bodyMeasurementsForm);

      if (hasBodyMeasurementsRecord) {
        const { id } = mostRecentBodyMeasurement;
        await updateBodyMeasurementsMutate({
          id,
          userQuery,
          dto: parsedBodyMeasurements,
        });
      } else {
        await createBodyMeasurements({
          userQuery,
          dto: { tg_id, ...parsedBodyMeasurements },
        });
      }

      const formattedBornDate = convertDateToBackendFormat(bornDate);
      const userData = { sex, born_date: formattedBornDate };
      await updateUser({ userQuery, dto: userData });

      navigate(AppRoute.Profile);
    } catch (error) {
      console.error('Error saving data:', error);
      showTelegramAlert('Ошибка при сохранении данных');
    }
  };

  const isSaving =
    isUpdateBodyMeasurementsPending ||
    isCreateBodyMeasurementsPending ||
    isBodyMeasurementsPending;

  return (
    <UserPageLayout hasUserLevel={false} isLoading={false}>
      <StyledBodyMeasurementsPageWrapper>
        <StyledHeader>
          <StyledTitle>Как измерить параметры?</StyledTitle>
          <StyledHeaderContent>
            <StyledPhoto src={exampleImageSrc} />
            <StyledHeaderTextWrapper>
              <div>Измеряем по самым выпирающим точкам обхват:</div>
              <StyledDimensionList>
                {DIMENSION_LIST.map((dimensionItem) => (
                  <StyledDimensionItem key={dimensionItem}>
                    {dimensionItem}
                  </StyledDimensionItem>
                ))}
              </StyledDimensionList>
            </StyledHeaderTextWrapper>
          </StyledHeaderContent>
        </StyledHeader>

        <StyledFieldset>
          <StyledTitle>Общие параметры</StyledTitle>
          <StyledInputsWrapper>
            <Input
              type="text"
              placeholder="Возраст"
              value={bornDate}
              onChange={(e) => setBornDate(e.target.value)}
              label="Дата рождения"
            />
            <RadioButton
              label="Пол"
              names={['М', 'Ж']}
              options={['male', 'female']}
              activeOption={sex}
              onClick={(sex) => setSex(sex)}
            />
          </StyledInputsWrapper>
        </StyledFieldset>

        <StyledFieldset>
          <StyledTitle>Параметры тела</StyledTitle>
          <StyledInputsWrapper>
            {bodyMeasurementsInputs.map((props) => (
              <Input
                key={props.name}
                type="number"
                placeholder="0"
                value={bodyMeasurementsForm[props.name]}
                onChange={handleBodyMeasurementsChange(props.name)}
                {...props}
              />
            ))}
          </StyledInputsWrapper>
        </StyledFieldset>
        <Button color="secondary" disabled={isSaving} onClick={handleSubmit}>
          Сохранить
        </Button>
      </StyledBodyMeasurementsPageWrapper>
    </UserPageLayout>
  );
}

const StyledBodyMeasurementsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledFieldset = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitle = styled.h3`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;

const StyledInputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 16px;
`;

const StyledHeaderContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px;
  gap: 16px;

  align-items: center;
`;

const StyledPhoto = styled.img`
  width: 100%;
  border-radius: 14px;
`;

const StyledHeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  font-size: 14px;
  color: #0d0d0d;
`;

const StyledDimensionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledDimensionItem = styled.li`
  position: relative;
  padding-left: 16px;

  &::before {
    content: '';

    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: #a799ff;
  }
`;
