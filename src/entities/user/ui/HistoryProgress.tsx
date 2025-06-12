import styled from '@emotion/styled';
import { JSX } from 'react';

import exitIconSrc from '~/shared/assets/svg/exit.svg';
import { Loader } from '~/shared/ui/Loader';

import { useBodyMeasurements } from '../api/useBodyMeasurements';
import { calculateBodyMeasurementsHistory } from '../libs/calculateBodyMeasurementsHistory';
import { formatDate } from '../libs/formatDate';
import { DeltaDirection } from '../libs/getDeltaDirection';

type HistoryProgressProps = {
  isClosing: boolean;
  onClose: () => void;
};

export const ANIMATION_DURATION_IN_MS = 800;

export function HistoryProgress({
  isClosing,
  onClose,
}: HistoryProgressProps): JSX.Element {
  const { bodyMeasurements, isBodyMeasurementsPending } = useBodyMeasurements();

  if (isBodyMeasurementsPending) {
    return <Loader />;
  }

  const history = calculateBodyMeasurementsHistory(bodyMeasurements);

  return (
    <StyledHistoryProgressWrapper isClosing={isClosing}>
      <StyledHeader>
        <StyledTitle>История прогресса</StyledTitle>
        <StyledSmallCloseButton onClick={onClose}>
          <StyledArrowIcon src={exitIconSrc} />
        </StyledSmallCloseButton>
      </StyledHeader>

      <StyledContent>
        <StyledHistoryList>
          {history.map(({ createdAt, bodyMeasurementsRows }) => (
            <StyledHistoryItem key={createdAt}>
              <StyledDate>{formatDate(createdAt)}</StyledDate>
              <StyledMeasurementList>
                {bodyMeasurementsRows.map((row) => (
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

        <StyledCloseButton onClick={onClose}>
          <StyledArrowIcon src={exitIconSrc} />
          Выйти
        </StyledCloseButton>
      </StyledContent>
    </StyledHistoryProgressWrapper>
  );
}

const StyledHistoryProgressWrapper = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

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

  animation: ${({ isClosing }) => (isClosing ? 'swipeOut' : 'swipe')}
    ${ANIMATION_DURATION_IN_MS}ms cubic-bezier(0.64, 0.02, 0.22, 0.96);

  @keyframes swipe {
    0% {
      top: -100%;
    }

    100% {
      top: 0;
    }
  }

  @keyframes swipeOut {
    0% {
      top: 0;
    }

    100% {
      top: -100%;
    }
  }
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

const StyledSmallCloseButton = styled.button`
  position: absolute;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;
  border-radius: 50px;

  background-color: #ffffff;
`;

const StyledArrowIcon = styled.img`
  width: 18px;
  height: 18px;
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

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  width: 100%;
  padding: 8px;
  border-radius: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);

  color: #0d0d0d;
  font-size: 14px;
  font-weight: 700;

  background-color: #ffffff;
`;
