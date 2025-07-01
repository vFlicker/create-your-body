import styled from '@emotion/styled';
import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  convertDateToBackendFormat,
  formatDateForDisplay,
  useUpdateUser,
  useUser,
} from '~/entities/user';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { userSession } from '~/shared/libs/userSession';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/Button';
import { Input } from '~/shared/ui/Input';
import { RadioButton } from '~/shared/ui/RadioButton';
import { UserPageLayout } from '~/widgets/UserPageLayout';

export function ProfileEditPage(): JSX.Element {
  const navigate = useNavigate();

  const currentUserSession = userSession.getCurrentUser();
  const { user, isUserPending } = useUser();

  const [bornDate, setBornDate] = useState(
    formatDateForDisplay(user?.bornDate || ''),
  );
  const [sex, setSex] = useState(user?.sex || '');

  const { updateUser } = useUpdateUser();

  if (!currentUserSession || isUserPending || !user) {
    return <UserPageLayout isLoading={true} />;
  }

  const handleSubmit = async () => {
    try {
      const formattedBornDate = convertDateToBackendFormat(bornDate);
      const userData = { sex, bornDate: formattedBornDate };
      await updateUser({ dto: userData });

      navigate(AppRoute.Profile);
    } catch (error) {
      console.error('Error saving data:', error);
      showTelegramAlert('Ошибка при сохранении данных');
    }
  };

  return (
    <UserPageLayout isLoading={false}>
      <StyledProfileEditPageWrapper>
        <StyledFieldset>
          <StyledTitle>Личные данные</StyledTitle>
          <StyledInputsWrapper>
            <Input
              type="date"
              value={bornDate}
              onChange={(e) => setBornDate(e.target.value)}
              label="Дата рождения"
            />
            <RadioButton
              label="Пол"
              names={['М', 'Ж']}
              options={['male', 'female']}
              activeOption={sex}
              onClick={(sex) => setSex(sex)}
            />
          </StyledInputsWrapper>
        </StyledFieldset>
        <StyledButton color="accent" onClick={handleSubmit}>
          Сохранить
        </StyledButton>
      </StyledProfileEditPageWrapper>
    </UserPageLayout>
  );
}

const StyledProfileEditPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledFieldset = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTitle = styled.h3`
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 700;
`;

const StyledInputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 16px;
`;

const StyledButton = styled(Button)`
  margin-top: auto;
`;
