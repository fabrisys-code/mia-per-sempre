# Mia Per Sempre - Frontend

> Il marketplace italiano della nuda proprietà

## 🚀 Quick Start

### Prerequisiti

- Node.js 18+ 
- npm o yarn
- Backend FastAPI in esecuzione su `localhost:8000`

### Installazione

```bash
# Clona il repository (se non già fatto)
cd frontend

# Installa le dipendenze
npm install

# Copia e configura le variabili d'ambiente
cp .env.example .env.local

# Avvia in sviluppo
npm run dev
```

L'applicazione sarà disponibile su [http://localhost:3000](http://localhost:3000)

## 📁 Struttura Progetto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── (auth)/            # Route group autenticazione
│   │   ├── login/
│   │   └── register/
│   ├── properties/        # Pagine immobili
│   │   ├── page.tsx       # Lista
│   │   └── [id]/          # Dettaglio
│   ├── dashboard/         # Area utente
│   ├── layout.tsx         # Layout principale
│   ├── page.tsx           # Homepage
│   └── globals.css        # Stili globali
├── components/
│   ├── ui/                # Componenti base (Button, Card, Input...)
│   ├── layout/            # Header, Footer, Sidebar
│   ├── properties/        # Componenti specifici immobili
│   └── valuation/         # Componenti calcolatore
├── lib/
│   ├── api.ts             # Client API
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript interfaces
└── styles/                # Stili aggiuntivi
```

## 🎨 Design System

### Colori Brand

| Nome | HEX | Uso |
|------|-----|-----|
| Primary (Verde Bosco) | `#2D5016` | CTA, header, link |
| Secondary (Oro Caldo) | `#D4AF37` | Featured, premium |
| Accent (Azzurro) | `#4A90E2` | Info, link secondari |

### Font

- **Inter**: Testo body, UI, form
- **Playfair Display**: Titoli, hero, branding

### Componenti UI

```tsx
import { Button, Card, Badge, Input } from '@/components/ui';

// Bottoni
<Button variant="primary">Pubblica</Button>
<Button variant="secondary">Featured</Button>
<Button variant="outline">Scopri</Button>

// Card
<Card variant="featured">
  <CardTitle>Titolo</CardTitle>
  <CardContent>Contenuto</CardContent>
</Card>

// Badge
<Badge variant="featured">Featured</Badge>
<Badge variant="verified">Verificato</Badge>
```

## 🔌 API Integration

Il client API si trova in `src/lib/api.ts`:

```tsx
import api from '@/lib/api';

// Login
const { access_token } = await api.auth.login({ 
  email: 'user@email.com', 
  password: 'password' 
});

// Lista immobili
const properties = await api.properties.list({ page: 1 });

// Dettaglio immobile
const property = await api.properties.get(1);

// Calcolo valutazione
const valuation = await api.valuation.calculate({
  comune: 'Milano',
  superficie_principale: 85,
  eta_usufruttuario: 75,
});
```

## 📜 Script Disponibili

```bash
npm run dev        # Sviluppo con hot reload
npm run build      # Build produzione
npm run start      # Avvia build produzione
npm run lint       # Linting ESLint
npm run type-check # Verifica TypeScript
```

## 🔧 Configurazione

### Environment Variables

| Variabile | Descrizione | Default |
|-----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL backend API | `http://localhost:8000` |
| `NEXT_PUBLIC_SITE_URL` | URL sito | `http://localhost:3000` |

### Tailwind Config

I colori del brand sono configurati in `tailwind.config.ts`:

```ts
colors: {
  primary: {
    DEFAULT: '#2D5016',
    50: '#F5FAF2',
    // ... scala completa
  },
  secondary: {
    DEFAULT: '#D4AF37',
    // ...
  },
  accent: {
    DEFAULT: '#4A90E2',
    // ...
  },
}
```

## 📋 TODO - Prossimi Step

### Fase 1 - MVP
- [ ] Pagina lista immobili con filtri
- [ ] Pagina dettaglio immobile con gallery
- [ ] Pagine login/registrazione
- [ ] Integrazione completa API

### Fase 2 - Dashboard
- [ ] Dashboard proprietario
- [ ] Form inserimento annuncio
- [ ] Upload immagini con preview
- [ ] Gestione profilo

### Fase 3 - Avanzate
- [ ] Calcolatore valutazione interattivo
- [ ] Mappa con cluster immobili
- [ ] Sistema notifiche
- [ ] PWA support

## 📚 Risorse

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

**Mia Per Sempre** - Il marketplace italiano della nuda proprietà  
© 2024 Fasys S.r.l.
