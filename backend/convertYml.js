const yaml = require('js-yaml');
const fs = require('fs');

const files=fs.readdirSync('./psalmody').filter(name=>/.+\.json$/.test(name));


function convertToYaml(jsonData) {
  const yamlData = {
    title: {
      english: jsonData.name,
    },
    sections: [{speaker:'',verses:[]}],
  };

  for (let i = 0; i < jsonData.coptic.length; i++) {
    yamlData.sections[0].verses.push({
          english: jsonData.english[i],
          coptic: jsonData.coptic[i],
          coptic_english: jsonData.copticEnglish[i],
          arabic: jsonData.arabic[i],
    });
  }

  return yaml.dump(yamlData);
}

const allCoptic=[];
for(file of files){
    const json=require(`./psalmody/${file}`)
    // const yamlData=convertToYaml(json)
    // fs.writeFileSync(`./psalmody/yaml/${file.replace(/\.json$/,'.yml')}`,yamlData)
    allCoptic.push(...json.coptic)
}
const wordsSet =new Set(allCoptic.join(' ').replace(/(\n+|:|\t|\(|\)|\/)/g,' ').replace(/\.+/g,'').split(' ').filter(w=>w.length>1))
fs.writeFileSync('./copticWords.json', JSON.stringify(Array.from(wordsSet).sort(),null,2))