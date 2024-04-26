$(document).ready(() => {
    loadPromotionData()

    updateStatusPromo()
    getNextPromoId()

    handleAddPromotion()

    renderDeletePromoModal()
    handleDeletePromo()

    renderUpdatePromoModal()
    handleUpdatePromo()
})

function loadPromotionData() {
    $.ajax({
        url: 'server/src/controller/NhaCungCapController.php',
        method: 'POST',
        data: { action: 'get-all' },
        dataType: 'JSON',
        success: data => {
            console.log(data)
            if (data && data.length > 0) {
                let html = ''
                
                data.forEach((item) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox-${item.ma_ncc}" name="chk[]" value="${item.ma_ncc}">
                                    <label for="checkbox-${item.ma_ncc}"></label>
                                </span>
                            </td>
                            <td>${item.ma_ncc}</td>
                            <td>${item.ten_ncc}</td>
                            <td>${item.dia_chi}</td>
                            <td>${item.so_dien_thoai}</td>
                            
                            <td>
                                <a href="#updatePromotion" class="edit btn-update-promo-modal" data-toggle="modal" data-id="${item.ma_km}">
                                    <i class="material-icons" data-toggle="tooltip" title="Chỉnh sửa">&#xE254;</i>
                                </a>
                                <a href="#deletePromotion" class="delete btn-delete-promo-modal" data-toggle="modal" data-id="${item.ma_km}">
                                    <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                                </a>
                            </td>
                        </tr>
                    `

                   
                })

                $('.admin-suppiler-list').html(html)
                
            }
        }
    })
}


function validatePromo(promo) {
    if(promo.promoName === '' && promo.promoName != undefined) {
        alert('Vui lòng nhập tên của Nhà Cung Cấp')
        $("#promotion-name").focus()
        return false;
    }
    if(promo.promoPercent === '' && promo.promoPercent != undefined) {
        alert('Vui lòng nhập địa chỉ của Nhà Cung Cấp')
        $("#promotion-percent").focus()
        return false;
    }
    if(promo.promoCondition === '' && promo.promoCondition != undefined) {
        alert('Vui lòng nhập số điện thoại Nhà Cung Cấp')
        $("#promotion-condition").focus()
        return false;
    }

    if (!/^\d+$/.test(promo.promoCondition)) {
        alert('Số điện thoại không hợp lệ. Vui lòng chỉ nhập số.')
        $("#promotion-condition").focus()
        return false;
    }

    if (!(/^09\d{8}$/.test(promo.promoCondition))) {
        alert('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại đúng định dạng.')
        $("#promotion-condition").focus()
        return false;
    }
    
    return true;
}



function addPromotion(promo) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/NhaCungCapController.php',
            method: 'POST',
            data: { action: 'add', promo },
            success: res => {
                resolve(res)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleAddPromotion() {
    $(document).on('click', '.btn-add-promotion', e => {
        e.preventDefault();
        const promo = {
            promoName: $('#addPromotion #promotion-name').val().trim(),
            promoPercent: $('#addPromotion #promotion-percent').val().trim(),
            promoCondition: $('#addPromotion #promotion-condition').val().trim(),
        }

        if(!validatePromo(promo)) {
            return
        }

        addPromotion(promo)
            .then(res => {
                if (res) {
                    alert('Thêm Nhà Cung Cấp thành công')
                    $('form').trigger('reset')
                    $('#addPromotion').modal('hide')
                    loadPromotionData()
                } 
                else {
                    alert('Xảy ra lỗi trong quá trình thêm Nhà Cung Cấp')
                }
            })
            .catch(error => console.log(error))
    })
}

function getPromotion(promoId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/NhaCungCapController.php',
            method: 'POST',
            data: { action: 'get', promoId },
            dataType: 'JSON',
            success: promo => resolve(promo),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderDeletePromoModal() {
    $(document).on('click', '.btn-delete-promo-modal', e => {
        const promoId = e.target.closest('.btn-delete-promo-modal').dataset.id

        if (promoId) {
            getPromotion(promoId)
                .then(promo => {
                    const html = `
                        <p>Bạn có chắc chắn muốn xóa Nhà Cung Cấp có mã "<b class="promo-id">${promo.ma_ncc}</b>" không?</p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `
                    $('#deletePromotion .delete-body').html(html)
                })
        }
    })

    $('.btn-delete-checked-promo-modal').on('click', () => {
        const html = `
            <p>Bạn có chắc muốn xóa các khuyến mãi được chọn không ?</p>
            <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
        `
        $('#deletePromotion .delete-body').html(html)
    })
}

function deletePromotion(promoId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/NhaCungCapController.php',
            method: 'POST',
            data: { action: 'delete', promoId },
            success: data => {
                resolve(data)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleDeletePromo() {
    $(document).on('click', '#confirm-delete', () => {
        const promoId = $('#deletePromotion .promo-id').text()

        if (promoId) {
            deletePromotion(promoId)
                .then(res => {
                    if (res === 'success') {
                        alert('Xóa sản phẩm thành công')
                        $('#deletePromotion').modal('hide')
                        loadPromotionData()
                    } 
                    else if(res === 'fail') {
                        alert('Không thể xóa khuyến mãi có chương trình "Đang diễn ra"')
                    }
                    else {
                        alert('Xảy ra lỗi trong quá trình xóa sản phẩm')
                    }
                })
                .catch(error => console.log(error))
        }
    })
}

function getNextPromoId() {
    $.ajax({
        url: 'server/src/controller/NhaCungCapController.php',
        method: 'POST',
        data: { action: 'get-size' },
        dataType: 'JSON',
        success: size => {
            if(size) {
                id = 'NCC' + String(size+1).padStart(3, '0');
                $("#promotion-id").val(id)
            }
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })

    return 1;
}

function renderUpdatePromoModal() {
    $(document).on('click', '.btn-update-promo-modal', e => {
        const promoId = e.target.closest('.btn-update-promo-modal').dataset.id

        getPromotion(promoId)
            .then(promo => {
                $('#updatePromotion #promotion-id').val(promo.ma_km),
                $('#updatePromotion #promotion-name').val(promo.ten_khuyen_mai),
                $('#updatePromotion #promotion-percent').val(promo.muc_khuyen_mai),
                $('#updatePromotion #promotion-condition').val(promo.dieu_kien)
            })
            .catch(error => console.log(error))
    })
}

function updatePromo(promo) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/NhaCungCapController.php',
            method: 'POST',
            data: { action: 'update', promo },
            success: res => {
                if (res == 'success') {
                    resolve(true)
                } 
                else {
                    console.log(res)
                    resolve(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleUpdatePromo() {
    $(document).on('click', '.btn-update-promo', () => {
        const promo = {
            promoId: $('#updatePromotion #promotion-id').val().trim(),
            promoName: $('#updatePromotion #promotion-name').val().trim(),
            promoPercent: $('#updatePromotion #promotion-percent').val().trim(),
            promoCondition: $('#updatePromotion #promotion-condition').val().trim(),
            
        }

        if(!validatePromo(promo)) {
            return
        }

        updatePromo(promo)
            .then(res => {
                if(res) {
                    alert('Cập nhật Nhà Cung Cấp thành công')
                    $('form').trigger('reset')
                    $('#updatePromotion').modal('hide')
                    loadPromotionData()
                } 
                else {
                    alert('Xảy ra lỗi trong quá trình cập nhật Nhà Cung Cấp')
                }
            })
            .catch(error => console.log(error))
    })
}

