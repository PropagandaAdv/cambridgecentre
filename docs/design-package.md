# Design package (bozza v0, in attesa dei fatti dal sito)

## Premessa
Cambridge Centre of English, Modena. Direzione: "British Editorial Premium". Nessuna affiliazione suggerita con l'Università di Cambridge.

## Token (brand identity 2024, verificati dall'immagine fornita)
| Token | HEX | Fonte |
|---|---|---|
| brand-red | #E4002B | brand identity |
| brand-blue | #036AAC | brand identity |
| brand-ink | #1A1A1A | brand identity |
| brand-white | #FFFFFF | brand identity |
| canvas #F5F7FA, night #0B1E30 | derivati | proposta di design |

## Tipografia
Libre Baskerville (display, brand). Instrument Sans (corpo) e JetBrains Mono (etichette): proposte. Pesi caricati: 400 e 700; Light e Semibold da verificare su Google Fonts (da dichiarare).

## Hero: viaggio in tre capitoli (~1000vh, scrub continuo)
1. London: Buckingham Palace all'alba, volo basso verso la facciata.
2. Westminster: avanzamento lungo il Tamigi verso il Big Ben, ingresso in un banco di nuvole.
3. Cambridge: uscita dalle nuvole in discesa verso King's College Chapel, fermo composto, headline a sinistra.
Ogni prompt: "no text, no logos, no lettering anywhere". Segmenti da 6 s, 1080p, image-to-video, video gate per ciascuno.

## Fatti di riferimento
Vedi `content/source-facts.md`. Il copy usa solo quei fatti.

## Preflight costi (Magnific, saldo 10.734 crediti)
| Modello video | Durata | Risoluzione | Crediti/segmento | 3 segmenti |
|---|---|---|---|---|
| Seedance 2.5 | 6 s | 1080p | 4.740 | 14.220 (supera il saldo) |
| Seedance 2.0 | 6 s | 1080p | 4.200 | 12.600 (supera il saldo) |
| Kling 2.5 | 5 s | 1080p | 325 | 975 |
Raccomandato: **Kling 2.5**, 5 s per segmento (il modello offre 5 o 10 s), start e end frame supportati. Totale hero ~15 s.
Immagini: fotogramma iniziale e 4 still di supporto con Seedream 5 Pro, ~100 crediti ciascuno (stima, costo variabile).
Totale stimato: ~1.500-2.500 crediti con margine per 2-3 re-roll.

## Stato
Fatti estratti. Prossimo gate: approvazione dello storyboard e della cifra, poi generazione del fotogramma iniziale.

## Stato finale (2026-10-15)
Homepage completa in `src/CambridgeHomepage.jsx`. Deploy su Vercel NON eseguito: la creazione del progetto è stata rifiutata con 403 (permessi sul team "Propaganda Adv").

### Crediti Magnific spesi: 2.100 (restano circa 8.630)
- Immagini: 800 (fotogramma di Londra, Westminster, Cambridge, 4 tile e 1 rigenerazione)
- Video Kling 2.5: 1.300 (4 segmenti da 5 s, di cui il primo capitolo 2 scartato)

### Audit di leggibilità (scrim 0,70, bianco sul fotogramma peggiore, modello)
Pixel peggiore sotto il testo: capitolo 1 ≥ 4,6:1, capitolo 2 ≥ 3,7:1, fermo finale ≥ 4,1:1. Contrasti dei token calcolati: rosso su bianco 4,85, blu su canvas 5,34, bianco su blu notte 16,9, rosso su blu notte 3,49 (solo grafica e testo grande).

### Da verificare con il cliente
1. "Unico centro esami autorizzato Cambridge Assessment English" e dicitura esatta dello status.
2. "Dal 1964" e "oltre 60 anni" (parole del sito, usate su conferma).
3. Exam Practice: nella home è "Coming soon", non è in pagina.
4. Nomi di scuole e aziende clienti e autorizzazione all'uso (SHOW_CLIENT_NAMES = false).
5. PCTO e formazione docenti: non sul sito, non in pagina.
6. Destinazione del modulo: ora mailto; tempi di risposta e passi dopo l'invio.
7. Selettore IT/EN: il sito non ha versione inglese, EN è disabilitato.
8. Cookie policy: il sito attuale non ha la pagina, nessun link.
9. Nota di non affiliazione con l'Università di Cambridge nel footer: formula da approvare.
10. Le immagini dei tile sono evocative e generate: l'aula degli esami non mostra il laboratorio informatico reale.
