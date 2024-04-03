$(document).ready(() => {
    renderProductsEval()
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
                    console.log("OKK")
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

function renderProductsEval() {
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
                    <td><a href="admin.php?controller=danhgia&ma_sp=${item.ma_sp}" id="review-link">${item.ma_sp}</a></td>
                    <td><a href="admin.php?controller=danhgia&ma_sp=${item.ma_sp}" id="review-link2">${item.ten_sp}</a></td>
                    <td class="admin-product-type-name-${index}"></td>
                    <td class="product-type-${index}"></td>
                    <td class="product-OS-${index}"></td>
                    <td>${item.xuat_xu}</td>
                    <td>${item.so_luong_ton}</td>
                    <td>5</td>
                </tr>
            `

            showBrandName(item.ma_thuong_hieu, index)
            showType(item.ma_the_loai, index)
            showOS(item.ma_hdh, index)
        })

        $('.product-list').html(html)
    })
}

function getDataEvaluate() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/DanhGiaController.php',
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