import styled from '@emotion/styled';
import { JSX, useState } from 'react';

import { useUpdateUser, useUser } from '~/entities/user';
import closeIconSrc from '~/shared/assets/svg/close.svg';
import rightIconSrc from '~/shared/assets/svg/right.svg';
import settingsIconSrc from '~/shared/assets/svg/settings.svg';
import { useUserSession } from '~/shared/store';
import { Color } from '~/shared/theme/colors';
import { Toggler } from '~/shared/ui/Toggler';

export function ChangeUserLevel(): JSX.Element {
  const [open, setOpen] = useState(false);

  const { user } = useUser();
  const { userQuery } = useUserSession();

  const { updateUser } = useUpdateUser();

  const handleSelectorClick = async (level) => {
    updateUser({ userQuery, dto: { level } });
  };

  return (
    <ChangeUserLevelWrapper>
      <StyledOpenMenuButton onClick={() => setOpen((prevOpen) => !prevOpen)}>
        <img src={settingsIconSrc} />
        Настроить уровень сложности
        <StyledCloseIcon src={open ? closeIconSrc : rightIconSrc} />
      </StyledOpenMenuButton>
      {open && (
        <Toggler
          backgroundColor={Color.White}
          values={['Новичок', 'Профи']}
          activeValue={user.level}
          onClick={handleSelectorClick}
        />
      )}
    </ChangeUserLevelWrapper>
  );
}

const ChangeUserLevelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 10px 16px;
  border-radius: 16px;

  background-color: #f2f2f2;
`;

const StyledOpenMenuButton = styled.button`
  position: relative;

  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  color: #0d0d0d;
  font-size: 14px;
`;

const StyledCloseIcon = styled.img`
  margin-left: auto;
`;
