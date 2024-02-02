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
    .min(6, {
      message: "La contraseña debe de tener al menos 6 caracteres.",
    })
    .max(25, { message: "La contraseña debe tener un máximo 25 caracteres." }),
});

/* 
export const updateSchema = z.object({
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
  phonenumber: z
    .string({
      required_error: "El telefono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 dígitos.",
    }),
  firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(25, {
      message: "El campo nombre(s) debe tener un máximo de 25 caracteres.",
    }),
  lastname: z
    .string({
      required_error: "El apellido es requerido.",
    })
    .max(25, {
      message: "Los apellidos deben tener un máximo de 25 caracteres.",
    }),
});
 */