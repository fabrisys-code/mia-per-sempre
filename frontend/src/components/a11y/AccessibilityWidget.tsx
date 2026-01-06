"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Accessibility,
  X,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Underline,
  MousePointer2,
  Pause,
  RotateCcw,
  Type,
  Contrast,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   ACCESSIBILITY WIDGET
   
   Pannello accessibilità per personalizzare l'esperienza utente:
   - Dimensione testo
   - Contrasto
   - Link sottolineati
   - Disabilita animazioni
   - Cursore grande
   - Spaziatura testo
   - Modalità daltonici
   ========================================================================== */

interface AccessibilitySettings {
  fontSize: number; // 100 = normale, 125 = +25%, etc.
  highContrast: boolean;
  darkMode: boolean;
  underlineLinks: boolean;
  pauseAnimations: boolean;
  largeCursor: boolean;
  textSpacing: boolean;
  dyslexicFont: boolean;
  saturation: "normal" | "low" | "none"; // per daltonismo
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  darkMode: false,
  underlineLinks: false,
  pauseAnimations: false,
  largeCursor: false,
  textSpacing: false,
  dyslexicFont: false,
  saturation: "normal",
};

const STORAGE_KEY = "mps-accessibility-settings";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  // Carica impostazioni da localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.error("Error parsing accessibility settings:", e);
      }
    }
  }, []);

  // Applica impostazioni al DOM
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const body = document.body;

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;

    // Classi CSS
    body.classList.toggle("a11y-high-contrast", settings.highContrast);
    body.classList.toggle("a11y-dark-mode", settings.darkMode);
    body.classList.toggle("a11y-underline-links", settings.underlineLinks);
    body.classList.toggle("a11y-pause-animations", settings.pauseAnimations);
    body.classList.toggle("a11y-large-cursor", settings.largeCursor);
    body.classList.toggle("a11y-text-spacing", settings.textSpacing);
    body.classList.toggle("a11y-dyslexic-font", settings.dyslexicFont);
    body.classList.toggle("a11y-low-saturation", settings.saturation === "low");
    body.classList.toggle("a11y-no-saturation", settings.saturation === "none");

    // Salva in localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, mounted]);

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K,
      value: AccessibilitySettings[K]
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const increaseFontSize = () => {
    updateSetting("fontSize", Math.min(settings.fontSize + 10, 150));
  };

  const decreaseFontSize = () => {
    updateSetting("fontSize", Math.max(settings.fontSize - 10, 80));
  };

  // Non renderizzare finché non siamo sul client
  if (!mounted) return null;

  return (
    <>
      {/* Bottone floating */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 left-6 z-50",
          "flex h-14 w-14 items-center justify-center",
          "rounded-full bg-primary-700 text-white shadow-lg",
          "hover:bg-primary-800 hover:scale-105",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300",
          "transition-all duration-200",
          isOpen && "hidden"
        )}
        aria-label="Apri opzioni accessibilità"
        title="Opzioni accessibilità"
      >
        <Accessibility className="h-7 w-7" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Pannello */}
      <div
        className={cn(
          "fixed bottom-0 left-0 z-50 w-full sm:bottom-6 sm:left-6 sm:w-96",
          "bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full sm:translate-y-[calc(100%+100px)]"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Opzioni di accessibilità"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
              <Accessibility className="h-5 w-5 text-primary-700" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Accessibilità</h2>
              <p className="text-xs text-gray-500">Personalizza la tua esperienza</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Chiudi pannello accessibilità"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-4">
          {/* Dimensione testo */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-5 w-5 text-primary-600" />
              <span className="font-medium text-gray-900">Dimensione Testo</span>
              <span className="ml-auto text-sm text-gray-500">{settings.fontSize}%</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                disabled={settings.fontSize <= 80}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Riduci dimensione testo"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 transition-all"
                  style={{ width: `${((settings.fontSize - 80) / 70) * 100}%` }}
                />
              </div>
              <button
                onClick={increaseFontSize}
                disabled={settings.fontSize >= 150}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Aumenta dimensione testo"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Toggle options */}
          <div className="space-y-2">
            {/* Contrasto elevato */}
            <ToggleOption
              icon={<Contrast className="h-5 w-5" />}
              label="Contrasto Elevato"
              description="Aumenta il contrasto dei colori"
              checked={settings.highContrast}
              onChange={(v) => updateSetting("highContrast", v)}
            />

            {/* Modalità scura */}
            <ToggleOption
              icon={settings.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              label="Modalità Scura"
              description="Sfondo scuro per ridurre l'affaticamento visivo"
              checked={settings.darkMode}
              onChange={(v) => updateSetting("darkMode", v)}
            />

            {/* Sottolinea link */}
            <ToggleOption
              icon={<Underline className="h-5 w-5" />}
              label="Sottolinea Link"
              description="Evidenzia tutti i link con sottolineatura"
              checked={settings.underlineLinks}
              onChange={(v) => updateSetting("underlineLinks", v)}
            />

            {/* Pausa animazioni */}
            <ToggleOption
              icon={<Pause className="h-5 w-5" />}
              label="Pausa Animazioni"
              description="Disabilita tutte le animazioni"
              checked={settings.pauseAnimations}
              onChange={(v) => updateSetting("pauseAnimations", v)}
            />

            {/* Cursore grande */}
            <ToggleOption
              icon={<MousePointer2 className="h-5 w-5" />}
              label="Cursore Grande"
              description="Aumenta la dimensione del cursore"
              checked={settings.largeCursor}
              onChange={(v) => updateSetting("largeCursor", v)}
            />

            {/* Spaziatura testo */}
            <ToggleOption
              icon={<Type className="h-5 w-5" />}
              label="Spaziatura Testo"
              description="Aumenta lo spazio tra lettere e righe"
              checked={settings.textSpacing}
              onChange={(v) => updateSetting("textSpacing", v)}
            />

            {/* Font per dislessia */}
            <ToggleOption
              icon={<Eye className="h-5 w-5" />}
              label="Font Leggibile"
              description="Font ottimizzato per la dislessia"
              checked={settings.dyslexicFont}
              onChange={(v) => updateSetting("dyslexicFont", v)}
            />
          </div>

          {/* Saturazione colori */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-5 w-5 text-primary-600" />
              <span className="font-medium text-gray-900">Saturazione Colori</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Per daltonismo o sensibilità ai colori</p>
            <div className="flex gap-2">
              {[
                { value: "normal", label: "Normale" },
                { value: "low", label: "Ridotta" },
                { value: "none", label: "Scala grigi" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateSetting("saturation", option.value as "normal" | "low" | "none")}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    settings.saturation === option.value
                      ? "bg-primary-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={resetSettings}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Ripristina Impostazioni
          </button>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   TOGGLE OPTION COMPONENT
   ========================================================================== */

interface ToggleOptionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleOption({
  icon,
  label,
  description,
  checked,
  onChange,
}: ToggleOptionProps) {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 text-sm">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-primary-600" : "bg-gray-300"
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </div>
    </label>
  );
}
