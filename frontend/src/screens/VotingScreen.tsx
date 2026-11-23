import { Heart, Image as ImageIcon, Info, X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Ristorante, ScreenId } from '../types/menuMatch'

interface VotingScreenProps {
    ristoranti: Ristorante[]
    onVotoCompleto: (voti: Record<string, 'like' | 'dislike'>) => void
    onNavigate: (screen: ScreenId) => void
}

/** MU-Fig.4 & MU-Fig.8 — Votazione Swipe + Sintesi IA */
export function VotingScreen({ ristoranti, onVotoCompleto, onNavigate }: VotingScreenProps) {
    const [indice, setIndice] = useState(0)
    const [voti, setVoti] = useState<Record<string, 'like' | 'dislike'>>({})
    const [trascinamento, setTrascinamento] = useState(0)
    const puntoInizio = useRef<number | null>(null)

    const ristoranteCorrente = ristoranti[indice]
    const totale = ristoranti.length
    const progressoPercentuale = (indice / totale) * 100

    const registraVoto = (voto: 'like' | 'dislike') => {
        const nuoviVoti = { ...voti, [ristoranteCorrente.id]: voto }
        setVoti(nuoviVoti)
        setTrascinamento(0)
        if (indice + 1 >= totale) {
            onVotoCompleto(nuoviVoti)
            onNavigate('results')
        } else {
            setIndice((precedente) => precedente + 1)
        }
    }

    const handlePointerDown = (event: React.PointerEvent) => {
        puntoInizio.current = event.clientX
    }

    const handlePointerMove = (event: React.PointerEvent) => {
        if (puntoInizio.current === null) return
        setTrascinamento(event.clientX - puntoInizio.current)
    }

    const handlePointerUp = () => {
        if (trascinamento > 100) {
            registraVoto('like')
        } else if (trascinamento < -100) {
            registraVoto('dislike')
        } else {
            setTrascinamento(0)
        }
        puntoInizio.current = null
    }

    if (!ristoranteCorrente) {
        return null
    }

    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="bg-[#1A2634] px-6 py-6">
                <h1 className="text-xl font-bold text-white">
                    Votazione ({indice + 1}/{totale})
                </h1>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                        className="h-full rounded-full bg-[#1E6F50] transition-all"
                        style={{ width: `${progressoPercentuale}%` }}
                        role="progressbar"
                        aria-valuenow={indice + 1}
                        aria-valuemin={1}
                        aria-valuemax={totale}
                        aria-label="Avanzamento votazione"
                    />
                </div>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center px-6 py-6">
                <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    style={{
                        transform: `translateX(${trascinamento}px) rotate(${trascinamento / 20}deg)`,
                        touchAction: 'pan-y',
                    }}
                    className="w-full max-w-sm cursor-grab touch-none select-none rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-transform active:cursor-grabbing"
                >
                    <div className="flex h-44 items-center justify-center rounded-t-2xl bg-slate-100">
                        <ImageIcon className="h-12 w-12 text-slate-300" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-3 p-5">
                        <div>
                            <h2 className="text-lg font-bold text-[#1A2634]">{ristoranteCorrente.nome}</h2>
                            <p className="text-sm text-slate-500">
                                {ristoranteCorrente.distanzaKm.toString().replace('.', ',')} km ·{' '}
                                {ristoranteCorrente.prezzo} · Fonte: {ristoranteCorrente.fonte}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {ristoranteCorrente.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-[#E6F4EF] px-3 py-1 text-xs font-medium text-[#1E6F50]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {ristoranteCorrente.sintesiIA ? (
                            <div className="rounded-lg border border-[#DDD6FE] bg-[#F3F0FF] p-3">
                                <p className="text-xs font-semibold text-[#6C5CE7]">✨ Sintesi IA</p>
                                <p className="mt-1 text-sm text-[#1A2634]">{ristoranteCorrente.sintesiIA.testo}</p>
                                <p className="mt-1 text-xs text-slate-500">{ristoranteCorrente.sintesiIA.fonte}</p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-slate-50 p-3">
                                <Info className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                                <p className="text-sm text-slate-500">
                                    Sintesi IA non disponibile per questo locale.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="flex items-center justify-center gap-8 px-6 pb-10 pt-2">
                <button
                    type="button"
                    aria-label="Dislike, scarta questo locale"
                    onClick={() => registraVoto('dislike')}
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-200 bg-white text-red-500 shadow-sm transition-colors hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                >
                    <X className="h-7 w-7" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    aria-label="Like, vota questo locale"
                    onClick={() => registraVoto('like')}
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#1E6F50]/30 bg-white text-[#1E6F50] shadow-sm transition-colors hover:bg-[#E6F4EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    <Heart className="h-7 w-7" aria-hidden="true" />
                </button>
            </footer>
        </div>
    )
}
