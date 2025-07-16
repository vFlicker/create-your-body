import styled from '@emotion/styled';
import { Fragment, JSX } from 'react';

import { EditButton } from '~/shared/ui/molecules/buttons/EditButton';

type ExerciseCardProps = {
  className?: string;
  title: string;
  positionNumber: number;
  approaches?: { repetitions: number; weight: number }[];
};

export function ExerciseCard({
  className,
  title,
  positionNumber,
  approaches,
}: ExerciseCardProps): JSX.Element {
  const hasApproaches = approaches && approaches.length > 0;

  return (
    <StyledExerciseCard className={className}>
      <StyledHeader>
        <StyledPositionNumber>{positionNumber}</StyledPositionNumber>
        <StyledTitle>{title}</StyledTitle>
        <EditButton onClick={() => {}} />
      </StyledHeader>
      <StyledContent>
        {!hasApproaches && (
          <StyledText>Добавьте подходы и повторения</StyledText>
        )}

        {hasApproaches && (
          <StyledApproachList>
            {approaches?.map(({ repetitions, weight }, index) => (
              <Fragment key={index}>
                <StyledText>{repetitions}</StyledText>
                <StyledText>{weight} кг</StyledText>
              </Fragment>
            ))}
          </StyledApproachList>
        )}
      </StyledContent>
    </StyledExerciseCard>
  );
}

const StyledExerciseCard = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-left: 32px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const StyledPositionNumber = styled.div`
  position: absolute;
  left: 0;

  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
`;

const StyledTitle = styled.div`
  color: #0d0d0d;
  font-size: 14px;
  font-weight: 600;
  line-height: 120%;
`;

const StyledContent = styled.div``;

const StyledText = styled.div`
  color: #a6a6ba;
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
`;

const StyledApproachList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 12px 17px;

  & ${StyledText} {
    text-align: right;

    &:nth-child(odd) {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -9px;
        transform: translateY(-50%);

        width: 1px;
        height: 8px;

        background-color: #dcdce2;
      }
    }
  }
`;
