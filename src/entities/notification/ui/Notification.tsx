import styled from '@emotion/styled';
import { JSX } from 'react';

import { notificationConfig } from '../notificationConfig';
import { NotificationContent } from './NotificationContent';

export function Notification(): JSX.Element {
  return (
    <StyledNotificationWrapper>
      <StyledTitle>Уведомления</StyledTitle>
      <StyledNotificationList>
        {notificationConfig.map(({ day, items }) => (
          <StyledGroupByDay key={day}>
            <StyledDay>{day}</StyledDay>
            <StyledNotificationContentList>
              {items.map((item) => (
                <NotificationContent key={item.id} {...item} />
              ))}
            </StyledNotificationContentList>
          </StyledGroupByDay>
        ))}
      </StyledNotificationList>
    </StyledNotificationWrapper>
  );
}

const StyledNotificationWrapper = styled.div``;

const StyledTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const StyledNotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledGroupByDay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledDay = styled.div`
  color: #8b8b9f;
  font-size: 12px;
  font-weight: 500;
`;

const StyledNotificationContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
