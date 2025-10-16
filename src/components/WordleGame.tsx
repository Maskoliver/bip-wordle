import { useEffect, useRef, useState } from 'react'
import WordGrid from './WordGrid'
import Keyboard from './Keyboard'
import EndModal from './EndModal'
import HowToModal from './HowToModal'
import Toast from './Toast'
import { evaluateGuess, mergeKeyStates } from '../utils/evaluateGuess'
import { strip, toTR } from '../utils/strings'
import solutions from '../data/solutionWords'
import { useTurkishSpell } from '../utils/useTurkishSpell'
import type { KeyStates } from '../utils/types'

const WORD_LEN = 5
const MAX_TRIES = 6

function pickRandom<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)]
}

export default function WordleGame() {
    const [secret, setSecret] = useState<string>(() => pickRandom(solutions))
    const [rows, setRows] = useState(() => [] as ReturnType<typeof evaluateGuess>[])
    const [active, setActive] = useState<string>('')
    const [keyStates, setKeyStates] = useState<KeyStates>({})
    const [over, setOver] = useState(false)
    const [won, setWon] = useState(false)
    const [showHelp, setShowHelp] = useState(false)

    // animations
    const [revealIndex, setRevealIndex] = useState<number>(-1)
    const [shakeActive, setShakeActive] = useState(false)

    // toast
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMsg, setToastMsg] = useState('')
    const [toastKind, setToastKind] = useState<'info' | 'error' | 'success'>('info')
    const showToast = (msg: string, kind: 'info' | 'error' | 'success' = 'info') => {
        setToastMsg(msg); setToastKind(kind); setToastOpen(true)
    }

    const startAt = useRef<number>(Date.now())

    // Turkish dictionary validator (CDN-loaded Hunspell)
    const { ready: dictReady, error: dictError, isValid } = useTurkishSpell()

    const reset = () => {
        setSecret(pickRandom(solutions))
        setRows([])
        setActive('')
        setKeyStates({})
        setOver(false)
        setWon(false)
        setRevealIndex(-1)
        setShakeActive(false)
        startAt.current = Date.now()
    }

    useEffect(() => { startAt.current = Date.now() }, [])

    const onChar = (c: string) => {
        if (over) return
        if (active.length >= WORD_LEN) return
        setActive((v) => (v + c).slice(0, WORD_LEN))
    }

    const onBackspace = () => {
        if (over) return
        setActive((v) => v.slice(0, -1))
    }

    const onEnter = () => {
        if (over) return
        const guess = strip(active)

        // length check → shake + toast
        if (guess.length !== WORD_LEN) {
            setShakeActive(true)
            setTimeout(() => setShakeActive(false), 420)
            showToast('5 harf girmen gerekiyor.', 'error')
            return
        }

        // dictionary loading / error handling
        if (!dictReady) {
            setShakeActive(true)
            setTimeout(() => setShakeActive(false), 420)
            showToast('Sözlük yükleniyor…', 'info')
            return
        }
        if (dictError) {
            console.warn('Dictionary error:', dictError)
        }

        // validity check → shake + toast
        if (!isValid(guess)) {
            setShakeActive(true)
            setTimeout(() => setShakeActive(false), 420)
            showToast('Geçersiz kelime', 'error')
            return
        }

        // Evaluate
        const evalRow = evaluateGuess(guess, secret)
        const nextRows = [...rows, evalRow]
        setRows(nextRows)
        setKeyStates((ks) => mergeKeyStates(ks, evalRow))
        setActive('')
        setRevealIndex(nextRows.length - 1)

        // Avoid “last key repeats” on Enter
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur()

        const success = evalRow.every((c) => c.state === 'ok')
        if (success) {
            setWon(true); setOver(true)
            showToast('Doğru! 🎉', 'success')
        } else if (nextRows.length >= MAX_TRIES) {
            setWon(false); setOver(true)
            showToast('Hakların bitti.', 'info')
        }
    }

    // Physical keyboard
    useEffect(() => {
        function handler(e: KeyboardEvent) {
            const key = toTR(e.key)
            if (key === 'enter') return onEnter()
            if (key === 'backspace') return onBackspace()
            if (key.length === 1 && /^[a-zçğıöşü]$/i.test(key)) return onChar(key)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    })


    return (
        <>
            <div className="panel game-panel">
                <div className="topbar">
                    <div className="left">
                        <span className="badge">Deneme: {rows.length}/{MAX_TRIES}</span>
                        {!dictReady &&
                            <span className="badge">{'Sözlük: yükleniyor…'}</span>
                        }
                    </div>
                    <button className="icon-btn" onClick={() => setShowHelp(true)} aria-label="Nasıl oynanır?">?</button>
                </div>

                <div className="content" style={{ display: 'grid', gap: 16 }}>
                    <WordGrid
                        rows={rows}
                        wordLength={WORD_LEN}
                        activeInput={active}
                        maxTries={MAX_TRIES}
                        revealIndex={revealIndex}
                        shakeActive={shakeActive}
                    />

                    <Keyboard
                        onChar={onChar}
                        onEnter={onEnter}
                        onBackspace={onBackspace}
                        keyStates={keyStates}
                    />

                    <EndModal
                        open={over}
                        onClose={reset}
                        won={won}
                        secret={secret}
                        guesses={rows.length}
                    />
                </div>

                <HowToModal open={showHelp} onClose={() => setShowHelp(false)} />
            </div>

            <Toast
                open={toastOpen}
                message={toastMsg}
                kind={toastKind}
                onClose={() => setToastOpen(false)}
            />
        </>
    )
}
