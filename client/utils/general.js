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

function sortTable(element, n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector(element);
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            let xValue = parseFloat(x.innerHTML.toLowerCase());
            let yValue = parseFloat(y.innerHTML.toLowerCase());

            if (isNaN(xValue) || isNaN(yValue)) {
                xValue = x.innerHTML.toLowerCase();
                yValue = y.innerHTML.toLowerCase();
            }

            if (dir == "asc") {
                if (xValue > yValue) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (xValue < yValue) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}