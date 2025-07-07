import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '~/entities/user';
import backgroundImageSrc from '~/shared/assets/img/background-image.jpg';
import waveLineImageSrc from '~/shared/assets/img/wave-line.svg';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { Loader } from '~/shared/ui/atoms/Loader';

import { buttonConfig } from './startPageConfig';

export function StartPage(): JSX.Element {
  const navigate = useNavigate();
  const { user, isUserPending } = useUser();

  if (!user || isUserPending) {
    return <Loader />;
  }

  const type = user.bornDate ? 'training' : 'start';
  const { buttonText, buttonIconSrc, onButtonClick } = buttonConfig[type];

  return (
    <StyledStartPage>
      <StyledImageWrapper />

      <StyledContentWrapper>
        <StyledTextWrapper>
          <StyledTitle>
            CREATE <br /> YOUR <span>BODY</span>
          </StyledTitle>
          <p>Построй тело своей мечты</p>
        </StyledTextWrapper>

        <Button
          color="neutral"
          iconSrc={buttonIconSrc}
          onClick={() => onButtonClick(navigate)}
        >
          {buttonText}
        </Button>
      </StyledContentWrapper>
    </StyledStartPage>
  );
}

const StyledStartPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  height: 100vh;
  padding-bottom: 32px;
`;

const backgroundImage = `url("${backgroundImageSrc}")`;
const backgroundLineImage = `url("${waveLineImageSrc}")`;

const StyledImageWrapper = styled.div`
  position: relative;

  display: flex;
  flex-grow: 1;

  background-image: ${backgroundImage};
  background-size: cover;
  background-position: center;

  &::after {
    position: absolute;
    left: 0;
    bottom: 0;

    content: '';

    width: 100%;
    height: 45px;

    background-image: ${backgroundLineImage};
    background-size: auto;
    background-repeat: repeat-x;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 16px;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  color: ${Color.Black_950};
`;

const StyledTitle = styled.h1`
  font-size: 52px;

  span {
    color: ${Color.Violet_200};
  }
`;
