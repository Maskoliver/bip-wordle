
import { keyboardRows, upperTR } from '../utils/strings'
import type { KeyStates } from '../utils/types'

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
                <div className={`keyrow row-${i}${i === 2 ? ' last' : ''}`} key={i}>
                    {row.map((k) => (
                        <button
                            key={k}
                            type="button"
                            onMouseDown={preventFocus}
                            className={`key ${keyStates[k] ?? ''}`}
                            onClick={() => onChar(k)}
                            aria-label={upperTR(k)}
                        >
                            {upperTR(k)}
                        </button>
                    ))}

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
