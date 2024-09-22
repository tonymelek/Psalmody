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
const twoDigit = num => num > 9 ? num : `0${num}`;
const oneDayMs = 24 * 60 * 60 * 1000;
const weekdays=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]


const calculateOrthodoxEaster = year => {
    // Calculate the number of years since the last Julian leap year
    const yearsSinceJulianLeapYear = year % 4;
    // Calculate the weekday of March 21st in the Julian calendar
    const marchEquinoxWeekday = year % 7;
    // Calculate the year's position in the Metonic cycle (19-year cycle)
    const metonicCyclePosition = year % 19;
    // Calculate the moon's age on March 21st
    const moonAge = (19 * metonicCyclePosition + 15) % 30;
    // Calculate the number of days from March 21st to the next Sunday
    const daysToSunday = (2 * yearsSinceJulianLeapYear + 4 * marchEquinoxWeekday - moonAge + 34) % 7;
    // Calculate the month of Easter (3 for March, 4 for April)
    const easterMonth = Math.floor((moonAge + daysToSunday + 114) / 31);
    // Calculate the day of Easter within its month
    const easterDay = ((moonAge + daysToSunday + 114) % 31) + 1;
    // Create a Date object for the calculated Easter date
    // Note: Month is 0-indexed in JavaScript Date, so we subtract 1
    // Add 13 days to convert from Julian to Gregorian calendar
    const easterDate = new Date(year, easterMonth - 1, easterDay + 13);
    const easterDateInMs = easterDate.getTime();
    const hosannaDate = new Date(easterDateInMs - 7 * oneDayMs);
    const pentecosteDate = new Date(easterDateInMs + 49 * oneDayMs);
    const apostolesFastStartDate = new Date(easterDateInMs + 50 * oneDayMs);
    return { easterDate, hosannaDate, pentecosteDate, apostolesFastStartDate }
}



const copticFeastsMap = {
    'Nayrouz': { startDay: 1, endDay: 16, calendar: 'coptic', startMonth: 1, endMonth: 1, tune: 'joy' },
    'Cross_1': { startDay: 17, endDay: 19, calendar: 'coptic', startMonth: 1, endMonth: 1, tune: 'hosanna' },
    'Cross_2': { startDay: 19, endDay: 19, calendar: 'greg', startMonth: 3, endMonth: 3, tune: 'hosanna' },
    'Nativity': { startDay: 7, endDay: 14, calendar: 'greg', startMonth: 1, endMonth: 1, tune: 'joy' },
    'Kiahk': { startDay: 30, endDay: 27, calendar: 'coptic', startMonth: 3, endMonth: 4, tune: 'kiahk' }
}

export class CopticFeasts {
    #date
    constructor(date = new Date()) {
        this.#date = date;
        const year = date.getFullYear();
        const { hosannaDate, pentecosteDate, easterDate, apostolesFastStartDate } = calculateOrthodoxEaster(year);

        const hosannaDay = hosannaDate.getDate();
        const hosannaMonth = hosannaDate.getMonth() + 1;

        const pentecosteDay = pentecosteDate.getDate();
        const pentecosteMonth = pentecosteDate.getMonth() + 1;

        const easterDay = easterDate.getDate();
        const easterMonth = easterDate.getMonth() + 1;

        const apostolesFastStartDay = apostolesFastStartDate.getDate();
        const apostolesFastStartMonth = apostolesFastStartDate.getMonth() + 1;

        copticFeastsMap['Pentecoste'] = { startDay: pentecosteDay, endDay: pentecosteDay, calendar: 'greg', startMonth: pentecosteMonth, endMonth: pentecosteMonth, tune: 'joy' };
        copticFeastsMap['Hosanna'] = { startDay: hosannaDay, endDay: hosannaDay, calendar: 'greg', startMonth: hosannaMonth, endMonth: hosannaMonth, tune: 'hosanna' };
        copticFeastsMap['Resurrection'] = { startDay: easterDay, endDay: pentecosteDay, calendar: 'greg', startMonth: easterMonth, endMonth: pentecosteMonth, tune: 'joy' }
        copticFeastsMap['ApostolesFast'] = { startDay: apostolesFastStartDay, endDay: 12, calendar: 'greg', startMonth: apostolesFastStartMonth, endMonth: 7, tune: 'annual' }
    }
    get copticDate() {
        return new Intl.DateTimeFormat('en-AU', {
            calendar: 'coptic',
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).format(this.#date);
    }
    get copticMonthNum() {
        return parseInt(this.copticDate.split(/\//)[1]);
    }
    get copticMonth() {
        return copticMonthsMap[this.copticMonthNum];
    }
    get copticDay() {
        return parseInt(this.copticDate.split(/\//)[0])
    }

    get all() {
        return copticFeastsMap
    }

    get isSatNight() {
        return this.#date.getDay() === 6;
    }
    #getWeekdayNum(){
        return (this.#date.getDay()+1)%7
    }
    get weekday() {
        return weekdays[this.#getWeekdayNum()];
    }

    get adamOrWatos(){
        return this.#getWeekdayNum()>=0 && this.#getWeekdayNum()<=2 ? 'adam' : 'watos';
    }

    get feast() {
        const copticDate = `${this.copticMonthNum}${twoDigit(this.copticDay)}`;
        const gregDate = this.#date.toISOString().match(/-\d{2}-\d{2}/)[0].replace(/-/g, '');

        for (let key in copticFeastsMap) {
            const curr = copticFeastsMap[key];
            const startDate = parseInt(`${curr.startMonth}${twoDigit(curr.startDay)}`);
            const endDate = parseInt(`${curr.endMonth}${twoDigit(curr.endDay)}`);
            const comparisonDate = parseInt(curr.calendar === 'coptic' ? copticDate : gregDate);
            if (comparisonDate >= startDate && comparisonDate <= endDate) {
                return { name: key, tune: copticFeastsMap[key].tune };

            }
        }
        return { name: null, tune: 'annual' };
    }

}