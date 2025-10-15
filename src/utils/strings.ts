// Locale-aware helpers for Turkish
export const toTR = (s: string) => s.normalize('NFC').toLocaleLowerCase('tr')
export const upperTR = (s: string) => s.normalize('NFC').toLocaleUpperCase('tr')
export const strip = (s: string) =>
    toTR(s.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ]/g, ''))

export const keyboardRows: string[][] = [
    ['e', 'r', 't', 'y', 'u', 'ı', 'o', 'p', 'ğ', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş', 'i'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ç']
]
