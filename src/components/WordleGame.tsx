import { useEffect, useRef, useState } from 'react'
import WordGrid from './WordGrid'
import Keyboard from './Keyboard'
import EndModal from './EndModal'
import HowToModal from './HowToModal'
import { evaluateGuess, mergeKeyStates } from '../utils/evaluateGuess'

import { strip, toTR } from '../utils/strings'
import solutions from '../data/solutionWords'
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

    // animation helpers
    const [revealIndex, setRevealIndex] = useState<number>(-1)
    const [shakeActive, setShakeActive] = useState(false)

    const startAt = useRef<number>(Date.now())

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
        if (guess.length !== WORD_LEN) {
            setShakeActive(true)
            setTimeout(() => setShakeActive(false), 420)
            return
        }

        const evalRow = evaluateGuess(guess, secret)
        const nextRows = [...rows, evalRow]
        setRows(nextRows)
        setKeyStates((ks) => mergeKeyStates(ks, evalRow))
        setActive('')
        setRevealIndex(nextRows.length - 1)

        // Blur focused key to avoid "last letter repeats" when pressing Enter
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur()

        const success = evalRow.every((c) => c.state === 'ok')
        if (success) {
            setWon(true); setOver(true)
        } else if (nextRows.length >= MAX_TRIES) {
            setWon(false); setOver(true)
        }
    }

    // Physical keyboard
    useEffect(() => {
        function handler(e: KeyboardEvent) {
            const key = toTR(e.key)
            if (key === 'enter') return onEnter()
            if (key === 'backspace') return onBackspace()
            if (key.length === 1 && /[a-zçğıöşü]/i.test(key)) return onChar(key)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    })



    return (
        <div className="panel game-panel">
            <div className="topbar">
                <div className="left">
                    <span className="badge">Deneme: {rows.length}/{MAX_TRIES}</span>
                    <span className="badge">Hedef: {WORD_LEN} harf</span>
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
    )
}
