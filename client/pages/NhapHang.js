$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'nhaphang') {
        renderPhieuNhapData()
        clickPage(renderPhieuNhapData)
        renderImportInvoiceDetail()
        searchPN()
    }
})

let search = ""

function searchPN() {
    $(document).on('keyup', '.admin-search-info', e => {
        const search = e.target.value.toLowerCase()

        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', table: 'phieunhap', search },
            dataType: 'JSON',
            success: pn => renderPhieuNhapData(pn),
            error: (xhr, status, error) => console.log(error)
        })
    })
}

function getPhieuNhapData() {
    return new Promise((resolve, reject) => {
        var pageno = $("#currentpage").val();
        $.ajax({
            url: 'server/src/controller/PhieuNhap1Controller.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: phieunhaps => resolve(phieunhaps),
            error: (xhr, status, error) => reject(error)
        })
    })
}

function getPaginationNH(search) {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'phieunhap', page, id: search },
            dataType: 'JSON',
            success: review => resolve(review),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getImportInvoice(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/PhieuNhap1Controller.php',
            method: 'POST',
            data: { action: 'get-import', id },
            dataType: 'JSON',
            success: importInvoice => resolve(importInvoice),
            error: (xhr, status, error) => reject(error)
        })
    })
}

$(document).on("change","#admin-select-phieunhap", async function(){ 
    search = $("#admin-select-phieunhap").val() == "all" ? "" : $("#admin-select-phieunhap").val()
    console.log(search)
    $('#currentpage').val(1)
    renderPhieuNhapData()
    clickPage(renderPhieuNhapData)
})

async function renderPhieuNhapData(data) {
    try {
        const dataPromo = data ? data : await getPaginationNH(search)

        if (dataPromo && dataPromo.pagination && dataPromo.pagination.length > 0) {
            let html = ''

            for (const phieunhap of dataPromo.pagination) {
                html += `
                <tr>
                        <td>${phieunhap.ma_pn}</td>
                        <td>${phieunhap.ma_ncc}</td>
                        <td>${phieunhap.ma_nv}</td>
                        <td>${convertDate(phieunhap.ngay_nhap)}</td>
                        <td>₫${formatCurrency(phieunhap.tong_tien)}</td>
                        <td>
                            ${phieunhap.tinh_trang == 0 
                                ? `<button
                                        class="btn btn-success btn-confirm-import-modal"
                                        value="${phieunhap.tinh_trang}"
                                        data-id="${phieunhap.ma_pn}"
                                        data-toggle="modal"
                                        data-target="#confirm-import-modal"
                                    >
                                        Duyệt
                                    </button>`
                                : `<span style="color: #28a745; font-weight: bold;">Đã xử lý</span>`
                            }
                        </td>
                        <td style="padding-top: 10px;">
                            <button 
                                data-target="#order-detail-modal"
                                data-toggle="modal"
                                style="width: 61%;"
                                class="btn btn-primary btn-import-invoice__detail"
                                data-id="${phieunhap.ma_pn}"
                            >
                                Chi tiết
                            </button>
                        </td>
                    </tr>
            `
            }
            phanquyen_chucnang("Phiếu nhập")
            $('.admin-phieunhap-list').html(html)
            totalPage(dataPromo.count)
            displayTotalPage("#admin-pn-main .hint-text", dataPromo.count, dataPromo.pagination.length)
        } else {
            $('.admin-phieunhap-list').html('')
            displayTotalPage("#admin-pn-main .hint-text", 0, 0)
        }
    } catch (error) {
        console.log(error);
    }
}

async function renderImportInvoiceDetail() {
    $(document).on('click', '.btn-import-invoice__detail', async function() {
        try {
            const id = $(this).data('id')
            const importInvoice = await getImportInvoice(id)
            const importInvoiceDetails = await getImportInvoiceDetail(id)

            if (importInvoice && importInvoiceDetails && importInvoiceDetails.length > 0) {
                $('#order-detail-modal .modal-content').html(`
                    <div class="modal-header">
                        <h5 class="modal-title order-detail__id">Chi tiết phiếu nhập <b>${importInvoice.ma_pn}</b></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="order-detail_address">
                            <h3>Thông tin chung</h3>
                            <div class="order-detail__address-info">
                                <div class="order-detail__address-info-item">
                                    <label>Nhà cung cấp:</label>
                                    <span>${importInvoice.ten_ncc}</span>
                                </div>
                                <div class="order-detail__address-info-item">
                                    <label>Số điện thoại:</label>
                                    <span>${importInvoice.so_dien_thoai}</span>
                                </div>
                                <div class="order-detail__address-info-item">
                                    <label>Địa chỉ:</label>
                                    <span>${importInvoice.dia_chi}</span>
                                </div>
                                <div class="order-detail__address-info-item">
                                    <label>Nhân viên tạo:</label>
                                    <span>${importInvoice.ten_nv}</span>
                                </div>
                                <div class="order-detail__address-info-item">
                                    <label>Ngày tạo phiếu nhập:</label>
                                    <span>${convertDate(importInvoice.ngay_nhap)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="order-detail__products">
                            <h3>Sản phẩm</h3>
                            <div class="order-detail__product-list">
                                ${importInvoiceDetails.map((detail, index) => `
                                    <div class="order-detail__product-item">
                                        <div class="order-detail__product-info">
                                            <img src="${detail.hinh_anh}" class="order-detail__product-img">
                                            <div class="order-detail__product-info-detail">
                                                <div class="order-detail__product-name">
                                                    <span>
                                                        ${detail.ten_sp}
                                                        ${detail.ten_chip.replaceAll(' ', '-')}
                                                        ${detail.ten_card.replaceAll(' ', '-')}
                                                        ${detail.ram}/${detail.rom}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div class="order-detail__product-color">Màu sắc: ${detail.ten_mau}</div>
                                                    <div class="order-detail__product-quantity">x${detail.so_luong}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="order-detail__product-price">
                                            <span>₫${formatCurrency(detail.gia_tien)}</span>
                                        </div>
                                    </div>
                                    ${index !== importInvoiceDetails.length - 1 ? '<div class="line"></div>' : ''}
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="order-detail__total">
                            <div class="order-detail__total-row final">
                                <div class="order-detail__total-label">
                                    <span>Thành tiền</span>
                                </div>
                                <div class="order-detail__total-price">
                                    <span>₫${formatCurrency(importInvoice.tong_tien)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            }
        } catch (error) {
            console.log(error)
            alert('Có lỗi xảy ra, vui lòng thử lại sau!')
        }
    })
}

function renderConfirmImportModal() {
    $(document).on('click', '.btn-confirm-import-modal', function() {
        const id = $(this).data('id')
        $('#confirm-import-modal .confirm-import b').text(id)
        $('#confirm-import-modal .btn-confirm-import').data('id', id)
    })
}

function confirmImportInvoice(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/PhieuNhap1Controller.php',
            method: 'POST',
            data: { action: 'confirm', id },
            success: res => resolve(res),
            error: (xhr, status, error) => reject(error)
        })
    })
}

function handleConfifmrImportInvoice() {
    $(document).on('click', '.btn-confirm-import', async function() {
        try {
            const id = $(this).data('id')
            const res = await confirmImportInvoice(id)
            console.log(res, typeof res)
            if (res === 'true') {
                alert('Xác nhận duyệt phiếu nhập thành công!')
                $('form').trigger('reset')
                $('#confirm-import-modal').modal('hide')
                renderPhieuNhapData()
            } else {
                alert('Xác nhận duyệt phiếu nhập thất bại!')
            }
        } catch (error) {
            console.log(error)
            alert('Có lỗi xảy ra, vui lòng thử lại sau!')
        }
    })
}