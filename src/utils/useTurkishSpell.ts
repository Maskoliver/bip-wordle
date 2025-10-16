import { useEffect, useMemo, useState } from 'react'
import nspell from 'nspell'
import { toTR } from './strings'

// Official Turkish Hunspell (UTF-8) served from npm CDN.
// Primary: jsDelivr; Fallback: unpkg.
const AFF_URLS = [
    'https://cdn.jsdelivr.net/npm/dictionary-tr/index.aff',
    'https://unpkg.com/dictionary-tr/index.aff'
]
const DIC_URLS = [
    'https://cdn.jsdelivr.net/npm/dictionary-tr/index.dic',
    'https://unpkg.com/dictionary-tr/index.dic'
]

const ONLY_TR_5 = /^[a-zçğıöşü]{5}$/i

async function fetchFirstText(urls: string[]) {
    let lastErr: unknown
    for (const u of urls) {
        try {
            const res = await fetch(u, { cache: 'force-cache' })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            return await res.text()
        } catch (e) {
            lastErr = e
        }
    }
    throw lastErr ?? new Error('All dictionary sources failed')
}

export function useTurkishSpell() {
    const [ready, setReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [spell, setSpell] = useState<ReturnType<typeof nspell> | null>(null)

    useEffect(() => {
        let cancelled = false
            ; (async () => {
                try {
                    const [aff, dic] = await Promise.all([
                        fetchFirstText(AFF_URLS),
                        fetchFirstText(DIC_URLS),
                    ])
                    if (cancelled) return
                    const inst = nspell(aff, dic)
                    setSpell(inst)
                    setReady(true)
                } catch (e) {
                    if (!cancelled) {
                        if (e instanceof Error) {
                            setError(e.message)
                        } else {
                            setError('Sözlük yüklenemedi')
                        }
                    }
                }
            })()
        return () => { cancelled = true }
    }, [])

    const isValid = useMemo(() => {
        if (!spell) return () => false
        return (w: string) => {
            const word = toTR(w)
            if (!ONLY_TR_5.test(word)) return false
            if (typeof spell.correct === 'function') {
                return spell.correct(word)
            }
            return spell.spell(word).correct === true
        }
    }, [spell])

    return { ready, error, isValid }
}
