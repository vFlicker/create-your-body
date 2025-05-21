import compose from 'compose-function';

import { withReactQuery } from './withReactQuery';
import { withRouter } from './withRouter';
import { withTheme } from './withTheme';

export const withProviders = compose(withReactQuery, withRouter, withTheme);
