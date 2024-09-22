import psali from './psaliTuesday.js';
import fs from 'fs';
for (const lang in psali) {
    if (lang !== 'name') {
        const langArray = psali[lang]
        const u = langArray.reduce((a, b, i) => i % 2 === 1 ? a : [...a, `${langArray[i]}\n${langArray[i + 1]}`], []);
        psali[lang] = u;
    }
}
fs.writeFileSync('./psali.json',JSON.stringify(psali,null,2),'utf-8')
