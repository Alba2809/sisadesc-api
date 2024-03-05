import { z } from "zod";

export const eventSchema = z.object({
  date: z.coerce.date({
    required_error: "La fecha del evento es requerida.",
    invalid_type_error: "La fecha del evento no es una fecha.",
  }),
  description: z.string({
    required_error: "La descripción es requerida.",
  }),
});
