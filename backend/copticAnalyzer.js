const axios = require('axios');
const { copticTextToEnglish } = require('./copticToEnglish');

const copticWords = require('./copticWords.json');
const fs = require('fs');

const config = {
    method: 'post',
    url: 'https://coptictranslator.com/api/translate/',
    headers: {
        'accept': '*/*',
        'content-type': 'application/json',
        'origin': 'https://coptictranslator.com',
        'referer': 'https://coptictranslator.com/',
    },
    data: ''
};

const waitFor=()=>new Promise((res,rej)=>setTimeout(()=>res(),1000))
const meanings = {}
let index=0;
const getMeanings = async () => {
    for (const word of copticWords) {
        meanings[word] = {}
        config.data = JSON.stringify({ "text": word, "src": "cop_boh", "tgt": "ar" });
        try {
            const { data: ar } = await axios(config);
            meanings[word].arabic = ar.translation;
            // console.log(meanings[word]);
        } catch (err) {
            console.log(err)
        }
        config.data = JSON.stringify({ "text": word, "src": "cop_boh", "tgt": "en" });
        try {
            const { data: en } = await axios(config);
            meanings[word].english = en.translation;
            // console.log(meanings[word]);

        } catch (error) {
            console.log(err)
        }
        index ++;
        fs.writeFileSync('./copticMeanings.json', JSON.stringify(meanings, null, 2))
        if(index%10===0)await waitFor();
    }
}
getMeanings();

// Promise.all(meanings).then((res)=>{
// })