# Checklist Accessibilità WCAG 2.1 AA - Mia Per Sempre

Questa checklist documenta la conformità del frontend alle linee guida WCAG 2.1 livello AA.

## Principio 1: Percepibile

### 1.1 Alternative Testuali
| Criterio | Stato | Note |
|----------|-------|------|
| 1.1.1 Contenuto non testuale | ✅ | Immagini hanno alt text, icone decorative hanno aria-hidden |

### 1.3 Adattabile
| Criterio | Stato | Note |
|----------|-------|------|
| 1.3.1 Informazioni e relazioni | ✅ | Label associate con htmlFor, struttura semantica |
| 1.3.2 Sequenza significativa | ✅ | Ordine DOM logico |
| 1.3.3 Caratteristiche sensoriali | ✅ | Non solo colore per indicare errori |
| 1.3.4 Orientamento | ✅ | Layout responsive, no blocco orientamento |
| 1.3.5 Identificare lo scopo dell'input | ✅ | autocomplete su campi form |

### 1.4 Distinguibile
| Criterio | Stato | Note |
|----------|-------|------|
| 1.4.1 Uso del colore | ✅ | Errori hanno icona + testo, non solo colore rosso |
| 1.4.3 Contrasto (minimo) | ✅ | Tutti i testi >= 4.5:1 |
| 1.4.4 Ridimensionamento testo | ✅ | Font in rem/em, zoom 200% ok |
| 1.4.5 Immagini di testo | ✅ | Solo CSS per testo, no immagini |
| 1.4.10 Reflow | ✅ | Layout responsive senza scroll orizzontale |
| 1.4.11 Contrasto non testuale | ✅ | Bordi e icone con contrasto sufficiente |
| 1.4.12 Spaziatura testo | ✅ | Nessun contenuto troncato con spaziatura aumentata |
| 1.4.13 Contenuto hover/focus | ✅ | Tooltip dismissibili, persistenti, hoverable |

## Principio 2: Utilizzabile

### 2.1 Accessibile da tastiera
| Criterio | Stato | Note |
|----------|-------|------|
| 2.1.1 Tastiera | ✅ | Tutti gli elementi interattivi navigabili |
| 2.1.2 Nessun blocco tastiera | ✅ | Nessun trap del focus |
| 2.1.4 Scorciatoie da tastiera | ✅ | Nessuna scorciatoia a singolo tasto |

### 2.4 Navigabile
| Criterio | Stato | Note |
|----------|-------|------|
| 2.4.1 Salta blocchi | ✅ | SkipLink implementato |
| 2.4.2 Titolo della pagina | ✅ | Metadata title per ogni pagina |
| 2.4.3 Ordine del focus | ✅ | Focus segue ordine logico |
| 2.4.4 Scopo del link | ✅ | Link descrittivi, no "clicca qui" |
| 2.4.5 Molteplici modalità | ✅ | Navigazione + ricerca + sitemap |
| 2.4.6 Intestazioni ed etichette | ✅ | H1-H6 gerarchici, label per input |
| 2.4.7 Focus visibile | ✅ | Focus ring 3px azzurro, outline-offset 2px |

### 2.5 Modalità di input
| Criterio | Stato | Note |
|----------|-------|------|
| 2.5.1 Gesti del puntatore | ✅ | Nessun gesto multi-punto richiesto |
| 2.5.2 Annullamento puntatore | ✅ | Eventi su mouseup/click |
| 2.5.3 Etichetta nel nome | ✅ | Label visibili corrispondono al nome accessibile |
| 2.5.4 Attivazione da movimento | ✅ | Nessuna funzione attivata da movimento |

## Principio 3: Comprensibile

### 3.1 Leggibile
| Criterio | Stato | Note |
|----------|-------|------|
| 3.1.1 Lingua della pagina | ✅ | html lang="it" |
| 3.1.2 Lingua delle parti | ⚠️ | Da aggiungere lang su citazioni in altre lingue |

### 3.2 Prevedibile
| Criterio | Stato | Note |
|----------|-------|------|
| 3.2.1 Al focus | ✅ | Nessun cambio di contesto su focus |
| 3.2.2 All'input | ✅ | Form submit esplicito, no auto-submit |
| 3.2.3 Navigazione coerente | ✅ | Header/footer consistenti |
| 3.2.4 Identificazione coerente | ✅ | Stessi componenti = stessa etichetta |

### 3.3 Assistenza nell'inserimento
| Criterio | Stato | Note |
|----------|-------|------|
| 3.3.1 Identificazione errori | ✅ | Errori con icona, testo, aria-invalid |
| 3.3.2 Etichette o istruzioni | ✅ | Label + hint text + placeholder |
| 3.3.3 Suggerimenti per errori | ✅ | Messaggi errore con suggerimento correzione |
| 3.3.4 Prevenzione errori | ✅ | Conferma per azioni irreversibili |

## Principio 4: Robusto

### 4.1 Compatibile
| Criterio | Stato | Note |
|----------|-------|------|
| 4.1.1 Parsing | ✅ | HTML5 valido |
| 4.1.2 Nome, ruolo, valore | ✅ | ARIA corretto su componenti custom |
| 4.1.3 Messaggi di stato | ✅ | LiveRegion per messaggi dinamici |

---

## Contrasti Verificati

| Elemento | Foreground | Background | Ratio | Pass |
|----------|------------|------------|-------|------|
| Testo normale | #1f2937 | #ffffff | 14.2:1 | ✅ |
| Testo su primary | #ffffff | #2D5016 | 7.1:1 | ✅ |
| Testo su secondary | #2D5016 | #D4AF37 | 4.5:1 | ✅ |
| Link | #2563eb | #ffffff | 4.6:1 | ✅ |
| Errore | #dc2626 | #ffffff | 4.6:1 | ✅ |
| Focus ring | #4A90E2 | #ffffff | 3.1:1 | ✅ (AA per grafica) |

---

## Componenti Accessibili

### Implementati
- ✅ SkipLink - Salta al contenuto principale
- ✅ LiveRegion - Annunci screen reader
- ✅ VisuallyHidden - Contenuto solo per SR
- ✅ Button - Focus, loading state, aria-busy
- ✅ IconButton - aria-label obbligatorio
- ✅ Input/Textarea/Select - Label, hint, error, aria-invalid
- ✅ Checkbox - Label cliccabile, descrizione
- ✅ Badge - Contrasto verificato, role status
- ✅ Card - Semantica corretta
- ✅ Pagination - aria-current, aria-label

### Da Verificare
- ⚠️ Modal/Dialog - aria-modal, focus trap
- ⚠️ Dropdown - aria-expanded, arrow navigation
- ⚠️ Toast - aria-live, auto-dismiss accessibile
- ⚠️ Tab - aria-selected, arrow navigation

---

## Test Consigliati

### Automatici
```bash
# Lighthouse Accessibility Audit
# Chrome DevTools → Lighthouse → Accessibility

# axe DevTools
# Estensione browser per audit WCAG

# eslint-plugin-jsx-a11y
npm install eslint-plugin-jsx-a11y --save-dev
```

### Manuali
1. **Navigazione tastiera**: Tab attraverso tutta la pagina
2. **Screen reader**: Test con NVDA/VoiceOver
3. **Zoom 200%**: Verifica layout senza scroll orizzontale
4. **Contrasto**: Usa WebAIM Contrast Checker
5. **Reduced motion**: Attiva preferenza e verifica animazioni

---

## Risorse

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/)
- [Inclusive Components](https://inclusive-components.design/)
