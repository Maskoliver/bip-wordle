// Locale-aware helpers for Turkish
export const toTR = (s: string) => s.normalize('NFC').toLocaleLowerCase('tr')
export const strip = (s: string) => toTR(s.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ]/g, ''))
export const lettersTR = [
'e','a','n','i','r','l','t','k','m','u',
'y','s','d','ö','b','ü','o','ğ','ş','z',
'h','c','p','v','g','ç','f','ı','j']
// Keyboard layout rows (approx Q layout for TR)
export const keyboardRows: string[][] = [
['e','r','t','y','u','ı','o','p','ğ','ü'],
['a','s','d','f','g','h','j','k','l','ş','i'],
['z','x','c','v','b','n','m','ö','ç']
]