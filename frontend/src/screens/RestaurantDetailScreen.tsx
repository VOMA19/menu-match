import { AlertTriangle, ArrowLeft, ExternalLink, Globe, Image as ImageIcon, Map as MapIcon, Plus } from 'lucide-react'
import { useState } from 'react'
import { VOCABOLARIO_TAG_COMMUNITY } from '../types/menuMatch'
import type { Ristorante, ScreenId, TagCommunity } from '../types/menuMatch'

interface RestaurantDetailScreenProps {
    ristorante: Ristorante
    onAggiungiTag: (ristoranteId: string, tag: TagCommunity) => void
    onNavigate: (screen: ScreenId) => void
}

const SOGLIA_VISIBILITA_PUBBLICA = 3

/** MU-Fig.6 — Dettaglio Locale */
export function RestaurantDetailScreen({
    ristorante,
    onAggiungiTag,
    onNavigate,
}: RestaurantDetailScreenProps) {
    const [toast, setToast] = useState<string | null>(null)
    const [selettoreAperto, setSelettoreAperto] = useState(false)

    const mostraToast = (messaggio: string) => {
        setToast(messaggio)
        window.setTimeout(() => setToast(null), 2000)
    }

    const handleAggiungiTag = (label: (typeof VOCABOLARIO_TAG_COMMUNITY)[number]) => {
        onAggiungiTag(ristorante.id, { label, conteggio: 1, pubblico: false })
        setSelettoreAperto(false)
        mostraToast(`Tag "${label}" aggiunto`)
    }

    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="flex items-center gap-3 bg-[#1A2634] px-6 py-6">
                <button
                    type="button"
                    aria-label="Torna ai risultati finali"
                    onClick={() => onNavigate('results')}
                    className="rounded-full p-1 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <h1 className="text-xl font-bold text-white">Dettaglio Locale</h1>
            </header>

            <main className="flex flex-1 flex-col gap-5 px-6 py-6">
                <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100">
                    <ImageIcon className="h-12 w-12 text-slate-300" aria-hidden="true" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#1A2634]">{ristorante.nome}</h2>
                    <p className="text-sm text-slate-500">
                        Rating: {ristorante.ratingLabel ?? 'n.d.'} · Fonte: {ristorante.fonte}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {ristorante.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-[#E6F4EF] px-3 py-1 text-xs font-medium text-[#1E6F50]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-start gap-2 rounded-lg border border-[#FDE68A] bg-[#FEF3C7] p-3">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-[#D97706]" aria-hidden="true" />
                    <p className="text-sm text-[#92620A]">{ristorante.allergeniAvviso}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        aria-label="Apri la mappa del locale"
                        onClick={() => mostraToast('Apertura mappa esterna…')}
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-3 text-sm font-semibold text-[#1A2634] transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                    >
                        <MapIcon className="h-4 w-4" aria-hidden="true" />
                        Apri Mappa
                    </button>
                    <button
                        type="button"
                        aria-label="Apri il sito ufficiale del locale"
                        onClick={() => mostraToast('Apertura sito ufficiale…')}
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-3 text-sm font-semibold text-[#1A2634] transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                    >
                        <Globe className="h-4 w-4" aria-hidden="true" />
                        Sito Ufficiale
                    </button>
                </div>

                <section aria-label="Tag Community" className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-[#1A2634]">Tag Community</h3>
                        <span className="text-xs text-slate-400">Solo utenti registrati</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {(ristorante.tagCommunity ?? []).map((tag) => (
                            <span
                                key={tag.label}
                                className="rounded-full border border-[#FDE68A] bg-[#FEF3C7] px-3 py-1 text-xs font-medium text-[#D97706]"
                            >
                                {tag.label}
                                {tag.conteggio < SOGLIA_VISIBILITA_PUBBLICA && ' ·'}
                            </span>
                        ))}
                    </div>

                    <button
                        type="button"
                        aria-label="Aggiungi un tag community"
                        onClick={() => setSelettoreAperto((precedente) => !precedente)}
                        aria-expanded={selettoreAperto}
                        className="mt-3 flex items-center gap-2 rounded-lg border border-[#FDE68A] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold text-[#D97706] transition-colors hover:bg-[#FDE9A8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                    >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Aggiungi Tag
                    </button>

                    {selettoreAperto && (
                        <div className="mt-3 flex flex-wrap gap-2" role="listbox" aria-label="Vocabolario tag controllato">
                            {VOCABOLARIO_TAG_COMMUNITY.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    role="option"
                                    aria-selected={false}
                                    onClick={() => handleAggiungiTag(tag)}
                                    className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#1A2634] transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}

                    <p className="mt-3 text-xs text-slate-500">
                        Contributo registrato (visibile pubblicamente al raggiungimento di 3 utenti distinti)
                    </p>
                </section>
            </main>

            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1A2634] px-4 py-2 text-sm text-white shadow-lg"
                >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    {toast}
                </div>
            )}
        </div>
    )
}
