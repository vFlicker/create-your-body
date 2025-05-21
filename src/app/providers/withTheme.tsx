import { Global } from '@emotion/react';
import { ComponentType, JSX } from 'react';

import { globalColors } from '~/shared/theme/colors';
// import { globalFonts } from '~/shared/theme/fonts';
// import { SpriteWithIcons } from '~/shared/theme/icons';
// import { globalNormalize } from '~/shared/theme/normalize';
// import { globalRadiuses } from '~/shared/theme/radiuses';
// import { globalResets } from '~/shared/theme/resets';

const withTheme = (Component: ComponentType): ComponentType => {
  function WithTheme(): JSX.Element {
    return (
      <>
        {/* <Global styles={globalNormalize} />
        <Global styles={globalFonts} />
        <Global styles={globalResets} />
        <Global styles={globalRadiuses} /> */}
        <Global styles={globalColors} />

        <Component />

        {/* <SpriteWithIcons /> */}
      </>
    );
  }

  return WithTheme;
};

export { withTheme };