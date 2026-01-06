"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    const success = await login(data.email, data.password);

    if (success) {
      router.push(redirectTo);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Bentornato
        </h1>
        <p className="mt-2 text-gray-600">
          Accedi al tuo account per continuare
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-800">
              Errore di accesso
            </p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Success message from registration */}
      {searchParams.get("registered") && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <svg
            className="h-5 w-5 flex-shrink-0 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-green-800">
              Registrazione completata!
            </p>
            <p className="mt-1 text-sm text-green-700">
              Ora puoi accedere con le tue credenziali.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="nome@esempio.it"
            autoComplete="email"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        {/* Password */}
        <div>
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
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
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            Password dimenticata?
          </Link>
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
              Accesso in corso...
            </>
          ) : (
            "Accedi"
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
          Entra con SPID
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
          Entra con CIE
        </button>
      </div>

      {/* Register Link */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Non hai ancora un account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary-700 hover:text-primary-800"
        >
          Registrati gratis
        </Link>
      </p>
    </div>
  );
}
