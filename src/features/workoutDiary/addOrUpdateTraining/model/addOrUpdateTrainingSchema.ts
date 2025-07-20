import { isPast } from 'date-fns';
import { z } from 'zod';

import { convertRuDateToIso } from '~/shared/libs/format';

const AddOrUpdateTrainingMessage = {
  name: {
    min: 'Название должно содержать не менее 2 символов',
  },
  date: {
    required: 'Укажите дату тренировки',
    invalid: 'Формат даты: ДД.ММ.ГГГГ',
    futureDateError: 'Нельзя создать тренировку на будущую дату',
  },
};

export const addOrUpdateTrainingSchema = z.object({
  name: z.string().min(2, { message: AddOrUpdateTrainingMessage.name.min }),
  date: z
    .string()
    .nonempty({ message: AddOrUpdateTrainingMessage.date.required })
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, {
      message: AddOrUpdateTrainingMessage.date.invalid,
    })
    .refine(
      (date) => {
        const trainingDate = convertRuDateToIso(date);
        return isPast(trainingDate);
      },
      {
        message: AddOrUpdateTrainingMessage.date.futureDateError,
      },
    ),
});

export type AddOrUpdateTraining = z.infer<typeof addOrUpdateTrainingSchema>;
