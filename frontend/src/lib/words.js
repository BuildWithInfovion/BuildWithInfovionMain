// Ported from the Infovion app (lib/documents/words.ts).
/**
 * Numbers and dates in words — English, Marathi, Hindi — for certificates
 * ("Date of birth in words" / "जन्म दिनांक (अक्षरी)").
 *
 * Marathi and Hindi numbers 1–99 are irregular, so they are spelled out in full.
 */


const EN_ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
  'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const EN_TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const EN_ORDINAL_DAY = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth',
  'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth',
  'Twentieth', 'Twenty-First', 'Twenty-Second', 'Twenty-Third', 'Twenty-Fourth', 'Twenty-Fifth', 'Twenty-Sixth',
  'Twenty-Seventh', 'Twenty-Eighth', 'Twenty-Ninth', 'Thirtieth', 'Thirty-First'];
const EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// index = number (1–99)
const MR_1_99 = ['',
  'एक', 'दोन', 'तीन', 'चार', 'पाच', 'सहा', 'सात', 'आठ', 'नऊ', 'दहा',
  'अकरा', 'बारा', 'तेरा', 'चौदा', 'पंधरा', 'सोळा', 'सतरा', 'अठरा', 'एकोणीस', 'वीस',
  'एकवीस', 'बावीस', 'तेवीस', 'चोवीस', 'पंचवीस', 'सव्वीस', 'सत्तावीस', 'अठ्ठावीस', 'एकोणतीस', 'तीस',
  'एकतीस', 'बत्तीस', 'तेहेतीस', 'चौतीस', 'पस्तीस', 'छत्तीस', 'सदतीस', 'अडतीस', 'एकोणचाळीस', 'चाळीस',
  'एक्केचाळीस', 'बेचाळीस', 'त्रेचाळीस', 'चव्वेचाळीस', 'पंचेचाळीस', 'सेहेचाळीस', 'सत्तेचाळीस', 'अठ्ठेचाळीस', 'एकोणपन्नास', 'पन्नास',
  'एक्कावन्न', 'बावन्न', 'त्रेपन्न', 'चोपन्न', 'पंचावन्न', 'छप्पन्न', 'सत्तावन्न', 'अठ्ठावन्न', 'एकोणसाठ', 'साठ',
  'एकसष्ठ', 'बासष्ठ', 'त्रेसष्ठ', 'चौसष्ठ', 'पासष्ठ', 'सहासष्ठ', 'सदुसष्ठ', 'अडुसष्ठ', 'एकोणसत्तर', 'सत्तर',
  'एक्काहत्तर', 'बाहत्तर', 'त्र्याहत्तर', 'चौऱ्याहत्तर', 'पंच्याहत्तर', 'शहात्तर', 'सत्त्याहत्तर', 'अठ्ठ्याहत्तर', 'एकोणऐंशी', 'ऐंशी',
  'एक्क्याऐंशी', 'ब्याऐंशी', 'त्र्याऐंशी', 'चौऱ्याऐंशी', 'पंच्याऐंशी', 'शहाऐंशी', 'सत्त्याऐंशी', 'अठ्ठ्याऐंशी', 'एकोणनव्वद', 'नव्वद',
  'एक्क्याण्णव', 'ब्याण्णव', 'त्र्याण्णव', 'चौऱ्याण्णव', 'पंच्याण्णव', 'शहाण्णव', 'सत्त्याण्णव', 'अठ्ठ्याण्णव', 'नव्व्याण्णव',
];
const MR_MONTHS = ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'];

const HI_1_99 = ['',
  'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस',
  'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस', 'बीस',
  'इक्कीस', 'बाईस', 'तेईस', 'चौबीस', 'पच्चीस', 'छब्बीस', 'सत्ताईस', 'अट्ठाईस', 'उनतीस', 'तीस',
  'इकतीस', 'बत्तीस', 'तैंतीस', 'चौंतीस', 'पैंतीस', 'छत्तीस', 'सैंतीस', 'अड़तीस', 'उनतालीस', 'चालीस',
  'इकतालीस', 'बयालीस', 'तैंतालीस', 'चवालीस', 'पैंतालीस', 'छियालीस', 'सैंतालीस', 'अड़तालीस', 'उनचास', 'पचास',
  'इक्यावन', 'बावन', 'तिरपन', 'चौवन', 'पचपन', 'छप्पन', 'सत्तावन', 'अट्ठावन', 'उनसठ', 'साठ',
  'इकसठ', 'बासठ', 'तिरसठ', 'चौंसठ', 'पैंसठ', 'छियासठ', 'सड़सठ', 'अड़सठ', 'उनहत्तर', 'सत्तर',
  'इकहत्तर', 'बहत्तर', 'तिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छिहत्तर', 'सतहत्तर', 'अठहत्तर', 'उन्यासी', 'अस्सी',
  'इक्यासी', 'बयासी', 'तिरासी', 'चौरासी', 'पचासी', 'छियासी', 'सत्तासी', 'अट्ठासी', 'नवासी', 'नब्बे',
  'इक्यानवे', 'बानवे', 'तिरानवे', 'चौरानवे', 'पचानवे', 'छियानवे', 'सत्तानवे', 'अट्ठानवे', 'निन्यानवे',
];
const HI_MONTHS = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];

function en1to99(n) {
  if (n < 20) return EN_ONES[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o ? `${EN_TENS[t]}-${EN_ONES[o]}` : EN_TENS[t];
}

/** Year in words, e.g. 1998, 2015 → "Nineteen Hundred Ninety-Eight", "Two Thousand Fifteen". */
function yearWords(y, lang) {
  const hi = Math.floor(y / 100);
  const lo = y % 100;
  if (lang === 'en') {
    if (y >= 2000 && y < 2100) return lo ? `Two Thousand ${en1to99(lo)}` : 'Two Thousand';
    return lo ? `${en1to99(hi)} Hundred ${en1to99(lo)}` : `${en1to99(hi)} Hundred`;
  }
  const table = lang === 'mr' ? MR_1_99 : HI_1_99;
  if (y >= 2000 && y < 2100) {
    const base = lang === 'mr' ? 'दोन हजार' : 'दो हजार';
    return lo ? `${base} ${table[lo]}` : base;
  }
  // 1900s: "एकोणीसशे अठ्ठ्याण्णव" / "उन्नीस सौ अट्ठानवे"
  const head = lang === 'mr' ? `${table[hi]}शे` : `${table[hi]} सौ`;
  return lo ? `${head} ${table[lo]}` : head;
}

export function monthName(m, lang) {
  return (lang === 'mr' ? MR_MONTHS : lang === 'hi' ? HI_MONTHS : EN_MONTHS)[m] ?? '';
}

function toDate(d) {
  if (!d) return null;
  const dt = typeof d === 'string' ? new Date(/^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00` : d) : d;
  return Number.isNaN(dt.getTime()) ? null : dt;
}

/** "15/06/2015" — the figures used on Indian certificates. */
export function dateFigures(d) {
  const dt = toDate(d);
  if (!dt) return '';
  return `${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth() + 1).padStart(2, '0')}/${dt.getFullYear()}`;
}

/** "15 June 2015" / "१५ जून २०१५"-style readable date (digits kept as 0-9). */
export function dateLong(d, lang = 'en') {
  const dt = toDate(d);
  if (!dt) return '';
  return `${dt.getDate()} ${monthName(dt.getMonth(), lang)} ${dt.getFullYear()}`;
}

/**
 * Date in words:
 *   en → "Fifteenth June Two Thousand Fifteen"
 *   mr → "पंधरा जून दोन हजार पंधरा"
 *   hi → "पंद्रह जून दो हजार पंद्रह"
 */
export function dateInWords(d, lang = 'en') {
  const dt = toDate(d);
  if (!dt) return '';
  const day = dt.getDate();
  const month = monthName(dt.getMonth(), lang);
  const year = yearWords(dt.getFullYear(), lang);
  if (lang === 'en') return `${EN_ORDINAL_DAY[day]} ${month} ${year}`;
  const table = lang === 'mr' ? MR_1_99 : HI_1_99;
  return `${table[day]} ${month} ${year}`;
}
