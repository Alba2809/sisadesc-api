import { z } from "zod";

export const createUserSchema = z.object({
  firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  lastnamepaternal: z
    .string({
      required_error: "El primer apellido es requerido.",
    })
    .max(20, {
      message: "El primer apellido debe tener un máximo de 20 caracteres.",
    }),
  lastnamematernal: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(20, {
      message: "El segundo apellido debe tener un máximo de 20 caracteres.",
    }),
  curp: z
    .string({
      required_error: "El CURP es requerido.",
    })
    .length(13, {
      message: "El CURP debe tener 13 caracteres.",
    }),
  rfc: z
    .string({
      required_error: "El RFC es requerido.",
    })
    .length(13, {
      message: "El RFC debe tener 13 caracteres.",
    }),
  email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "Correo inválido.",
    })
    .max(30, {
      message: "El correo electrónico debe tener un máximo de 30 caracteres.",
    }),
  rol: z.string({
    required_error: "El rol es requerido.",
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

export const updateUserSchema = z.object({
  firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  lastnamepaternal: z
    .string({
      required_error: "El primer apellido es requerido.",
    })
    .max(20, {
      message: "El primer apellido debe tener un máximo de 20 caracteres.",
    }),
  lastnamematernal: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(20, {
      message: "El segundo apellido debe tener un máximo de 20 caracteres.",
    }),
  curp: z
    .string({
      required_error: "El CURP es requerido.",
    })
    .length(13, {
      message: "El CURP debe tener 13 caracteres.",
    }),
  rfc: z
    .string({
      required_error: "El RFC es requerido.",
    })
    .length(13, {
      message: "El RFC debe tener 13 caracteres.",
    }),
  email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "Correo inválido.",
    })
    .max(30, {
      message: "El correo electrónico debe tener un máximo de 30 caracteres.",
    }),
  street: z
    .string({
      required_error: "La calle es requerida.",
    })
    .max(30, {
      message: "La calle debe tener un máximo de 30 caracteres.",
    }),
  colony: z
    .string({
      required_error: "La colonia es requerida.",
    })
    .max(30, {
      message: "La colonia debe tener un máximo de 30 caracteres.",
    }),
  postalcode: z
    .string({
      required_error: "El código postal es requerida.",
    })
    .length(5, {
      message: "El código postal debe tener 5 caracteres.",
    }),
  phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    }),
  birthdate: z.coerce.date({
    required_error: "La fecha es requerida.",
    invalid_type_error: "No es una fecha.",
  }),
  status: z.string({
    required_error: "El estado es requerido.",
  }),
  rol: z.string({
    required_error: "El rol es requerido.",
  }),
  imageperfile: z.string().nullable(),
});

export const teacherSchema = z.object({
  firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  lastnamepaternal: z
    .string({
      required_error: "El primer apellido es requerido.",
    })
    .max(20, {
      message: "El primer apellido debe tener un máximo de 20 caracteres.",
    }),
  lastnamematernal: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(20, {
      message: "El segundo apellido debe tener un máximo de 20 caracteres.",
    }),
  curp: z
    .string({
      required_error: "El CURP es requerido.",
    })
    .length(13, {
      message: "El CURP debe tener 13 caracteres.",
    }),
  rfc: z
    .string({
      required_error: "El RFC es requerido.",
    })
    .length(13, {
      message: "El RFC debe tener 13 caracteres.",
    }),
  gender: z.string({
    required_error: "El género es requerido.",
  }),
  phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    }),
  birthdate: z.coerce.date({
    required_error: "La fecha es requerida.",
    invalid_type_error: "No es una fecha.",
  }),
  street: z
    .string({
      required_error: "La calle es requerida.",
    })
    .max(30, {
      message: "La calle debe tener un máximo de 30 caracteres.",
    }),
  colony: z
    .string({
      required_error: "La colonia es requerida.",
    })
    .max(30, {
      message: "La colonia debe tener un máximo de 30 caracteres.",
    }),
  postalcode: z
    .string({
      required_error: "El código postal es requerida.",
    })
    .length(5, {
      message: "El código postal debe tener 5 caracteres.",
    }),
});

export const studentSchema = z.object({
  firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  lastnamepaternal: z
    .string({
      required_error: "El primer apellido es requerido.",
    })
    .max(20, {
      message: "El primer apellido debe tener un máximo de 20 caracteres.",
    }),
  lastnamematernal: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(20, {
      message: "El segundo apellido debe tener un máximo de 20 caracteres.",
    }),
  curp: z
    .string({
      required_error: "El CURP es requerido.",
    })
    .length(13, {
      message: "El CURP debe tener 13 caracteres.",
    }),
  gender: z.string({
    required_error: "El género es requerido.",
  }),
  birthdate: z.coerce.date({
    required_error: "La fecha es requerida.",
    invalid_type_error: "No es una fecha.",
  }),
  street: z
    .string({
      required_error: "La calle es requerida.",
    })
    .max(30, {
      message: "La calle debe tener un máximo de 30 caracteres.",
    }),
  colony: z
    .string({
      required_error: "La colonia es requerida.",
    })
    .max(30, {
      message: "La colonia debe tener un máximo de 30 caracteres.",
    }),
  postalcode: z
    .string({
      required_error: "El código postal es requerida.",
    })
    .length(5, {
      message: "El código postal debe tener 5 caracteres.",
    }),
  email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "Correo inválido.",
    })
    .max(30, {
      message: "El correo electrónico debe tener un máximo de 30 caracteres.",
    }),
  subjects: z.array(z.string()).refine((array) => array.length > 0, {
    message: "Debe haber al menos una asignatura.",
  }),
  group: z
    .string({
      required_error: "El grupo es requerida.",
    })
    .max(5, {
      message: "El grupo debe tener un máximo de 5 caracteres.",
    }),
  phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    }),
});

export const subjectSchema = z.object({
  firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  code: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(10, {
      message: "El segundo apellido debe tener un máximo de 10 caracteres.",
    }),
});
