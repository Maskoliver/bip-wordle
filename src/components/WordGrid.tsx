
import { upperTR } from '../utils/strings'
import type { EvalCell } from '../utils/types'

interface Props {
    rows: EvalCell[][]
    wordLength: number
    activeInput: string
    maxTries: number
    revealIndex?: number
    shakeActive?: boolean
}

export default function WordGrid({
    rows,
    wordLength,
    activeInput,
    maxTries,
    revealIndex = -1,
    shakeActive = false
}: Props) {
    const filled = rows.length
    const empties = Math.max(0, maxTries - filled - 1)

    return (
        <div className="grid">
            {rows.map((row, idx) => (
                <div className={`row ${idx === revealIndex ? 'reveal' : ''}`} key={`row-${idx}`}>
                    {row.map((c, i) => (
                        <div
                            key={i}
                            className={`cell ${c.state ?? ''}`}
                            style={idx === revealIndex ? { animationDelay: `${i * 90}ms` } : undefined}
                        >
                            {upperTR(c.letter)}
                        </div>
                    ))}
                </div>
            ))}

            {/* Active row */}
            {filled < maxTries && (
                <div className={`row ${shakeActive ? 'shake' : ''}`}>
                    {Array.from({ length: wordLength }).map((_, i) => (
                        <div key={i} className="cell">
                            {activeInput[i] ? upperTR(activeInput[i]) : ''}
                        </div>
                    ))}
                </div>
            )}

            {/* Empty rows */}
            {Array.from({ length: empties }).map((_, r) => (
                <div className="row" key={`empty-${r}`}>
                    {Array.from({ length: wordLength }).map((_, i) => (
                        <div key={i} className="cell"></div>
                    ))}
                </div>
            ))}
        </div>
    )
}
