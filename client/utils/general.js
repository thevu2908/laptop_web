function removeDuplicateObject(arr) {
    let uniqueObjects = {}
    let uniqueArray = []
    arr.forEach(obj => {
        let key = JSON.stringify(obj);
        if (!uniqueObjects[key]) {
            uniqueObjects[key] = true;
            uniqueArray.push(obj);
        }
    })
    return uniqueArray
}