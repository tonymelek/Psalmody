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
console.log(copticTextToEnglish( [
  "Ⲱ̀ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲫⲏⲉⲧⲱ̀ⲗⲓ ⲙ̀ⲫ̀ⲛⲟⲃⲓ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ: ⲟⲡⲧⲉⲛ ϩⲱⲛ ⲛⲉⲙ ⲛⲉⲕϩⲓⲏⲃ: ⲛⲁⲓ ⲉⲧⲥⲁⲟⲩⲓ̀ⲛⲁⲙ ⲙ̀ⲙⲟⲕ.",
"+ Ⲁⲕϣⲁⲛⲓ̀ ϧⲉⲛ ⲧⲉⲕⲙⲁϩⲥ̀ⲛⲟⲩϯ: ⲙ̀ⲡⲁⲣⲟⲩⲥⲓⲁ ⲉⲧⲟⲓ ⲛ̀ϩⲟϯ: ⲙ̀ⲡⲉⲛⲑ̀ⲣⲉⲛⲥⲱⲧⲉⲙ ϧⲉⲛ ⲟⲩⲥ̀ⲑⲉⲣⲧⲉⲣ: ϫⲉ ϯⲥⲱⲟⲩⲛ ⲙ̀ⲙⲱⲧⲉⲛ ⲁⲛ.",
"Ⲁⲗⲗⲁ ⲙⲁⲣⲉⲛⲉⲣⲡ̀ⲉⲙⲡ̀ϣⲁ ⲛ̀ⲥⲱⲧⲉⲙ: ⲉ̀ϯⲥ̀ⲙⲏ ⲉⲑⲙⲉϩ ⲛ̀ⲣⲁϣⲓ: ⲛ̀ⲧⲉ ⲛⲉⲕⲙⲉⲧϣⲁⲛⲁϩ̀ⲑⲏϥ: ⲉⲥⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲥϫⲱ ⲙ̀ⲙⲟⲥ.",
"+ Ϫⲉ ⲁ̀ⲙⲱⲓⲛⲓ ϩⲁⲣⲟⲓ: ⲛⲏⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲧⲉ Ⲡⲁⲓⲱⲧ: ⲁ̀ⲣⲓⲕ̀ⲗⲏⲣⲟⲛⲟⲙⲓⲛ ⲙ̀ⲡⲓⲱⲛϧ: ⲉⲑⲙⲏⲛ ⲉ̀ⲃⲟⲗ ϣⲁ ⲉ̀ⲛⲉϩ.",
"Ⲥⲉⲛⲁⲓ̀ ⲛ̀ϫⲉ ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲉⲩϥⲁⲓ ϧⲁ ⲛⲟⲩⲃⲁⲥⲁⲛⲟⲥ: ⲥⲉⲛⲁⲓ̀ ⲛ̀ϫⲉ ⲛⲓⲇⲓⲕⲉⲟⲥ: ⲉⲩϥⲁⲓ ϧⲁ ⲛⲟⲩⲡⲟⲗⲏⲧⲓⲁ.",
"+ Ϥ̀ⲛⲁⲓ̀ ⲛ̀ϫⲉ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ϧⲉⲛ ⲡⲉϥⲱ̀ⲟⲩ ⲛⲉⲙ ⲫⲁ Ⲡⲉϥⲓⲱⲧ: ϥ̀ⲛⲁϯ ⲙ̀ⲡⲓⲟⲩⲁⲓ ⲡⲓⲟⲩⲁⲓ: ⲕⲁⲧⲁ ⲛⲉϥϩ̀ⲃⲏⲟⲩⲓ̀ ⲉ̀ⲧⲁϥⲁⲓⲧⲟⲩ.",
"Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲓⲗⲟⲅⲟⲥ ⲛ̀ⲧⲉ Ⲫ̀ⲓⲱⲧ: ⲡⲓⲙⲟⲛⲟⲅⲉⲛⲏⲥ ⲛ̀Ⲛⲟⲩϯ: ⲉⲕⲉ̀ϯ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ: ⲑⲁⲓ ⲉⲑⲙⲉϩ ⲛ̀ⲣⲁϣⲓ ⲛⲓⲃⲉⲛ.",
"+ Ⲕⲁⲧⲁ ⲫ̀ⲣⲏϯ ⲉ̀ⲧⲁⲕⲧⲏⲓⲥ: ⲛ̀ⲛⲉⲕⲁ̀ⲅⲓⲟⲥ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲉⲕⲉ̀ϫⲟⲥ ⲛⲁⲛ ⲙ̀ⲡⲟⲩⲣⲏϯ: ϫⲉ ⲧⲁϩⲓⲣⲏⲛⲏ ϯϯ ⲙ̀ⲙⲟⲥ ⲛⲱⲧⲉⲛ.",
"Ⲧⲁϩⲓⲣⲏⲛⲏ ⲁ̀ⲛⲟⲕ: ⲑⲏⲉ̀ⲧⲁⲓϭⲓⲧⲥ ϩⲓⲧⲉⲛ Ⲡⲁⲓⲱⲧ: ⲁ̀ⲛⲟⲕ ϯⲭⲱ ⲙ̀ⲙⲟⲥ ⲛⲉⲙⲱⲧⲉⲛ: ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ.",
"+ Ⲡⲓⲁⲅⲅⲉⲗⲟⲥ ⲛ̀ⲧⲉ ⲡⲁⲓⲉ̀ϩⲟⲟⲩ: ⲉⲧϩⲏⲗ ⲉ̀ⲡ̀ϭⲓⲥⲓ ⲛⲉⲙ ⲡⲁⲓϩⲩⲙⲛⲟⲥ: ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ ϧⲁ ⲧ̀ϩⲏ ⲙ̀Ⲡ̀ϭⲟⲓⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.",
"Ⲛⲏⲉⲧϣⲱⲛⲓ ⲙⲁⲧⲁⲗϭⲱⲟⲩ: ⲛⲏⲉ̀ⲧⲁⲩⲉⲛⲕⲟⲧ Ⲡ̀ϭⲟⲓⲥ ⲙⲁⲙ̀ⲧⲟⲛ ⲛⲱⲟⲩ: ⲛⲉⲛⲥ̀ⲛⲏⲟⲩ ⲉⲧⲭⲏ ϧⲉⲛ ϩⲟϫϩⲉϫ ⲛⲓⲃⲉⲛ: Ⲡⲁϭⲟⲓⲥ ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲛ ⲛⲉⲙⲱⲟⲩ.",
"+ Ⲉϥⲉ̀ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲛ ⲛ̀ϫⲉ Ⲫ̀ⲛⲟⲩϯ: ⲧⲉⲛⲛⲁⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲉϥⲣⲁⲛ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ ⲉ̀ⲣⲉ ⲡⲉϥⲥ̀ⲙⲟⲩ: ⲛⲁϣⲱⲡⲓ ⲉϥⲙⲏⲛ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲣⲱⲛ.",
"Ϫⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁⲥ."
  ]));
module.exports={copticTextToEnglish}