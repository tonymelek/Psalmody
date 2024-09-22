const hymns=[
    "353",
    "449",
    "467",
    "468",
    "469",
    "473",
    "470",
    "471",
    "472",
    "146",
    "457",
    "655",
    "1930",
    "1932",
    "1931",
    "1933"
];
const axios=require('axios');
const dirPath='/psalmody';
hymns.forEach((hymn,index)=>{
    const missingZeros=1-Math.floor(Math.log10(index+1));
    const paddedIndex=`${'0'.repeat(missingZeros)}${index+41}`;
    axios.get(`http://localhost:5000/api/psalmody?item=${hymn}&dirPath=${dirPath}&index=${paddedIndex}`)
})


// getting hymn item numbers
// x=[];document.querySelectorAll('li').forEach(li=>x.push(li.querySelector('a').href));
// x.filter(v=>/\/view/.test(v)).map(v=>v.match(/\d+/)[0])