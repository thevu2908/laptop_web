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