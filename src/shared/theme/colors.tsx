import { css } from '@emotion/react';

const enum Color {
  Violet_50 = 'var(--violet-50)',
  Violet_100 = 'var(--violet-100)',
  Violet_200 = 'var(--violet-200)',
  Violet_300 = 'var(--violet-300)',
  Violet_400 = 'var(--violet-400)',
  Violet_500 = 'var(--violet-500)',
  Violet_950 = 'var(--violet-950)',

  Green_100 = 'var(--green-100)',
  Green_200 = 'var(--green-200)',
  Green_500 = 'var(--green-500)',

  Black = 'var(--black)',
  Black_50 = 'var(--black-50)',
  Black_100 = 'var(--black-100)',
  Black_200 = 'var(--black-200)',
  Black_300 = 'var(--black-300)',
  Black_400 = 'var(--black-400)',
  Black_600 = 'var(--black-600)',
  Black_700 = 'var(--black-700)',
  Black_800 = 'var(--black-800)',
  Black_900 = 'var(--black-900)',
  Black_950 = 'var(--black-950)',
}

const globalColors = css`
  :root {
    --violet-50: #e9e5ff;
    --violet-100: #d3ccff;
    --violet-200: #a799ff;
    --violet-300: #7a66ff;
    --violet-400: #4e33ff;
    --violet-500: #c0b6ff;
    --violet-950: #03001a;

    --green-100: #f0ffcc;
    --green-200: #e0ff99;
    --green-500: #cbff52;

    --black: #000000;
    --black-50: #f2f2f2;
    --black-100: #e6e6e6;
    --black-200: #cccccc;
    --black-300: #b3b3b3;
    --black-400: #999999;
    --black-600: #666666;
    --black-700: #4d4d4d;
    --black-800: #333333;
    --black-900: #1a1a1a;
    --black-950: #0d0d0d;
  }
`;

export { Color, globalColors };
