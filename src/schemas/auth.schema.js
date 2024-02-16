import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "Correo inválido.",
    })
    .max(50, {
      message: "El correo electrónico debe tener un máximo de 50 caracteres.",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(8, {
      message: "La contraseña debe de tener al menos 8 caracteres.",
    })
    .max(25, { message: "La contraseña debe tener un máximo 25 caracteres." }),
});


export const updatePasswordSchema = z.object({
  oldPassword: z
    .string({
      required_error: "La contraseña actual es requerida.",
    })
    .min(8, {
      message: "La contraseña actual debe de tener al menos 8 caracteres.",
    })
    .max(25, { message: "La contraseña actual debe tener un máximo 25 caracteres." }),
  newPassword: z
    .string({
      required_error: "La contraseña nueva es requerida.",
    })
    .min(8, {
      message: "La contraseña nueva debe de tener al menos 8 caracteres.",
    })
    .max(25, { message: "La contraseña nueva debe tener un máximo 25 caracteres." }),
  confirmPassword: z
    .string({
      required_error: "Se requiere confirmar la nueva contraseña.",
    })
});
