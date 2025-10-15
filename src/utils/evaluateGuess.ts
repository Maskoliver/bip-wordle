import { toTR } from "./strings"
import type { EvalCell, LetterState } from "../types"


// Wordle-like evaluation that handles duplicates correctly.
export function evaluateGuess(guess: string, target: string): EvalCell[] {
const g = toTR(guess)
const t = toTR(target)
const res: EvalCell[] = Array.from(g).map((ch) => ({ letter: ch, state: undefined }))


// Count target letters
const counts: Record<string, number> = {}
for (let i = 0; i < t.length; i++) {
if (g[i] === t[i]) {
res[i].state = 'ok'
} else {
counts[t[i]] = (counts[t[i]] ?? 0) + 1
}
}


// Second pass for present/miss
for (let i = 0; i < t.length; i++) {
if (res[i].state) continue
const ch = g[i]
if (counts[ch] > 0) {
res[i].state = 'present'
counts[ch]!--
} else {
res[i].state = 'miss'
}
}
return res
}


export function mergeKeyStates(current: Record<string, LetterState>, evalRow: EvalCell[]) {
// Priority: ok > present > miss
const rank: Record<Exclude<LetterState, undefined>, number> = { ok: 3, present: 2, miss: 1 }
const next = { ...current }
for (const cell of evalRow) {
const prev = next[cell.letter]
if (!prev || rank[cell.state as Exclude<LetterState, undefined>] > rank[prev]) {
next[cell.letter] = cell.state
}
}
return next
}