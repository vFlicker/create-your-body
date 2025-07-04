import styled from '@emotion/styled';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '~/entities/user';
import { CloseAppButton } from '~/features/CloseAppButton';
import resultImageSrc from '~/shared/assets/img/result.jpg';
import musclesIconSrc from '~/shared/assets/svg/musclesBlack.svg';
import settingsIconSrc from '~/shared/assets/svg/settings.svg';
import { Color } from '~/shared/theme/colors';
import { Button } from '~/shared/ui/atoms/Button';
import { Loader } from '~/shared/ui/atoms/Loader';

import { quizResults } from './quizData';

export function QuizResultPage(): JSX.Element {
  const navigate = useNavigate();

  const { user, isUserPending } = useUser();

  if (!user || isUserPending) return <Loader />;

  return (
    <StyledQuizResultPage>
      <StyledCloseAppButton />
      <StyledImage src={resultImageSrc} />
      <StyledResultInfo>
        <StyledContentWrapper>
          <StyledTextWrapper>
            <StyledTitle>Ваш уровень: {user.level}</StyledTitle>
            <StyledText>{quizResults[user.level]}</StyledText>
          </StyledTextWrapper>
          <StyledClue>
            <img src={settingsIconSrc} />
            <StyledText>
              Вы всегда можете изменить уровень в своем профиле
            </StyledText>
          </StyledClue>
        </StyledContentWrapper>
        <StyledButton
          iconSrc={musclesIconSrc}
          color="secondary"
          onClick={() => navigate('/dashboard')}
        >
          К тренировкам
        </StyledButton>
      </StyledResultInfo>
    </StyledQuizResultPage>
  );
}

const StyledQuizResultPage = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  background-color: ${Color.Black_50};
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledResultInfo = styled.div`
  position: relative;
  top: -20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  flex-grow: 1;

  height: 100%;
  padding: 24px 16px 2px 16px;
  border-radius: 16px 16px 0 0;

  background-color: ${Color.Black_50};
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTitle = styled.h1`
  color: ${Color.Black_950};
  font-size: 24px;
`;

const StyledText = styled.p`
  color: ${Color.Black_800};
  font-size: 14px;
`;

const StyledClue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    color: ${Color.Black_800};
    font-size: 14px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: auto;
`;

const StyledCloseAppButton = styled(CloseAppButton)`
  position: absolute;
  top: 16px;
  right: 16px;

  z-index: 1;
`;
