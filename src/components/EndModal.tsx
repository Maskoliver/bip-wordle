interface Props {
    open: boolean
    onClose: () => void
    won: boolean
    secret: string
    guesses: number
}

export default function EndModal({ open, onClose, won, secret, guesses }: Props) {
    if (!open) return null
    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="modal">
                <h2>{won ? 'Tebrikler! 🎉' : 'Bitti'}</h2>
                <p className="summary">
                    <span>Sonuç: <strong>{won ? 'Kazandın' : 'Bulunamadı'}</strong></span>
                    <span>Kelime: <strong>{secret.toUpperCase()}</strong></span>
                    <span>Tahmin sayısı: <strong>{guesses}/6</strong></span>
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button onClick={onClose} className="primary">Tekrar Oyna</button>
                </div>
            </div>
        </div>
    )
}
