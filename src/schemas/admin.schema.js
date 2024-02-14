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
    .length(18, {
      message: "El CURP debe tener 18 caracteres.",
    }),
  rfc: z
    .string()
    .nullable()
    .refine((value) => value === null || value.length === 13 || value === "", {
      message: "El RFC debe tener exactamente 13 caracteres.",
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
  role: z.number({
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
    .length(18, {
      message: "El CURP debe tener 18 caracteres.",
    }),
  rfc: z
    .string()
    .nullable()
    .refine((value) => value === null || value.length === 13 || value === "", {
      message: "El RFC debe tener exactamente 13 caracteres.",
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
  addressid: z.string({
    required_error: "Se requiere una dirección.",
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
  role: z.number({
    required_error: "El rol es requerido.",
  }),
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
    .length(18, {
      message: "El CURP debe tener 18 caracteres.",
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
  colony: z.string({
    required_error: "La colonia es requerida.",
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
  student_firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  student_lastnamepaternal: z
    .string({
      required_error: "El primer apellido es requerido.",
    })
    .max(20, {
      message: "El primer apellido debe tener un máximo de 20 caracteres.",
    }),
  student_lastnamematernal: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(20, {
      message: "El segundo apellido debe tener un máximo de 20 caracteres.",
    }),
  student_curp: z
    .string({
      required_error: "El CURP es requerido.",
    })
    .length(18, {
      message: "El CURP debe tener 18 caracteres.",
    }),
  student_gender: z.string({
    required_error: "El género es requerido.",
  }),
  student_birthdate: z.coerce.date({
    required_error: "La fecha es requerida.",
    invalid_type_error: "No es una fecha.",
  }),
  student_street: z
    .string({
      required_error: "La calle es requerida.",
    })
    .max(30, {
      message: "La calle debe tener un máximo de 30 caracteres.",
    }),
  student_colony: z.string({
    required_error: "La colonia es requerida.",
  }),
  student_postalcode: z
    .string({
      required_error: "El código postal es requerida.",
    })
    .length(5, {
      message: "El código postal debe tener 5 caracteres.",
    }),
  student_email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "Correo inválido.",
    })
    .max(30, {
      message: "El correo electrónico debe tener un máximo de 30 caracteres.",
    }),
  student_group: z
    .string({
      required_error: "El grupo es requerida.",
    })
    .max(5, {
      message: "El grupo debe tener un máximo de 5 caracteres.",
    }),
  student_phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    }),
});

export const fatherSchema = z.object({
  father_firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  father_lastnamepaternal: z
    .string({
      required_error: "El primer apellido es requerido.",
    })
    .max(20, {
      message: "El primer apellido debe tener un máximo de 20 caracteres.",
    }),
  father_lastnamematernal: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(20, {
      message: "El segundo apellido debe tener un máximo de 20 caracteres.",
    }),
  father_curp: z
    .string({
      required_error: "El CURP es requerido.",
    })
    .length(18, {
      message: "El CURP debe tener 18 caracteres.",
    }),
  father_email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "Correo inválido.",
    })
    .max(30, {
      message: "El correo electrónico debe tener un máximo de 30 caracteres.",
    }),
  father_rfc: z
    .string()
    .nullable()
    .refine((value) => value === null || value.length === 13 || value === "", {
      message: "El RFC debe tener exactamente 13 caracteres.",
    }),
  father_phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    }),
  father_street: z
    .string({
      required_error: "La calle es requerida.",
    })
    .max(30, {
      message: "La calle debe tener un máximo de 30 caracteres.",
    }),
  father_colony: z.string({
    required_error: "La colonia es requerida.",
  }),
  father_birthdate: z.coerce.date({
    required_error: "La fecha es requerida.",
    invalid_type_error: "No es una fecha.",
  }),
  father_postalcode: z
    .string({
      required_error: "El código postal es requerida.",
    })
    .length(5, {
      message: "El código postal debe tener 5 caracteres.",
    }),
  father_gender: z.string({
    required_error: "El género es requerido.",
  }),
  father_status: z.string({
    required_error: "El género es requerido.",
  }),
});

export const motherSchema = z.object({
  mother_firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  mother_lastnamepaternal: z
    .string({
      required_error: "El primer apellido es requerido.",
    })
    .max(20, {
      message: "El primer apellido debe tener un máximo de 20 caracteres.",
    }),
  mother_lastnamematernal: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(20, {
      message: "El segundo apellido debe tener un máximo de 20 caracteres.",
    }),
  mother_curp: z
    .string({
      required_error: "El CURP es requerido.",
    })
    .length(18, {
      message: "El CURP debe tener 18 caracteres.",
    }),
  mother_email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "Correo inválido.",
    })
    .max(30, {
      message: "El correo electrónico debe tener un máximo de 30 caracteres.",
    }),
  mother_rfc: z
    .string()
    .nullable()
    .refine((value) => value === null || value.length === 13 || value === "", {
      message: "El RFC debe tener exactamente 13 caracteres.",
    }),
  mother_phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    }),
  mother_street: z
    .string({
      required_error: "La calle es requerida.",
    })
    .max(30, {
      message: "La calle debe tener un máximo de 30 caracteres.",
    }),
  mother_colony: z.string({
    required_error: "La colonia es requerida.",
  }),
  mother_birthdate: z.coerce.date({
    required_error: "La fecha es requerida.",
    invalid_type_error: "No es una fecha.",
  }),
  mother_postalcode: z
    .string({
      required_error: "El código postal es requerida.",
    })
    .length(5, {
      message: "El código postal debe tener 5 caracteres.",
    }),
  mother_gender: z.string({
    required_error: "El género es requerido.",
  }),
  mother_status: z.string({
    required_error: "El género es requerido.",
  }),
});

export const tutorSchema = z.object({
  tutor_firstname: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  tutor_lastnamepaternal: z
    .string({
      required_error: "El primer apellido es requerido.",
    })
    .max(20, {
      message: "El primer apellido debe tener un máximo de 20 caracteres.",
    }),
  tutor_lastnamematernal: z
    .string({
      required_error: "El segundo apellido es requerido.",
    })
    .max(20, {
      message: "El segundo apellido debe tener un máximo de 20 caracteres.",
    }),
  tutor_curp: z
    .string({
      required_error: "El CURP es requerido.",
    })
    .length(18, {
      message: "El CURP debe tener 18 caracteres.",
    }),
  tutor_email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "Correo inválido.",
    })
    .max(30, {
      message: "El correo electrónico debe tener un máximo de 30 caracteres.",
    }),
  tutor_rfc: z
    .string()
    .nullable()
    .refine((value) => value === null || value.length === 13 || value === "", {
      message: "El RFC debe tener exactamente 13 caracteres.",
    }),
  tutor_phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    }),
  tutor_street: z
    .string({
      required_error: "La calle es requerida.",
    })
    .max(30, {
      message: "La calle debe tener un máximo de 30 caracteres.",
    }),
  tutor_colony: z.string({
    required_error: "La colonia es requerida.",
  }),
  tutor_birthdate: z.coerce.date({
    required_error: "La fecha es requerida.",
    invalid_type_error: "No es una fecha.",
  }),
  tutor_postalcode: z
    .string({
      required_error: "El código postal es requerida.",
    })
    .length(5, {
      message: "El código postal debe tener 5 caracteres.",
    }),
  tutor_gender: z.string({
    required_error: "El género es requerido.",
  }),
  tutor_status: z.string({
    required_error: "El género es requerido.",
  }),
});

export const subjectSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido.",
    })
    .max(20, {
      message: "El nombre debe tener un máximo de 20 caracteres.",
    }),
  code: z
    .string({
      required_error: "El código es requerido.",
    })
    .max(10, {
      message: "El código debe tener un máximo de 10 caracteres.",
    }),
});
