/**
 * Tipi condivisi della WebApp Menu Match.
 * Riferimento: Deliverable D1 (Menu_Match_D1_V1_3.pdf) - Sezione 6, Design Front-end.
 */

export type ScreenId =
    | 'home'
    | 'filters'
    | 'aiMood'
    | 'auth'
    | 'joinEvening'
    | 'lobby'
    | 'voting'
    | 'results'
    | 'restaurantDetail'

export type PriceRange = '$' | '$$' | '$$$'

export type Atmosfera = 'Informale' | 'Romantico' | 'Gruppi' | 'Elegante'

export type Dieta = 'Nessuna' | 'Vegetariano' | 'Vegano' | 'Senza glutine'

export type PreferenzaAlimentare = 'Vegetariana' | 'Vegana' | 'Senza glutine' | 'Altro...'

export type StatoPartecipante = 'Pronto' | 'In attesa'

export interface FiltriSerata {
    zonaLabel: string
    raggioKm: number
    prezzo: PriceRange
    atmosfera: Atmosfera
    dieta: Dieta
    zonaDaVerificare?: boolean
    spazio?: 'Interno' | "All'aperto"
}

export interface Partecipante {
    id: string
    nome: string
    stato: StatoPartecipante
    isCreatore?: boolean
}

export interface SintesiIA {
    testo: string
    fonte: string
}

export interface Ristorante {
    id: string
    nome: string
    distanzaKm: number
    prezzo: PriceRange
    fonte: string
    tags: string[]
    ratingLabel?: string
    sintesiIA?: SintesiIA
    allergeniAvviso?: string
    sitoUfficiale?: string
    tagCommunity?: TagCommunity[]
}

export interface TagCommunity {
    label: string
    conteggio: number
    pubblico: boolean
}

export interface VotoRistorante {
    ristoranteId: string
    consensi: number
    totaleVotanti: number
}

export interface Serata {
    nomeCreatore: string
    codiceInvito: string
    filtri: FiltriSerata
    partecipanti: Partecipante[]
}

export const VOCABOLARIO_TAG_COMMUNITY = [
    'Informale',
    'Gruppi',
    'Opzioni Vegane',
    "All'aperto",
    'Economico',
    'Veloce',
] as const

export type TagCommunityControllato = (typeof VOCABOLARIO_TAG_COMMUNITY)[number]
