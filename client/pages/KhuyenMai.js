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
        url: 'server/src/controller/KhuyenMaiController.php',
        method: 'POST',
        data: { action: 'get-all' },
        dataType: 'JSON',
        success: async data => {
            if (data && data.length > 0) {
                let html = ''
                let html2 = ''
                let html3 = ''
                let maKH = await getMaKH()
                let khuyenMai = JSON.parse(localStorage.getItem('khuyenMai')) || {};

                data.forEach((item) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox-${item.ma_km}" name="chk[]" value="${item.ma_km}">
                                    <label for="checkbox-${item.ma_km}"></label>
                                </span>
                            </td>
                            <td>${item.ma_km}</td>
                            <td>${item.ten_khuyen_mai}</td>
                            <td>≥ ${formatCurrency(item.dieu_kien)}</td>
                            <td>₫${formatCurrency(convertMucKM(item.muc_khuyen_mai))}</td>
                            <td>${convertDate(item.thoi_gian_bat_dau)}</td>
                            <td>${convertDate(item.thoi_gian_ket_thuc)}</td>
                            <td>${item.tinh_trang}</td>
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

                    if(khuyenMai[maKH]) {
                        let promises = khuyenMai[maKH].map(maKM => {
                            return getPromotion(maKM)
                                .then(res => {
                                    return `
                                        <li class="modal-promo-item p-2" >
                                            <div class="modal-promo-name d-flex align-items-center" >
                                                <div class="modal-promo-code">${res.ma_km}</div>
                                                <div class="modal-promo-name2 ms-2" style="font-weight: 500;">${res.ten_khuyen_mai}</div>
                                            </div>
                                            <div class="modal-promo-percent" >
                                                Giảm ${formatCurrency(convertMucKM(res.muc_khuyen_mai))}₫
                                            </div>
                                            <div class="modal-promo-bottom d-flex justify-content-between">
                                                <div class="modal-promo-expiry" >HSD: ${convertDate(res.thoi_gian_ket_thuc)}</div>
                                                <div class="modal-promo-del" data-id="${res.ma_km}" >Bỏ chọn</div>
                                            </div>
                                        </li>
                                    `;
                                });
                        });
                    
                        Promise.all(promises).then(results => {
                            $('.cart-list-promo').html(results.join(''));
                            delPromoToLocalStorage()
                        }).catch(error => console.log(error));

                    }
                    

                    html3 += `
                        <li class="modal-promo-item apply" >
                            <div class="modal-promo-name d-flex align-items-center" >
                                <div class="modal-promo-code">${item.ma_km}</div>
                                <div class="modal-promo-name2 ms-2" style="font-weight: 500;">${item.ten_khuyen_mai}</div>
                            </div>
                            <div class="modal-promo-percent mt-2 mb-2" >
                                Giảm ${formatCurrency(convertMucKM(item.muc_khuyen_mai))}₫
                            </div>
                            <div class="modal-promo-bottom d-flex justify-content-between">
                                <div class="modal-promo-expiry" >HSD: ${convertDate(item.thoi_gian_ket_thuc)}</div>
                                <div class="modal-promo-add" data-id="${item.ma_km}" >Áp dụng</div>
                            </div>
                        </li>
                    `
                })

                $('.admin-promotion-list').html(html)
                $('.modal-cart-list').html(html3)
            }
            addPromoToLocalStorage()
        }
    })
}

function updateStatusPromo() {
    $(document).on('change', '#promotion-date-from, #promotion-date-to', () => {
        var today = new Date().toISOString().slice(0, 10);
        var startDate = $('#promotion-date-from').val();
        var endDate = $('#promotion-date-to').val();
        var promotionStatus = $('#promotion-status');

        if(startDate != '' && endDate != '' && startDate >= endDate) {
            alert('Ngày bắt đầu không được lớn hơn ngày kết thúc của chương trình');
            $('#promotion-date-from').val('');
            $('#promotion-date-to').val('');
        }
        else {
            if (today >= startDate && today <= endDate) {
                promotionStatus.val('Đang diễn ra');
            } else if (today < startDate) {
                promotionStatus.val('Chưa bắt đầu');
            } else {
                promotionStatus.val('Đã kết thúc');
            }
        }
    })
}

function validatePromo(promo) {
    if(promo.promoName === '' && promo.promoName != undefined) {
        alert('Vui lòng nhập tên của khuyến mãi')
        $("#promotion-name").focus()
        return false;
    }
    if(promo.promoPercent === '' && promo.promoPercent != undefined) {
        alert('Vui lòng nhập mức giảm của khuyến mãi')
        $("#promotion-percent").focus()
        return false;
    }
    if(promo.promoCondition === '' && promo.promoCondition != undefined) {
        alert('Vui lòng nhập điều kiện khuyến mãi')
        $("#promotion-condition").focus()
        return false;
    }
    if(promo.promoDateFrom === '' && promo.promoDateFrom != undefined) {
        alert('Vui lòng chọn ngày bắt đầu khuyến mãi')
        $("#promotion-date-from").focus()
        return false;
    }
    if(promo.promoDateTo === '' && promo.promoDateTo != undefined) {
        alert('Vui lòng chọn ngày kết thúc khuyến mãi')
        $("#promotion-date-to").focus()
        return false;
    }
    return true
}

function addPromotion(promo) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhuyenMaiController.php',
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
            promoDateFrom: $('#addPromotion #promotion-date-from').val().trim(),
            promoDateTo: $('#addPromotion #promotion-date-to').val().trim(),
            promoStatus: $('#addPromotion #promotion-status').val().trim()
        }

        if(!validatePromo(promo)) {
            return
        }

        addPromotion(promo)
            .then(res => {
                if (res) {
                    alert('Thêm khuyến mãi thành công')
                    $('form').trigger('reset')
                    $('#addPromotion').modal('hide')
                    loadPromotionData()
                } 
                else {
                    alert('Xảy ra lỗi trong quá trình thêm khuyến mãi')
                }
            })
            .catch(error => console.log(error))
    })
}

function getPromotion(promoId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhuyenMaiController.php',
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
                        <p>Bạn có chắc chắn muốn xóa khuyến mãi có mã "<b class="promo-id">${promo.ma_km}</b>" không?</p>
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
            url: 'server/src/controller/KhuyenMaiController.php',
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
        url: 'server/src/controller/KhuyenMaiController.php',
        method: 'POST',
        data: { action: 'get-size' },
        dataType: 'JSON',
        success: size => {
            if(size) {
                id = 'KM' + String(size+1).padStart(3, '0');
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
                $('#updatePromotion #promotion-condition').val(promo.dieu_kien),
                $('#updatePromotion #promotion-date-from').val(promo.thoi_gian_bat_dau),
                $('#updatePromotion #promotion-date-to').val(promo.thoi_gian_ket_thuc),
                $('#updatePromotion #promotion-status').val(promo.tinh_trang)
            })
            .catch(error => console.log(error))
    })
}

function updatePromo(promo) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhuyenMaiController.php',
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
            promoDateFrom: $('#updatePromotion #promotion-date-from').val().trim(),
            promoDateTo: $('#updatePromotion #promotion-date-to').val().trim(),
            promoStatus: $('#updatePromotion #promotion-status').val().trim()
        }

        if(!validatePromo(promo)) {
            return
        }

        updatePromo(promo)
            .then(res => {
                if(res) {
                    alert('Cập nhật khuyến mãi thành công')
                    $('form').trigger('reset')
                    $('#updatePromotion').modal('hide')
                    loadPromotionData()
                } 
                else {
                    alert('Xảy ra lỗi trong quá trình cập nhật khuyến mãi')
                }
            })
            .catch(error => console.log(error))
    })
}

function renderPromoByMaKH() {
    console.log("renderCartList")
    $.ajax({
        url: 'server/src/controller/KhuyenMaiController.php',
        method: 'POST',
        data: { action: 'get-all'},
        success: async data => {
            if (data && data.length > 0) {
                let html = ''
                let maKH = await getMaKH()
                let khuyenMai = JSON.parse(localStorage.getItem('khuyenMai')) || {};
                
                if(khuyenMai[maKH]) {
                    data.forEach((item, index) => {
                        if(data.ma_km)
                        html += `
                            <li class="modal-promo-item p-2" >
                                <div class="modal-promo-name d-flex align-items-center" >
                                    <div class="modal-promo-code">${data.ma_km}</div>
                                    <div class="modal-promo-name2 ms-2" style="font-weight: 500;">${data.ten_khuyen_mai}</div>
                                </div>
                                <div class="modal-promo-percent" >
                                    ${data.muc_khuyen_mai}
                                </div>
                                <div class="modal-promo-bottom d-flex justify-content-between">
                                    <div class="modal-promo-expiry" >HSD: ${data.thoi_gian_ket_thuc}</div>
                                    <div class="modal-promo-del" >Bỏ chọn</div>
                                </div>
                            </li>
                        `
                    })
                }
                
            }
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function addPromoToLocalStorage() {
    $('.modal-promo-add').click(async function() {
        const maKM = $(this).attr('data-id');
        const maKH = await getMaKH()

        let khuyenMai = JSON.parse(localStorage.getItem('khuyenMai')) || {};
        
        if (!khuyenMai[maKH]) {
            khuyenMai[maKH] = [];
        }

        if (!khuyenMai[maKH].includes(maKM)) {
            khuyenMai[maKH].push(maKM);
            alert("Áp dụng khuyến mãi thành công")
            loadPromotionData()
        }

        localStorage.setItem('khuyenMai', JSON.stringify(khuyenMai));
    })
}

function delPromoToLocalStorage() {
    $('.modal-promo-del').click(async function() {
        const maKM = $(this).attr('data-id');
        const maKH = await getMaKH();
    
        let khuyenMai = JSON.parse(localStorage.getItem('khuyenMai')) || {};
    
        if (khuyenMai[maKH]) {
            const index = khuyenMai[maKH].indexOf(maKM);
            if (index !== -1) {
                khuyenMai[maKH].splice(index, 1);
                localStorage.setItem('khuyenMai', JSON.stringify(khuyenMai));
                alert("Xóa khuyến mãi thành công");
                $(this).closest('.modal-promo-item').remove();
            }
        }
    });
}