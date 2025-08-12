import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { CloseAppButton } from '~/features/CloseAppButton';
import backgroundImageSrc from '~/shared/assets/img/macros-calculator-bg.png';
import ClockStopWatchIcon from '~/shared/assets/svg/clock-stopwatch.svg?react';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';

export function MacrosCalculatorPage(): JSX.Element {
  const navigate = useNavigate();

  const handleStartCalculation = () => {
    navigate(AppRoute.MacrosCalculatorQuiz);
  };

  return (
    <StyledMacrosCalculatorPage>
      <StyledHeader>
        <StyledCloseAppButton />
      </StyledHeader>

      <StyledContent>
        <StyledTime>
          <ClockStopWatchIcon stroke="#CBFF52" />
          <span>5 мин</span>
        </StyledTime>

        <StyledTitle>Интерактивный тренажёр по подбору КБЖУ</StyledTitle>
        <StyledSubTitle>Понимай и контролируй свой рацион</StyledSubTitle>

        <StyledListWrapper>
          <StyledListTitle>🎯 Что вы получите:</StyledListTitle>
          <StyledList>
            <StyledItem>Понимание принципов расчёта БЖУ</StyledItem>
            <StyledItem>Персональную норму под ваши цели</StyledItem>
            <StyledItem>Интересные факты о питании</StyledItem>
            <StyledItem>Контроль над своим рационом</StyledItem>
          </StyledList>
        </StyledListWrapper>

        <Button color="accent" onClick={handleStartCalculation}>
          Начать расчёт
        </Button>
      </StyledContent>
    </StyledMacrosCalculatorPage>
  );
}

const backgroundImage = `url("${backgroundImageSrc}")`;

const StyledMacrosCalculatorPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  width: 100%;
  min-height: 100vh;

  background-image: ${backgroundImage};
  background-size: cover;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`;
const StyledCloseAppButton = styled(CloseAppButton)`
  color: #ffffff;
  background-color: #ffffff14;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: auto;
  padding: 32px 16px;
`;

const StyledTime = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  margin-bottom: 20px;
  padding: 10px 14px 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50px;

  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);

  span {
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
  }
`;

const StyledTitle = styled.div`
  margin-bottom: 10px;

  text-align: center;
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledSubTitle = styled.div`
  margin-bottom: 28px;

  color: #ffffff;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
`;

const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-bottom: 48px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);

  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 160%;

  background-color: rgba(242, 241, 255, 0.16);
  backdrop-filter: blur(15px);
`;

const StyledListTitle = styled.div``;

const StyledList = styled.div``;

const StyledItem = styled.div`
  position: relative;
  padding-left: 20px;

  &::before {
    content: '•';
    position: absolute;
    left: 5px;
    top: 3px;
    color: #ffffff;
    font-size: 16px;
    line-height: 16px;
  }
`;
