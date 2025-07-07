import { z } from 'zod';

export const createNutritionReportSchema = z.object({
  weight: z.coerce.number().optional(),
  steps: z.coerce.number().optional(),
  calories: z.coerce.number().optional(),
  proteins: z.coerce.number().optional(),
  fats: z.coerce.number().optional(),
  carbohydrates: z.coerce.number().optional(),
});

export type CreateNutritionReport = z.infer<typeof createNutritionReportSchema>;
