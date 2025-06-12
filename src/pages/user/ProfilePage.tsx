import './profile.css';

import styled from '@emotion/styled';
import { JSX, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import {
  ANIMATION_DURATION_IN_MS,
  HistoryProgress,
  MeasurementsTable,
  UserDataTable,
} from '~/entities/user';
import chart from '~/shared/assets/svg/chart.svg';
import history from '~/shared/assets/svg/history.svg';
import pencilIconSrc from '~/shared/assets/svg/pencil.svg';
import { wait } from '~/shared/libs/wait';
import { useUserSession } from '~/shared/store';
import { IconButton } from '~/shared/ui/IconButton';
import { PhotoEditor } from '~/shared/ui/PhotoEditor';
import { UserPageLayout } from '~/widgets/UserPageLayout';

export function ProfilePage(): JSX.Element {
  const navigate = useNavigate();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { query } = useUserSession();

  const handleCloseHistory = async () => {
    setIsClosing(true);
    await wait(ANIMATION_DURATION_IN_MS);
    setHistoryOpen(false);
    setIsClosing(false);
  };

  const isPressed = false;
  const isHistoryPressed = false;

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
      {historyOpen &&
        createPortal(
          <HistoryProgress
            isClosing={isClosing}
            onClose={handleCloseHistory}
          />,
          document.body,
        )}

      <div className="profileContainer">
        <div className="dataHave">
          <div className="recordText">
            <h4>Запись прогресса</h4>
            <p>
              Чтобы отслеживать прогресс необходимо в конце каждой недели
              обновлять параметры.
            </p>
          </div>
          <button
            className="recordBtn"
            onClick={() => navigate('/record')}
            style={{
              background: isPressed ? '#C0C0C0' : '',
              borderColor: isPressed ? '#C0C0C0' : '',
            }}
          >
            <img src={chart} alt="Записать прогресс" />
            <p>Записать прогресс</p>
          </button>
          <button
            className="recordBtn"
            onClick={() => setHistoryOpen(!historyOpen)}
            style={{
              background: isHistoryPressed ? '#C0C0C0' : '',
              borderColor: isHistoryPressed ? '#C0C0C0' : '',
            }}
          >
            <img src={history} alt="История прогресса" />
            <p>История прогресса</p>
          </button>

          <UserDataTable />
          <MeasurementsTable />

          <div className="photosContainerBefore">
            <h3>Фотографии</h3>
            <p>До и после тренировочной недели</p>
            <div className="photosBefore">
              <PhotoEditor label="Фото до" userQuery={query} stage="before" />
              <PhotoEditor label="Фото после" userQuery={query} stage="after" />
            </div>
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}

const StyledEditButton = styled(IconButton)`
  button {
    width: 44px;
    height: 44px;
  }
`;
