function removeDuplicateObject(arr, key) {
    let uniqueValues = new Set()
    let uniqueArray = []

    arr.forEach(obj => {
        let keyValue = obj[key]
        if (!uniqueValues.has(keyValue)) {
            uniqueValues.add(keyValue)
            uniqueArray.push(obj)
        }
    })

    return uniqueArray
}

function removeRedundantSpaces(str) {
    return str.replace(/\s+/g, ' ').trim();
}

function displayTotalPage(element, count, totalPage) {
    $(element).html(`Hiển thị <b>${totalPage}</b> trong <b>${count}</b> kết quả`)
}