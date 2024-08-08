//Dependencies
const express = require('express');
const DomParser = require('dom-parser');
const axios = require('axios');
const fs=require('fs');
const {copticTextToEnglish} =require('./copticToEnglish');

//Variables
PORT = process.env.PORT || 5000

//Intaite Express
const app = express();
// Create new DomParser Object
const parser = new DomParser();


app.get('/api/psalmody', (req, res) => {
    // Lang ='english' or 'arabic' or 'coptic'
    let { lang, item ,dirPath,index} = req.query
    lang = lang === 'all' || !lang ? ['englishtext', 'arabictext','coptictext_utf8'] : [lang]
    axios(`https://tasbeha.org/hymn_library/view/${item}`)
        .then(result => {
            const doc = parser.parseFromString(result.data)
            const title=doc.getElementsByTagName('h1')[0].textContent.split(' :')[0].replace(/the hymn of (the )?/ig,'')

            const output = {};
            for (let index = 0; index < lang.length; index++) {
                const text = doc.getElementsByClassName(`${lang[index]}`)
                    .filter(verse => verse.firstChild.textContent !== "&nbsp;") //ignore non-required spaces
                    .map(verse => verse.firstChild.textContent)
                if (lang[index] === 'englishtext') {
                    let copticEnglish = '';
                    let english = '';
                    let i = text.findIndex(verse => verse.includes('Coptic-English:'))
                    copticEnglish = [text[i]?.split('\n')[1], ...text?.splice(i + 1)]
                    english = text.splice(0, i)
                    output.english = english === '' ? text : english
                    output.copticEnglish = copticEnglish
                } else {
                    output[lang[index].replace(/text.*/,'')] = text
                }
            }
            
            if(!output.copticEnglish[0]){
                output.english=output.copticEnglish;
                output.copticEnglish=copticTextToEnglish(output.coptic);
            }
            fs.writeFileSync(`.${dirPath}/${index}-${title.trim().toLowerCase().replace(/(\s|-)+/g,'-')}.json`,JSON.stringify({name:title,...output},null,2))
            res.send({name:title,...output})
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})

//Listen at Port
app.listen(PORT, () => console.log(`Express server up and running on port ${PORT}`));