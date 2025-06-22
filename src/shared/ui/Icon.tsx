import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { IconName } from '~/shared/theme/icons';

type IconBaseProps = {
  name: `${IconName}`;
  size?: `${IconSize}`;
};

type IconProps = ComponentProps<typeof StyledIcon>;

const enum IconSize {
  Medium = 'medium',
}

function Icon(props: IconProps) {
  const xlinkHref = `#${props.name}`;

  return (
    <StyledIcon xmlns="http://www.w3.org/2000/svg" {...props}>
      <use xlinkHref={xlinkHref} />
    </StyledIcon>
  );
}

export { Icon, IconName, IconSize };

const IconNameToCss = {
  [IconName.ICON_MUSCLES]: css`
    fill: none;
    stroke: currentColor;
  `,
  [IconName.ICON_RUN]: css`
    fill: none;
    stroke: currentColor;
  `,
};

const IconSizeToCss = {
  [IconSize.Medium]: css`
    width: 24px;
    height: 24px;
  `,
};

const StyledIcon = styled.svg<IconBaseProps>`
  ${({ size = IconSize.Medium }) => IconSizeToCss[size]};
  ${({ name }) => IconNameToCss[name]};
`;
