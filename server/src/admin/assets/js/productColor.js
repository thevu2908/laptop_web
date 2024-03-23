const colorSelect = document.querySelector('#product-color-select')

const isColor = strColor => {
    const s = new Option().style
    s.color = strColor
    return s.color !== ''
}

if (colorSelect) {
    colorSelect.onchange = e => {
        const hex = e.target.value
        document.querySelector('#product-color-id').value = hex
    }
}