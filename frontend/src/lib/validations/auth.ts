import { z } from "zod";

// Schema per login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email è obbligatoria")
    .email("Inserisci un'email valida"),
  password: z
    .string()
    .min(1, "La password è obbligatoria")
    .min(8, "La password deve essere di almeno 8 caratteri"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schema per registrazione
export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "Il nome è obbligatorio")
      .min(2, "Il nome deve essere di almeno 2 caratteri")
      .max(50, "Il nome non può superare i 50 caratteri"),
    last_name: z
      .string()
      .min(1, "Il cognome è obbligatorio")
      .min(2, "Il cognome deve essere di almeno 2 caratteri")
      .max(50, "Il cognome non può superare i 50 caratteri"),
    email: z
      .string()
      .min(1, "L'email è obbligatoria")
      .email("Inserisci un'email valida"),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^(\+39)?[\s]?3\d{2}[\s]?\d{6,7}$/.test(val.replace(/\s/g, "")),
        "Inserisci un numero di telefono italiano valido"
      ),
    password: z
      .string()
      .min(1, "La password è obbligatoria")
      .min(8, "La password deve essere di almeno 8 caratteri")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "La password deve contenere almeno una lettera minuscola, una maiuscola e un numero"
      ),
    confirm_password: z.string().min(1, "Conferma la password"),
    user_type: z.enum(["owner", "investor", "agency", "professional"], {
      required_error: "Seleziona il tipo di account",
    }),
    accept_terms: z.boolean().refine((val) => val === true, {
      message: "Devi accettare i termini e le condizioni",
    }),
    accept_privacy: z.boolean().refine((val) => val === true, {
      message: "Devi accettare l'informativa sulla privacy",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Le password non corrispondono",
    path: ["confirm_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Schema per recupero password
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "L'email è obbligatoria")
    .email("Inserisci un'email valida"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Schema per reset password
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "La password è obbligatoria")
      .min(8, "La password deve essere di almeno 8 caratteri")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "La password deve contenere almeno una lettera minuscola, una maiuscola e un numero"
      ),
    confirm_password: z.string().min(1, "Conferma la password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Le password non corrispondono",
    path: ["confirm_password"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Tipi utente con labels
export const userTypes = [
  {
    value: "owner" as const,
    label: "Proprietario",
    description: "Vuoi vendere la nuda proprietà del tuo immobile",
  },
  {
    value: "investor" as const,
    label: "Investitore",
    description: "Cerchi opportunità di investimento in nuda proprietà",
  },
  {
    value: "agency" as const,
    label: "Agenzia Immobiliare",
    description: "Rappresenti un'agenzia immobiliare",
  },
  {
    value: "professional" as const,
    label: "Professionista",
    description: "Sei un notaio, commercialista o consulente",
  },
];
