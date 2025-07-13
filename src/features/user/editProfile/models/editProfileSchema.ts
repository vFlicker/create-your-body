import { z } from 'zod';

const EditProfileMessage = {
  name: {
    min: 'Имя должно содержать не менее 2 символов',
    max: 'Имя должно содержать не более 32 символов',
  },
  bornDate: {
    required: 'Укажите дату рождения',
    invalid: 'Формат даты: ДД.ММ.ГГГГ',
  },
  sex: {
    required: 'Укажите пол',
  },
  phone: {
    required: 'Укажите номер телефона',
    invalid: 'Формат: +7XXXXXXXXXX',
  },
};

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: EditProfileMessage.name.min })
    .max(32, { message: EditProfileMessage.name.max }),
  bornDate: z
    .string()
    .nonempty({ message: EditProfileMessage.bornDate.required })
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, {
      message: EditProfileMessage.bornDate.invalid,
    }),
  sex: z.enum(['male', 'female'], {
    message: EditProfileMessage.sex.required,
  }),
  phone: z
    .string()
    .nonempty({ message: EditProfileMessage.phone.required })
    .regex(/^\+7\d{10}$/, { message: EditProfileMessage.phone.invalid }),
});

export type EditProfile = z.infer<typeof editProfileSchema>;
