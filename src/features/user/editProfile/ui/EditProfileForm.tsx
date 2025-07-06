import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUpdateUser, useUser } from '~/entities/user';
import { formatDateForApi, formatDateForView } from '~/shared/libs/date';
import { showTelegramAlert } from '~/shared/libs/telegram';
import { AppRoute } from '~/shared/router';
import { Button } from '~/shared/ui/atoms/Button';
import { Input } from '~/shared/ui/molecules/Input';
import { Radio, RadioGroup } from '~/shared/ui/molecules/radio';

import { EditProfile, editProfileSchema } from '../models/editProfileSchema';

type EditProfileFormProps = {
  className?: string;
  onSubmit?: (data: EditProfile) => void;
};

const GENDER_OPTIONS = [
  { label: 'М', value: 'male' },
  { label: 'Ж', value: 'female' },
] as const;

export function EditProfileForm({
  className,
}: EditProfileFormProps): JSX.Element {
  const navigate = useNavigate();

  const { user } = useUser();
  const { updateUser, isUpdateUserLoading } = useUpdateUser();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name || '',
      bornDate: formatDateForView(user?.bornDate || ''),
      sex: user?.sex,
      phone: user?.phone || '+7',
    },
  });

  const onSubmit = async ({ bornDate, ...rest }: EditProfile) => {
    try {
      await updateUser({
        dto: {
          bornDate: formatDateForApi(bornDate),
          ...rest,
        },
      });
      navigate(AppRoute.Profile);
    } catch (error) {
      console.error('Error saving data:', error);
      showTelegramAlert('Ошибка при сохранении данных');
    }
  };

  return (
    <StyledForm className={className} onSubmit={handleSubmit(onSubmit)}>
      <StyledInputWrapper>
        <Input
          label="Ваше имя"
          placeholder="Введите имя"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Дата рождения"
          placeholder="01.01.2000"
          {...register('bornDate')}
          error={errors.bornDate?.message}
        />
      </StyledInputWrapper>

      <StyledInputWrapper>
        <Controller
          name="sex"
          control={control}
          render={({ field: { name, value: selectedValue, onChange } }) => (
            <RadioGroup label="Пол" name={name} error={errors.sex?.message}>
              {GENDER_OPTIONS.map(({ label, value }) => (
                <Radio
                  key={label}
                  label={label}
                  value={value}
                  checked={selectedValue === value}
                  onChange={onChange}
                />
              ))}
            </RadioGroup>
          )}
        />

        <Input
          label="Номер телефона"
          placeholder="+7"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </StyledInputWrapper>

      <Input label="Электронная почта" value={user?.email || ''} disabled />

      <StyledButton type="submit" color="accent" disabled={isUpdateUserLoading}>
        Отправить
      </StyledButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
`;

const StyledInputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 16px;
`;

const StyledButton = styled(Button)`
  margin-top: auto;
`;
