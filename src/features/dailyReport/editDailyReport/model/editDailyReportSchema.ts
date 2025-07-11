import { z } from 'zod';

const UpdateDailyReportMessage = {
  validationErrorMessage: 'Хотя бы одно поле должно быть заполнено',
};

export const editDailyReportSchema = z
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
      message: UpdateDailyReportMessage.validationErrorMessage,
    },
  );

export type EditDailyReport = z.infer<typeof editDailyReportSchema> & {
  common?: string;
};
