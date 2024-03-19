$(document).ready(() => {
    // loadAccountData()
    // addAccount()
    // showUpdateAccountModal()
    // updateAccount()
    // showDeleteAccountModal()
    // deleteAccount()
    // showDeleteCheckedAccountModal()
    // showViewAccountModal()
    // searchAccount()
})

function loadAccountData() {
    $.ajax({
        url: 'server/src/controller/TaiKhoanController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''
                const jsonData = JSON.parse(data)

                jsonData.forEach((item, index) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox-${item.ma_tk}" name="chk[]" value="${item.ma_tk}">
                                    <label for="checkbox-${item.ma_tk}"></label>
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
                                <a href="#deleteAccountModal" class="delete btn-delete-account-modal" data-toggle="modal" data-id="${item.ma_tk}">
                                    <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                                </a>
                                <a href="#viewAccountModal" class="view btn-view-account-modal" title="View" data-toggle="modal" data-id="${item.ma_tk}">
                                    <i class="material-icons" data-toggle="tooltip" title="Xem thông tin">&#xE417;</i>
                                </a>
                            </td>
                        </tr>
                    `
                    
                    showTenNhomQuyenAccount(item['ma_quyen'], index);
                })

                $('.admin-account-list').html(html);
            }
        },
        error: (jqXHR, textStatus, error) => {
            console.log(error)
        }
    })
}

function getAllAccounts() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'get-all' },
            dataType: 'JSON',
            success: data => {
                if (data && data.length > 0) {
                    resolve(data)
                }
            },
            error: (jqXHR, textStatus, error) => {
                reject(error);
            }
        })
    })
}

function addAccount() {
    $('.btn-add-account').on('click', e => {
        const accountId = $('#admin-account-id').val()
        const accessId = $('#admin-account-access').val()
        const password = $('#admin-account-password').val()

        if (!accountId) {
            alert('Vui lòng chọn nhân viên cấp tài khoản\nNếu không có nhân viên nào hãy thêm nhân viên mới vào hệ thống')
            return
        }
        if (!password) {
            alert('Vui lòng nhập mật khẩu')
            return
        }
        if (!accessId) {
            alert('Vui lòng chọn quyền tài khoản\nNếu không có quyền hãy thêm quyền mới vào hệ thống')
            return
        }

        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'add', accountId: accountId, accessId: accessId, username: accountId, password: password },
            success: data => {
                if (data && data === 'success') {
                    alert('Thêm tài khoản thành công')
                    $('form').trigger('reset')
                    $('#addAccountModal').modal('hide')
                    loadAccountData()
                } else {
                    alert('Thêm tài khoản thất bại.\nVui lòng kiểm tra thông tin nhập vào')
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error);
            }
        })
    })
}

function showUpdateAccountModal() {
    $(document).on('click', '.btn-update-account-modal', e => {
        const accountId = e.target.closest('.btn-update-account-modal').dataset.id
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'get', accountId: accountId },
            dataType: 'JSON',
            success: data => {
                if (data) {
                    $('#admin-account-id-edit').val(data.ma_tk)
                    $('#admin-account-access-edit').val(data.ma_quyen)
                    $('#admin-account-username-edit').val(data.username)
                    $('#admin-account-password-edit').val(data.password)
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
            }
        })
    })
}

function updateAccount() {
    $(document).on('click', '.btn-update-account', e => {
        const accountId = $('#admin-account-id-edit').val()
        const accessId = $('#admin-account-access-edit').val()
        const username = $('#admin-account-username-edit').val()
        const password = $('#admin-account-password-edit').val()

        if (!password === '') {
            alert('Vui lòng nhập mật khẩu')
            return
        }

        if (accountId === 'admin') {
            alert('Không thể sửa thông tin tài khoản Admin')
            $('#editAccountModal').modal('hide')
            return
        }

        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'update', accountId: accountId, accessId: accessId, username: username, password: password },
            success: data => {
                if (data && data === 'success') {
                    alert('Sửa thông tin tài khoản thành công')
                    $('form').trigger('reset')
                    $('#editAccountModal').modal('hide')
                    loadAccountData()
                } else {
                    alert('Sửa thông tin tài khoản thất bại\nVui lòng kiểm tra thông tin nhập vào')
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
            }
        })
    })
}

function showDeleteAccountModal() {
    $(document).on('click', '.btn-delete-account-modal', e => {
        const accountId = e.target.closest('.btn-delete-account-modal').dataset.id
        const html = `
            <p>
                Bạn có chắc muốn xóa tài khoản có mã
                "<b class="delete-account-id">${accountId}</b>"
                không ?
            </p>
            <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
        `

        $('.confirm-delete-account').html(html)
    })
}

function showDeleteCheckedAccountModal() {
    $('.btn-delete-checked-account-modal').on('click', e => {
        const html = `
            <p>Bạn có chắc muốn xóa các tài khoản được chọn không ?</p>
            <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
        `
        $('.confirm-delete-account').html(html)
    })
}

function deleteAccount() {
    $(document).on('click', '.btn-delete-account', e => {
        const accountId = $('#deleteAccountModal .delete-account-id').text()

        if (accountId) {
            if (accountId === 'admin') {
                alert('Không thể xóa tài khoản Admin')
                $('#deleteAccountModal').modal('hide')
                return
            }

            $.ajax({
                url: 'server/src/controller/TaiKhoanController.php',
                method: 'POST',
                data: { action: 'delete', accountId: accountId },
                success: data => {
                    if (data && data === 'success') {
                        alert(`Đã xóa tài khoản có mã ${accountId}`);
                        $('form').trigger('reset')
                        $('#deleteAccountModal').modal('hide')
                        loadAccountData()
                    } else {
                        alert('Xóa tài khoản thất bại')
                    }
                },
                error: (jqXHR, textStatus, error) => {
                    console.log(error)
                }
            })
        } else {
            let checkedAccounts = []
            const firstCheckInputElement = document.querySelector('table.table thead input[type=checkbox]')
            const checkedInputElements = document.querySelectorAll('.admin-account-table input[name="chk[]"]')

            checkedInputElements.forEach(item => {
                if (item.checked) {
                    checkedAccounts.push(item.value)
                }
            })

            if (checkedAccounts.length > 0) {
                let promises = []

                if (checkedAccounts.includes('admin')) {
                    alert('Không thể xóa tài khoản admin\nHãy bỏ check tài khoản admin')
                    $('#deleteAccountModal').modal('hide')
                    return
                }

                checkedAccounts.forEach(checkedAccount => {
                    let promise = new Promise((resolve, reject) => {
                        $.ajax({
                            url: 'server/src/controller/TaiKhoanController.php',
                            method: 'POST',
                            data: { action: 'delete', accountId: checkedAccount },
                            success: data => {
                                if (data && data === 'success') {
                                    resolve(true)
                                } else {
                                    resolve(false)
                                }
                            },
                            error: (jqXHR, textStatus, error) => {
                                console.log(error)
                                resolve(false)
                            }
                        })
                    })

                    promises.push(promise)
                })

                Promise.all(promises).then(results => {
                    if (results.includes(true)) {
                        alert('Đã xóa tài khoản các tài khoản được chọn')
                        $('form').trigger('reset')
                        firstCheckInputElement.checked = false
                        loadAccountData()
                    }
                });
            } else {
                alert('Không có tài khoản nào được chọn\nVui lòng check vào ô các tài khoản muốn xóa')
            }

            $('#deleteAccountModal').modal('hide')
        }
    })
}

function showViewAccountModal() {
    $(document).on('click', '.btn-view-account-modal', e => {
        const accountId = e.target.closest('.btn-view-account-modal').dataset.id

        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'get', accountId: accountId },
            dataType: 'JSON',
            success: data => {
                if (data) {
                    $('#admin-account-id-view').val(data.ma_tk)
                    $('#admin-account-access-view').val(data.ma_quyen)
                    $('#admin-account-username-view').val(data.username)
                    $('#admin-account-password-view').val(data.password)
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
            }
        })
    })
}

function searchAccount() {
    $(document).on('keyup', '.admin-search-info', e => {
        const info = e.target.value.toLowerCase()

        $('.admin-account-table tr').each(function(index) {
            if (index !== 0) {
                $row = $(this)

                const tdElement = $row.find('td')
                const accountId = tdElement[1].innerText.toLowerCase()
                const accessId = tdElement[2].innerText.toLowerCase()
                const username = tdElement[3].innerText.toLowerCase()

                const matchAccountId = accountId.indexOf(info)
                const matchAccessId = accessId.indexOf(info)
                const matchUsernameId = username.indexOf(info)

                if (matchAccountId < 0 && matchAccessId < 0 && matchUsernameId < 0) {
                    $row.hide()
                } else {
                    $row.show()
                }
            }
        })
    })
}