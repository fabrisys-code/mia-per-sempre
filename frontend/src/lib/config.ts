/**
 * Configurazione centralizzata per le URL API
 * 
 * In SVILUPPO: usa localhost:8000
 * In PRODUZIONE: usa URL relativi (client) o NEXT_PUBLIC_API_URL (server)
 */

// Per chiamate lato CLIENT (browser)
export function getClientApiUrl(): string {
  // Se c'è una variabile d'ambiente, usala
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // In browser: controlla se siamo in produzione
  if (typeof window !== 'undefined') {
    // In produzione (non localhost), usa URL relativi
    if (window.location.hostname !== 'localhost' && 
        window.location.hostname !== '127.0.0.1') {
      return ''; // URL relativo - il browser userà il dominio corrente
    }
  }
  
  // Default: sviluppo locale
  return 'http://localhost:8000';
}

// Per chiamate lato SERVER (SSR, Server Components)
export function getServerApiUrl(): string {
  // In produzione DEVE essere configurata NEXT_PUBLIC_API_URL
  // perché il server non può usare URL relativi
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Default: sviluppo locale
  return 'http://localhost:8000';
}

// Prefisso API (comune a tutti gli endpoint)
export const API_PREFIX = '/api/v1';
