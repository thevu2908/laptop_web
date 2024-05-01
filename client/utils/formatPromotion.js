function convertMucKM(number) {
    number = parseFloat(number)
    if(number % 1 === 0 && number !== 0) {
        return '₫' + number.toLocaleString('en-US').replace(/,/g, '.');
    }
    else {
        var phanTram = number * 100;
        return phanTram.toFixed(0) + '%';
    }
}