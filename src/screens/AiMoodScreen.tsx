import { AlertTriangle, Loader2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { FiltriSerata, ScreenId } from '../types/menuMatch'

interface AiMoodScreenProps {
    filtri: FiltriSerata
    onChangeFiltri: (filtri: FiltriSerata) => void
    onNavigate: (screen: ScreenId) => void
}

const ESEMPIO_DESCRIZIONE =
    'Pranzo informale con colleghi, vegetariani e spazio esterno vicino al campus'

/** MU-Fig.7 — Configurazione Mood con IA */
export function AiMoodScreen({ filtri, onChangeFiltri, onNavigate }: AiMoodScreenProps) {
    const [descrizione, setDescrizione] = useState(ESEMPIO_DESCRIZIONE)
    const [caricamento, setCaricamento] = useState(false)
    const [suggeriti, setSuggeriti] = useState({
        mood: 'Informale',
        dieta: 'Vegetariana',
        zona: 'Campus',
        spazio: "All'aperto" as 'Interno' | "All'aperto",
    })

    const handleSuggerisci = () => {
        setCaricamento(true)
        window.setTimeout(() => {
            setSuggeriti({
                mood: 'Informale',
                dieta: 'Vegetariana',
                zona: 'Campus',
                spazio: "All'aperto",
            })
            setCaricamento(false)
        }, 400)
    }

    const handleConferma = () => {
        const nuoviFiltri: FiltriSerata = {
            ...filtri,
            atmosfera: 'Informale',
            dieta: 'Vegetariano',
            zonaLabel: suggeriti.zona,
            zonaDaVerificare: true,
            spazio: suggeriti.spazio,
        }
        onChangeFiltri(nuoviFiltri)
        onNavigate('filters')
    }

    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="bg-[#1A2634] px-6 py-6">
                <h1 className="text-xl font-bold text-white">Filtri Serata</h1>
            </header>

            <main className="flex flex-1 flex-col gap-5 px-6 py-6">
                <section>
                    <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-[#1A2634]">
                        Descrivi la serata
                        <Sparkles className="h-4 w-4 text-[#6C5CE7]" aria-hidden="true" />
                    </h2>
                    <label htmlFor="descrizione-serata" className="sr-only">
                        Descrivi la serata a parole
                    </label>
                    <textarea
                        id="descrizione-serata"
                        value={descrizione}
                        onChange={(event) => setDescrizione(event.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 text-sm text-[#1A2634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C5CE7]"
                    />
                </section>

                <button
                    type="button"
                    aria-label="Suggerisci filtri con l'intelligenza artificiale"
                    onClick={handleSuggerisci}
                    disabled={caricamento}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6C5CE7] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5A4BD1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C5CE7] disabled:opacity-70"
                >
                    {caricamento ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                    )}
                    Suggerisci filtri IA
                </button>

                <section aria-label="Filtri estratti dall'IA" className="flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-white px-4 py-3">
                        <span className="text-sm font-medium text-[#1A2634]">Mood</span>
                        <span className="text-sm text-slate-600">{suggeriti.mood}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-white px-4 py-3">
                        <span className="text-sm font-medium text-[#1A2634]">Dieta</span>
                        <span className="text-sm text-slate-600">{suggeriti.dieta}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-[#FDE68A] bg-[#FEF3C7] px-4 py-3">
                        <span className="flex items-center gap-2 text-sm font-medium text-[#1A2634]">
                            <AlertTriangle className="h-4 w-4 text-[#D97706]" aria-hidden="true" />
                            Zona
                        </span>
                        <span className="text-sm font-medium text-[#D97706]">{suggeriti.zona} · verifica</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-white px-4 py-3">
                        <span className="text-sm font-medium text-[#1A2634]">Spazio</span>
                        <span className="text-sm text-slate-600">{suggeriti.spazio}</span>
                    </div>
                </section>
            </main>

            <footer className="px-6 pb-8 pt-2">
                <button
                    type="button"
                    aria-label="Conferma o modifica i filtri suggeriti"
                    onClick={handleConferma}
                    className="w-full rounded-xl bg-[#1E6F50] px-4 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#16563D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    Conferma / modifica
                </button>
            </footer>
        </div>
    )
}

