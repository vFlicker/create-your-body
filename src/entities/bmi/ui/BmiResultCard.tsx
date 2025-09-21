import styled from '@emotion/styled';
import { JSX } from 'react';

import backgroundImageSrc from '~/shared/assets/img/bmi-card-bg.jpg';
import ForkIcon from '~/shared/assets/svg/fork.svg?react';

type BmiResultCardProps = {
  className?: string;
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
  onClick: () => void;
};

export function BmiResultCard({
  className,
  proteins,
  fats,
  carbs,
  calories,
  onClick,
}: BmiResultCardProps): JSX.Element {
  return (
    <StyledBmiResultCardWrapper className={className}>
      <StyledNutrients>
        <StyledNutrientWrapper>
          <StyledIconWrapper>
            <ForkIcon fill="#CBFF52" />
          </StyledIconWrapper>
          <StyledNutrient>
            <StyledNutrientValue>{calories}</StyledNutrientValue>
            <StyledNutrientLabel>ККАЛ</StyledNutrientLabel>
          </StyledNutrient>
        </StyledNutrientWrapper>
        <StyledNutrientList>
          <StyledNutrient>
            <StyledNutrientValue>
              {proteins} <span>г</span>
            </StyledNutrientValue>
            <StyledNutrientLabel>БЕЛКИ</StyledNutrientLabel>
          </StyledNutrient>
          <StyledNutrient>
            <StyledNutrientValue>
              {fats} <span>г</span>
            </StyledNutrientValue>
            <StyledNutrientLabel>ЖИРЫ</StyledNutrientLabel>
          </StyledNutrient>
          <StyledNutrient>
            <StyledNutrientValue>
              {carbs} <span>г</span>
            </StyledNutrientValue>
            <StyledNutrientLabel>УГЛЕВОДЫ</StyledNutrientLabel>
          </StyledNutrient>
        </StyledNutrientList>
      </StyledNutrients>
      <StyledButton onClick={onClick}>Пересчитать</StyledButton>
    </StyledBmiResultCardWrapper>
  );
}

const backgroundImage = `url("${backgroundImageSrc}")`;

const StyledBmiResultCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  border-radius: 10px;

  background-color: #b5b5a9;
  background-image:
    linear-gradient(
      269deg,
      rgba(13, 13, 13, 0.2) 5%,
      rgba(13, 13, 13, 0.7) 70%
    ),
    ${backgroundImage};

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  overflow: hidden;
`;

const StyledNutrients = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  color: #ffffff;
`;

const StyledNutrientWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledNutrientList = styled.div`
  display: flex;
  gap: 30px;
`;

const StyledIconWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 26px;
  border-radius: 6px;

  background-color: rgba(255, 255, 255, 0.12);

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;

    width: 32px;
    height: 1px;

    background-color: #636363;
  }
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

const StyledButton = styled.button`
  padding: 11px 13px;
  border-radius: 16px;

  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  line-height: 100%;

  background-color: #a799ff;
`;
