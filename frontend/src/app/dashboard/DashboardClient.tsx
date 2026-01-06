"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Plus,
  Settings,
  LogOut,
  User,
  Building,
  Heart,
  Bell,
  ChevronRight,
} from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/store/authStore";

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Labels per tipo utente
  const userTypeLabels: Record<string, string> = {
    owner: "Proprietario",
    investor: "Investitore",
    agency: "Agenzia",
    professional: "Professionista",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container-app py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Bentornato, {user?.first_name}!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifiche
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Esci
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-app py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                    <User className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {user?.first_name} {user?.last_name}
                    </h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <Badge variant="info" className="mt-1">
                      {userTypeLabels[user?.user_type || ""] || user?.user_type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Azioni rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/dashboard/properties/new"
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Plus className="h-5 w-5 text-primary-600" />
                    <span className="font-medium text-gray-700">
                      Nuovo annuncio
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/dashboard/properties"
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-primary-600" />
                    <span className="font-medium text-gray-700">
                      I miei annunci
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/dashboard/favorites"
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-primary-600" />
                    <span className="font-medium text-gray-700">Preferiti</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-primary-600" />
                    <span className="font-medium text-gray-700">
                      Impostazioni
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <Card variant="featured">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                    <Home className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-gray-900">
                      Benvenuto su Mia Per Sempre
                    </h2>
                    <p className="mt-1 text-gray-600">
                      Inizia a pubblicare il tuo primo annuncio di nuda proprietà
                      o esplora le opportunità di investimento.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link href="/dashboard/properties/new">
                        <Button variant="primary" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Pubblica annuncio
                        </Button>
                      </Link>
                      <Link href="/nuda-proprieta">
                        <Button variant="outline" size="sm">
                          Esplora annunci
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary-600">0</p>
                  <p className="text-sm text-gray-500">Annunci attivi</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary-600">0</p>
                  <p className="text-sm text-gray-500">Visualizzazioni</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary-600">0</p>
                  <p className="text-sm text-gray-500">Contatti ricevuti</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Attività recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Bell className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="mt-3 text-gray-500">
                    Nessuna attività recente
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Le tue notifiche appariranno qui
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// Wrap con ProtectedRoute
export default function DashboardClient() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
