interface Props {
    open: boolean
    onClose: () => void
}

export default function HowToModal({ open, onClose }: Props) {
    if (!open) return null
    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Nasıl oynanır">
            <div className="modal">
                <h2>Nasıl oynanır?</h2>
                <div className="summary" style={{ lineHeight: 1.5 }}>
                    <p>
                        5 harfli bir kelimeyi <strong>6 denemede</strong> tahmin et.
                        Her tahminden sonra harflerin durumu renkle gösterilir:
                    </p>
                    <ul style={{ margin: '6px 0 0 18px' }}>
                        <li><span className="legend ok" /> <strong>Doğru</strong> — Harf ve konumu doğru.</li>
                        <li><span className="legend present" /> <strong>Yakın</strong> — Harf var ama yeri farklı.</li>
                        <li><span className="legend miss" /> <strong>Yok</strong> — Kelimede bu harf yok.</li>
                    </ul>
                    <p style={{ marginTop: 10 }}>
                        Türkçe karakterler (ç, ğ, ı, İ, ö, ş, ü) desteklenir.
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                    <button className="primary" onClick={onClose} aria-label="Kapat">Tamam</button>
                </div>
            </div>
        </div>
    )
}
