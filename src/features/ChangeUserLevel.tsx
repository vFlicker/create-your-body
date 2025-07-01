import styled from '@emotion/styled';
import { JSX } from 'react';

import { useUpdateUser, useUser } from '~/entities/user';
import { Color } from '~/shared/theme/colors';

const VALUES = ['Новичок', 'Профи'];

export function ChangeUserLevel(): JSX.Element | null {
  const { user } = useUser();

  const { updateUser } = useUpdateUser();

  const handleSelectorClick = async (level: string) => {
    updateUser({ dto: { level } });
  };

  return (
    <ChangeUserLevelWrapper>
      <StyledTitle>Уровень сложности</StyledTitle>
      <StyledButtonsWrapper>
        {VALUES.map((value, index) => (
          <StyledButton
            key={index}
            isActive={user?.level === value}
            onClick={() => handleSelectorClick(value)}
          >
            {value}
          </StyledButton>
        ))}
      </StyledButtonsWrapper>
    </ChangeUserLevelWrapper>
  );
}

const ChangeUserLevelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 17px 30px;
  border-radius: 8px;

  color: ${({ isActive }) => (isActive ? Color.Black : Color.Black_300)};
  font-size: 16px;
  font-weight: 700;

  background-color: ${({ isActive }) =>
    isActive ? Color.Green_500 : Color.Black_50};

  cursor: pointer;
`;
