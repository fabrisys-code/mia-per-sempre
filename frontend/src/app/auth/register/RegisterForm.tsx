"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";
import {
  registerSchema,
  type RegisterFormData,
  userTypes,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      user_type: undefined,
      accept_terms: false,
      accept_privacy: false,
    },
  });

  const selectedUserType = watch("user_type");
  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    clearError();

    const success = await registerUser({
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone || undefined,
      user_type: data.user_type,
    });

    if (success) {
      router.push("/dashboard");
    }
  };

  // Password strength indicator
  const getPasswordStrength = (pwd: string): { strength: number; label: string; color: string } => {
    if (!pwd) return { strength: 0, label: "", color: "bg-gray-200" };

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;

    if (strength <= 2) return { strength, label: "Debole", color: "bg-red-500" };
    if (strength <= 3) return { strength, label: "Media", color: "bg-yellow-500" };
    if (strength <= 4) return { strength, label: "Buona", color: "bg-green-500" };
    return { strength, label: "Ottima", color: "bg-green-600" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Crea il tuo account
        </h1>
        <p className="mt-2 text-gray-600">
          Registrati gratis per iniziare
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-800">
              Errore di registrazione
            </p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* User Type Selection */}
        <div>
          <label className="label">Tipo di account *</label>
          <div className="grid grid-cols-2 gap-3">
            {userTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setValue("user_type", type.value, { shouldValidate: true })}
                className={cn(
                  "relative rounded-lg border-2 p-4 text-left transition-all",
                  selectedUserType === type.value
                    ? "border-primary-600 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                {selectedUserType === type.value && (
                  <div className="absolute right-2 top-2">
                    <Check className="h-5 w-5 text-primary-600" />
                  </div>
                )}
                <p className="font-medium text-gray-900">{type.label}</p>
                <p className="mt-1 text-xs text-gray-500">{type.description}</p>
              </button>
            ))}
          </div>
          {errors.user_type && (
            <p className="mt-1 text-sm text-red-600">{errors.user_type.message}</p>
          )}
        </div>

        {/* Name Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Nome *"
            placeholder="Mario"
            autoComplete="given-name"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <Input
            label="Cognome *"
            placeholder="Rossi"
            autoComplete="family-name"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.last_name?.message}
            {...register("last_name")}
          />
        </div>

        {/* Email */}
        <Input
          label="Email *"
          type="email"
          placeholder="mario.rossi@esempio.it"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Phone (optional) */}
        <Input
          label="Telefono"
          type="tel"
          placeholder="+39 333 1234567"
          autoComplete="tel"
          leftIcon={<Phone className="h-4 w-4" />}
          hint="Opzionale - per ricevere notifiche SMS"
          error={errors.phone?.message}
          {...register("phone")}
        />

        {/* Password */}
        <div>
          <Input
            label="Password *"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      i <= passwordStrength.strength
                        ? passwordStrength.color
                        : "bg-gray-200"
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Sicurezza: {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Conferma Password *"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="new-password"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          error={errors.confirm_password?.message}
          {...register("confirm_password")}
        />

        {/* Terms & Privacy Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              {...register("accept_terms")}
            />
            <span className="text-sm text-gray-600">
              Accetto i{" "}
              <Link
                href="/termini"
                className="text-primary-700 hover:underline"
                target="_blank"
              >
                Termini e Condizioni
              </Link>{" "}
              *
            </span>
          </label>
          {errors.accept_terms && (
            <p className="text-sm text-red-600 ml-7">
              {errors.accept_terms.message}
            </p>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              {...register("accept_privacy")}
            />
            <span className="text-sm text-gray-600">
              Ho letto e accetto l'{" "}
              <Link
                href="/privacy"
                className="text-primary-700 hover:underline"
                target="_blank"
              >
                Informativa sulla Privacy
              </Link>{" "}
              *
            </span>
          </label>
          {errors.accept_privacy && (
            <p className="text-sm text-red-600 ml-7">
              {errors.accept_privacy.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registrazione in corso...
            </>
          ) : (
            "Crea Account"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-500">oppure</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* SPID/CIE Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[#06c] bg-white px-4 py-3 font-medium text-[#06c] transition-colors hover:bg-[#06c]/5"
          onClick={() => alert("Integrazione SPID in arrivo")}
        >
          <svg className="h-6 w-6" viewBox="0 0 32 32" fill="currentColor">
            <circle cx="16" cy="16" r="14" fill="#06c" />
            <text
              x="16"
              y="21"
              fontSize="12"
              fill="white"
              textAnchor="middle"
              fontWeight="bold"
            >
              ID
            </text>
          </svg>
          Registrati con SPID
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[#0066cc] bg-white px-4 py-3 font-medium text-[#0066cc] transition-colors hover:bg-[#0066cc]/5"
          onClick={() => alert("Integrazione CIE in arrivo")}
        >
          <svg className="h-6 w-6" viewBox="0 0 32 32" fill="currentColor">
            <rect x="4" y="8" width="24" height="16" rx="2" fill="#0066cc" />
            <circle cx="12" cy="16" r="4" fill="white" />
            <rect x="18" y="12" width="6" height="2" rx="1" fill="white" />
            <rect x="18" y="16" width="6" height="2" rx="1" fill="white" />
          </svg>
          Registrati con CIE
        </button>
      </div>

      {/* Login Link */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Hai già un account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary-700 hover:text-primary-800"
        >
          Accedi
        </Link>
      </p>
    </div>
  );
}
