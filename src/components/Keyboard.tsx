import { keyboardRows } from "../utils/strings"
import type { KeyStates } from "../types"

interface Props {
    onChar: (c: string) => void
    onEnter: () => void
    onBackspace: () => void
    keyStates: KeyStates
}


export default function Keyboard({ onChar, onEnter, onBackspace, keyStates }: Props) {
    return (
        <div className="keyboard panel">
            {keyboardRows.map((row, i) => (
                <div className="keyrow" key={i}>
                    {i === 2 && (
                        <button className="key" onClick={onBackspace} aria-label="Sil">⌫</button>
                    )}
                    {row.map((k) => (
                        <button key={k} className={`key ${keyStates[k] ?? ''}`} onClick={() => onChar(k)}>
                            {k}
                        </button>
                    ))}
                    {i === 2 && (
                        <button className="key" onClick={onEnter}>Enter</button>
                    )}
                </div>
            ))}
        </div>
    )
}