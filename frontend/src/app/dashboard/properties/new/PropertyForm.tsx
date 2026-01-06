"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  MapPin,
  Ruler,
  User,
  Euro,
  Camera,
  Loader2,
  X,
  Upload,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

// ============ SCHEMA VALIDAZIONE ============
const propertySchema = z.object({
  // Step 1: Dati Base
  title: z.string().min(10, "Il titolo deve avere almeno 10 caratteri"),
  description: z.string().min(50, "La descrizione deve avere almeno 50 caratteri").optional().or(z.literal("")),
  property_type: z.enum([
    "appartamento", "villa", "villetta", "attico", "loft",
    "mansarda", "casa_indipendente", "rustico", "castello", "palazzo"
  ], { required_error: "Seleziona il tipo di immobile" }),
  
  // Step 2: Posizione
  address: z.string().min(5, "Inserisci l'indirizzo"),
  city: z.string().min(2, "Inserisci la città"),
  province: z.string().length(2, "Inserisci la sigla provincia (es. MI)"),
  zip_code: z.string().regex(/^\d{5}$/, "CAP non valido").optional().or(z.literal("")),
  
  // Step 3: Caratteristiche
  surface_sqm: z.coerce.number().min(10, "Superficie minima 10 mq"),
  rooms: z.coerce.number().min(1, "Almeno 1 locale").optional(),
  bathrooms: z.coerce.number().min(1, "Almeno 1 bagno").optional(),
  floor: z.string().optional(),
  total_floors: z.coerce.number().optional(),
  building_year: z.coerce.number().min(1800).max(2025).optional().or(z.literal("")),
  energy_class: z.enum(["a4+", "a4", "a3", "a2", "a1", "b", "c", "d", "e", "f", "g", ""]).optional(),
  
  // Features
  has_elevator: z.boolean().default(false),
  has_balcony: z.boolean().default(false),
  has_terrace: z.boolean().default(false),
  has_garden: z.boolean().default(false),
  has_parking: z.boolean().default(false),
  has_garage: z.boolean().default(false),
  has_cellar: z.boolean().default(false),
  
  // Step 4: Usufrutto e Prezzo
  usufructuary_age: z.coerce.number().min(50, "Età minima 50 anni").max(100, "Età massima 100 anni"),
  usufruct_type: z.enum(["vitalizio", "temporaneo"]).default("vitalizio"),
  bare_property_value: z.coerce.number().min(10000, "Valore minimo €10.000"),
  full_property_value: z.coerce.number().optional(),
  payment_preference: z.enum(["full", "deposit_annuity", "annuity", "other"]).default("full"),
});

type PropertyFormData = z.infer<typeof propertySchema>;

// ============ COSTANTI ============
const STEPS = [
  { id: 1, name: "Tipo", icon: Home },
  { id: 2, name: "Posizione", icon: MapPin },
  { id: 3, name: "Dettagli", icon: Ruler },
  { id: 4, name: "Prezzo", icon: Euro },
  { id: 5, name: "Foto", icon: Camera },
];

const PROPERTY_TYPES = [
  { value: "appartamento", label: "Appartamento" },
  { value: "villa", label: "Villa" },
  { value: "villetta", label: "Villetta a schiera" },
  { value: "attico", label: "Attico" },
  { value: "loft", label: "Loft" },
  { value: "mansarda", label: "Mansarda" },
  { value: "casa_indipendente", label: "Casa indipendente" },
  { value: "rustico", label: "Rustico / Casale" },
  { value: "castello", label: "Castello" },
  { value: "palazzo", label: "Palazzo storico" },
];

const ENERGY_CLASSES = [
  { value: "a4+", label: "A4+" },
  { value: "a4", label: "A4" },
  { value: "a3", label: "A3" },
  { value: "a2", label: "A2" },
  { value: "a1", label: "A1" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
  { value: "d", label: "D" },
  { value: "e", label: "E" },
  { value: "f", label: "F" },
  { value: "g", label: "G" },
];

const PAYMENT_OPTIONS = [
  { value: "full", label: "Pagamento unico" },
  { value: "deposit_annuity", label: "Acconto + rendita" },
  { value: "annuity", label: "Solo rendita vitalizia" },
  { value: "other", label: "Da concordare" },
];

const FEATURES = [
  { key: "has_elevator", label: "Ascensore" },
  { key: "has_balcony", label: "Balcone" },
  { key: "has_terrace", label: "Terrazzo" },
  { key: "has_garden", label: "Giardino" },
  { key: "has_parking", label: "Posto auto" },
  { key: "has_garage", label: "Garage" },
  { key: "has_cellar", label: "Cantina" },
];

// ============ COMPONENTE PRINCIPALE ============
export default function PropertyForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdPropertyId, setCreatedPropertyId] = useState<number | null>(null);
  
  // Immagini
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      property_type: undefined,
      usufruct_type: "vitalizio",
      payment_preference: "full",
      has_elevator: false,
      has_balcony: false,
      has_terrace: false,
      has_garden: false,
      has_parking: false,
      has_garage: false,
      has_cellar: false,
    },
  });

  const watchedValues = watch();

  // ============ NAVIGAZIONE STEPS ============
  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate: (keyof PropertyFormData)[][] = [
      ["title", "property_type"], // Step 1
      ["address", "city", "province"], // Step 2
      ["surface_sqm"], // Step 3
      ["usufructuary_age", "bare_property_value"], // Step 4
      [], // Step 5 (foto - no validation required)
    ];

    const fields = fieldsToValidate[currentStep - 1];
    if (fields.length === 0) return true;

    const result = await trigger(fields);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ============ GESTIONE IMMAGINI ============
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limita a 10 immagini totali
    const remainingSlots = 10 - images.length;
    const newFiles = files.slice(0, remainingSlots);

    // Crea preview
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setImages((prev) => [...prev, ...newFiles]);
  }, [images.length]);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ============ SUBMIT ============
  const onSubmit = async (data: PropertyFormData) => {
    // Previeni submit se non siamo all'ultimo step
    if (currentStep !== STEPS.length) {
      console.log("Submit bloccato - non siamo all'ultimo step:", currentStep);
      return;
    }
    
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Crea l'immobile
      const propertyData = {
        ...data,
        region: "Italia", // Default
        description: data.description || undefined,
        zip_code: data.zip_code || undefined,
        rooms: data.rooms || undefined,
        bathrooms: data.bathrooms || undefined,
        floor: data.floor || undefined,
        total_floors: data.total_floors || undefined,
        building_year: data.building_year ? Number(data.building_year) : undefined,
        energy_class: data.energy_class || undefined,
        full_property_value: data.full_property_value || undefined,
      };

      const property = await api.properties.create(propertyData);
      setCreatedPropertyId(property.id);

      // 2. Upload immagini se presenti
      if (images.length > 0) {
        setUploadingImages(true);
        try {
          await api.images.upload(property.id, images);
        } catch (imgError) {
          console.error("Errore upload immagini:", imgError);
          // Non blocchiamo il flusso, l'immobile è già creato
        }
        setUploadingImages(false);
      }

      // 3. Redirect alla dashboard o al dettaglio
      router.push(`/dashboard/properties?created=${property.id}`);
    } catch (error: any) {
      console.error("Errore creazione immobile:", error);
      setSubmitError(error.message || "Errore durante la creazione dell'annuncio");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============ RENDER STEPS ============
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Input
                label="Titolo annuncio *"
                placeholder="Es: Luminoso appartamento in centro storico"
                error={errors.title?.message}
                {...register("title")}
              />
              <p className="mt-1 text-xs text-gray-500">
                Un titolo accattivante attira più visitatori
              </p>
            </div>

            <div>
              <label className="label">Tipo di immobile *</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setValue("property_type", type.value as any, { shouldValidate: true })}
                    className={cn(
                      "rounded-lg border-2 p-3 text-left transition-all",
                      watchedValues.property_type === type.value
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <span className="font-medium text-gray-900">{type.label}</span>
                  </button>
                ))}
              </div>
              {errors.property_type && (
                <p className="mt-1 text-sm text-red-600">{errors.property_type.message}</p>
              )}
            </div>

            <div>
              <Textarea
                label="Descrizione"
                placeholder="Descrivi il tuo immobile: caratteristiche, punti di forza, zona..."
                rows={5}
                error={errors.description?.message}
                {...register("description")}
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimo 50 caratteri. Una buona descrizione aumenta l'interesse.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Input
              label="Indirizzo *"
              placeholder="Via Roma, 123"
              leftIcon={<MapPin className="h-4 w-4" />}
              error={errors.address?.message}
              {...register("address")}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Città *"
                placeholder="Milano"
                error={errors.city?.message}
                {...register("city")}
              />
              <Input
                label="Provincia *"
                placeholder="MI"
                maxLength={2}
                className="uppercase"
                error={errors.province?.message}
                {...register("province")}
              />
            </div>

            <Input
              label="CAP"
              placeholder="20121"
              maxLength={5}
              error={errors.zip_code?.message}
              {...register("zip_code")}
            />

            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> L'indirizzo esatto sarà visibile solo agli utenti verificati.
                Nella scheda pubblica verrà mostrata solo la zona.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Superficie (mq) *"
                type="number"
                placeholder="85"
                leftIcon={<Ruler className="h-4 w-4" />}
                error={errors.surface_sqm?.message}
                {...register("surface_sqm")}
              />
              <Input
                label="Locali"
                type="number"
                placeholder="3"
                error={errors.rooms?.message}
                {...register("rooms")}
              />
              <Input
                label="Bagni"
                type="number"
                placeholder="2"
                error={errors.bathrooms?.message}
                {...register("bathrooms")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Piano"
                placeholder="3° su 5"
                {...register("floor")}
              />
              <Input
                label="Piani edificio"
                type="number"
                placeholder="5"
                {...register("total_floors")}
              />
              <Input
                label="Anno costruzione"
                type="number"
                placeholder="1970"
                {...register("building_year")}
              />
            </div>

            <div>
              <Select
                label="Classe energetica"
                {...register("energy_class")}
              >
                <option value="">Seleziona...</option>
                {ENERGY_CLASSES.map((ec) => (
                  <option key={ec.value} value={ec.value}>
                    {ec.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="label">Caratteristiche</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {FEATURES.map((feature) => (
                  <label
                    key={feature.key}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-all",
                      watchedValues[feature.key as keyof PropertyFormData]
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register(feature.key as keyof PropertyFormData)}
                    />
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded border-2 transition-colors",
                        watchedValues[feature.key as keyof PropertyFormData]
                          ? "border-primary-600 bg-primary-600"
                          : "border-gray-300"
                      )}
                    >
                      {watchedValues[feature.key as keyof PropertyFormData] && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {feature.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <h3 className="font-medium text-amber-800">Informazioni sull'usufruttuario</h3>
              <p className="mt-1 text-sm text-amber-700">
                Questi dati servono per calcolare il valore della nuda proprietà
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Età usufruttuario *"
                type="number"
                placeholder="75"
                leftIcon={<User className="h-4 w-4" />}
                hint="L'età del più giovane usufruttuario"
                error={errors.usufructuary_age?.message}
                {...register("usufructuary_age")}
              />
              <div>
                <Select
                  label="Tipo di usufrutto"
                  {...register("usufruct_type")}
                >
                  <option value="vitalizio">Vitalizio</option>
                  <option value="temporaneo">A termine</option>
                </Select>
              </div>
            </div>

            <hr />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Prezzo nuda proprietà *"
                type="number"
                placeholder="150000"
                leftIcon={<Euro className="h-4 w-4" />}
                hint="Il prezzo richiesto per la nuda proprietà"
                error={errors.bare_property_value?.message}
                {...register("bare_property_value")}
              />
              <Input
                label="Valore piena proprietà"
                type="number"
                placeholder="280000"
                leftIcon={<Euro className="h-4 w-4" />}
                hint="Valore stimato dell'immobile libero"
                {...register("full_property_value")}
              />
            </div>

            <div>
              <Select
                label="Preferenza di pagamento"
                {...register("payment_preference")}
              >
                {PAYMENT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 p-8 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 font-medium text-gray-900">
                Carica le foto del tuo immobile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Fino a 10 immagini. Formati: JPG, PNG, WebP
              </p>
              <label className="mt-4 inline-block">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                  disabled={images.length >= 10}
                />
                <span className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
                  <Upload className="h-4 w-4" />
                  Seleziona immagini
                </span>
              </label>
              <p className="mt-2 text-xs text-gray-400">
                {images.length}/10 immagini caricate
              </p>
            </div>

            {/* Preview immagini */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="group relative aspect-square">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <Badge
                        variant="featured"
                        className="absolute bottom-2 left-2"
                      >
                        Copertina
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Consiglio:</strong> La prima immagine sarà la copertina dell'annuncio.
                Scegli una foto luminosa e rappresentativa.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-app max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Indietro
          </Button>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Pubblica il tuo annuncio
          </h1>
          <p className="mt-2 text-gray-600">
            Compila i dati del tuo immobile per pubblicarlo sul marketplace
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    currentStep > step.id
                      ? "border-primary-600 bg-primary-600 text-white"
                      : currentStep === step.id
                      ? "border-primary-600 bg-white text-primary-600"
                      : "border-gray-300 bg-white text-gray-400"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "hidden h-0.5 w-12 sm:block md:w-20 lg:w-24",
                      currentStep > step.id ? "bg-primary-600" : "bg-gray-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            {STEPS.map((step) => (
              <span
                key={step.id}
                className={cn(
                  "w-10 text-center",
                  currentStep === step.id && "font-medium text-primary-600"
                )}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Error Alert */}
              {submitError && (
                <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Errore</p>
                    <p className="text-sm text-red-700 whitespace-pre-line">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Validation Errors Summary */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="font-medium text-amber-800 mb-2">
                    Completa i campi obbligatori:
                  </p>
                  <ul className="text-sm text-amber-700 list-disc list-inside space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>
                        <span className="font-medium">{field}</span>: {error?.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step Content */}
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? "invisible" : ""}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Indietro
                </Button>

                {currentStep < STEPS.length ? (
                  <Button 
                    type="button" 
                    variant="primary" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      nextStep();
                    }}
                  >
                    Avanti
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    onClick={() => {
                      // Debug: mostra errori di validazione
                      if (Object.keys(errors).length > 0) {
                        console.log("Errori di validazione:", errors);
                        const errorMessages = Object.entries(errors)
                          .map(([field, error]) => `${field}: ${error?.message}`)
                          .join("\n");
                        setSubmitError(`Correggi i seguenti errori:\n${errorMessages}`);
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {uploadingImages ? "Caricamento foto..." : "Pubblicazione..."}
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Pubblica Annuncio
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Hai bisogno di aiuto?{" "}
          <a href="/contatti" className="text-primary-600 hover:underline">
            Contattaci
          </a>
        </p>
      </div>
    </div>
  );
}
