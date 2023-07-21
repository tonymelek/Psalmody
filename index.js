//Dependencies
const express = require('express');
const DomParser = require('dom-parser');
const axios = require('axios');

//Variables
PORT = process.env.PORT || 5000

//Intaite Express
const app = express();
// Create new DomParser Object
const parser = new DomParser();


app.get('/api/psalmody', (req, res) => {
    // Lang ='english' or 'arabic' or 'coptic'
    let { lang, item } = req.query
    lang = lang === 'all' || !lang ? ['englishtext', 'arabictext','coptictext_utf8'] : [lang]
    axios(`https://tasbeha.org/hymn_library/view/${item}`)
        .then(result => {
            const doc = parser.parseFromString(result.data)

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

            res.send(output)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})
app.get('/api/exchange-rates-australia', (req, res) => {
    axios('https://www.anz.com/aus/RateFee/fxrates/fxpopup.asp')
        .then(result => {
            const doc = parser.parseFromString(result.data)
            const table = [...doc.getElementsByClassName('OddRow'), ...doc.getElementsByClassName('EvenRow')]
            const dataObject = table.map(row => {
                const cells = row.childNodes.filter(v => !v.text)
                return {
                    currency: cells[2].textContent,
                    buy: Math.round(1 / cells[5].textContent.split(';')[1] * 100) / 100,
                    sell: Math.round(1 / cells[8].textContent.split(';')[1] * 100) / 100,
                }
            })

            res.send(dataObject.filter(v => v.buy))
        }).catch(err => {
            res.send(err)
        })
})



//Listen at Port
app.listen(PORT, () => console.log(`Express server up and running on port ${PORT}`));