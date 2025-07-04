import styled from '@emotion/styled';
import { JSX } from 'react';

import { MeasurementsTable, useMeasurements } from '~/entities/measurement';
import { calculateMeasurementsHistory } from '~/entities/measurement/libs/calculateMeasurementsHistory';
import { DeltaDirection } from '~/entities/measurement/libs/getDeltaDirection';
import { formatDateForDisplay } from '~/shared/libs/date';
import { Loader } from '~/shared/ui/atoms/Loader';
import { CommonPageLayout } from '~/widgets/CommonPageLayout';

export function HistoryProgressPage(): JSX.Element {
  const { measurements, isMeasurementsPending } = useMeasurements();

  if (!measurements || isMeasurementsPending) {
    return <Loader />;
  }

  const history = calculateMeasurementsHistory(measurements);

  return (
    <CommonPageLayout title="История прогресса">
      <MeasurementsTable />

      <StyledPhotoEditorSection>
        <StyledPhotoEditorSectionText>
          <h3>Фотографии</h3>
          <p>До и после тренировочной недели</p>
        </StyledPhotoEditorSectionText>
      </StyledPhotoEditorSection>

      <StyledHistoryProgressWrapper>
        <StyledHeader>
          <StyledTitle>История прогресса</StyledTitle>
        </StyledHeader>

        <StyledContent>
          <StyledHistoryList>
            {history.map(({ createdAt, measurementsRows }) => (
              <StyledHistoryItem key={createdAt}>
                <StyledDate>{formatDateForDisplay(createdAt)}</StyledDate>
                <StyledMeasurementList>
                  {measurementsRows.map((row) => (
                    <StyledStyledMeasurementItem key={row.id}>
                      <StyledText>{row.title}</StyledText>
                      <StyledText deltaDirection={row.deltaDirection}>
                        {row.value}{' '}
                        <span className={row.deltaDirection}>{row.delta}</span>
                      </StyledText>
                    </StyledStyledMeasurementItem>
                  ))}
                </StyledMeasurementList>
              </StyledHistoryItem>
            ))}
          </StyledHistoryList>
        </StyledContent>
      </StyledHistoryProgressWrapper>
    </CommonPageLayout>
  );
}

const StyledHistoryProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  height: 100%;
  padding: 20px;

  background-color: #f2f2f2;

  overflow-y: auto;
  scroll-behavior: smooth;

  z-index: 3;
`;

const StyledHeader = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.h3`
  color: #0d0d0d;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const StyledHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledHistoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;
  border-radius: 14px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);

  color: #0d0d0d;
  font-size: 12px;
  font-weight: 700;

  background-color: #cbff52;
`;

const StyledMeasurementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
  padding: 8px;
  border-radius: 14px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);

  background-color: #ffffff;
`;

const StyledStyledMeasurementItem = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const ValueColor: Record<DeltaDirection, string> = {
  positive: '#547800',
  negative: '#A799FF',
  noChange: '#999999',
};

const StyledText = styled.p<{ deltaDirection?: DeltaDirection }>`
  font-size: 12px;
  color: #0d0d0d;
  font-weight: 700;

  span {
    font-size: 10px;
    color: ${({ deltaDirection = 'noChange' }) => ValueColor[deltaDirection]};
  }
`;

const StyledPhotoEditorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledPhotoEditorSectionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    color: #0d0d0d;
    font-size: 18px;
    font-weight: 700;
  }

  p {
    color: #999999;
    font-size: 12px;
  }
`;
