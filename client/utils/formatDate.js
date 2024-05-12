function getCurrentDate() {
    // var cur = new Date();
    // var day = cur.getDate();
    // var month = cur.getMonth() + 1;
    // var year = cur.getFullYear();

    // if(day < 10)
    //     day = '0' + day;
    // if(month < 10)
    //     month = '0' + month;

    // return day + '/' + month + '/' + year;
}

function convertDate(date) {
    var parts = date.split('-')
    var day = parts[2]
    var month = parts[1]
    var year = parts[0]

    return day + '/' + month + '/' + year
}

function formatDate(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

function getStartAndEndOfMonth() {
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    return {
        start: formatDate(startDate),
        end: formatDate(endDate)
    }
}