import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string({
      required_error: "El título es requerido.",
    })
    .max(200),
  description: z.string({
    required_error: "La descripción es requerida.",
  }),
});
