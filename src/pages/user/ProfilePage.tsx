import './profile.css';

import styled from '@emotion/styled';
import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ANIMATION_DURATION_IN_MS,
  HistoryProgress,
  MeasurementsTable,
  UserDataTable,
} from '~/entities/user';
import chartIconSrc from '~/shared/assets/svg/chart.svg';
import historyIconSrc from '~/shared/assets/svg/history.svg';
import pencilIconSrc from '~/shared/assets/svg/pencil.svg';
import { wait } from '~/shared/libs/wait';
import { IconButton } from '~/shared/ui/IconButton';
import { PhotoEditor } from '~/shared/ui/PhotoEditor';
import { UserPageLayout } from '~/widgets/UserPageLayout';

export function ProfilePage(): JSX.Element {
  const navigate = useNavigate();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseHistory = async () => {
    setIsClosing(true);
    await wait(ANIMATION_DURATION_IN_MS);
    setHistoryOpen(false);
    setIsClosing(false);
  };

  return (
    <UserPageLayout
      hasUserLevel
      isLoading={false}
      action={
        <StyledEditButton
          iconSrc={pencilIconSrc}
          onClick={() => navigate('/parameters')}
        />
      }
    >
      {historyOpen && (
        <HistoryProgress isClosing={isClosing} onClose={handleCloseHistory} />
      )}

      <StyledContentWrapper>
        <StyledProgressSectionWrapper>
          <StyledProgressTextWrapper>
            <h4>Запись прогресса</h4>
            <p>
              Чтобы отслеживать прогресс необходимо в конце каждой недели
              обновлять параметры.
            </p>
          </StyledProgressTextWrapper>

          <StyledButton onClick={() => navigate('/record')}>
            <img src={chartIconSrc} />
            Записать прогресс
          </StyledButton>
          <StyledButton onClick={() => setHistoryOpen(!historyOpen)}>
            <img src={historyIconSrc} />
            История прогресса
          </StyledButton>
        </StyledProgressSectionWrapper>

        <UserDataTable />
        <MeasurementsTable />

        <StyledPhotoEditorSection>
          <StyledPhotoEditorSectionText>
            <h3>Фотографии</h3>
            <p>До и после тренировочной недели</p>
          </StyledPhotoEditorSectionText>
          <StyledPhotoEditorWrapper>
            <PhotoEditor label="Фото до" stage="before" />
            <PhotoEditor label="Фото после" stage="after" />
          </StyledPhotoEditorWrapper>
        </StyledPhotoEditorSection>
      </StyledContentWrapper>
    </UserPageLayout>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledProgressSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledProgressTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4 {
    color: #0d0d0d;
    font-weight: 700;
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: #999999;
  }
`;

const StyledEditButton = styled(IconButton)`
  button {
    width: 44px;
    height: 44px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  height: 54px;
  border-radius: 14px;
  border: 1px solid #e6e6e6;
  position: relative;

  font-size: 14px;
  color: #0d0d0d;

  background-color: #f2f2f2;

  &:hover,
  &:active {
    background-color: #c0c0c0;
    border-color: #c0c0c0;
  }
`;

const StyledPhotoEditorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledPhotoEditorSectionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    color: #0d0d0d;
    font-size: 18px;
    font-weight: 700;
  }

  p {
    color: #999999;
    font-size: 12px;
  }
`;

const StyledPhotoEditorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
