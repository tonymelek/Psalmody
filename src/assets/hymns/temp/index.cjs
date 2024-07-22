const fs=require('fs');
const theotoky=require('./Theotokia_Parts_1_to_6.json');
const {english, copticEnglish,arabic}=theotoky;

const indexes=[];
const subTtitles=english.filter((verse, index)=>{
    if(verse.length<30){
        indexes.push(index);
        return true;
    }
    return false;
})
indexes.push(english.length);
subTtitles.forEach((title, index)=>{
    const name='Theotoky part '+(index+1);
    const numberOfVerses=indexes[index+1];
    const englishs=[...english].slice(indexes[index]+1,numberOfVerses);
    const coptics=[...copticEnglish].slice(indexes[index]+1,numberOfVerses);
    const arabicTexts=[...arabic].slice(indexes[index]+1,numberOfVerses);
    const data={
        name,
        english:englishs,
        copticEnglish:coptics,
        arabicText:arabicTexts
    }
    fs.writeFileSync(`./${name.replace(/\s/g,'_')}.json`, JSON.stringify(data,null,2),'utf-8');
})
