function convertMucKM(number) {
    if (number.startsWith('0.')) {
        var phanTram = parseFloat(number) * 100;
        return phanTram.toFixed(0) + '%';
    }
    else
        return number.toLocaleString('en-US').replace(/,/g, '.');
  }