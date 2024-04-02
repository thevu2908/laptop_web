function formatCurrency(number) {
    return number.toLocaleString('en-US').replace(/,/g, '.');
}