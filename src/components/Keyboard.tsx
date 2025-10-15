import type { KeyStates } from '../utils/types'
import { keyboardRows } from '../utils/strings'

interface Props {
    onChar: (c: string) => void
    onEnter: () => void
    onBackspace: () => void
    keyStates: KeyStates
}

export default function Keyboard({ onChar, onEnter, onBackspace, keyStates }: Props) {
    const preventFocus = (e: React.MouseEvent) => e.preventDefault()

    return (
        <div className="keyboard panel">
            {keyboardRows.map((row, i) => (
                <div
                    className={`keyrow row-${i}${i === 2 ? ' last' : ''}`}
                    key={i}
                >
                    {/* regular keys */}
                    {row.map((k) => (
                        <button
                            key={k}
                            type="button"
                            onMouseDown={preventFocus}
                            className={`key ${keyStates[k] ?? ''}`}
                            onClick={() => onChar(k)}
                        >
                            {k}
                        </button>
                    ))}

                    {/* Backspace at end of TOP row */}
                    {i === 0 && (
                        <button
                            type="button"
                            onMouseDown={preventFocus}
                            className="key backspace"
                            onClick={onBackspace}
                            aria-label="Sil"
                            title="Sil"
                        >
                            ⌫
                        </button>
                    )}

                    {/* Enter at end of LAST row */}
                    {i === 2 && (
                        <button
                            type="button"
                            onMouseDown={preventFocus}
                            className="key enter"
                            onClick={onEnter}
                            title="Enter"
                        >
                            ENTER
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}
