import styled from '@emotion/styled';
import { JSX } from 'react';

import { Dialog, useModalStore } from '~/entities/modal';
// import { useUpdateUser } from '~/entities/user';
import { Button } from '~/shared/ui/atoms/Button';

type ShowIntroVideoWidgetProps = {
  hasWatchedIntroVideo: boolean;
};

export function ShowIntroVideoWidget({
  hasWatchedIntroVideo,
}: ShowIntroVideoWidgetProps): JSX.Element {
  const { openModal, closeModal } = useModalStore();
  // const { updateUser } = useUpdateUser();

  const handleButtonClick = () => {
    openModal(
      <StyledDialog>
        <StyledDialogContent>
          <StyledTitle>Инструкция по приложению CYB</StyledTitle>
          <StyledVideo
            src="https://kinescope.io/2jnc2LpATwYFeifpgtSnYq"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
            allowFullScreen
          />
          <Button color="accent" onClick={closeModal}>
            Я посмотрела
          </Button>
        </StyledDialogContent>
      </StyledDialog>,
      {
        onClose: async () => {
          // if (hasWatchedIntroVideo) return;
          // await updateUser({ dto: { viewedIntroVideo: true } });
          console.log({ hasWatchedIntroVideo });
        },
      },
    );
  };

  return (
    <StyledShowIntroVideoWidget>
      <StyledTitle>Инструкция по приложению</StyledTitle>
      <Button color="accent" variant="outlined" onClick={handleButtonClick}>
        Просмотреть
      </Button>
    </StyledShowIntroVideoWidget>
  );
}

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 90vw;
  height: max-content;
`;

const StyledShowIntroVideoWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledDialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
`;

const StyledVideo = styled.iframe`
  height: 100%;
  width: 100%;

  border: none;
  border-radius: 14px;

  background-color: #000000;
  aspect-ratio: 16 / 9;

  overflow: hidden;
`;
