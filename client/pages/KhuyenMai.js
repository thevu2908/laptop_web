$(document).ready(() => {
    loadPromotionData()
    updateStatusPromo()
})

function loadPromotionData() {
    $.ajax({
        url: 'server/src/controller/KhuyenMaiController.php',
        method: 'POST',
        data: { action: 'get-all' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''

                data.forEach((item, index) => {
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
                            <td>${item.dieu_kien}</td>
                            <td>₫${convertMucKM(item.muc_khuyen_mai)}</td>
                            <td>${convertDate(item.thoi_gian_bat_dau)}</td>
                            <td>${convertDate(item.thoi_gian_ket_thuc)}</td>
							<td><span class="status text-success">&bull;</span> Active</td>
                            <td>
                                <a href="#editPromotion" class="edit" data-toggle="modal" data-id="${item.ma_km}">
                                    <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                </a>
                                <a href="#deletePromotion" class="delete" data-toggle="modal" data-id="${item.ma_km}">
                                    <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                                <a href="#" class="view" title="View" data-toggle="tooltip" data-id="${item.ma_km}">
                                    <i class="material-icons">&#xE417;</i>
                                </a>
                            </td>
                        </tr>
                    `
                })

                $('.admin-promotion-list').html(html)
            }
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

function validatePromoEmpty(promo) {
    if(promo.promoName === '' && promo.promoName != undefined) {
        alert('Vui lòng nhập tên của khuyến mãi')
        return false;
    }
    if(promo.promoPercent === '' && promo.promoPercent != undefined) {
        alert('Vui lòng nhập mức giảm của khuyến mãi')
        return false;
    }
    if(promo.promoCondition === '' && promo.promoCondition != undefined) {
        alert('Vui lòng nhập điều kiện khuyến mãi')
        return false;
    }
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

function addPromotion(promo) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhuyenMaiController.php',
            method: 'POST',
            data: { action: 'add', promo },
            dataType: 'JSON',
            success: promo => resolve(promo),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleAddPromotion() {
    $(document).on('click', '.btn-add-promotion', e => {
        const promo = {
            promoName: $('#promotion-name').val(),
            promoPercent: $('#promotion-percent').val(),
            promoCondition: $('#promotion-condition').val(),
            promoDateFrom: $('#promotion-date-from').val(),
            promoDateTo: $('#promotion-date-to').val()
        }

        if(!validatePromoEmpty(promo)) {
            return
        }

        addPromotion(promo)
        .then(res => {
            if (res) {
                alert('Thêm khuyến mãi thành công')
                // $('form').trigger('reset')
                $('#addPromotion').modal('hide')
                loadPromotionData()
            } else {
                alert('Xảy ra lỗi trong quá trình thêm khuyến mãi')
            }
        })
        .catch(error => console.log(error))
    })
}

function deletePromotion(promoId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhuyenMaiController.php',
            method: 'POST',
            data: { action: 'delete', promoId },
            dataType: 'JSON',
            success: data => {
                if (data === 'success') {
                    resolve(true)
                } else {
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

function handleDeleteProduct() {
    $(document).on('click', '#confirm-delete', () => {
        const productId = $('#deleteProductModal .product-id').text()

        if (productId) {
            deleteProduct(productId)
                .then(res => {
                    if (res === true) {
                        alert('Xóa sản phẩm thành công')
                        $('#deleteProductModal').modal('hide')
                        renderAdminProductTable()
                    } else {
                        alert('Xảy ra lỗi trong quá trình xóa sản phẩm')
                    }
                })
                .catch(error => console.log(error))
        } else {
            let checkedProducts = []
            const firstCheckInputElement = document.querySelector('table.table thead input[type=checkbox]')
            const checkInputElements = document.querySelectorAll('.admin-product-list input[name="chk[]"]')

            checkInputElements.forEach(item => {
                if (item.checked) {
                    checkedProducts.push(item.value)
                }
            })

            if (checkedProducts.length > 0) {
                let promises = []

                checkedProducts.forEach(productId => promises.push(deleteProduct(productId)))

                Promise.all(promises).then(results => {
                    if (results.includes(false)) {
                        alert('Xảy ra lỗi trong quá trình xóa các sản phẩm')
                    } else {
                        alert('Đã xóa sản phẩm các sản phẩm được chọn')
                        firstCheckInputElement.checked = false
                        renderAdminProductTable()
                    }
                })
            } else {
                alert('Không có sản phẩm nào được chọn\nVui lòng check vào ô các sản phẩm muốn xóa')
            }

            $('#deleteProductModal').modal('hide')
        }
    })
}

