import styled from '@emotion/styled';
import { Content } from '@radix-ui/react-dialog';
import { JSX, MouseEvent } from 'react';

import type { PopupNotification } from '~/entities/popupNotification';
import { Cms2ContentRenderer } from '~/shared/ui/molecules/cms2Blocks';

import { ImageCarousel } from './ui/ImageCarousel';

type PopupNotificationModalProps = {
  notification: PopupNotification;
  onAction: (
    action: PopupNotification['content']['buttons'][number]['action'],
  ) => void;
  onDismiss: () => void;
};

export function PopupNotificationModal({
  notification,
  onAction,
  onDismiss,
}: PopupNotificationModalProps): JSX.Element {
  const { title, content } = notification;
  const { media, blocks, buttons, settings } = content;
  const isDismissible = settings.dismissible;

  const handleModalClick = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };

  if (isDismissible) {
    const hasMedia = media && media.items.length > 0;

    return (
      <StyledSheetWrapper onClick={handleModalClick}>
        <StyledSheetContent>
          {hasMedia && (
            <StyledMediaWrapper>
              <ImageCarousel items={media.items} />
              <StyledCloseButtonOnMedia onClick={onDismiss} />
            </StyledMediaWrapper>
          )}
          {!hasMedia && (
            <>
              <StyledCloseButtonNoMedia onClick={onDismiss} />
              <StyledTopSpacer />
            </>
          )}
          <StyledContentInner>
            <StyledTitle>{title}</StyledTitle>
            <Cms2ContentRenderer nodes={blocks} />
          </StyledContentInner>
          <StyledButtonsContainer>
            {buttons.map((button, index) => (
              <NotificationButton
                key={index}
                buttonStyle={button.style}
                isLink={button.action.type === 'url'}
                onClick={() => onAction(button.action)}
              >
                {button.text}
              </NotificationButton>
            ))}
          </StyledButtonsContainer>
        </StyledSheetContent>
      </StyledSheetWrapper>
    );
  }

  return (
    <StyledFullscreenWrapper onClick={handleModalClick}>
      <StyledFullscreenInner>
        {media && media.items.length > 0 && (
          <ImageCarousel items={media.items} />
        )}
        <StyledContentInner>
          <StyledTitle>{title}</StyledTitle>
          <Cms2ContentRenderer nodes={blocks} />
        </StyledContentInner>
        <StyledButtonsContainer>
          {buttons.map((button, index) => (
            <NotificationButton
              key={index}
              buttonStyle={button.style}
              isLink={button.action.type === 'url'}
              onClick={() => onAction(button.action)}
            >
              {button.text}
            </NotificationButton>
          ))}
        </StyledButtonsContainer>
      </StyledFullscreenInner>
    </StyledFullscreenWrapper>
  );
}

type NotificationButtonProps = {
  buttonStyle: 'primary' | 'secondary' | 'link';
  isLink?: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

function NotificationButton({
  buttonStyle,
  isLink,
  children,
  onClick,
}: NotificationButtonProps): JSX.Element {
  if (buttonStyle === 'link' || isLink) {
    return (
      <StyledLinkButton onClick={onClick}>
        {children}
        <ExternalLinkIcon />
      </StyledLinkButton>
    );
  }

  return (
    <StyledButton isPrimary={buttonStyle === 'primary'} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

function ExternalLinkIcon(): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 9L21 3M21 3H15M21 3L13 11M10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Fullscreen mode styles (dismissible: false)
const StyledFullscreenWrapper = styled(Content)`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  z-index: 20;

  &[data-state='open'] {
    animation: fullscreenFadeIn 0.25s ease-out;
  }

  &[data-state='closed'] {
    animation: fullscreenFadeOut 0.2s ease-in;
  }

  @keyframes fullscreenFadeIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fullscreenFadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.96);
    }
  }
`;

const StyledFullscreenInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

// Sheet mode styles (dismissible: true)
const StyledSheetWrapper = styled(Content)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  max-height: 90dvh;
  border-radius: 20px 20px 0 0;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 20;

  @supports (-webkit-touch-callout: none) {
    max-height: calc(90 * var(--vh, 1vh));
  }

  &[data-state='open'] {
    animation: sheetSlideIn 0.3s ease-out;
  }

  &[data-state='closed'] {
    animation: sheetSlideOut 0.2s ease-in;
  }

  @keyframes sheetSlideIn {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes sheetSlideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  }
`;

const StyledSheetContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const StyledMediaWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const StyledCloseButtonOnMedia = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  cursor: pointer;
  z-index: 5;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 2px;
    background-color: #ffffff;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const StyledCloseButtonNoMedia = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background-color: var(--black-100, #eaeaef);
  color: var(--black-600, #666666);
  cursor: pointer;
  z-index: 5;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 2px;
    background-color: currentColor;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const StyledTopSpacer = styled.div`
  height: 48px;
  flex-shrink: 0;
`;

// Shared styles
const StyledContentInner = styled.div`
  flex: 1;
  padding: 16px 20px 0;
  overflow-y: auto;
`;

const StyledTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: #0d0d0d;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 20px 32px;
  flex-shrink: 0;
`;

const StyledButton = styled.button<{ isPrimary: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  min-height: 46px;
  padding: 8px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  ${({ isPrimary }) =>
    isPrimary
      ? `
    background-color: var(--violet-500, #a799ff);
    color: #ffffff;
  `
      : `
    background-color: var(--black-100, #eaeaef);
    color: var(--black-900, #1a1a1a);
  `}

  &:active {
    opacity: 0.8;
  }
`;

const StyledLinkButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 6px;
  width: 100%;
  min-height: 46px;
  padding: 8px;
  background: none;
  border: 1.5px solid var(--black-200, #d4d4d8);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--black-900, #1a1a1a);
  cursor: pointer;
  transition: background-color 0.2s;

  &:active {
    background-color: var(--black-50, #f5f5f5);
  }

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
`;
