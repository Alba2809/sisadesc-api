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
  addressid: z.coerce.number({
    required_error: "Se requiere una dirección.",
    invalid_type_error: "La dirección no es un número.",
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
  role: z.coerce.number({
    required_error: "El rol es requerido.",
    invalid_type_error: "El rol no es un número.",
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
  addressid: z.coerce.number({
    required_error: "Se requiere una dirección.",
    invalid_type_error: "La dirección no es un número.",
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
    }).optional(),
  student_group: z
    .string({
      required_error: "El grupo es requerida.",
    }),
  student_grade: z
    .string({
      required_error: "El grado es requerido.",
    }),
  student_phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    }).optional(),
});

export const fatherSchema = z.object({
  father_firstname: z
    .string({
      required_error: "El nombre del padre es requerido.",
    })
    .max(20, {
      message: "El nombre del padre debe tener un máximo de 20 caracteres.",
    }),
  father_lastnamepaternal: z
    .string({
      required_error: "El primer apellido del padre es requerido.",
    })
    .max(20, {
      message:
        "El primer apellido del padre debe tener un máximo de 20 caracteres.",
    }),
  father_lastnamematernal: z
    .string({
      required_error: "El segundo apellido del padre es requerido.",
    })
    .max(20, {
      message:
        "El segundo apellido del padre debe tener un máximo de 20 caracteres.",
    }),
  father_curp: z
    .string({
      required_error: "El CURP del padre es requerido.",
    })
    .length(18, {
      message: "El CURP del padre debe tener 18 caracteres.",
    }),
  father_email: z
    .string({
      required_error: "El correo del padre es requerido.",
    })
    .email({
      message: "El correo del padre es inválido.",
    })
    .max(30, {
      message:
        "El correo electrónico del padre debe tener un máximo de 30 caracteres.",
    })
    .optional(),
  father_rfc: z
    .string({
      required_error: "El RFC del padre es requerido.",
    })
    .length(13, {
      message: "El RFC del padre debe tener exactamente 13 caracteres.",
    })
    .optional(),
  father_phonenumber: z
    .string({
      required_error: "El teléfono del padre es requerido.",
    })
    .length(10, {
      message: "El teléfono del padre debe tener 10 caracteres.",
    })
    .optional(),
  father_street: z
    .string({
      required_error: "La calle del padre es requerida.",
    })
    .max(30, {
      message: "La calle del padre debe tener un máximo de 30 caracteres.",
    }),
  father_colony: z.string({
    required_error: "La colonia del padre es requerida.",
  }),
  father_birthdate: z.coerce.date({
    required_error: "La fecha del padre es requerida.",
    invalid_type_error: "La fecha del padre no es una fecha.",
  }),
  father_postalcode: z
    .string({
      required_error: "El código postal del padre es requerida.",
    })
    .length(5, {
      message: "El código postal del padre debe tener 5 caracteres.",
    }),
  father_status: z.string({
    required_error: "El estado del padre es requerido.",
  }),
  father_addressid: z.coerce.number({
    required_error: "Se requiere la dirección del padre.",
    invalid_type_error: "La dirección del padre es inválida.",
  }),
});

export const motherSchema = z.object({
  mother_firstname: z
    .string({
      required_error: "El nombre de la madre es requerido.",
    })
    .max(20, {
      message: "El nombre de la madre debe tener un máximo de 20 caracteres.",
    }),
  mother_lastnamepaternal: z
    .string({
      required_error: "El primer apellido de la madre es requerido.",
    })
    .max(20, {
      message:
        "El primer apellido de la madre debe tener un máximo de 20 caracteres.",
    }),
  mother_lastnamematernal: z
    .string({
      required_error: "El segundo apellido de la madre es requerido.",
    })
    .max(20, {
      message:
        "El segundo apellido de la madre debe tener un máximo de 20 caracteres.",
    }),
  mother_curp: z
    .string({
      required_error: "El CURP de la madre es requerido.",
    })
    .length(18, {
      message: "El CURP de la madre debe tener 18 caracteres.",
    }),
  mother_email: z
    .string({
      required_error: "El correo de la madre es requerido.",
    })
    .email({
      message: "El correo de la madre es inválido.",
    })
    .max(30, {
      message:
        "El correo electrónico de la madre debe tener un máximo de 30 caracteres.",
    })
    .optional(),
  mother_rfc: z
    .string({
      required_error: "El RFC de la madre es requerido.",
    })
    .length(13, {
      message: "El RFC de la madre debe tener exactamente 13 caracteres.",
    })
    .optional(),
  mother_phonenumber: z
    .string({
      required_error: "El teléfono de la madre es requerido.",
    })
    .length(10, {
      message: "El teléfono de la madre debe tener 10 caracteres.",
    })
    .optional(),
  mother_street: z
    .string({
      required_error: "La calle de la madre es requerida.",
    })
    .max(30, {
      message: "La calle de la madre debe tener un máximo de 30 caracteres.",
    }),
  mother_colony: z.string({
    required_error: "La colonia es requerida.",
  }),
  mother_birthdate: z.coerce.date({
    required_error: "La fecha de la madre es requerida.",
    invalid_type_error: "La fecha de la madre no es una fecha.",
  }),
  mother_postalcode: z
    .string({
      required_error: "El código postal de la madre es requerida.",
    })
    .length(5, {
      message: "El código postal de la madre debe tener 5 caracteres.",
    }),
  mother_status: z.string({
    required_error: "El estado de la madre es requerido.",
  }),
  mother_addressid: z.coerce.number({
    required_error: "Se requiere la dirección de la madre.",
    invalid_type_error: "La dirección de la madre es inválida.",
  }),
});

export const tutorSchema = z.object({
  tutor_firstname: z
    .string({
      required_error: "El nombre del tutor es requerido.",
    })
    .max(20, {
      message: "El nombre del tutor debe tener un máximo de 20 caracteres.",
    }),
  tutor_lastnamepaternal: z
    .string({
      required_error: "El primer apellido del tutor es requerido.",
    })
    .max(20, {
      message:
        "El primer apellido del tutor debe tener un máximo de 20 caracteres.",
    }),
  tutor_lastnamematernal: z
    .string({
      required_error: "El segundo apellido del tutor es requerido.",
    })
    .max(20, {
      message:
        "El segundo apellido del tutor debe tener un máximo de 20 caracteres.",
    }),
  tutor_curp: z
    .string({
      required_error: "El CURP del tutor es requerido.",
    })
    .length(18, {
      message: "El CURP del tutor debe tener 18 caracteres.",
    }),
  tutor_email: z
    .string({
      required_error: "El correo del tutor es requerido.",
    })
    .email({
      message: "El correo del tutor es inválido.",
    })
    .max(30, {
      message:
        "El correo electrónico del tutor debe tener un máximo de 30 caracteres.",
    })
    .optional(),
  tutor_rfc: z
    .string()
    .length(13, {
      message: "El RFC del tutor debe tener exactamente 13 caracteres.",
    })
    .optional(),
  tutor_phonenumber: z
    .string({
      required_error: "El teléfono del tutor es requerido.",
    })
    .length(10, {
      message: "El teléfono del tutor debe tener 10 caracteres.",
    })
    .optional(),
  tutor_street: z
    .string({
      required_error: "La calle del tutor es requerida.",
    })
    .max(30, {
      message: "La calle del tutor debe tener un máximo de 30 caracteres.",
    }),
  tutor_colony: z.string({
    required_error: "La colonia del tutor es requerida.",
  }),
  tutor_birthdate: z.coerce.date({
    required_error: "La fecha del tutor es requerida.",
    invalid_type_error: "La fecha del tutor no es una fecha.",
  }),
  tutor_postalcode: z
    .string({
      required_error: "El código postal del tutor es requerida.",
    })
    .length(5, {
      message: "El código postal del tutor debe tener 5 caracteres.",
    }),
  tutor_gender: z.string({
    required_error: "El género del tutor es requerido.",
  }),
  tutor_status: z.string({
    required_error: "El estado del tutor es requerido.",
  }),
  tutor_addressid: z.coerce.number({
    required_error: "Se requiere la dirección del tutor.",
    invalid_type_error: "La dirección del tutor es inválida.",
  }),
});

export const parentSchema = z.object({
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
  email: z
    .string({
      required_error: "El correo es requerido.",
    })
    .email({
      message: "El correo es inválido.",
    })
    .max(30, {
      message: "El correo electrónico debe tener un máximo de 30 caracteres.",
    })
    .optional(),
  rfc: z
    .string()
    .length(13, {
      message: "El RFC debe tener exactamente 13 caracteres.",
    })
    .optional(),
  phonenumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .length(10, {
      message: "El teléfono debe tener 10 caracteres.",
    })
    .optional(),
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
  birthdate: z.coerce.date({
    required_error: "La fecha es requerida.",
    invalid_type_error: "La fecha no es una fecha.",
  }),
  postalcode: z
    .string({
      required_error: "El código postal es requerida.",
    })
    .length(5, {
      message: "El código postal debe tener 5 caracteres.",
    }),
  gender: z.string({
    required_error: "El género es requerido.",
  }),
  status: z.string({
    required_error: "El estado es requerido.",
  }),
  addressid: z.coerce.number({
    required_error: "Se requiere una dirección.",
    invalid_type_error: "La dirección no es un número.",
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
  grade: z
    .string({
      required_error: "El grado es requerido.",
    })
    .optional(),
  group: z
    .string({
      required_error: "El grupo es requerido.",
    })
    .optional(),
  students: z
    .array(
      z.coerce.number({
        required_error: "Se requiere asignar los estudiantes.",
        invalid_type_error: "El identificador de un estudiante no es válido.",
      }),
      { invalid_type_error: "El contenedor de los estudiantes no es un array." }
    )
    .refine((array) => array.length > 0, {
      message: "Debe haber al menos un estudiante.",
    })
    .optional().nullable(),
  teacher: z.coerce
    .string({
      required_error: "Se requiere asignar el docente.",
      invalid_type_error: "La CURP del docente no es válido.",
    })
    .optional().nullable(),
});
