
import ten_thino from './ten_thino.js'
import first_hoos from './first_hoos.js'
import first_lobsh from './first_lobsh.js'
import second_hoos from './second_hoos.js'
import second_lobsh from './second_lobsh.js'
import third_hoos from './third_hoos.js'
import arepsalin from './arepsalin.js'
import tenoweeh from './ten_oweeh.js'
import  comemoration from './comemoration.js'
import  whoAmongGods from './who_among_gods.js'
import amenKerialaison from './amenKerialaison.js'
import fourth_hoos from './fourth_hoos.js'
import aynahti from './aynahti.js'
import aykoti from './aykoti.js';
import theotokia from './theotokia.js';
import theotokia_intro from './theotokia_intro.js';
import theotokia_tenth_to_fifteenth from './theotokia_tenth_to_fifteenth.js'
import shere_ne_maria from './shere_ne_maria.js';
import semoti from './semoti.js';
import seven_times from './seven_times.js'
import fs from 'fs';


const hymns=[ten_thino,
    first_hoos,
     first_lobsh,
      second_hoos, 
      second_lobsh,
      third_hoos,
      arepsalin,
       tenoweeh,
       comemoration,
       fourth_hoos,
       aynahti,
       aykoti,
       theotokia_intro,
       theotokia,
       shere_ne_maria,
       semoti,
       seven_times,
       theotokia_tenth_to_fifteenth,
       whoAmongGods,
       amenKerialaison
   ]


for(let hymn of hymns){
    hymn={...hymn, arabic:hymn.arabic.slice(1)}
    fs.writeFileSync(`/home/tony/Psalmody/src/assets/hymns/new-hymns/${hymn.name.replace(/\s/g,'_')}.json`,JSON.stringify(hymn,null,2),'utf-8')
}
fs.writeFileSync(`/home/tony/Psalmody/src/assets/hymns/new-hymns/hymns.json`,JSON.stringify(hymns.map(hymn=>hymn.name.replace(/\s/g,'_')),null,2),'utf-8')

fs.writeFileSync(`/home/tony/Psalmody/src/assets/hymns/new-hymns/index.js`,`${hymns.map(hymn=>`import ${hymn.name.replace(/\s/g,'_')} from './${hymn.name.replace(/\s/g,'_')}.json'`).join(';\n')}

export default [${hymns.map(hymn=>`\n${hymn.name.replace(/\s/g,'_')}`)}];
`,'utf-8')

// export default 
// [ten_thino,
//      first_hoos,
//       first_lobsh,
//        second_hoos, 
//        second_lobsh,
//        third_hoos,
//        arepsalin,
//         tenoweeh,
//         comemoration,
//         fourth_hoos,
//         aynahti,
//         aykoti,
//         theotokia_intro,
//         theotokia,
//         shere_ne_maria,
//         semoti,
//         seven_times,
//         theotokia_tenth_to_fifteenth,
//         whoAmongGods,
//         amenKerialaison
//     ]