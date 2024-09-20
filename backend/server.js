//Dependencies
const express = require('express');
const DomParser = require('dom-parser');
const axios = require('axios');
const fs = require('fs');
const { copticTextToEnglish } = require('./copticToEnglish');

//Variables
PORT = process.env.PORT || 5000

//Intaite Express
const app = express();
// Create new DomParser Object
const parser = new DomParser();




app.get('/api/psalmody', (req, res) => {
    // Lang ='english' or 'arabic' or 'coptic'
    let { lang, item, dirPath, index } = req.query
    lang = lang === 'all' || !lang ? ['englishtext', 'arabictext', 'coptictext_utf8'] : [lang]
    axios(`https://tasbeha.org/hymn_library/view/${item}`)
        .then(result => {
            const doc = parser.parseFromString(result.data)
            const title = doc.getElementsByTagName('h1')[0].textContent.split(' :')[0].replace(/the hymn of (the )?/ig, '')

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
                    output[lang[index].replace(/text.*/, '')] = text
                }
            }

            if (!output.copticEnglish[0]) {
                output.english = output.copticEnglish;
                output.copticEnglish = copticTextToEnglish(output.coptic);
            }
            fs.writeFileSync(`.${dirPath}/${index}-${title.trim().toLowerCase().replace(/(\s|-)+/g, '-')}.json`, JSON.stringify({ name: title, ...output }, null, 2))
            res.send({ name: title, ...output })
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})

app.get('/api/psalmody2', (req, res) => {
    // Lang ='english' or 'arabic' or 'coptic'
    let { item } = req.query
    axios(`https://tasbeha.org/hymn_library/view/${item}`)
        .then(result => {
            const doc = parser.parseFromString(result.data)
            const title = doc.getElementsByTagName('h1')[0].textContent.split(' :')[0].replace(/the hymn of (the )?/ig, '')
            // const additionalText = all.slice(all.findIndex(p => p.trim() === '')).filter(p => p.trim() !== '').slice(0, firstLane.length);
            const paragraphs = doc.getElementsByTagName('p').map(p => p.textContent);
            const threeLanes = paragraphs.slice(0, paragraphs.findIndex(p => p.trim() === ''));

            res.send({
                name: title,
                english: threeLanes.filter((p, i) => i % 3 === 0),
                coptic: threeLanes.filter((p, i) => i % 3 === 1),
                arabic: threeLanes.filter((p, i) => i % 3 === 2)
            })
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})

app.get('/api/feasts', (req, res) => {
    let { year = 2024 } = req.query;
    const txtToIsoDate = txt => {
        return new Intl.DateTimeFormat('en-AU', {
            year: "numeric",
            month: "short",
            day: "numeric",
            // timeZoneName: "short",
            timeZone: 'Australia/Melbourne',
        }).format(new Date(`${txt},${year}`))
    }
    const twoDigit = num => num < 10 ? `0${num}` : num;
    axios(`https://suscopts.org/coptic-orthodox/fasts-and-feasts/${year}`)
        .then(result => {
            const doc = parser.parseFromString(result.data)
            const tablecontents = doc.getElementsByTagName('td').map(td => td.innerHTML);
            const output = tablecontents.reduce((acc, td, i) => {
                if (i % 2 === 0) {
                    const twoDigit = num => num < 10 ? `0${num}` : num;
                    let temp = '';
                    const dates = tablecontents[i + 1].split('&ndash;').map(t => {
                        if (/^\d+$/.test(t)) {
                            return `${t} ${temp}`
                        } else {
                            temp = txtToIsoDate(t).match(/[a-z]+\s2\d{3}/i)[0]
                            return txtToIsoDate(t)
                        }
                    });
                    acc[`${dates[0]}${dates[1] ? `-${dates[1]}` : ''}`] = `${td.replace('&amp;', '&')}`;
                }
                return acc;
            }, {})
            res.send(output)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})
//Listen at Port
app.listen(PORT, () => console.log(`Express server up and running on port ${PORT}`));