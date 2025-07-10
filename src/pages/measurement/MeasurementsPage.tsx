import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useMeasurements,
  useTransformationPhoto,
  useUpdateTransformationPhoto,
} from '~/entities/measurement';
import {
  calculateMeasurementsHistory,
  MeasurementsRecord,
} from '~/entities/measurement';
import PlusIcon from '~/shared/assets/svg/plus.svg?react';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { ImageUploader } from '~/shared/ui/molecules/ImageUploader';
import { EmptyPageLayout } from '~/widgets/layouts/EmptyPageLayout';

export function MeasurementsPage(): JSX.Element {
  const navigate = useNavigate();

  const { transformationPhoto, isTransformationPhotoPending } =
    useTransformationPhoto();
  const { measurements, isMeasurementsPending } = useMeasurements();

  const {
    updateTransformationPhoto,
    isUpdateTransformationPhotoPending,
    uploadingStage,
  } = useUpdateTransformationPhoto();

  const handleTransformationPhotoChange = (stage: 'before' | 'after') => {
    return (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      updateTransformationPhoto({ stage, formData });
    };
  };

  const measurementsHistory = calculateMeasurementsHistory(measurements || []);

  return (
    <EmptyPageLayout isLoading={isMeasurementsPending}>
      <StyledMeasurementsPageWrapper>
        <StyledTitle>Мои замеры</StyledTitle>

        <StyledSection>
          <StyledSubTitle>Мои фото</StyledSubTitle>
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
        </StyledSection>

        <StyledSection>
          <StyledSubTitle>Мои отчёты</StyledSubTitle>
          <StyledMeasurementsHistory>
            {measurementsHistory.map(
              ({ createdAt, reportNumber, measurementsRows }, index) => (
                <MeasurementsRecord
                  key={createdAt + index}
                  reportNumber={reportNumber}
                  date={createdAt}
                  measurements={measurementsRows}
                />
              ),
            )}
          </StyledMeasurementsHistory>
        </StyledSection>

        <StyledButtonWrapper>
          <Button
            color="accent"
            iconComponent={<PlusIcon stroke="#ffffff" />}
            onClick={() => navigate(AppRoute.CreateMeasurements)}
          >
            Записать замеры
          </Button>
        </StyledButtonWrapper>
      </StyledMeasurementsPageWrapper>
    </EmptyPageLayout>
  );
}

const StyledMeasurementsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.h3`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;

const StyledSubTitle = styled.h4`
  color: #0d0d0d;
  font-size: 12px;
  font-weight: 700;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ImageUploaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledMeasurementsHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledButtonWrapper = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 120px;
`;
