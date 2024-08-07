const pronunciationMap = {
    'Ⲁ': 'A', 'ⲁ': 'a',
    'Ⲃ': 'V', 'ⲃ': 'v',
    'Ⲅ': 'G', 'ⲅ': 'g',
    'Ⲇ': 'D', 'ⲇ': 'd',
    'Ⲉ': 'E', 'ⲉ': 'e',
    'Ⲍ': 'Z', 'ⲍ': 'z',
    'Ⲏ': 'I', 'ⲏ': 'i',
    'Ⲑ': 'Th', 'ⲑ': 'th',
    'Ⲓ': 'I', 'ⲓ': 'i',
    'Ⲕ': 'K', 'ⲕ': 'k',
    'Ⲗ': 'L', 'ⲗ': 'l',
    'Ⲙ': 'M', 'ⲙ': 'm',
    'Ⲛ': 'N', 'ⲛ': 'n',
    'Ⲝ': 'Ks', 'ⲝ': 'ks',
    'Ⲟ': 'O', 'ⲟ': 'o',
    'Ⲡ': 'P', 'ⲡ': 'p',
    'Ⲣ': 'R', 'ⲣ': 'r',
    'Ⲥ': 'S', 'ⲥ': 's',
    'Ⲧ': 'T', 'ⲧ': 't',
    'Ⲩ': 'Y', 'ⲩ': 'y',
    'Ⲫ': 'F', 'ⲫ': 'f',
    'Ⲭ': 'Kh', 'ⲭ': 'kh',
    'Ⲯ': 'Ps', 'ⲯ': 'ps',
    'Ⲱ': 'Ō', 'ⲱ': 'ō',
    'Ϣ': 'Sh', 'ϣ': 'sh',
    'Ϥ': 'F', 'ϥ': 'f',
    'Ϧ': 'Kh', 'ϧ': 'kh',
    'Ϩ': 'H', 'ϩ': 'h',
    'Ϫ': 'J', 'ϫ': 'j',
    'Ϭ': 'Ch', 'ϭ': 'ch',
    'Ϯ': 'Ti', 'ϯ': 'ti'
  };
  const specialCases = [
    { pattern: /ⲟⲩ|ⲟ̀ⲩ/g, replacement: 'ou' },
    { pattern: /Ⲟⲩ/g, replacement: 'Ou' },
    {pattern:/ⲃⲃ/g,replacement:'v'},
    {pattern:/ⲓϫ/g,replacement:'eeg'},
    {pattern:/ϫⲁ/g,replacement:'ga'},
    {pattern:/(ⲓ|ⲏ)ⲃ/g,replacement:'eeb'},
    { pattern: /ⲉⲓ/g, replacement: 'i' },
    { pattern: /ⲁⲩ/g, replacement: 'av' },
    { pattern: /ⲉⲩ/g, replacement: 'ev' },
    { pattern: /ⲏⲩ/g, replacement: 'y' },
    { pattern: /ⲟⲩⲓ/g, replacement: 'owi' },
    { pattern: /ⲅⲅ/g, replacement: 'ng' },
    { pattern: /ⲛⲕ/g, replacement: 'nk' },
    { pattern: /ⲛⲅ/g, replacement: 'ng' },
    { pattern: /ⲛⲭ/g, replacement: 'nkh' },
    {pattern:/Ⲡⲟ̅ⲥ̅|Ⲡ̀ⲟ̅ⲥ̅/g,replacement:'Pchois'},
    {pattern:/Ⲫϯ/g,replacement:'Efnouti'},
    {pattern:/ⲟ̅ⲥ̅/g,replacement:'chois'},
    {pattern:/ⲭ̅ⲥ̅/g,replacement:'Ekrestos'},
    {pattern:/(ⲉ̀̅ⲑ̅ⲩ̅|ⲉ̅ⲑ̅ⲩ̅)/g,replacement:'Eth-ouab'}
  ];
function copticToEnglishPronunciation(copticWord) {
    // Handle special cases first
    specialCases.forEach(({ pattern, replacement }) => {
      copticWord = copticWord.replace(pattern, replacement);
    });
    // Then handle individual characters
    return copticWord.split('').map(char => pronunciationMap[char] || char).join('');
   }

const copticTextToEnglish=(textArray)=>{
    return textArray.map(text=>{
          const words=text.split(' ')
    const englishWords=words.map(word=>copticToEnglishPronunciation(word))
    return englishWords.join(' ')
    })
  
}   
const fs=require('fs');
fs.writeFileSync('./output.json',JSON.stringify(copticTextToEnglish(    ["Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉ̅ⲑ̅ⲩ̅ Ⲙⲁⲣⲓⲁ: Ⲡⲟ̅ⲥ̅ ⲁⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ ⲡ̀ⲓⲁ̀ⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ ⲉ̅ⲑ̅ⲩ̅: Ⲙⲓⲭⲁⲏⲗ ⲡ̀ⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ̀ :Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ ⲡⲓϣⲁϣϥ ⲛ̀ⲁ̀ⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ ⲡⲓⲡ̀ⲣⲟⲇⲣⲟⲙⲟⲥ ⲙ̀ⲃⲁⲡⲧⲓⲥⲧⲏⲥ: Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲣⲉϥϯⲱⲙⲥ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲛⲁⲟ̅ⲥ̅ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡ̀ⲥⲉⲡⲓ ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲑⲏⲧⲏⲥ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲓⲑⲉⲱ̀ⲣⲓⲙⲟⲥ ⲛ̀ⲉ̀ⲩⲁ̀ⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲓⲁ̀ⲣⲭⲏⲇⲓⲁⲕⲱⲛ ⲉ̀ⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ: Ⲥ̀ⲧⲉⲫⲁⲛⲟⲥ ⲡⲓϣⲟⲣⲡ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲡⲁⲟ̅ⲥ̅ ⲡ̀ⲟⲩⲣⲟ Ⲅⲉⲱ̀ⲣⲅⲓⲟⲥ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲑⲉⲟ̀ⲇⲱⲣⲟⲥ ⲡⲓⲥ̀ⲧ̀ⲣⲁⲧⲓⲗⲁⲧⲏⲥ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲁⲃⲃⲁ Ⲙⲏⲛⲁ ⲛ̀ⲧⲉ ⲛⲓⲪⲁⲓⲁⲧ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲛⲏⲉ̅ⲑ̅ⲩ̅ ⲛ̀ⲧⲉ ⲡⲁⲓⲉ̀ϩⲟⲟⲩ: ⲡⲓⲟⲩⲁⲓ ⲡⲓⲟⲩⲁⲓ ⲕⲁⲧⲁ ⲡⲉϥⲣⲁⲛ: Ⲡⲟ̅ⲥ̅...",
    "Ϩⲓⲧⲉⲛ ⲛⲟⲩⲉ̀ⲩⲭⲏ: ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲱⲓⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁ̀ⲣⲭⲏⲉ̀ⲣⲉⲩⲥ: ⲡⲁⲡⲁ ⲁⲃⲃⲁ Ϣⲉⲛⲟⲩⲇⲁ :Ⲡⲟ̅ⲥ̅ ⲁⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ. ",
    "Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ ⲱ̀ Ⲡⲭ̅ⲥ̅: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ ⲡⲓⲠ̀ⲡⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅: ϫⲉ (ⲁⲕⲧⲱⲛⲕ / ⲁⲕⲓ̀) ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲛⲁⲓ ⲛⲁⲛ. "]),null,2))