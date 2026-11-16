import { ChevronRight, MapPin, Sparkles } from 'lucide-react'
import type { Atmosfera, Dieta, FiltriSerata, PriceRange, ScreenId } from '../types/menuMatch'

interface FiltersScreenProps {
    filtri: FiltriSerata
    onChangeFiltri: (filtri: FiltriSerata) => void
    onNavigate: (screen: ScreenId) => void
}

const PREZZI: PriceRange[] = ['$', '$$', '$$$']
const ATMOSFERE: Atmosfera[] = ['Informale', 'Romantico', 'Gruppi', 'Elegante']
const DIETE: Dieta[] = ['Nessuna', 'Vegetariano', 'Vegano', 'Senza glutine']

/** MU-Fig.2 — Filtri Serata */
export function FiltersScreen({ filtri, onChangeFiltri, onNavigate }: FiltersScreenProps) {
    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="bg-[#1A2634] px-6 py-6">
                <h1 className="text-xl font-bold text-white">Filtri Serata</h1>
            </header>

            <main className="flex flex-1 flex-col gap-5 px-6 py-6">
                <button
                    type="button"
                    aria-label="Descrivi la serata a parole con l'intelligenza artificiale"
                    onClick={() => onNavigate('aiMood')}
                    className="flex w-full items-center justify-between rounded-xl border border-[#DDD6FE] bg-[#F3F0FF] px-4 py-3 text-left text-sm font-medium text-[#6C5CE7] transition-colors hover:bg-[#EAE4FD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C5CE7]"
                >
                    <span className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        Descrivi la serata a parole
                    </span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <fieldset className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <legend className="px-1 text-sm font-semibold text-[#1A2634]">Zona</legend>
                    <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-3">
                        <MapPin className="h-4 w-4 shrink-0 text-[#1A2634]" aria-hidden="true" />
                        <input
                            type="text"
                            aria-label="Posizione"
                            value={filtri.zonaLabel}
                            onChange={(event) => onChangeFiltri({ ...filtri, zonaLabel: event.target.value })}
                            className="w-full text-sm text-[#1A2634] outline-none"
                            placeholder="Posizione"
                        />
                        <label htmlFor="raggio" className="sr-only">
                            Raggio in chilometri
                        </label>
                        <select
                            id="raggio"
                            value={filtri.raggioKm}
                            onChange={(event) =>
                                onChangeFiltri({ ...filtri, raggioKm: Number(event.target.value) })
                            }
                            className="shrink-0 rounded-md border border-[#E2E8F0] bg-white px-2 py-1 text-sm text-[#1A2634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                        >
                            {[1, 2, 3, 5, 10].map((km) => (
                                <option key={km} value={km}>
                                    {km} km
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                        {filtri.zonaLabel} / Raggio · {filtri.raggioKm} km
                        {filtri.zonaDaVerificare && (
                            <span className="ml-2 rounded border border-[#FDE68A] bg-[#FEF3C7] px-1.5 py-0.5 text-[#D97706]">
                                da verificare
                            </span>
                        )}
                    </p>
                </fieldset>

                <fieldset className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <legend className="px-1 text-sm font-semibold text-[#1A2634]">Prezzo</legend>
                    <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Fascia di prezzo">
                        {PREZZI.map((prezzo) => (
                            <button
                                key={prezzo}
                                type="button"
                                role="radio"
                                aria-checked={filtri.prezzo === prezzo}
                                onClick={() => onChangeFiltri({ ...filtri, prezzo })}
                                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50] ${
                                    filtri.prezzo === prezzo
                                        ? 'border-[#1E6F50] bg-[#E6F4EF] text-[#1E6F50]'
                                        : 'border-[#E2E8F0] text-[#1A2634] hover:bg-slate-50'
                                }`}
                            >
                                {prezzo}
                            </button>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <legend className="px-1 text-sm font-semibold text-[#1A2634]">Atmosfera</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Atmosfera">
                        {ATMOSFERE.map((atmosfera) => (
                            <button
                                key={atmosfera}
                                type="button"
                                role="radio"
                                aria-checked={filtri.atmosfera === atmosfera}
                                onClick={() => onChangeFiltri({ ...filtri, atmosfera })}
                                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50] ${
                                    filtri.atmosfera === atmosfera
                                        ? 'border-[#1E6F50] bg-[#E6F4EF] text-[#1E6F50]'
                                        : 'border-[#E2E8F0] text-[#1A2634] hover:bg-slate-50'
                                }`}
                            >
                                {atmosfera}
                            </button>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <legend className="px-1 text-sm font-semibold text-[#1A2634]">Dieta</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Dieta">
                        {DIETE.map((dieta) => (
                            <button
                                key={dieta}
                                type="button"
                                role="radio"
                                aria-checked={filtri.dieta === dieta}
                                onClick={() => onChangeFiltri({ ...filtri, dieta })}
                                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50] ${
                                    filtri.dieta === dieta
                                        ? 'border-[#1E6F50] bg-[#E6F4EF] text-[#1E6F50]'
                                        : 'border-[#E2E8F0] text-[#1A2634] hover:bg-slate-50'
                                }`}
                            >
                                {dieta}
                            </button>
                        ))}
                    </div>
                </fieldset>
            </main>

            <footer className="px-6 pb-8 pt-2">
                <button
                    type="button"
                    aria-label="Genera il link della serata e vai alla lobby"
                    onClick={() => onNavigate('lobby')}
                    className="w-full rounded-xl bg-[#1E6F50] px-4 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#16563D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    Genera Link
                </button>
            </footer>
        </div>
    )
}
