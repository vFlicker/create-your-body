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
    --violet-50: #E9E5FF;
    --violet-100: #D3CCFF;
    --violet-200: #A799FF;
    --violet-300: #7A66FF;
    --violet-400: #4E33FF;
    --violet-500: #C0B6FF;
    --violet-950: #03001A;

    --green-100: #F0FFCC;
    --green-200: #E0FF99;
    --green-500: #CBFF52;

    --black: #000000;
    --black-50: #F2F2F2;
    --black-100: #E6E6E6;
    --black-200: #CCCCCC;
    --black-300: #B3B3B3;
    --black-400: #999999;
    --black-600: #666666;
    --black-700: #4D4D4D;
    --black-800: #333333;
    --black-900: #1A1A1A;
    --black-950: #0D0D0D;
  }
`;

export { Color, globalColors };