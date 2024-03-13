$(document).ready(() => {
    loadTaiKhoanData();
})

function loadTaiKhoanData() {
    $.ajax({
        url: 'server/src/controller/TaiKhoanController.php',
        method: 'POST',
        data: { action: 'load' },
        success: data => {
            if (data && data.length > 0) {
                let html = ''
                const jsonData = JSON.parse(data)

                jsonData.forEach((item, index) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" value="1">
                                    <label for="checkbox1"></label>
                                </span>
                            </td>
                            <td>${item['ma_tk']}</td>
                            <td class="admin-accounnt-accessname-${index}"></td>
                            <td>${item['username']}</td>
                            <td>${item['password']}</td>
                            <td>
                                <a href="#editAccountModal" class="edit" data-toggle="modal" data-id=${item['ma_tk']}>
                                    <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                </a>
                                <a href="#deleteAccountModal" class="delete" data-toggle="modal" data-id1=${item['ma_tk']}>
                                    <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                                <a href="viewAccountModal" class="view" title="View" data-toggle="tooltip" data-id2=${item['ma_tk']}>
                                    <i class="material-icons">&#xE417;</i>
                                </a>
                            </td>
                        </tr>
                    `
                    
                    showTenNhomQuyenAccount(item['ma_quyen'], index);
                })

                $('.admin-account-list').html(html);
            }
        }
    })
}