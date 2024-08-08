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


for(file of files){
    const json=require(`./psalmody/${file}`)
    const yamlData=convertToYaml(json)
    fs.writeFileSync(`./psalmody/yaml/${file.replace(/\.json$/,'.yml')}`,yamlData)
}