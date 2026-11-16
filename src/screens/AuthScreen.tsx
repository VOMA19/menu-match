import { useState } from 'react'
import type { ScreenId } from '../types/menuMatch'

interface AuthScreenProps {
    onNavigate: (screen: ScreenId) => void
}

type Tab = 'accedi' | 'registrati'

/** MU-Fig.9 — Accesso / Registrazione */
export function AuthScreen({ onNavigate }: AuthScreenProps) {
    const [tab, setTab] = useState<Tab>('accedi')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="bg-[#1A2634] px-6 py-6">
                <h1 className="text-xl font-bold text-white">Accesso</h1>
            </header>

            <main className="flex flex-1 flex-col gap-6 px-6 py-8">
                <div
                    role="tablist"
                    aria-label="Seleziona accesso o registrazione"
                    className="flex rounded-xl border border-[#E2E8F0] bg-white p-1"
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'accedi'}
                        onClick={() => setTab('accedi')}
                        className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50] ${
                            tab === 'accedi' ? 'bg-[#E6F4EF] text-[#1E6F50]' : 'text-slate-500'
                        }`}
                    >
                        Accedi
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'registrati'}
                        onClick={() => setTab('registrati')}
                        className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50] ${
                            tab === 'registrati' ? 'bg-[#E6F4EF] text-[#1E6F50]' : 'text-slate-500'
                        }`}
                    >
                        Registrati
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#1A2634]">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="nome@esempio.it"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-lg border border-[#E2E8F0] px-3 py-3 text-sm text-[#1A2634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#1A2634]">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-lg border border-[#E2E8F0] px-3 py-3 text-sm text-[#1A2634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    aria-label={tab === 'accedi' ? 'Accedi' : 'Registrati'}
                    onClick={() => onNavigate('joinEvening')}
                    className="w-full rounded-xl bg-[#1E6F50] px-4 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#16563D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    {tab === 'accedi' ? 'Accedi' : 'Registrati'}
                </button>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="h-px flex-1 bg-[#E2E8F0]" />
                    — oppure —
                    <span className="h-px flex-1 bg-[#E2E8F0]" />
                </div>

                <button
                    type="button"
                    aria-label="Continua come ospite"
                    onClick={() => onNavigate('home')}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#1A2634] transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    Continua come ospite
                </button>
            </main>

            <footer className="px-6 pb-8 text-center">
                <p className="text-xs text-slate-400">Metodi di accesso: credenziali locali (CLAR-03)</p>
            </footer>
        </div>
    )
}
