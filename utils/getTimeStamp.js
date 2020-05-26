function getTimeStamp() {
    let timeStamp;

    const d = new Date();

    const dd = d.getDate();

    const mm = d.getMonth() + 1;

    const yyyy = d.getFullYear();

    const hours = d.getHours();

    const minutes = d.getMinutes();

    let militaryTime = hours + ":" + minutes;

    militaryTime = militaryTime.split(':');


    if (hours > 0 && hours <= 12) {
        timeStamp = "" + hours;
    } else if (hours > 12) {
        timeStamp = "" + (hours - 12);
    } else if (hours == 0) {
        timeStamp = "12";
    }

    timeStamp += (minutes < 10) ? "_0" + minutes : "_" + minutes;
    timeStamp += (hours >= 12) ? "_PM" : "_AM";
    timeStamp = `${mm}-${dd}-${yyyy}_${timeStamp}`

    return timeStamp;
}

module.exports = getTimeStamp;
