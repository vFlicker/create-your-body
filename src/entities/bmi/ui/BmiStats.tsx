import styled from '@emotion/styled';
import { JSX } from 'react';

import { ColorfulDot } from '~/shared/ui/atoms/ColorfulDot';

function BmiStat({
  name,
  valueInGrams,
  percentage,
  color,
}: {
  name: string;
  valueInGrams: number;
  percentage: number;
  color: string;
}): JSX.Element {
  return (
    <StyledBmiStatWrapper>
      <StyledColorfulDot circleColor={color} />
      <StyledContent>
        <ChartGrams>{valueInGrams} г</ChartGrams>
        <StyledValue>
          <span>{name}</span>
          <span> {percentage}%</span>
        </StyledValue>
      </StyledContent>
    </StyledBmiStatWrapper>
  );
}

export function BmiStats({
  proteinsInGrams,
  fatsInGrams,
  carbsInGrams,
  targetCalories,
  proteinsPercentFromTarget,
  fatsPercentFromTarget,
  carbsPercentFromTarget,
}: {
  proteinsInGrams: number;
  fatsInGrams: number;
  carbsInGrams: number;
  targetCalories: number;
  proteinsPercentFromTarget: number;
  fatsPercentFromTarget: number;
  carbsPercentFromTarget: number;
}): JSX.Element {
  return (
    <StyledBmiStatsWrapper>
      <StyledTotalCalories>
        <ColorfulDot circleColor="#DEDEE9" />
        <span>{targetCalories} ккал</span>
      </StyledTotalCalories>

      <StyledBmiStatList>
        <BmiStat
          name="Белки"
          percentage={proteinsPercentFromTarget}
          valueInGrams={proteinsInGrams}
          color="#4765FA"
        />

        <BmiStat
          name="Жиры"
          percentage={fatsPercentFromTarget}
          valueInGrams={fatsInGrams}
          color="#ffbf2b"
        />

        <BmiStat
          name="Углеводы"
          percentage={carbsPercentFromTarget}
          valueInGrams={carbsInGrams}
          color="#26C26F"
        />
      </StyledBmiStatList>
    </StyledBmiStatsWrapper>
  );
}

const StyledBmiStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTotalCalories = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: #0d0d0d;
  font-size: 22px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledBmiStatList = styled.div`
  display: flex;
  gap: 18px;
`;

const StyledBmiStatWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledColorfulDot = styled(ColorfulDot)`
  position: relative;
  top: 4px;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChartGrams = styled.div`
  color: #0d0d0d;
  font-size: 14px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  color: #999999;
  font-size: 11px;
  font-weight: 500;
  line-height: 120%;
`;
