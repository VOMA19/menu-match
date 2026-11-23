import { ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
    CODICE_INVITO_DEMO,
    FILTRI_DEFAULT,
    NOME_CREATORE_DEMO,
    PARTECIPANTI_INIZIALI,
    RISTORANTI_MOCK,
} from './data/mockData'
import { AiMoodScreen } from './screens/AiMoodScreen'
import { AuthScreen } from './screens/AuthScreen'
import { FiltersScreen } from './screens/FiltersScreen'
import { HomeScreen } from './screens/HomeScreen'
import { JoinEveningScreen } from './screens/JoinEveningScreen'
import { LobbyScreen } from './screens/LobbyScreen'
import { RestaurantDetailScreen } from './screens/RestaurantDetailScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { VotingScreen } from './screens/VotingScreen'
import type {
    FiltriSerata,
    Partecipante,
    Ristorante,
    ScreenId,
    TagCommunity,
} from './types/menuMatch'

/** Elenco delle schermate per il demo switcher (riferimento MU-Fig.1 ÷ MU-Fig.10). */
const SCREENS: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'MU-Fig.1 · Home' },
    { id: 'filters', label: 'MU-Fig.2 · Filtri Serata' },
    { id: 'lobby', label: 'MU-Fig.3 · Lobby Realtime' },
    { id: 'voting', label: 'MU-Fig.4/8 · Votazione + Sintesi IA' },
    { id: 'results', label: 'MU-Fig.5 · Risultati Finali' },
    { id: 'restaurantDetail', label: 'MU-Fig.6 · Dettaglio Locale' },
    { id: 'aiMood', label: 'MU-Fig.7 · Mood con IA' },
    { id: 'auth', label: 'MU-Fig.9 · Accesso / Registrazione' },
    { id: 'joinEvening', label: 'MU-Fig.10 · Ingresso Serata' },
]

function App() {
    const [screen, setScreen] = useState<ScreenId>('home')
    const [filtri, setFiltri] = useState<FiltriSerata>(FILTRI_DEFAULT)
    const [partecipanti, setPartecipanti] = useState<Partecipante[]>(PARTECIPANTI_INIZIALI)
    const [ristoranti, setRistoranti] = useState<Ristorante[]>(RISTORANTI_MOCK)
    const [ristoranteSelezionato, setRistoranteSelezionato] = useState<Ristorante>(RISTORANTI_MOCK[0])
    const [, setVoti] = useState<Record<string, 'like' | 'dislike'>>({})
    const [switcherAperto, setSwitcherAperto] = useState(false)

    const handleTogglePartecipante = (id: string) => {
        setPartecipanti((precedenti) =>
            precedenti.map((partecipante) =>
                partecipante.id === id && partecipante.stato === 'In attesa'
                    ? { ...partecipante, stato: 'Pronto' }
                    : partecipante,
            ),
        )
    }

    const handleJoin = (nuovoPartecipante: Partecipante) => {
        setPartecipanti((precedenti) => [...precedenti, nuovoPartecipante])
    }

    const handleAggiungiTag = (ristoranteId: string, tag: TagCommunity) => {
        setRistoranti((precedenti) =>
            precedenti.map((ristorante) =>
                ristorante.id === ristoranteId
                    ? { ...ristorante, tagCommunity: [...(ristorante.tagCommunity ?? []), tag] }
                    : ristorante,
            ),
        )
        setRistoranteSelezionato((precedente) =>
            precedente.id === ristoranteId
                ? { ...precedente, tagCommunity: [...(precedente.tagCommunity ?? []), tag] }
                : precedente,
        )
    }

    const screenCorrente = useMemo(() => {
        switch (screen) {
            case 'home':
                return <HomeScreen onNavigate={setScreen} />
            case 'filters':
                return <FiltersScreen filtri={filtri} onChangeFiltri={setFiltri} onNavigate={setScreen} />
            case 'aiMood':
                return <AiMoodScreen filtri={filtri} onChangeFiltri={setFiltri} onNavigate={setScreen} />
            case 'auth':
                return <AuthScreen onNavigate={setScreen} />
            case 'joinEvening':
                return (
                    <JoinEveningScreen
                        nomeCreatore={NOME_CREATORE_DEMO}
                        codiceInvito={CODICE_INVITO_DEMO}
                        numeroInLobby={partecipanti.length}
                        onJoin={handleJoin}
                        onNavigate={setScreen}
                    />
                )
            case 'lobby':
                return (
                    <LobbyScreen
                        codiceInvito={CODICE_INVITO_DEMO}
                        partecipanti={partecipanti}
                        onTogglePartecipante={handleTogglePartecipante}
                        onNavigate={setScreen}
                    />
                )
            case 'voting':
                return <VotingScreen ristoranti={ristoranti} onVotoCompleto={setVoti} onNavigate={setScreen} />
            case 'results':
                return (
                    <ResultsScreen
                        ristoranti={ristoranti}
                        onSelezionaRistorante={setRistoranteSelezionato}
                        onNavigate={setScreen}
                    />
                )
            case 'restaurantDetail':
                return (
                    <RestaurantDetailScreen
                        ristorante={ristoranteSelezionato}
                        onAggiungiTag={handleAggiungiTag}
                        onNavigate={setScreen}
                    />
                )
            default:
                return <HomeScreen onNavigate={setScreen} />
        }
    }, [screen, filtri, partecipanti, ristoranti, ristoranteSelezionato])

    return (
        <div className="min-h-screen bg-slate-200">
            <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#F8FAFC] shadow-xl">
                {screenCorrente}
            </div>

            {/* Demo Switcher: barra di navigazione rapida per la revisione (non fa parte del design UI finale). */}
            <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
                <div className="w-full max-w-md rounded-t-xl border border-b-0 border-slate-300 bg-white/95 shadow-lg backdrop-blur">
                    <button
                        type="button"
                        aria-expanded={switcherAperto}
                        aria-controls="demo-switcher-panel"
                        aria-label="Apri o chiudi il menu di navigazione rapida tra le schermate"
                        onClick={() => setSwitcherAperto((precedente) => !precedente)}
                        className="flex w-full items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50]"
                    >
                        Demo Switcher · {screen}
                        {switcherAperto ? (
                            <ChevronDown className="h-3 w-3" aria-hidden="true" />
                        ) : (
                            <ChevronUp className="h-3 w-3" aria-hidden="true" />
                        )}
                    </button>
                    {switcherAperto && (
                        <nav
                            id="demo-switcher-panel"
                            aria-label="Navigazione rapida tra le schermate di Menu Match"
                            className="grid grid-cols-1 gap-1 border-t border-slate-200 p-2"
                        >
                            {SCREENS.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setScreen(item.id)
                                        setSwitcherAperto(false)
                                    }}
                                    aria-current={screen === item.id ? 'page' : undefined}
                                    className={`rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6F50] ${
                                        screen === item.id
                                            ? 'bg-[#E6F4EF] text-[#1E6F50]'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
