import styled from '@emotion/styled';
import { ChangeEvent, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useCreateMeasurements,
  useMeasurements,
  useTransformationPhoto,
  useUpdateMeasurements,
  useUpdateTransformationPhoto,
} from '~/entities/measurement';
import { CreateMeasurementsSchema } from '~/entities/measurement/model/createMeasurementsSchema';
import { useUpdateUser, useUser } from '~/entities/user';
import exampleImageSrc from '~/shared/assets/img/example.jpeg';
import {
  convertDateToBackendFormat,
  formatDateForDisplay,
} from '~/shared/libs/date';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { userSession } from '~/shared/libs/userSession';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { ImageUploader } from '~/shared/ui/molecules/ImageUploader';
import { Input } from '~/shared/ui/molecules/Input';
import { EmptyPageLayout } from '~/widgets/EmptyPageLayout';

const DIMENSION_LIST = ['Груди', 'Талии', 'Живота', 'Бедер', 'Ноги'];

const measurementsInputs = [
  { name: 'chest', label: 'Обхват груди' },
  { name: 'waist', label: 'Обхват талии' },
  { name: 'abdominalCircumference', label: 'Обхват живота' },
  { name: 'hips', label: 'Обхват бедер' },
  { name: 'legs', label: 'Обхват ноги' },
  { name: 'weight', label: 'Вес' },
] as const;

export function MeasurementsPage(): JSX.Element {
  const navigate = useNavigate();

  const currentUserSession = userSession.getCurrentUser();
  const { user, isUserPending } = useUser();

  const [bornDate, setBornDate] = useState(
    formatDateForDisplay(user?.bornDate || ''),
  );

  const { measurements, isMeasurementsPending } = useMeasurements();
  const { transformationPhoto, isTransformationPhotoPending } =
    useTransformationPhoto();

  const mostRecentMeasurement = measurements?.[0];

  const [measurementsForm, setMeasurementsForm] = useState({
    chest: mostRecentMeasurement?.chest || '',
    waist: mostRecentMeasurement?.waist || '',
    abdominalCircumference: mostRecentMeasurement?.abdominalCircumference || '',
    hips: mostRecentMeasurement?.hips || '',
    legs: mostRecentMeasurement?.legs || '',
    weight: mostRecentMeasurement?.weight || '',
  });

  const { updateUser } = useUpdateUser();
  const {
    updateTransformationPhoto,
    isUpdateTransformationPhotoPending,
    uploadingStage,
  } = useUpdateTransformationPhoto();
  const { updateMeasurementsMutate, isUpdateMeasurementsPending } =
    useUpdateMeasurements();
  const { createMeasurements, isCreateMeasurementsPending } =
    useCreateMeasurements();

  if (!currentUserSession || isUserPending || !measurements || !user) {
    return <EmptyPageLayout isLoading={true} />;
  }

  const handleTransformationPhotoChange = (stage: 'before' | 'after') => {
    return (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      updateTransformationPhoto({ stage, formData });
    };
  };

  const handleMeasurementsChange = (name: string) => {
    return (evt: ChangeEvent<HTMLInputElement>) => {
      setMeasurementsForm((prev) => ({
        ...prev,
        [name]: evt.target.value,
      }));
    };
  };

  const handleSubmit = async () => {
    try {
      const parsedMeasurements =
        CreateMeasurementsSchema.parse(measurementsForm);

      if (mostRecentMeasurement) {
        const { id } = mostRecentMeasurement;
        await updateMeasurementsMutate({
          id,
          dto: parsedMeasurements,
        });
      } else {
        const { tgId } = currentUserSession;
        await createMeasurements({
          dto: { tg_id: tgId, ...parsedMeasurements },
        });
      }

      const formattedBornDate = convertDateToBackendFormat(bornDate);
      const userData = { bornDate: formattedBornDate };
      await updateUser({ dto: userData });

      navigate(AppRoute.Profile);
    } catch (error) {
      console.error('Error saving data:', error);
      showTelegramAlert('Ошибка при сохранении данных');
    }
  };

  const isSaving =
    isUpdateMeasurementsPending ||
    isCreateMeasurementsPending ||
    isMeasurementsPending;

  return (
    <EmptyPageLayout isLoading={false}>
      <StyledMeasurementsPageWrapper>
        <StyledHeader>
          <StyledTitle>Мои замеры</StyledTitle>

          <ImageUploaderWrapper>
            <ImageUploader
              label="Фото «До»"
              imageSrc={transformationPhoto?.before?.url}
              isLoading={
                isTransformationPhotoPending ||
                (isUpdateTransformationPhotoPending &&
                  uploadingStage === 'before')
              }
              onFileSelect={handleTransformationPhotoChange('before')}
            />
            <ImageUploader
              label="Фото «После»"
              imageSrc={transformationPhoto?.after?.url}
              isLoading={
                isTransformationPhotoPending ||
                (isUpdateTransformationPhotoPending &&
                  uploadingStage === 'after')
              }
              onFileSelect={handleTransformationPhotoChange('after')}
            />
          </ImageUploaderWrapper>

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
          </StyledInputsWrapper>
        </StyledFieldset>

        <StyledFieldset>
          <StyledTitle>Параметры тела</StyledTitle>
          <StyledInputsWrapper>
            {measurementsInputs.map((props) => (
              <Input
                key={props.name}
                type="number"
                placeholder="0"
                value={measurementsForm[props.name]}
                onChange={handleMeasurementsChange(props.name)}
                {...props}
              />
            ))}
          </StyledInputsWrapper>
        </StyledFieldset>
        <Button color="secondary" disabled={isSaving} onClick={handleSubmit}>
          Сохранить
        </Button>
      </StyledMeasurementsPageWrapper>
    </EmptyPageLayout>
  );
}

const StyledMeasurementsPageWrapper = styled.div`
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

const ImageUploaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
