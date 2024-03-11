import { z } from "zod";

export const eventSchema = z.object({
  date: z.coerce.date({
    required_error: "La fecha del evento es requerida.",
    invalid_type_error: "La fecha del evento no es una fecha.",
  }),
  description: z.string({
    required_error: "La descripción es requerida.",
  }),
  start_time: z.string({
    required_error: "La hora de inicio es requerida.",
  })
  ,
  end_time: z.string({
    required_error: "La hora de fin es requerida.",
  })
});
