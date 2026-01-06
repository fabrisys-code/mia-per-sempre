"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Il nome è obbligatorio")
    .min(2, "Il nome deve essere di almeno 2 caratteri"),
  email: z
    .string()
    .min(1, "L'email è obbligatoria")
    .email("Inserisci un'email valida"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Seleziona un argomento"),
  message: z
    .string()
    .min(1, "Il messaggio è obbligatorio")
    .min(20, "Il messaggio deve essere di almeno 20 caratteri")
    .max(2000, "Il messaggio non può superare i 2000 caratteri"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Devi accettare l'informativa sulla privacy",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjects = [
  { value: "", label: "Seleziona un argomento..." },
  { value: "vendita", label: "Voglio vendere il mio immobile" },
  { value: "acquisto", label: "Sono interessato ad acquistare" },
  { value: "valutazione", label: "Richiesta di valutazione" },
  { value: "supporto", label: "Supporto tecnico" },
  { value: "partnership", label: "Proposta di partnership" },
  { value: "altro", label: "Altro" },
];

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");

    try {
      // TODO: Implementare chiamata API reale
      // await api.contact.send(data);

      // Simuliamo un delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form data:", data);
      setSubmitStatus("success");
      reset();

      // Reset status dopo 5 secondi
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");

      // Reset status dopo 5 secondi
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  // Success message
  if (submitStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-4 font-semibold text-lg text-gray-900">
          Messaggio inviato!
        </h3>
        <p className="mt-2 text-gray-600">
          Grazie per averci contattato. Ti risponderemo entro 24 ore.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitStatus("idle")}
        >
          Invia un altro messaggio
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error alert */}
      {submitStatus === "error" && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-800">
              Errore nell'invio
            </p>
            <p className="mt-1 text-sm text-red-700">
              Si è verificato un errore. Riprova più tardi o contattaci via
              email.
            </p>
          </div>
        </div>
      )}

      {/* Name & Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nome e Cognome *"
          placeholder="Mario Rossi"
          leftIcon={<User className="h-4 w-4" />}
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email *"
          type="email"
          placeholder="mario.rossi@esempio.it"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {/* Phone & Subject */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Telefono"
          type="tel"
          placeholder="+39 333 1234567"
          leftIcon={<Phone className="h-4 w-4" />}
          hint="Opzionale"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Select
          label="Argomento *"
          options={subjects}
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      {/* Message */}
      <Textarea
        label="Messaggio *"
        placeholder="Scrivi qui il tuo messaggio..."
        rows={6}
        error={errors.message?.message}
        {...register("message")}
      />

      {/* Privacy checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            {...register("privacy")}
          />
          <span className="text-sm text-gray-600">
            Ho letto e accetto l'{" "}
            <a
              href="/privacy"
              className="text-primary-700 hover:underline"
              target="_blank"
            >
              informativa sulla privacy
            </a>{" "}
            *
          </span>
        </label>
        {errors.privacy && (
          <p className="mt-1 text-sm text-red-600 ml-7">
            {errors.privacy.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        className="w-full sm:w-auto"
        disabled={submitStatus === "loading"}
      >
        {submitStatus === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Invia Messaggio
          </>
        )}
      </Button>
    </form>
  );
}
