$(document).ready(() => {
    loadAccountData();
    addAccount();
})

function loadAccountData() {
    $.ajax({
        url: 'server/src/controller/TaiKhoanController.php',
        method: 'POST',
        data: { action: 'load' },
        success: data => {
            if (data && data.length > 0) {
                let html = ''
                const jsonData = JSON.parse(data)

                const promise = []

                jsonData.forEach((item, index) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox-${item['ma_tk']}" name="options[]" value="${item['ma_tk']}">
                                    <label for="checkbox-${item['ma_tk']}"></label>
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
                                <a href="#deleteAccountModal" class="delete" data-toggle="modal" data-id=${item['ma_tk']}>
                                    <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                                <a href="viewAccountModal" class="view" title="View" data-toggle="tooltip" data-id=${item['ma_tk']}>
                                    <i class="material-icons">&#xE417;</i>
                                </a>
                            </td>
                        </tr>
                    `
                    
                    promise.push(showTenNhomQuyenAccount(item['ma_quyen'], index))
                })

                Promise.all(promise)
                .then(() => {
                    $('.admin-account-list').html(html);
                })
                .catch(error => {
                    console.log("Error: ", error)
                })
            }
        }
    })
}

function addAccount() {
    $(document).on('click', '.btn-add-account', e => {
        accountId = $('#admin-account-id').val()
        password = $('#admin-account-password').val()
        accessId = $('#admin-account-access').val()

        if (password === '') {
            alert('Vui lòng nhập mật khẩu')
            return
        }

        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'add', accountId: accountId, accessId: accessId, username: accountId, password: password },
            success: data => {
                if (data && data.length > 0 && data === 'true') {
                    alert('Thêm tài khoản thành công')
                    $('form').trigger('reset')
                    $('#addAccountModal').modal('hide')
                    loadAccountData()
                } else {
                    alert('Thêm tài khoản thất bại.\nVui lòng kiểm tra thông tin nhập vào')
                }
            }
        })
    })
}