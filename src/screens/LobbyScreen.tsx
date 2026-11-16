import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import type { Partecipante, ScreenId } from '../types/menuMatch'

interface LobbyScreenProps {
    codiceInvito: string
    partecipanti: Partecipante[]
    onTogglePartecipante: (id: string) => void
    onNavigate: (screen: ScreenId) => void
}

/** MU-Fig.3 — Lobby Realtime */
export function LobbyScreen({
    codiceInvito,
    partecipanti,
    onTogglePartecipante,
    onNavigate,
}: LobbyScreenProps) {
    const [copiato, setCopiato] = useState(false)

    const handleCopia = () => {
        setCopiato(true)
        window.setTimeout(() => setCopiato(false), 1500)
    }

    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="bg-[#1A2634] px-6 py-6">
                <h1 className="text-xl font-bold text-white">Lobby Realtime</h1>
            </header>

            <main className="flex flex-1 flex-col gap-6 px-6 py-8">
                <div className="flex items-center justify-between rounded-xl border border-[#1E6F50]/20 bg-[#E6F4EF] px-4 py-4">
                    <span className="text-sm font-semibold text-[#1E6F50]">Codice: {codiceInvito}</span>
                    <button
                        type="button"
                        aria-label="Copia il link della serata"
                        onClick={handleCopia}
                        className="flex items-center gap-1 rounded-lg bg-[#1E6F50] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#16563D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                    >
                        {copiato ? (
                            <>
                                <Check className="h-4 w-4" aria-hidden="true" />
                                Copiato!
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" aria-hidden="true" />
                                Copia Link
                            </>
                        )}
                    </button>
                </div>

                <section aria-label="Elenco partecipanti">
                    <h2 className="mb-3 text-sm font-semibold text-[#1A2634]">
                        Partecipanti ({partecipanti.length})
                    </h2>
                    <ul className="flex flex-col gap-2">
                        {partecipanti.map((partecipante) => (
                            <li key={partecipante.id}>
                                <button
                                    type="button"
                                    aria-label={`${partecipante.nome}: ${partecipante.stato}${
                                        partecipante.stato === 'In attesa' ? ', clicca per segnare come pronto' : ''
                                    }`}
                                    onClick={() => onTogglePartecipante(partecipante.id)}
                                    className="flex w-full items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-left transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                                >
                                    <span className="flex items-center gap-3">
                                        <span
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2634] text-sm font-semibold text-white"
                                            aria-hidden="true"
                                        >
                                            {partecipante.nome.charAt(0).toUpperCase()}
                                        </span>
                                        <span className="text-sm font-medium text-[#1A2634]">
                                            {partecipante.nome}
                                            {partecipante.isCreatore && (
                                                <span className="ml-1 text-xs text-slate-400">(Creatore)</span>
                                            )}
                                        </span>
                                    </span>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            partecipante.stato === 'Pronto'
                                                ? 'bg-[#E6F4EF] text-[#1E6F50]'
                                                : 'bg-[#FEF3C7] text-[#D97706]'
                                        }`}
                                    >
                                        {partecipante.stato}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>

                <p className="text-center text-xs italic text-slate-500">Solo il Creatore avvia la votazione</p>
            </main>

            <footer className="px-6 pb-8 pt-2">
                <button
                    type="button"
                    aria-label="Inizia la votazione"
                    onClick={() => onNavigate('voting')}
                    className="w-full rounded-xl bg-[#1E6F50] px-4 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#16563D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    Inizia Votazione
                </button>
            </footer>
        </div>
    )
}
