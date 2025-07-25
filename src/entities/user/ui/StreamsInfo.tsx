import styled from '@emotion/styled';
import { JSX } from 'react';

import { Chip, ChipLink } from '~/shared/ui/atoms/Chip';

import { useUser } from '../api/useUser';

export function StreamsInfo(): JSX.Element | null {
  const { user } = useUser();
  if (!user) return null;

  const { subscriptions } = user;

  const secondSteam = subscriptions.find((sub) => sub.stream === 2);
  const thirdSteam = subscriptions.find((sub) => sub.stream === 3);

  if (secondSteam && !thirdSteam) {
    return (
      <StyledDashLabelsWrapper>
        <Chip color="secondary">Поток 2</Chip>
        <ChipLink
          color="accent"
          to="https://t.me/cybpayments_bot?start=rejune-pro2025"
        >
          Перейти на 3 поток
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6H10M10 6L7 3M10 6L7 9"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ChipLink>
      </StyledDashLabelsWrapper>
    );
  }

  if (!secondSteam && thirdSteam) {
    return (
      <StyledDashLabelsWrapper>
        <Chip color="accent">
          Поток 3{' '}
          <StyledSpinnerSvg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_8329)">
              <path
                d="M6 1.125V2.375M6 9V11M2.875 6H1.125M10.625 6H9.875M9.22855 9.22855L8.875 8.875M9.33211 2.70789L8.625 3.415M2.46079 9.53921L3.875 8.125M2.56434 2.60434L3.625 3.665"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_8329">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </StyledSpinnerSvg>
        </Chip>
      </StyledDashLabelsWrapper>
    );
  }

  return (
    <StyledDashLabelsWrapper>
      <Chip color="secondary">Поток 2</Chip>
      <Chip color="accent">
        Вы перешли на 3 поток{' '}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2261 6.44641C10.0872 7.75136 9.34784 8.97422 8.12434 9.68061C6.0916 10.8542 3.49234 10.1577 2.31874 8.125L2.19374 7.90849M1.77259 5.55356C1.9115 4.24862 2.65089 3.02575 3.87438 2.31937C5.90713 1.14576 8.50639 1.84223 9.67999 3.87498L9.80499 4.09148M1.74609 9.03297L2.11212 7.66694L3.47814 8.03297M8.52062 3.96699L9.88665 4.33301L10.2527 2.96699M5.99938 3.74998V5.99998L7.24938 6.74998"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Chip>
    </StyledDashLabelsWrapper>
  );
}

const StyledDashLabelsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledSpinnerSvg = styled.svg`
  animation: spin 5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
