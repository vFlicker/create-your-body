import { z } from 'zod';

const CreateDailyReportMessage = {
  validationErrorMessage: 'Хотя бы одно поле должно быть заполнено',
};

export const createDailyReportSchema = z
  .object({
    weight: z.coerce.number().optional(),
    steps: z.coerce.number().optional(),
    calories: z.coerce.number().optional(),
    proteins: z.coerce.number().optional(),
    fats: z.coerce.number().optional(),
    carbs: z.coerce.number().optional(),
  })
  .refine(
    (data) =>
      Object.values(data).some((value) => value !== undefined && value !== 0),
    {
      path: ['common'],
      message: CreateDailyReportMessage.validationErrorMessage,
    },
  );

export type CreateDailyReport = z.infer<typeof createDailyReportSchema> & {
  common?: string;
};
