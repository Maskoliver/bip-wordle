import { useEffect } from 'react'

type ToastKind = 'info' | 'error' | 'success'

interface Props {
    open: boolean
    message: string
    kind?: ToastKind
    onClose: () => void
    durationMs?: number
}

export default function Toast({ open, message, kind = 'info', onClose, durationMs = 1600 }: Props) {
    useEffect(() => {
        if (!open) return
        const t = setTimeout(onClose, durationMs)
        return () => clearTimeout(t)
    }, [open, durationMs, onClose])

    if (!open) return null

    return (
        <div className={`toast ${kind}`} role="status" aria-live="polite">
            {message}
        </div>
    )
}
