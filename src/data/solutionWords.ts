// Common, everyday Turkish 5-letter words (lowercase, NFC).
// Focus: high-frequency nouns/verbs/adjectives, no rare/archaic forms.
const solutions = [
  // insanlar, zaman, günlük durumlar
  'insan', 'dünya', 'hayat', 'evler', 'evden', 'evsiz', 'evcil', 'ailem', 'babam', 'annem',
  'kızın', 'oğlun', 'komşu', 'çocuk', 'genel', 'resmi', 'ortak', 'başka',
  'hemen', 'erken', 'sonra', 'yarın', 'bugün', 'şimdi',


  // şehir, ulaşım, yerler
  'şehir', 'sokak', 'cadde', 'sahil', 'medya', 'lokal', 'banka',
  'durak', 'metro', 'vapur', 'araba', 'taksi', 'kargo', 'adres', 'posta', 'paket',

  // okul/iş/teknoloji
  'okuma', 'kitap', 'kalem', 'kağıt', 'silgi', 'sınav', 'mesai',
  'ekran', 'mobil', 'resim', 'video', 'dosya', 'kayıt', 'şifre', 'mesaj', 'yazar',

  // ev, mutfak, yiyecek-içecek
  'ekmek', 'yemek', 'içmek', 'çorba', 'pilav', 'kahve', 'limon', 'meyve', 'sebze',
  'tatlı', 'tuzlu', 'sütlü', 'şeker', 'soğan', 'salça',

  // hava, doğa, mevsim
  'bahar', 'yazın', 'kışın', 'deniz', 'orman', 'güneş', 'yağış', 'bulut',

  // renk, nitelik, duygu
  'beyaz', 'siyah', 'yeşil', 'temiz', 'kirli', 'zorlu', 'kolay', 'güzel',
  'mutlu', 'üzgün', 'hasta', 'sakin', 'yaşlı', 'geniş',

  // beden, giyim
  'kulak', 'burun', 'göğüs', 'göbek', 'sakal', 'ceket', 'şapka',

  // yaygın fiiller (kök/çekim)
  'olmak', 'almak', 'yemek', 'içmek',

  // para/alışveriş
  'fiyat', 'nakit', 'tutar', 'vergi',

  // sağlık
  'serum', 'temas',

  // internet/uygulama
  'hesap', 'kayıt', 'giriş', 'çıkış', 'yorum', 'takip', 'çevik',

  // sık kullanılan zarflar/sıfatlar
  'yerel', 'hızlı', 'yavaş', 'kısmi', 'resmi',

  // günler/aylar (5 harf olanlar)
  'pazar', 'nisan', 'mayıs', 'eylül', 'şubat',

  // ulaşım & yön
  'yolcu', 'ileri', 'aşağı', 'içeri',

  // ofis & gündelik işler
  'kalem', 'kağıt', 'dosya', 'evrak', 'kopya', 'klima',

  // daha fazla temel adlar/fiiller
  'kızak', 'sorun', 'cevap', 'arama', 'arıza',
  'temel', 'gerek', 'görev', 'hizmet', 'işlem', 'işlev', 'liste', 'sayfa',

  // kısa ama yaygın isim/fiil kökleri (tam 5 harf)
  'insaf', 'izole', 'sürme', 'sürat', 'süreç', 'sütun',
  'sofra', 'sonra', 'sonuç', 'seçim', 'sezon', 'sayfa', 'sayım', 'takım', 'takip',
  'taksi', 'talep', 'talih', 'tavan', 'tavır', 'tatil', 'tatlı', 'temiz', 'teori', 'tepki',
  'tesis', 'tekne', 'telif', 'tenis', 'tohum', 'topla', 'topuk', 'torba', 'torun',
  'tuzlu', 'uyarı', 'uygun', 'uzman', 'ücret', 'üçgen',
  'üstün', 'vakit', 'vapur', 'verim', 'video', 'villa', 'yaban',
  'yalan', 'yanıt', 'yapıt', 'yatak', 'yavaş', 'yazar', 'yorum', 'yüzde',
  'zaten', 'zorlu'
]

// NOTE:
// - All entries are intended to be common in modern usage and exactly 5 letters.
// - If you want stricter curation, keep this file small (~150–300) and add/remove
//   items that feel “daily” for your audience.
export default solutions
