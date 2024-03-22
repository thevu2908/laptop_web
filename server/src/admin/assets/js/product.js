const uploadImageContainer = document.querySelector('.upload-box')
const handleFileSelect = document.querySelector('#admin-product-main #product-image')
const openFileChooser = document.querySelector('#admin-product-main .btn-upload-img')

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
        const preview = document.querySelector('.upload-box')
        const previewImage = document.querySelector('.preview-img')

        previewImage.src = e.target.result
        preview.style.display = 'flex'
        preview.classList.remove('hide-image')
    }

    reader.readAsDataURL(file)
}

function removePreviewImage() {
    const preview = document.querySelector('.upload-box')
    const previewImage = document.querySelector('.preview-img')

    previewImage.src = ''
    preview.classList.add('hide-image')
}

if (uploadImageContainer) {
    uploadImageContainer.ondrop = e => {
        e.preventDefault();
        e.stopPropagation();;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            uploadImage(file);
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
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            uploadImage(file);
        }
    }
}

if (openFileChooser) {
    openFileChooser.onclick = e => {
        handleFileSelect.click()
    }
}