import { z } from 'zod';

const CreatePersonalBmiMessage = {
  validationErrorMessage: 'Все поля должны быть заполнены',
};

export const createPersonalBmiSchema = z
  .object({
    calories: z.coerce.number(),
    proteins: z.coerce.number(),
    fats: z.coerce.number(),
    carbs: z.coerce.number(),
  })
  .refine(
    (data) =>
      Object.values(data).every((value) => value !== undefined && value !== 0),
    {
      path: ['common'],
      message: CreatePersonalBmiMessage.validationErrorMessage,
    },
  );

export type CreatePersonalBmi = z.infer<typeof createPersonalBmiSchema> & {
  common?: string;
};
