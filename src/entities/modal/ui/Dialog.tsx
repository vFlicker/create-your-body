import styled from '@emotion/styled';
import { Content } from '@radix-ui/react-dialog';
import { JSX, MouseEvent } from 'react';

type DialogProps = {
  children: JSX.Element;
  onClose?: () => void;
};

export function Dialog({ children }: DialogProps): JSX.Element {
  const handleModalWrapperClick = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };

  return (
    <StyledDialogWrapper onClick={handleModalWrapperClick}>
      <StyledContent>{children}</StyledContent>
    </StyledDialogWrapper>
  );
}

const StyledDialogWrapper = styled(Content)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;

  width: 340px;
  border-radius: 10px;

  overflow: hidden;
  z-index: 20;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  padding: 26px 24px;

  background-color: #ffffff;

  overflow-y: auto;
`;
