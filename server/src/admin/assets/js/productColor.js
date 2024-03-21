const colorHexIdElement = document.querySelector('#product-color-id')

const isColor = strColor => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
}

if (colorHexIdElement) {
    colorHexIdElement.oninput = e => {
        const colorHexId = e.target.value
        const colorDisplay = document.querySelector('.product-color-display')

        if (colorHexId === '#fff') {
            colorDisplay.classList.add('shadow')
        } else {
            colorDisplay.classList.remove('shadow')
        }
        
        colorDisplay.style.backgroundColor = colorHexId
    }
}