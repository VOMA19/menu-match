import type {
    FiltriSerata,
    Partecipante,
    Ristorante,
} from '../types/menuMatch'

/** Filtri di default precompilati su MU-Fig.2, aggiornabili da MU-Fig.7. */
export const FILTRI_DEFAULT: FiltriSerata = {
    zonaLabel: 'Posizione',
    raggioKm: 2,
    prezzo: '$$',
    atmosfera: 'Informale',
    dieta: 'Vegetariano',
}

/** Codice invito della demo (MU-Fig.1 / MU-Fig.10). */
export const CODICE_INVITO_DEMO = 'XYZ'
export const NOME_CREATORE_DEMO = 'Marco'

/** Partecipanti iniziali in lobby (MU-Fig.3). */
export const PARTECIPANTI_INIZIALI: Partecipante[] = [
    { id: 'p1', nome: 'Marco', stato: 'Pronto', isCreatore: true },
    { id: 'p2', nome: 'Giulia', stato: 'Pronto' },
    { id: 'p3', nome: 'Luca', stato: 'In attesa' },
]

/** Dataset mockato di ristoranti per la votazione (MU-Fig.4 / MU-Fig.8). */
export const RISTORANTI_MOCK: Ristorante[] = [
    {
        id: 'r1',
        nome: 'Trattoria A',
        distanzaKm: 1.2,
        prezzo: '$$',
        fonte: 'Google',
        tags: ['Informale', 'Gruppi'],
        ratingLabel: '4,4',
        sintesiIA: {
            testo: 'Informale e adatta a gruppi, secondo i dati disponibili.',
            fonte: 'Fonte: dati autorizzati',
        },
        allergeniAvviso: 'Verificare direttamente con il locale in caso di intolleranze gravi',
        sitoUfficiale: 'https://trattoria-a.example.com',
        tagCommunity: [
            { label: 'Economico', conteggio: 2, pubblico: false },
        ],
    },
    {
        id: 'r2',
        nome: 'Pizzeria B',
        distanzaKm: 0.8,
        prezzo: '$',
        fonte: 'TripAdvisor',
        tags: ['Informale', 'Gruppi'],
        ratingLabel: '4,1',
        sintesiIA: {
            testo: 'Ambiente informale, ideale per gruppi numerosi secondo le recensioni.',
            fonte: 'Fonte: dati autorizzati',
        },
        allergeniAvviso: 'Verificare direttamente con il locale in caso di intolleranze gravi',
        sitoUfficiale: 'https://pizzeria-b.example.com',
        tagCommunity: [],
    },
    {
        id: 'r3',
        nome: 'Osteria C',
        distanzaKm: 1.0,
        prezzo: '$$',
        fonte: 'Google',
        tags: ['Informale'],
        ratingLabel: '4,3',
        // Nessuna sintesi IA: fallback standard RNF-07 senza bloccare il voto.
        allergeniAvviso: 'Verificare direttamente con il locale in caso di intolleranze gravi',
        sitoUfficiale: 'https://osteria-c.example.com',
        tagCommunity: [],
    },
    {
        id: 'r4',
        nome: 'Bistrot Verde',
        distanzaKm: 1.5,
        prezzo: '$$',
        fonte: 'OpenStreetMap',
        tags: ['Romantico', "All'aperto"],
        ratingLabel: '4,0',
        sintesiIA: {
            testo: "Spazio esterno curato, adatto a cene romantiche secondo i dati disponibili.",
            fonte: 'Fonte: dati autorizzati',
        },
        allergeniAvviso: 'Verificare direttamente con il locale in caso di intolleranze gravi',
        sitoUfficiale: 'https://bistrot-verde.example.com',
        tagCommunity: [],
    },
    {
        id: 'r5',
        nome: 'Sushi D',
        distanzaKm: 0.8,
        prezzo: '$$$',
        fonte: 'Google',
        tags: ['Elegante'],
        ratingLabel: '4,6',
        sintesiIA: {
            testo: 'Proposta elegante, consigliata per occasioni speciali secondo i dati disponibili.',
            fonte: 'Fonte: dati autorizzati',
        },
        allergeniAvviso: 'Verificare direttamente con il locale in caso di intolleranze gravi',
        sitoUfficiale: 'https://sushi-d.example.com',
        tagCommunity: [],
    },
]

/** Vocabolario controllato per i tag community (RF-08), vedi anche src/types/menuMatch.ts. */
export { VOCABOLARIO_TAG_COMMUNITY } from '../types/menuMatch'
