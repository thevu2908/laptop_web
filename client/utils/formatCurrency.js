function formatCurrency(number) {
    return Number(number).toLocaleString('en-US').replace(/,/g, '.')
}