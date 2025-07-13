import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { JSX, PropsWithChildren } from 'react';

import backgroundImageSrc from '~/shared/assets/img/subscription-card.jpg';
import { Color } from '~/shared/theme/colors';

type BaseSubscriptionCardProps = PropsWithChildren<{
  color: `${CardBackgroundColor}`;
  className?: string;
}>;

const enum CardBackgroundColor {
  Normal = 'normal',
  Light = 'light',
  Gray = 'gray',
}

export function BaseSubscriptionCard({
  className,
  color,
  children,
}: BaseSubscriptionCardProps): JSX.Element {
  return (
    <StyledBaseSubscriptionCardWrapper className={className} color={color}>
      <StyledImageWrapper>
        <StyledImage src={backgroundImageSrc} />
      </StyledImageWrapper>
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </StyledBaseSubscriptionCardWrapper>
  );
}

const CardBackgroundColorToCss = {
  [CardBackgroundColor.Normal]: css`
    --background-color: rgba(38, 38, 99, 0.502);
    --border-color: rgb(119, 131, 167);
  `,
  [CardBackgroundColor.Light]: css`
    --background-color: rgba(122, 102, 255, 0.502);
    --border-color: rgb(150, 153, 219);
  `,
  [CardBackgroundColor.Gray]: css`
    --background-color: rgba(121, 121, 150, 0.502);
    --border-color: rgba(150, 153, 219, 0.502);
  `,
};

const StyledBaseSubscriptionCardWrapper = styled.div<{
  color: `${CardBackgroundColor}`;
}>`
  ${({ color }) => CardBackgroundColorToCss[color]}

  position: relative;

  width: 100%;
  height: 220px;

  padding: 20px 16px;
  border: 2px solid var(--border-color);
  border-radius: 10px;

  overflow: hidden;
`;

const StyledImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 0;

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: var(--background-color);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: 50% 25%;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;

  position: relative;

  color: ${Color.White};

  z-index: 1;
`;
