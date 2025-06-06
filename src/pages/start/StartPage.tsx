import styled from '@emotion/styled';
import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import element from '~/shared/assets/img/element.png';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/Button';

import { ImageOverlay } from './ImageOverlay';
import { buttonConfig } from './startPageConfig';

type StartPageProps = {
  type: 'start' | 'training';
};

export function StartPage({ type }: StartPageProps): JSX.Element {
  const navigate = useNavigate();

  const { buttonText, buttonIconSrc, onButtonClick } = buttonConfig[type];

  return (
    <StyledStartPage>
      <StyledImgContainer>
        <StyledGreenImg className="green" src={element} />
        <ImageOverlay />
      </StyledImgContainer>

      <StyledStartDown>
        <StyledStartPadding>
          <StyledStartText>
            <StyledH1>
              CREATE
              <br />
              YOUR <span>BODY</span>
            </StyledH1>
            <p>Построй тело своей мечты</p>
          </StyledStartText>

          <Button
            color="neutral"
            iconSrc={buttonIconSrc}
            onClick={() => onButtonClick(navigate)}
          >
            {buttonText}
          </Button>
        </StyledStartPadding>
      </StyledStartDown>
    </StyledStartPage>
  );
}

const StyledStartPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  height: 100vh;
  width: 100%;
`;

const StyledImgContainer = styled.div`
  position: relative;

  flex: 1;
  width: 100%;

  overflow: hidden;
`;

const StyledGreenImg = styled.img`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;

  z-index: 1;
`;

const StyledStartDown = styled.div`
  width: 100%;
  padding-bottom: 32px;
`;

const StyledStartPadding = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding: 0 16px;
`;

const StyledStartText = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  color: ${Color.Black_950};
`;

const StyledH1 = styled.h1`
  font-size: 52px;

  span {
    color: ${Color.Violet_200};
  }
`;
