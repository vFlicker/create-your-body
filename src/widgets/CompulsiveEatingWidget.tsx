import styled from '@emotion/styled';
import { JSX } from 'react';

import backgroundImageSrc from '~/shared/assets/img/food-banner.png';

type CompulsiveEatingWidgetProps = {
  className?: string;
};

export function CompulsiveEatingWidget({
  className,
}: CompulsiveEatingWidgetProps): JSX.Element {
  return (
    <StyledCompulsiveEatingWidgetWrapper
      className={className}
      href="https://cybapp.ru/sosbutton"
    >
      <StyledContent>
        Интерактивный тренажер
        <span>от компульсивных перееданий</span>
      </StyledContent>
    </StyledCompulsiveEatingWidgetWrapper>
  );
}

const backgroundImage = `url("${backgroundImageSrc}")`;

const StyledCompulsiveEatingWidgetWrapper = styled.a`
  display: flex;
  align-items: center;

  min-height: 106px;
  padding: 16px;
  border: 1px solid var(--violet-300);
  border-radius: 10px;

  background-color: #ffffff;
  background-image: ${backgroundImage};
  background-size: contain;
  background-position: right center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 4px;

  max-width: 250px;

  color: #3d3d3d;
  font-size: 12px;
  font-weight: 500;

  span {
    font-size: 16px;
    font-weight: 700;
    color: #8388ff;
  }
`;
