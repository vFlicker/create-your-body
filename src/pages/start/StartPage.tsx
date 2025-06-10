import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '~/entities/user';
import backgroundImageSrc from '~/shared/assets/img/background-image.webp';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/Button';

import { buttonConfig } from './startPageConfig';

export function StartPage(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useUser();

  const type = user.born_date ? 'training' : 'start';
  const { buttonText, buttonIconSrc, onButtonClick } = buttonConfig[type];

  return (
    <StyledStartPage>
      <StyledImage src={backgroundImageSrc} />

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

  min-height: 100vh;
  width: 100%;
  padding-bottom: 32px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;

  z-index: 1;
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
