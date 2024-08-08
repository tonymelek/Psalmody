const hymns=[
    "92",
    "104",
    "103",
    "105",
    "106",
    "182",
    "108",
    "453",
    "109",
    "110",
    "111",
    "25",
    "127",
    "112",
    "174",
    "465",
    "476",
    "138",
    "139",
    "452",
    "140",
    "479",
    "2170",
    "480",
    "481",
    "661",
    "477",
    "147",
    "2716"
];
const axios=require('axios');
const dirPath='/psalmody';
hymns.forEach((hymn,index)=>{
    const missingZeros=1-Math.floor(Math.log10(index+1));
    const paddedIndex=`${'0'.repeat(missingZeros)}${index+1}`;
    axios.get(`http://localhost:5000/api/psalmody?item=${hymn}&dirPath=${dirPath}&index=${paddedIndex}`)
})


// getting hymn item numbers
// x=[];document.querySelectorAll('li').forEach(li=>x.push(li.querySelector('a').href));
// x.filter(v=>/\/view/.test(v)).map(v=>v.match(/\d+/)[0])