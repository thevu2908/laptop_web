$(document).ready(() => {
    // Trang Admin
    renderAdminBill(null)
    clickPage(renderAdminBill)
    renderConfirmBillModal()
})

function getChiTietHoaDon(ma_hd) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTHDController.php',
            method: 'POST',
            data: { action: 'get-cthd', ma_hd },
            dataType: 'JSON',
            success: cthd => resolve(cthd),
            error: (xhr, status, error) => reject(error)
        })
    })
}

function addCTHD(cthd) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTHDController.php',
            method: 'POST',
            data: { action: 'add-cthd', cthd },
            success: res => resolve(res),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function renderAdminBill(data) {
    let billId = $('#admin-bill-detail-main #bill-id').val()

    if (billId) {
        const billInfo = await getInfoCTHD(billId)
        console.log(billId)

        if (billInfo && billInfo.length > 0) {
            let html = ''

            billInfo.forEach((bill, index) => {
                console.log(bill)
                html += `
                    <tr>
                        <td>${bill.ma_ctsp}</td>
                        <td>${bill.ma_imei}</td>
                        <td><img style="width: 60px;" src="${bill.hinh_anh}"></td>
                        <td>${bill.ten_sp} ${bill.ram}/${bill.rom} | ${bill.ten_card} | ${bill.ten_mau}</td>
                        <td>${bill.gia_sp}</td>
                        <td>${bill.so_luong}</td>
                    </tr>
                `
            })

            $('.admin-bill-detail-list').html(html)
            if(billInfo[0].tinh_trang === "Đã xác nhận") {
                $('#admin-bill-detail-main .status.alert')
                    .removeClass('alert-danger')
                    .addClass('alert-success')
                    .text('Đã xác nhận');

                $('#admin-bill-detail-main .btn-update-status-bill')
                    .removeClass('update')
                    .addClass('no-update')
                    
                $('#admin-bill-detail-main .btn-confirm-bill')
                    .css('display', "none")
            }
            else {
                console.log("Chưa xác nhận")

            }
        } else {
            $('.admin-bill-detail-list').html('')
        }
    } else {
        $('.admin-bill-detail-list').html('')
    }
}

function getPaginationBill(billId) {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'chitiethoadon', page, id: billId, limit: 4 },
            dataType: 'JSON',
            success: billDetails => resolve(billDetails),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getInfoCTHD(ma_hd) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTHDController.php',
            method: 'POST',
            data: { action: 'get-cthd-admin', ma_hd },
            dataType: "JSON",
            success: res => resolve(res),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function getMaNV() {
    const loginSession = await getLoginSession()
    return loginSession ? loginSession.customerId : ''
}

function ConfirmBill(ma_hd, ma_nv) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTHDController.php',
            method: 'POST',
            data: { action: 'confirm-bill', ma_hd, ma_nv },
            success: res => resolve(res),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderConfirmBillModal() {
    $(document).on('click', '.btn-update-status-bill.update', async function() {
        const maHD = $(this).attr('data-id')
        const maNV = await getMaNV();

        if (maHD && maNV) {
            const html = `
                <p>Bạn có chắc chắn muốn xác nhận hóa đơn có mã "<b>${maHD}</b>" không ?</p>
                <p class="text-warning"><small>Vui lòng kiểm tra kỹ thông tin đơn hàng trước khi xác nhận</small></p>
            `
            $('#updateStatusBill .confirm-save').html(html)

            handleConfirmBill(maHD, maNV)
        }
    })

    $(document).on('click', '.btn-update-status-bill.no-update', function() {
        const maHD = $(this).attr('data-id')
        const html = `
            <p>Đơn hàng này đã được xác nhận với mã hóa đơn "<b>${maHD}</b>"</p>
            <p class="text-warning"><small>Vui lòng không chỉnh sửa</small></p>
        `
        $('#updateStatusBill .confirm-save').html(html)
    })
}

function handleConfirmBill(maHD, maNV) {
    $(document).on('click', '.btn-confirm-bill', async function() {
        console.log(maHD)
        console.log(maNV)

        const confirm = await ConfirmBill(maHD, maNV)
        if(confirm === 'success') {
            alert("Xác nhận đơn hàng thành công")
            window.location.href = '/admin.php?controller=hoadon'
        }
        else {
            console.log("Xảy ra lỗi khi xác nhận hóa đơn")
        }
    })
}