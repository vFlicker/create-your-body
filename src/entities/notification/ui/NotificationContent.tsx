import styled from '@emotion/styled';
import { JSX } from 'react';

type NotificationContentProps = {
  id: string;
  title: string;
  time: string;
  description: string;
  read: boolean;
};

export function NotificationContent({
  description,
  id,
  time,
  title,
  read,
}: NotificationContentProps): JSX.Element {
  return (
    <StyledNotificationContent key={id}>
      <StyledHeader>
        <StyledTitle read={read}>{title}</StyledTitle>
        <StyledDate>{time}</StyledDate>
      </StyledHeader>
      <StyledText>{description}</StyledText>
    </StyledNotificationContent>
  );
}

const StyledNotificationContent = styled.div`
  position: relative;

  &:not(:last-child)::after {
    content: '';

    position: absolute;
    left: 0;
    bottom: -16px;

    width: 100%;
    height: 1px;

    background-color: #f0f0f3;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledTitle = styled.h4<Pick<NotificationContentProps, 'read'>>`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  color: ${({ read }) => (read ? '#0D0D0D' : '#7A66FF')};
  font-size: 14px;
  font-weight: 600;

  &::before {
    content: '';
    display: ${({ read }) => (read ? 'none' : 'inline-block')};
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #7a66ff;
  }
`;

const StyledDate = styled.div`
  color: #8b8b9f;
  font-size: 11px;
  font-weight: 500;
`;

const StyledText = styled.p`
  color: #42424f;
  line-height: 140%;
`;
