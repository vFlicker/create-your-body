import styled from '@emotion/styled';
import { JSX } from 'react';

import { useToastStore } from '~/entities/toast';
import { useUpdateUser, useUser } from '~/entities/user';
import { Color } from '~/shared/theme/colors';

const VALUES = ['Новичок', 'Профи'];

export function ChangeUserLevel(): JSX.Element | null {
  const { user } = useUser();

  const { updateUser } = useUpdateUser();
  const showToast = useToastStore((s) => s.showToast);

  const handleSelectorClick = async (level: string) => {
    try {
      await updateUser({ dto: { level } });
    } catch {
      showToast('Не удалось сменить уровень', 'error');
    }
  };

  return (
    <ChangeUserLevelWrapper>
      <StyledTitle>Уровень сложности</StyledTitle>
      <StyledButtonsWrapper>
        {VALUES.map((value, index) => (
          <StyledButton
            key={index}
            isActive={user?.level === value}
            level={value}
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

const StyledButton = styled.button<{ isActive: boolean; level: string }>`
  width: 100%;
  padding: 17px 30px;
  border: none;
  border-radius: 8px;

  color: ${({ isActive }) => (isActive ? Color.Black : Color.Black_300)};
  font-size: 16px;
  font-weight: 700;

  background-color: ${({ isActive, level }) =>
    isActive
      ? level === 'Профи'
        ? Color.Violet_200
        : Color.Green_500
      : Color.Black_50};

  cursor: pointer;
`;
