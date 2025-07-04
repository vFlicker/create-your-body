import { z } from 'zod';

export const CreateMeasurementsSchema = z.object({
  chest: z.coerce.number(),
  waist: z.coerce.number(),
  abdominalCircumference: z.coerce.number(),
  hips: z.coerce.number(),
  legs: z.coerce.number(),
  weight: z.coerce.number(),
});
