import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useMeasurementsList,
  useTransformationPhoto,
  useUpdateTransformationPhoto,
} from '~/entities/measurement';
import {
  calculateMeasurementsHistory,
  MeasurementsRecord,
} from '~/entities/measurement';
import { AppRoute } from '~/shared/router';
import { AddButton } from '~/shared/ui/molecules/buttons/AddButton';
import { ImageUploader } from '~/shared/ui/molecules/ImageUploader';
import { EmptyPageLayout } from '~/widgets/layouts/EmptyPageLayout';

export function MeasurementsPage(): JSX.Element {
  const navigate = useNavigate();

  const { transformationPhoto, isTransformationPhotoPending } =
    useTransformationPhoto();
  const { measurementsList, isMeasurementsListPending } = useMeasurementsList();

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

  const measurementsHistory = calculateMeasurementsHistory(
    measurementsList || [],
  );

  return (
    <EmptyPageLayout isLoading={isMeasurementsListPending}>
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
              ({ id, createdAt, reportNumber, measurementsRows }) => (
                <MeasurementsRecord
                  key={id}
                  id={id}
                  reportNumber={reportNumber}
                  date={createdAt}
                  measurements={measurementsRows}
                />
              ),
            )}
          </StyledMeasurementsHistory>
        </StyledSection>

        <StyledButtonWrapper>
          <AddButton onClick={() => navigate(AppRoute.CreateMeasurements)} />
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
