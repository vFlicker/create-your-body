import { Global } from '@emotion/react';
import { ComponentType, JSX } from 'react';

import { globalColors } from '~/shared/theme/colors';
import { SpriteWithIcons } from '~/shared/theme/icons';
import { globalResets } from '~/shared/theme/resets';

const withTheme = (Component: ComponentType): ComponentType => {
  function WithTheme(): JSX.Element {
    return (
      <>
        <Global styles={globalColors} />
        <Global styles={globalResets} />

        <Component />

        <SpriteWithIcons />
      </>
    );
  }

  return WithTheme;
};

export { withTheme };
