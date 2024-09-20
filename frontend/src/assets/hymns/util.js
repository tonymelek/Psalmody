const dateRegex = new RegExp(/\d{1,2}\s[a-z]+\s\d{4}/, 'i');
const monthRegex = new RegExp(/[a-z]+/, 'i');
const copticMonthsMap = [
    "",
    "Tout",
    "Baba",
    "Hator",
    "Kiahk",
    "Toba",
    "Amshir",
    "Baramhat",
    "Baramouda",
    "Bashans",
    "Paona",
    "Epep",
    "Mesra",
    "Nasie"
]
const twoDigit = num => num > 10 ? num : `0${num}`;

const copticFeastsMap = {
    'Nayrouz': { startDay: 1, endDay: 16, calendar: 'coptic', startMonth: 1, endMonth: 1 ,tune:'joy'},
    'Cross_1': { startDay: 17, endDay: 19, calendar: 'coptic', startMonth: 1, endMonth: 1 ,tune:'hosanna'},
    'Cross_2':{ startDay: 19, endDay: 19, calendar: 'greg', startMonth: 3, endMonth: 3 ,tune:'hosanna'},
    'Nativity':{ startDay: 7, endDay: 14, calendar: 'greg', startMonth: 1, endMonth: 1 ,tune:'joy'},
    'Kiahk':{ startDay: 30, endDay: 27, calendar: 'coptic', startMonth: 3, endMonth: 4 ,tune:'kiahk'},

}

export class CopticFeasts {
    #date
    constructor(date = new Date()) {
        this.#date = date;
    }
    get copticDate() {
        return new Intl.DateTimeFormat('en-AU', {
            calendar: 'coptic',
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(this.#date).match(dateRegex)[0];
    }
    get copticMonth() {
        return this.copticDate.match(monthRegex)[0];
    }
    get copticDay() {
        return parseInt(this.copticDate.split(/\s/)[0])
    }
   
    get feast() {
        const copticMonthNum = copticMonthsMap.findIndex(m => m === this.copticMonth);
        const copticDate = `${copticMonthNum}${twoDigit(this.copticDay)}`;
        const gregDate=this.#date.toISOString().match(/-\d{2}-\d{2}/)[0].replace(/-/g,'');

        for (let key in copticFeastsMap) {
            const curr = copticFeastsMap[key];
            const startDate = parseInt(`${curr.startMonth}${twoDigit(curr.startDay)}`);
            const endDate = parseInt(`${curr.endMonth}${twoDigit(curr.endDay)}`);
            const comparisonDate=parseInt(curr.calendar==='coptic'?copticDate:gregDate);
            if (comparisonDate >= startDate && comparisonDate <= endDate) {
                return {name:key,tune:copticFeastsMap[key].tune};

            }
        }
        return {name:null,tune:'annual'};
    }
   
}