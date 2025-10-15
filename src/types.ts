export type LetterState = 'ok' | 'present' | 'miss' | undefined
export type KeyStates = Record<string, LetterState>
export interface EvalCell { letter: string; state: LetterState }