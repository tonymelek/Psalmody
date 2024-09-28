// Fully Comprehensive Coptic to Arabic Transliterator
function formatArabicForDisplay(arabicText) {
  // Add RTL mark at the start of the text
  const rtlMark = '\u200F';
  
  // Split the text into words
  const words = arabicText.split(' ');
  
  // Reverse the order of words
  const reversedWords = words.reverse();
  
  // Join the words back together
  return rtlMark + reversedWords.join(' ');
}

const copticToArabicMap = {
  // Single characters
  'Ⲁ': 'ا', 'ⲁ': 'ا',
  'Ⲃ': 'ب', 'ⲃ': 'ب',
  'Ⲅ': 'غ', 'ⲅ': 'غ',
  'Ⲇ': 'د', 'ⲇ': 'د',
  'Ⲉ': 'ي', 'ⲉ': 'ي',
  'Ⲍ': 'ز', 'ⲍ': 'ز',
  'Ⲏ': 'ي', 'ⲏ': 'ي',
  'Ⲑ': 'ث', 'ⲑ': 'ث',
  'Ⲓ': 'ي', 'ⲓ': 'ي',
  'Ⲕ': 'ك', 'ⲕ': 'ك',
  'Ⲗ': 'ل', 'ⲗ': 'ل',
  'Ⲙ': 'م', 'ⲙ': 'م',
  'Ⲛ': 'ن', 'ⲛ': 'ن',
  'Ⲝ': 'كس', 'ⲝ': 'كس',
  'Ⲟ': 'و', 'ⲟ': 'و',
  'Ⲡ': 'ب', 'ⲡ': 'ب',
  'Ⲣ': 'ر', 'ⲣ': 'ر',
  'Ⲥ': 'س', 'ⲥ': 'س',
  'Ⲧ': 'ت', 'ⲧ': 'ت',
  'Ⲩ': 'و', 'ⲩ': 'و',
  'Ⲫ': 'ف', 'ⲫ': 'ف',
  'Ⲭ': 'خ', 'ⲭ': 'خ',
  'Ⲯ': 'بس', 'ⲯ': 'بس',
  'Ⲱ': 'و', 'ⲱ': 'و',
  'Ϣ': 'ش', 'ϣ': 'ش',
  'Ϥ': 'ف', 'ϥ': 'ف',
  'Ϧ': 'خ', 'ϧ': 'خ',
  'Ϩ': 'ه', 'ϩ': 'ه',
  'Ϫ': 'ج', 'ϫ': 'ج',
  'Ϭ': 'تش', 'ϭ': 'تش',
  'Ϯ': 'تي', 'ϯ': 'تي',

  // Vowel combinations
  'ⲟⲩ': 'و', 'Ⲟⲩ': 'و', 'ⲞⲨ': 'و',
  'ⲉⲓ': 'ي', 'Ⲉⲓ': 'ي', 'ⲈⲒ': 'ي',
  'ⲁⲓ': 'اي', 'Ⲁⲓ': 'اي', 'ⲀⲒ': 'اي',
  'ⲁⲩ': 'اف', 'Ⲁⲩ': 'اف', 'ⲀⲨ': 'اف',
  'ⲏⲓ': 'ي', 'Ⲏⲓ': 'ي', 'ⲎⲒ': 'ي',
  'ⲱⲟⲩ': 'و', 'Ⲱⲟⲩ': 'و', 'ⲰⲞⲨ': 'و',
  'ⲉⲩ': 'يف', 'Ⲉⲩ': 'يف', 'ⲈⲨ': 'يف',
  'ⲏⲩ': 'يو', 'Ⲏⲩ': 'يو', 'ⲎⲨ': 'يو',

  // Consonant combinations
  'ⲅⲅ': 'نج', 'Ⲅⲅ': 'نج', 'ⲄⲄ': 'نج',
  'ⲅⲭ': 'نخ', 'Ⲅⲭ': 'نخ', 'ⲄⲬ': 'نخ',
  'ⲅⲝ': 'نكس', 'Ⲅⲝ': 'نكس', 'ⲄⲌ': 'نكس',
  'ϫⲡ': 'جب', 'Ϫⲡ': 'جب', 'ϪⲠ': 'جب',
  'ⲭ': 'خ', 'Ⲭ': 'خ'
};

function transliterateCopticToArabic(copticText) {
  let arabicText = '';
  let i = 0;

  while (i < copticText.length) {
    let found = false;

    // Check for three-character combinations
    if (i + 2 < copticText.length) {
      const triChar = copticText.slice(i, i + 3);
      if (copticToArabicMap[triChar]) {
        arabicText += copticToArabicMap[triChar];
        i += 3;
        found = true;
      }
    }

    // Check for two-character combinations
    if (!found && i + 1 < copticText.length) {
      const diChar = copticText.slice(i, i + 2);
      if (copticToArabicMap[diChar]) {
        arabicText += copticToArabicMap[diChar];
        i += 2;
        found = true;
      }
    }

    // Single character transliteration
    if (!found) {
      arabicText += copticToArabicMap[copticText[i]] || copticText[i];
      i++;
    }
  }

  return formatArabicForDisplay(arabicText);
}

const copticTextToArabic = (textArray) => {
  return textArray.map(phrase => transliterateCopticToArabic(phrase))
}


module.exports = { copticTextToArabic };
