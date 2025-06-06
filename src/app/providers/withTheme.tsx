import { Global } from '@emotion/react';
import { ComponentType, JSX } from 'react';

import { globalColors } from '~/shared/theme/colors';
import { SpriteWithIcons } from '~/shared/theme/icons';

const withTheme = (Component: ComponentType): ComponentType => {
  function WithTheme(): JSX.Element {
    return (
      <>
        <Global styles={globalColors} />

        <Component />

        <SpriteWithIcons />
      </>
    );
  }

  return WithTheme;
};

export { withTheme };
