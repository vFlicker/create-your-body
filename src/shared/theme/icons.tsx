import styled from '@emotion/styled';
import { JSX } from 'react';

const enum IconName {
  ICON_MUSCLES = 'icon-muscles',
  ICON_RUN = 'icon-run',
}

const StyledSpriteWithIcons = styled.svg`
  display: none;
`;

function SpriteWithIcons(): JSX.Element {
  return (
    <StyledSpriteWithIcons xmlns="http://www.w3.org/2000/svg">
      <symbol id="icon-muscles" viewBox="0 0 24 24">
        <path
          d="M12.4092 13.017C12.865 11.9604 13.6714 11.0934 14.6921 10.5622C15.7129 10.031 16.8857 9.86815 18.0126 10.1011C19.1395 10.3341 20.1515 10.9487 20.8779 11.8411C21.6044 12.7336 22.0008 13.8493 22.0002 15C22.0002 18.866 18.0002 22 13.0002 22C8.92321 22 4.84721 21.18 2.62921 19.538C2.20321 19.222 1.99821 18.706 2.00921 18.176C2.11821 12.723 2.62721 2 10.0002 2C10.7959 2 11.5589 2.31607 12.1215 2.87868C12.6841 3.44129 13.0002 4.20435 13.0002 5C13.0002 5.53043 12.7895 6.03914 12.4144 6.41421C12.0393 6.78929 11.5306 7 11.0002 7C9.89521 7 9.36021 6.556 9.00021 6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 14C14.3965 13.5471 13.6983 13.2367 12.9578 13.092C12.2172 12.9473 11.4536 12.9721 10.724 13.1645C9.99437 13.3569 9.31778 13.7119 8.7449 14.203C8.17202 14.6941 7.71771 15.3084 7.41602 16"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.964 6.82501C8.019 7.97701 9.5 13 8 15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
      <symbol id="icon-run" viewBox="0 0 24 24">
        <path
          d="M17 4.5C17 5.32843 16.3284 6 15.5 6C14.6716 6 14 5.32843 14 4.5C14 3.67157 14.6716 3 15.5 3C16.3284 3 17 3.67157 17 4.5Z"
          strokeWidth="1.5"
        />
        <path
          d="M15 21.0008L14.3359 18.3848C14.1161 17.5191 13.6615 16.7284 13.0207 16.0974L11.5 14.5998M11.5 14.5998C10.4922 13.8059 9.98834 13.409 9.79313 12.8784C9.70617 12.642 9.66463 12.3914 9.67069 12.1397C9.68429 11.5745 10.0332 11.0362 10.7309 9.95956L12 8.00136M11.5 14.5998L15 9.27743M6 11.1534C7 9.18366 8.53767 8.0423 12 8.00136M12 8.00136C12.2186 7.99877 12.5444 7.99799 12.8698 7.99805C13.3747 7.99813 13.6271 7.99818 13.8282 8.09214C14.0293 8.18609 14.2356 8.43256 14.6482 8.92548C14.7664 9.06672 14.8878 9.19326 15 9.27743M15 9.27743C16.1547 10.1433 17.9627 10.4921 20 8.19913"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 17.7303L4.67822 17.8916C6.40663 18.3028 8.20324 17.5164 9 16"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
    </StyledSpriteWithIcons>
  );
}

export { IconName, SpriteWithIcons };
