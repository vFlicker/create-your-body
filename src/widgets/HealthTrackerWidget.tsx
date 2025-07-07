import styled from '@emotion/styled';
import { JSX } from 'react';

import arrowDownIconSrc from '~/shared/assets/svg/arrow-narrow-down.svg';
import editIconSrc from '~/shared/assets/svg/pencil-white.svg';
import plusIconSrc from '~/shared/assets/svg/plus.svg';
import stepsIconSrc from '~/shared/assets/svg/run-green.svg';
import smallButtonIconSrc from '~/shared/assets/svg/small-button.svg';
import weightIconSrc from '~/shared/assets/svg/weight.svg';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';

type HealthTrackerWidgetProps = {
  data?: {
    weight: number;
    steps: number;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
  };
  onButtonClick: () => void;
};

export function HealthTrackerWidget({
  data,
  onButtonClick,
}: HealthTrackerWidgetProps): JSX.Element {
  const hasData = !!data;

  return (
    <StyledHealthTrackerWidgetWrapper>
      <StyledMetrics>
        <StyledMetric>
          <StyledIconWrapper>
            <img src={weightIconSrc} />
          </StyledIconWrapper>
          <StyledMetricValue>
            {hasData ? `${data.weight}` : '-'} <span>кг</span>
            {hasData && <StyledArrowIcon src={arrowDownIconSrc} />}
          </StyledMetricValue>
        </StyledMetric>
        <StyledMetric>
          <StyledIconWrapper>
            <img src={stepsIconSrc} />
          </StyledIconWrapper>
          <StyledMetricValue>
            {hasData ? `${data.steps}` : '-'} <span>шагов</span>
          </StyledMetricValue>
        </StyledMetric>
      </StyledMetrics>
      <StyledHorizontalDivider />
      <StyledNutrients>
        <StyledNutrientWrapper>
          <StyledIconWrapper>
            <img src={smallButtonIconSrc} />
          </StyledIconWrapper>
          <StyledNutrient>
            <StyledNutrientValue>{data?.calories ?? '-'}</StyledNutrientValue>
            <StyledNutrientLabel>ККАЛ</StyledNutrientLabel>
          </StyledNutrient>
        </StyledNutrientWrapper>
        <StyledVerticalDivider />
        <StyledNutrient>
          <StyledNutrientValue>
            {data?.proteins ?? '-'} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>БЕЛКИ</StyledNutrientLabel>
        </StyledNutrient>
        <StyledNutrient>
          <StyledNutrientValue>
            {data?.fats ?? '-'} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>ЖИРЫ</StyledNutrientLabel>
        </StyledNutrient>
        <StyledNutrient>
          <StyledNutrientValue>
            {data?.carbohydrates ?? '-'} <span>г</span>
          </StyledNutrientValue>
          <StyledNutrientLabel>УГЛЕВОДЫ</StyledNutrientLabel>
        </StyledNutrient>
      </StyledNutrients>
      <StyledButton
        variant="filled"
        color="secondary"
        iconSrc={hasData ? editIconSrc : plusIconSrc}
        onClick={onButtonClick}
      >
        {hasData ? 'Обновить данные' : 'Внести данные'}
      </StyledButton>
    </StyledHealthTrackerWidgetWrapper>
  );
}

const StyledHealthTrackerWidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  padding: 18px 18px 22px 18px;
  border-radius: 10px;
  color: ${Color.White};
  background-image: linear-gradient(90deg, #7a66ff 0%, #8877fc 100%);
`;

const StyledMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledMetric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  background: rgba(255, 255, 255, 0.12);
`;

const StyledMetricValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;

  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  line-height: 100%;

  span {
    font-size: 10px;
    text-transform: uppercase;
  }
`;

const StyledArrowIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const StyledHorizontalDivider = styled.hr`
  height: 1px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
`;

const StyledVerticalDivider = styled.div`
  display: flex;
  border: none;
  width: 1px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.2);
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
    font-size: 11px;
    text-transform: uppercase;
  }
`;

const StyledNutrientLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  line-height: 100%;
  text-transform: uppercase;
`;

const StyledButton = styled(Button)`
  border: 1px solid rgba(255, 255, 255, 0.3);

  color: ${Color.White};

  background-color: rgba(255, 255, 255, 0.2);
  background-image: linear-gradient(
    98deg,
    rgba(255, 255, 255, 0.2) 32.98%,
    rgba(255, 255, 255, 0.3) 65.01%
  );
`;
