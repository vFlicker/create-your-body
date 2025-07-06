import { z } from 'zod';

export const createMeasurementsSchema = z.object({
  chest: z.coerce.number().optional(),
  waist: z.coerce.number().optional(),
  abdominalCircumference: z.coerce.number().optional(),
  hips: z.coerce.number().optional(),
  legs: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
});

export type CreateMeasurements = z.infer<typeof createMeasurementsSchema>;
