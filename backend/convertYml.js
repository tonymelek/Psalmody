const yaml = require('js-yaml');
const fs = require('fs');

const files=fs.readdirSync('./indexedHymns').filter(name=>/.+\.json$/.test(name));


function convertToYaml(jsonData) {
  const yamlData = {
    title: {
      english: jsonData.name,
    },
    sections: [{speaker:'',verses:[]}],
  };
    yamlData.sections[0].verses.push({
          english: jsonData.english,
          coptic: jsonData.coptic,
          coptic_english: jsonData.copticEnglish,
          arabic: jsonData.arabic,
          coptic_arabic:jsonData.arabicCoptic
    });
  

  return yaml.dump(yamlData);
}

console.log(files);

files.forEach(file => {
  // console.log(file.match(/([a-z]|_)+[0-9]*/ig));
  
 fs.writeFileSync(`./indexedHymns/yaml/${file.match(/([a-z]|_)+[0-9]*/ig)[0].replace('_','')}.yml`,convertToYaml(require(`./indexedHymns/${file}`)))
});





const lowerCaseMap = {
  'Ⲁ': 'ⲁ', 'Ⲃ': 'ⲃ',
  'Ⲅ': 'ⲅ', 'Ⲇ': 'ⲇ',
  'Ⲉ': 'ⲉ', 'Ⲍ': 'ⲍ',
  'Ⲏ': 'ⲏ', 'Ⲑ': 'ⲑ',
  'Ⲓ': 'ⲓ', 'Ⲕ': 'ⲕ',
  'Ⲗ': 'ⲗ', 'Ⲙ': 'ⲙ',
  'Ⲛ': 'ⲛ', 'Ⲝ': 'ⲝ',
  'Ⲟ': 'ⲟ', 'Ⲡ': 'ⲡ',
  'Ⲣ': 'ⲣ', 'Ⲥ': 'ⲥ',
  'Ⲧ': 'ⲧ', 'Ⲩ': 'ⲩ',
  'Ⲫ': 'ⲫ', 'Ⲭ': 'ⲭ',
  'Ⲯ': 'ⲯ', 'Ⲱ': 'ⲱ',
  'Ϣ': 'ϣ', 'Ϥ': 'ϥ',
  'Ϧ': 'ϧ', 'Ϩ': 'ϩ',
  'Ϫ': 'ϫ', 'Ϭ': 'ϭ',
  'Ϯ': 'ϯ','Ϥ':'Ϥ'
  
};
String.prototype.toCopticLowerCase = function() {
  return this.split('').map(char => lowerCaseMap[char] || char).join('');
};

// const allCoptic=[];
// for(file of files){
//     const json=require(`./psalmody/${file}`)
//     // const yamlData=convertToYaml(json)
//     // fs.writeFileSync(`./psalmody/yaml/${file.replace(/\.json$/,'.yml')}`,yamlData)
//     allCoptic.push(...json.coptic)
// }
// const wordsSet =new Set(allCoptic.join(' ').replace(/(\n+|:|\t|\(|\)|\/)/g,' ').replace(/\.+/g,'').split(' ').filter(w=>w.length>1).map(v=>v.toCopticLowerCase()))
// fs.writeFileSync('./copticWords2.json', JSON.stringify(Array.from(wordsSet),null,2))


// const words=require('./copticWords3.json');
// const your=new RegExp('ⲛⲉⲛ');
// const havePek=[... new Set(words.map(w=>your.test(w)?w.replace(/^ⲛⲉⲛ/,''):w))]
// fs.writeFileSync('./copticWords3.json', JSON.stringify(havePek,null,2))
