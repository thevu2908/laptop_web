const uploadImageContainer = document.querySelector('#addProductModal .upload-box')
const handleFileSelect = document.querySelector('#admin-product-main #addProductModal #product-image')
const openFileChooser = document.querySelector('#admin-product-main #addProductModal .btn-upload-img')

function uploadImage(file) {
    if (file) {
        previewImage(file)
    } else {
        alert('Hãy chọn file hình ảnh')
    }
}

function previewImage(file) {
    const reader = new FileReader()

    reader.onload = e => {
        const preview = document.querySelector('#addProductModal .upload-box')
        const previewImage = document.querySelector('#addProductModal .preview-img')

        previewImage.src = e.target.result
        preview.style.display = 'flex'
        preview.classList.remove('hide-image')
    }

    reader.readAsDataURL(file)
}

function removePreviewImage() {
    const preview = document.querySelector('#addProductModal .upload-box')
    const previewImage = document.querySelector('#addProductModal .preview-img')

    previewImage.src = ''
    preview.classList.add('hide-image')
}

if (uploadImageContainer) {
    uploadImageContainer.ondrop = e => {
        e.preventDefault()
        e.stopPropagation()

        const files = e.dataTransfer.files
        if (files.length > 0) {
            const file = files[0]
            uploadImage(file)
            handleFileSelect.files = files
        }
    }

    uploadImageContainer.ondragover = e => {
        e.preventDefault()
        e.stopPropagation()
    }

    uploadImageContainer.ondragleave = e => {
        e.preventDefault()
        e.stopPropagation()
    }
}

if (handleFileSelect) {
    handleFileSelect.onchange = e => {
        const files = e.target.files
        if (files.length > 0) {
            const file = files[0]
            uploadImage(file)
        }
    }
}

if (openFileChooser) {
    openFileChooser.onclick = e => {
        handleFileSelect.click()
    }
}

// update product image
const updateUploadImageContainer = document.querySelector('#editProductModal .upload-box')
const updateHandleFileSelect = document.querySelector('#admin-product-main #editProductModal #product-image')
const updateOpenFileChooser = document.querySelector('#admin-product-main #editProductModal .btn-upload-img')

function updateUploadImage(file) {
    if (file) {
        updatePreviewImage(file)
    } else {
        alert('Hãy chọn file hình ảnh')
    }
}

function updatePreviewImage(file) {
    const reader = new FileReader()

    reader.onload = e => {
        const preview = document.querySelector('#editProductModal .upload-box')
        const previewImage = document.querySelector('#editProductModal .preview-img')

        previewImage.src = e.target.result
        preview.style.display = 'flex'
        preview.classList.remove('hide-image')
    }

    reader.readAsDataURL(file)
}

function updateRemovePreviewImage() {
    const preview = document.querySelector('#editProductModal .upload-box')
    const previewImage = document.querySelector('#editProductModal .preview-img')

    previewImage.src = ''
    preview.classList.add('hide-image')
}

if (updateUploadImageContainer) {
    updateUploadImageContainer.ondrop = e => {
        e.preventDefault()
        e.stopPropagation()

        const files = e.dataTransfer.files
        if (files.length > 0) {
            const file = files[0]
            updateHandleFileSelect.files = files
            updateUploadImage(file)
        }
    }

    updateUploadImageContainer.ondragover = e => {
        e.preventDefault()
        e.stopPropagation()
    }

    updateUploadImageContainer.ondragleave = e => {
        e.preventDefault()
        e.stopPropagation()
    }
}

if (updateHandleFileSelect) {
    updateHandleFileSelect.onchange = e => {
        const files = e.target.files
        if (files.length > 0) {
            const file = files[0]
            updateUploadImage(file)
        }
    }
}

if (updateOpenFileChooser) {
    updateOpenFileChooser.onclick = e => {
        updateHandleFileSelect.click()
    }
}

// update product price
const productChietKhau = document.querySelector('#editProductModal #product-chietkhau')

if (productChietKhau) {
    productChietKhau.oninput = e => {
        const productImportPrice = document.querySelector('#editProductModal #product-import-price')
        let productPrice = document.querySelector('#editProductModal #product-price')

        productPrice.value = Number(productImportPrice.value) * (100 + Number(productChietKhau.value)) / 100
    }
}

// import excel
const btnImportExcel = document.querySelector('#admin-product-main .btn-import-excel')

if (btnImportExcel) {
    btnImportExcel.onclick = () => document.querySelector('#admin-product-main #import-excel-file').click()
}