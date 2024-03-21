$(document).ready(() => {
    getProductData()
    renderAdminPage()
})

function getProductData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: { action: 'get-data' },
            dataType: 'JSON',
            success: data => {
                if (data && data.length > 0) {
                    resolve(data);
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderAdminPage() {
    getProductData().then(data => {
        let html = ''

        data.forEach((item, index) => {
            html += `
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox1" name="chk[]" value="${item.ma_sp}">
                            <label for="checkbox1"></label>
                        </span>
                    </td>
                    <td>${item.ma_sp}</td>
                    <td>${item.ten_sp}</td>
                    <td class="admin-product-type-name-${index}"></td>
                    <td>${item.gia_nhap}</td>
                    <td>${item.chiet_khau}</td>
                    <td>${item.gia_ban}</td>
                    <td>${item.so_luong_ton}</td>
                    <td>
                        <a href="#editProductModal" class="edit" data-toggle="modal">
                            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                        </a>
                        <a href="#deleteProductModal" class="delete" data-toggle="modal">
                            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                        </a>
                        <a href="#viewProductModal" class="view" title="View" data-toggle="tooltip">
                            <i class="material-icons">&#xE417;</i>
                        </a>
                    </td>
                </tr>
            `

            showBrandName(item.ma_thuong_hieu, index)
        })

        $('.admin-product-list').html(html)
    })
}

function validateEmpty(object) {
    
}

function addProduct() {
    $(document).on('click', '.btn-add-product', e => {

    })
}