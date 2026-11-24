import { LogIn } from 'lucide-react'
import { useState } from 'react'
import type { ScreenId } from '../types/menuMatch'

interface HomeScreenProps {
    onNavigate: (screen: ScreenId) => void
}

/** MU-Fig.1 — Home */
export function HomeScreen({ onNavigate }: HomeScreenProps) {
    const [codice, setCodice] = useState('')

    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="bg-[#1A2634] px-6 pb-10 pt-12 text-center">
                <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white"
                    aria-hidden="true"
                >
                    MM
                </div>
                <h1 className="text-2xl font-bold text-white">Menu Match</h1>
                <p className="mx-auto mt-3 max-w-xs text-sm text-slate-300">
                    Meno discussioni su dove andare, più tempo per stare insieme
                </p>
            </header>

            <main className="flex flex-1 flex-col gap-6 px-6 py-8">
                <button
                    type="button"
                    aria-label="Crea una nuova serata"
                    onClick={() => onNavigate('filters')}
                    className="w-full rounded-xl bg-[#1E6F50] px-4 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#16563D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    Crea Serata
                </button>

                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <label htmlFor="codice-invito" className="mb-2 block text-sm font-medium text-[#1A2634]">
                        Codice Invito
                    </label>
                    <div className="flex gap-2">
                        <input
                            id="codice-invito"
                            type="text"
                            placeholder="XYZ"
                            value={codice}
                            onChange={(event) => setCodice(event.target.value.toUpperCase())}
                            aria-label="Codice invito"
                            className="w-full rounded-lg border border-[#E2E8F0] px-3 py-3 text-sm text-[#1A2634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                        />
                        <button
                            type="button"
                            aria-label="Entra come ospite con il codice invito"
                            onClick={() => onNavigate('joinEvening')}
                            className="shrink-0 whitespace-nowrap rounded-lg border border-[#1E6F50] px-4 py-3 text-sm font-semibold text-[#1E6F50] transition-colors hover:bg-[#E6F4EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                        >
                            Entra (Ospite)
                        </button>
                    </div>
                </div>
            </main>

            <footer className="px-6 pb-8 text-center">
                <button
                    type="button"
                    aria-label="Vai alla pagina di accesso o registrazione"
                    onClick={() => onNavigate('auth')}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#1E6F50] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Accedi · Registrati
                </button>
            </footer>
        </div>
    )
}
