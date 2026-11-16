import { Users } from 'lucide-react'
import { useState } from 'react'
import type { Partecipante, PreferenzaAlimentare, ScreenId } from '../types/menuMatch'

interface JoinEveningScreenProps {
    nomeCreatore: string
    codiceInvito: string
    numeroInLobby: number
    onJoin: (partecipante: Partecipante) => void
    onNavigate: (screen: ScreenId) => void
}

const PREFERENZE: PreferenzaAlimentare[] = ['Vegetariana', 'Vegana', 'Senza glutine', 'Altro...']

/** MU-Fig.10 — Ingresso nella Serata */
export function JoinEveningScreen({
    nomeCreatore,
    codiceInvito,
    numeroInLobby,
    onJoin,
    onNavigate,
}: JoinEveningScreenProps) {
    const [nickname, setNickname] = useState('Giulia')
    const [preferenze, setPreferenze] = useState<PreferenzaAlimentare[]>([])

    const togglePreferenza = (preferenza: PreferenzaAlimentare) => {
        setPreferenze((precedenti) =>
            precedenti.includes(preferenza)
                ? precedenti.filter((item) => item !== preferenza)
                : [...precedenti, preferenza],
        )
    }

    const handlePronto = () => {
        onJoin({ id: `guest-${Date.now()}`, nome: nickname || 'Ospite', stato: 'Pronto' })
        onNavigate('lobby')
    }

    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="bg-[#1A2634] px-6 py-6">
                <h1 className="text-xl font-bold text-white">Entra nella serata</h1>
                <p className="mt-1 text-sm text-slate-300">
                    Serata di {nomeCreatore} · {codiceInvito}
                </p>
            </header>

            <main className="flex flex-1 flex-col gap-6 px-6 py-8">
                <div>
                    <label htmlFor="nickname" className="mb-1 block text-sm font-medium text-[#1A2634]">
                        Nickname
                    </label>
                    <input
                        id="nickname"
                        type="text"
                        value={nickname}
                        onChange={(event) => setNickname(event.target.value)}
                        className="w-full rounded-lg border border-[#E2E8F0] px-3 py-3 text-sm text-[#1A2634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                    />
                </div>

                <fieldset>
                    <legend className="mb-2 text-sm font-medium text-[#1A2634]">Preferenze alimentari</legend>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Preferenze alimentari">
                        {PREFERENZE.map((preferenza) => (
                            <button
                                key={preferenza}
                                type="button"
                                aria-pressed={preferenze.includes(preferenza)}
                                onClick={() => togglePreferenza(preferenza)}
                                className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50] ${
                                    preferenze.includes(preferenza)
                                        ? 'border-[#1E6F50] bg-[#E6F4EF] text-[#1E6F50]'
                                        : 'border-[#E2E8F0] bg-white text-[#1A2634] hover:bg-slate-50'
                                }`}
                            >
                                {preferenza}
                            </button>
                        ))}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                        Usate solo per filtrare i locali: non mostrate agli altri partecipanti
                    </p>
                </fieldset>

                <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3">
                    <Users className="h-4 w-4 text-[#1E6F50]" aria-hidden="true" />
                    <span className="text-sm text-[#1A2634]">{numeroInLobby} partecipanti in lobby</span>
                </div>
            </main>

            <footer className="px-6 pb-8 pt-2">
                <button
                    type="button"
                    aria-label="Sono pronto, entra nella lobby"
                    onClick={handlePronto}
                    className="w-full rounded-xl bg-[#1E6F50] px-4 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#16563D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    Sono Pronto
                </button>
            </footer>
        </div>
    )
}
