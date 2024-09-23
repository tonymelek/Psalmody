// Fully Comprehensive Coptic to Arabic Transliterator

const copticToArabicMap = {
    // Single characters
    'Ⲁ': 'ا', 'ⲁ': 'ا',
    'Ⲃ': 'ب', 'ⲃ': 'ب',
    'Ⲅ': 'غ', 'ⲅ': 'غ',
    'Ⲇ': 'د', 'ⲇ': 'د',
    'Ⲉ': 'ه', 'ⲉ': 'ه',
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
    'ⲁⲩ': 'او', 'Ⲁⲩ': 'او', 'ⲀⲨ': 'او',
    'ⲏⲓ': 'ي', 'Ⲏⲓ': 'ي', 'ⲎⲒ': 'ي',
    'ⲱⲟⲩ': 'و', 'Ⲱⲟⲩ': 'و', 'ⲰⲞⲨ': 'و',
    'ⲉⲩ': 'يف', 'Ⲉⲩ': 'يف', 'ⲈⲨ': 'يف',
    'ⲏⲩ': 'يو', 'Ⲏⲩ': 'يو', 'ⲎⲨ': 'يو',
  
    // Consonant combinations
    'ⲅⲅ': 'نج', 'Ⲅⲅ': 'نج', 'ⲄⲄ': 'نج',
    'ⲅⲭ': 'نخ', 'Ⲅⲭ': 'نخ', 'ⲄⲬ': 'نخ',
    'ⲅⲝ': 'نكس', 'Ⲅⲝ': 'نكس', 'ⲄⲌ': 'نكس',
    'ⲛⲕ': 'نك', 'Ⲛⲕ': 'نك', 'ⲚⲔ': 'نك',
    'ⲛⲧ': 'نت', 'Ⲛⲧ': 'نت', 'ⲚⲦ': 'نت',
    'ⲙⲡ': 'مب', 'Ⲙⲡ': 'مب', 'ⲘⲠ': 'مب',
    'ⲙⲫ': 'مف', 'Ⲙⲫ': 'مف', 'ⲘⲪ': 'مف',
    'ⲛϩ': 'نه', 'Ⲛϩ': 'نه', 'ⲚϨ': 'نه',
    'ⲧϩ': 'ته', 'Ⲧϩ': 'ته', 'ⲦϨ': 'ته',
    'ⲕϩ': 'كه', 'Ⲕϩ': 'كه', 'ⲔϨ': 'كه',
    'ⲡϩ': 'به', 'Ⲡϩ': 'به', 'ⲠϨ': 'به',
    'ϣⲧ': 'شت', 'Ϣⲧ': 'شت', 'ϢⲦ': 'شت',
    'ϩⲧ': 'هت', 'Ϩⲧ': 'هت', 'ϨⲦ': 'هت',
    'ϫⲡ': 'جب', 'Ϫⲡ': 'جب', 'ϪⲠ': 'جب',
    'ϭⲡ': 'تشب', 'Ϭⲡ': 'تشب', 'ϬⲠ': 'تشب',
  
    // Special combinations
    'ⲧⲓ': 'تي', 'Ⲧⲓ': 'تي', 'ⲦⲒ': 'تي',
    'ϯ': 'تي',  // This is already a single character in Coptic
  
    // Aspirated consonants
    'ⲑ': 'ث', 'Ⲑ': 'ث',
    'ⲫ': 'ف', 'Ⲫ': 'ف',
    'ⲭ': 'خ', 'Ⲭ': 'خ',
  
    // Punctuation and numbers
    '̀': '',  // Combining grave accent (used for supralinear stroke)
    '̄': '',  // Combining macron (used for supralinear stroke)
    '·': '،', // Coptic middle dot to Arabic comma
    '⳿': '',  // Coptic combining ni above (ignore in transliteration)
    '⳾': '؟', // Coptic full stop to Arabic question mark
    '̂': '',  // Combining circumflex accent (ignore in transliteration)
    '̈': '',  // Combining diaeresis (ignore in transliteration)
    'Ⲋ': '٦', 'ⲋ': '٦', // Coptic number six
    'Ⲍ': '٧', 'ⲍ': '٧', // Coptic number seven
    'Ⲑ': '٩', 'ⲑ': '٩', // Coptic number nine
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
  
    return arabicText;
  }
  
  // Example usage
  const copticExamples = [
    'Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ',
    'Ⲟⲩⲟϩ ⲁϥϣⲉⲛⲁϥ ⲉⲡϣⲱⲓ ⲉⲛⲓⲫⲏⲟⲩⲓ',
    'Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙⲙⲟⲕ ⲱ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ',
    'Ϯⲛⲁϩϯ ⲉⲫⲛⲟⲩϯ ⲫⲓⲱⲧ ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ',
    'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ· ⲡⲓⲱⲟⲩ ⲫⲁ ⲡⲉⲛⲛⲟⲩϯ ⲡⲉ⳿'
  ];
  
  copticExamples.forEach((example, index) => {
    console.log(`Example ${index + 1}:`);
    console.log('Coptic:', example);
    console.log('Arabic:', transliterateCopticToArabic(example));
    console.log('');
  });
  
  module.exports = { transliterateCopticToArabic };