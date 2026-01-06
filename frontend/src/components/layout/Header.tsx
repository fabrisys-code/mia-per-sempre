"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  User,
  Heart,
  LogOut,
  Settings,
  Building,
  ChevronDown,
  Plus,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";

// Navigation links
const navigation = [
  { name: "Cerca Immobili", href: "/nuda-proprieta" },
  { name: "Come Funziona", href: "/come-funziona" },
  { name: "Valutazione", href: "/valutazione" },
  { name: "Chi Siamo", href: "/chi-siamo" },
];

// User dropdown menu items
const userMenuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Building },
  { name: "I Miei Annunci", href: "/dashboard/properties", icon: Heart },
  { name: "Preferiti", href: "/dashboard/favorites", icon: Heart },
  { name: "Impostazioni", href: "/dashboard/settings", icon: Settings },
];

// User type labels in Italian
const userTypeLabels: Record<string, string> = {
  owner: "Proprietario",
  investor: "Investitore",
  agency: "Agenzia",
  professional: "Professionista",
  proprietario: "Proprietario",
  investitore: "Investitore",
  entrambi: "Proprietario & Investitore",
  agenzia: "Agenzia",
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Auth state from Zustand store
  const { user, isAuthenticated, logout } = useAuthStore();
  
  // Local state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Ref for click outside detection
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    const first = user.first_name?.[0] || "";
    const last = user.last_name?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "";
    return user.first_name || user.email?.split("@")[0] || "Utente";
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container-app">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo variant="full" size="md" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-600",
                  isActive(item.href)
                    ? "text-primary-800"
                    : "text-gray-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {/* Search Button */}
            <Link
              href="/nuda-proprieta"
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors"
              aria-label="Cerca"
            >
              <Search className="h-5 w-5" />
            </Link>

            {isAuthenticated && user ? (
              <>
                {/* Notifications (placeholder) */}
                <button
                  className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                  aria-label="Notifiche"
                >
                  <Bell className="h-5 w-5" />
                  {/* Notification badge - uncomment when implemented */}
                  {/* <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" /> */}
                </button>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      "flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 transition-colors",
                      userMenuOpen
                        ? "bg-primary-50"
                        : "hover:bg-gray-100"
                    )}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    {/* Avatar */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-medium text-white">
                      {getUserInitials()}
                    </div>
                    {/* Name */}
                    <span className="hidden xl:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {getUserDisplayName()}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-500 transition-transform",
                        userMenuOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5">
                      {/* User Info Header */}
                      <div className="border-b border-gray-100 px-4 pb-3 pt-2">
                        <p className="font-medium text-gray-900">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                          {userTypeLabels[user.user_type] || user.user_type}
                        </span>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <item.icon className="h-4 w-4 text-gray-400" />
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Esci
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Publish Button */}
                <Link href="/dashboard/properties/new">
                  <Button variant="primary" size="sm">
                    <Plus className="mr-1.5 h-4 w-4" />
                    Pubblica
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Accedi
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm">
                    Registrati
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile user avatar (when logged in) */}
            {isAuthenticated && user && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-medium text-white">
                {getUserInitials()}
              </div>
            )}
            
            <button
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4 animate-in slide-in-from-top-2 duration-200">
            {/* User Info (when logged in) */}
            {isAuthenticated && user && (
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-medium text-white">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-800"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <hr className="my-3" />

            {isAuthenticated && user ? (
              <>
                {/* User Menu Items */}
                <div className="flex flex-col gap-1">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-gray-400" />
                      {item.name}
                    </Link>
                  ))}
                </div>

                <hr className="my-3" />

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 px-4">
                  <Link
                    href="/dashboard/properties/new"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="primary" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Pubblica Annuncio
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Esci
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 px-4 pt-2">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Accedi
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Registrati
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
