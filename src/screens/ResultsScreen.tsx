import { Map as MapIcon, PartyPopper } from 'lucide-react'
import type { Ristorante, ScreenId } from '../types/menuMatch'

interface ResultsScreenProps {
    ristoranti: Ristorante[]
    onSelezionaRistorante: (ristorante: Ristorante) => void
    onNavigate: (screen: ScreenId) => void
}

/**
 * Classifica deterministica di esempio (RF-06): i primi 3 ristoranti del
 * dataset mock rappresentano il podio con i consensi indicati dal D1.
 */
const CONSENSI_PODIO = [
    { ristoranteId: 'r1', consensi: 4, totale: 4 },
    { ristoranteId: 'r2', consensi: 3, totale: 4 },
    { ristoranteId: 'r3', consensi: 2, totale: 4 },
]

/** MU-Fig.5 — Risultati Finali */
export function ResultsScreen({ ristoranti, onSelezionaRistorante, onNavigate }: ResultsScreenProps) {
    const podio = CONSENSI_PODIO.map((voto) => ({
        voto,
        ristorante: ristoranti.find((r) => r.id === voto.ristoranteId),
    })).filter((item): item is { voto: (typeof CONSENSI_PODIO)[number]; ristorante: Ristorante } =>
        Boolean(item.ristorante),
    )

    return (
        <div className="flex min-h-full flex-col bg-[#F8FAFC]">
            <header className="bg-[#1A2634] px-6 py-6">
                <h1 className="text-xl font-bold text-white">Risultati Finali</h1>
            </header>

            <main className="flex flex-1 flex-col gap-6 px-6 py-8">
                <div className="flex items-center justify-center gap-2">
                    <PartyPopper className="h-6 w-6 text-[#1E6F50]" aria-hidden="true" />
                    <h2 className="text-2xl font-bold text-[#1E6F50]">Match!</h2>
                </div>

                <ol className="flex flex-col gap-3">
                    {podio.map(({ voto, ristorante }, posizione) => (
                        <li key={ristorante.id}>
                            <button
                                type="button"
                                aria-label={`Apri il dettaglio di ${ristorante.nome}, posizione ${posizione + 1}`}
                                onClick={() => {
                                    onSelezionaRistorante(ristorante)
                                    onNavigate('restaurantDetail')
                                }}
                                className={`w-full rounded-xl border bg-white px-4 py-4 text-left shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50] ${
                                    posizione === 0 ? 'border-2 border-[#1E6F50]' : 'border-[#E2E8F0]'
                                }`}
                            >
                                {posizione === 0 ? (
                                    <p className="text-sm font-semibold text-[#1A2634]">
                                        {posizione + 1} · {ristorante.nome} — Consensi: {voto.consensi}/{voto.totale}
                                    </p>
                                ) : (
                                    <p className="text-sm font-medium text-[#1A2634]">
                                        {posizione + 1} · {ristorante.nome} ({voto.consensi}/{voto.totale}) —{' '}
                                        {ristorante.distanzaKm.toString().replace('.', ',')} km
                                    </p>
                                )}
                            </button>
                        </li>
                    ))}
                </ol>

                <p className="text-center text-xs italic text-slate-500">
                    In caso di parità vince il locale più vicino al punto centrale
                </p>
            </main>

            <footer className="px-6 pb-8 pt-2">
                <button
                    type="button"
                    aria-label="Apri la mappa del ristorante vincitore"
                    onClick={() => {
                        const vincitore = podio[0]?.ristorante
                        if (vincitore) {
                            onSelezionaRistorante(vincitore)
                        }
                        onNavigate('restaurantDetail')
                    }}
                    className="w-full rounded-xl bg-[#1E6F50] px-4 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#16563D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                >
                    <span className="flex items-center justify-center gap-2">
                        <MapIcon className="h-4 w-4" aria-hidden="true" />
                        Apri Mappa
                    </span>
                </button>
            </footer>
        </div>
    )
}
