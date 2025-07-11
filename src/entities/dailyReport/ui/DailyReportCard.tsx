import styled from '@emotion/styled';
import { JSX } from 'react';

import StepsIcon from '~/shared/assets/svg/run-green.svg?react';
import ForkIcon from '~/shared/assets/svg/small-button.svg?react';
import WeightIcon from '~/shared/assets/svg/weight.svg?react';
import { formatNumberWithThousands } from '~/shared/libs/format';
import { Color } from '~/shared/theme/colors';

type DailyReportCardProps = {
  className?: string;
  weight: number;
  steps: number;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
};

export function DailyReportCard({
  className,
  calories,
  carbs,
  fats,
  proteins,
  steps,
  weight,
}: DailyReportCardProps): JSX.Element {
  return (
    <StyledDailyReportCardWrapper className={className}>
      <StyledMetrics>
        <StyledNutrientWrapper>
          <StyledIconWrapper>
            <WeightIcon stroke="#7a66ff" />
          </StyledIconWrapper>
          <StyledMetricValue>
            {weight} <span>кг</span>
          </StyledMetricValue>
        </StyledNutrientWrapper>
        <StyledNutrientWrapper>
          <StyledIconWrapper>
            <StepsIcon stroke="#7a66ff" />
          </StyledIconWrapper>
          <StyledMetricValue>
            {formatNumberWithThousands(steps)} <span>шагов</span>
          </StyledMetricValue>
        </StyledNutrientWrapper>
      </StyledMetrics>
      <StyledHorizontalDivider />
      <StyledNutrients>
        <StyledNutrientWrapper>
          <StyledIconWrapper>
            <ForkIcon fill="#7a66ff" />
          </StyledIconWrapper>
          <StyledNutrient>
            <StyledNutrientValue>{calories}</StyledNutrientValue>
            <StyledNutrientLabel>Ккал</StyledNutrientLabel>
          </StyledNutrient>
        </StyledNutrientWrapper>
        <StyledVerticalDivider />
        <StyledNutrient>
          <StyledNutrientValue>
            {proteins} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>Белки</StyledNutrientLabel>
        </StyledNutrient>
        <StyledNutrient>
          <StyledNutrientValue>
            {fats} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>Жиры</StyledNutrientLabel>
        </StyledNutrient>
        <StyledNutrient>
          <StyledNutrientValue>
            {carbs} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>Углеводы</StyledNutrientLabel>
        </StyledNutrient>
      </StyledNutrients>
    </StyledDailyReportCardWrapper>
  );
}

const StyledDailyReportCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 20px 18px;
  border-radius: 10px;
  color: ${Color.Black};
  background-color: #f7f6fb;
`;

const StyledMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledNutrientWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 26px;
  border-radius: 6px;
  background-color: rgba(122, 102, 255, 0.12);
`;

const StyledMetricValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;

  font-size: 18px;
  font-weight: 600;
  line-height: 100%;

  span {
    color: #9994ab;
    font-size: 10px;
    text-transform: uppercase;
  }
`;

const StyledHorizontalDivider = styled.hr`
  height: 1px;
  border: none;
  background-color: #e8e5f3;
`;

const StyledVerticalDivider = styled.div`
  display: flex;
  border: none;
  width: 1px;
  height: 32px;
  background-color: #e8e5f3;
`;

const StyledNutrients = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledNutrient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

const StyledNutrientValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;

  span {
    color: #9994ab;
    font-size: 11px;
    text-transform: uppercase;
  }
`;

const StyledNutrientLabel = styled.div`
  color: #9994ab;
  font-size: 10px;
  font-weight: 600;
  line-height: 100%;
  text-transform: uppercase;
`;
