const hymns=[
    "92",
    "104",
    "2539",
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
for(const item of hymns){
    axios.get(`http://localhost:5000/api/psalmody?item=${item}`)
}

// getting hymn item numbers
// x=[];document.querySelectorAll('li').forEach(li=>x.push(li.querySelector('a').href));
// x.filter(v=>/\/view/.test(v)).map(v=>v.match(/\d+/)[0])