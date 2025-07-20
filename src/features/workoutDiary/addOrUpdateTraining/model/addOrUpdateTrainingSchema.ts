import { z } from 'zod';

const AddOrUpdateTrainingMessage = {
  name: {
    min: 'Название должно содержать не менее 2 символов',
  },
  date: {
    required: 'Укажите дату тренировки',
    invalid: 'Формат даты: ДД.ММ.ГГГГ',
  },
};

export const addOrUpdateTrainingSchema = z.object({
  name: z.string().min(2, { message: AddOrUpdateTrainingMessage.name.min }),
  date: z
    .string()
    .nonempty({ message: AddOrUpdateTrainingMessage.date.required })
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, {
      message: AddOrUpdateTrainingMessage.date.invalid,
    }),
});

export type AddOrUpdateTraining = z.infer<typeof addOrUpdateTrainingSchema>;
