$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'taikhoan') {
        renderAccountData()
        clickPage(renderAccountData)
        handleAddAccount()
        showUpdateAccountModal()
        handleUpdateAccount()
        showDeleteAccountModal()
        handleDeleteAccount()
        showDeleteCheckedAccountModal()
        showViewAccountModal()
        searchAccount()
    }
})

function getAccounts() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: accounts => resolve(accounts),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getPaginationAccounts() {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'taikhoan', page },
            dataType: 'JSON',
            success: accounts => resolve(accounts),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)   
            }
        })
    })
}

async function renderAccountData(data) {
    const accounts = data ? data : await getPaginationAccounts()

    if (accounts && accounts.pagination.length > 0) {
        let html = ''

        accounts.pagination.forEach((accounnt, index) => {
            html += `
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox-${accounnt.ma_tk}" name="chk[]" value="${accounnt.ma_tk}">
                            <label for="checkbox-${accounnt.ma_tk}"></label>
                        </span>
                    </td>
                    <td>${accounnt.ma_tk}</td>
                    <td class="admin-accounnt-accessname-${index}"></td>
                    <td>${accounnt.username}</td>
                    <td>
                        <a href="#editAccountModal" class="edit btn-update-account-modal" data-toggle="modal" data-id=${accounnt.ma_tk}>
                            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                        </a>
                        <a href="#deleteAccountModal" class="delete btn-delete-account-modal" data-toggle="modal" data-id="${accounnt.ma_tk}">
                            <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                        </a>
                        <a href="#viewAccountModal" class="view btn-view-account-modal" title="View" data-toggle="modal" data-id="${accounnt.ma_tk}">
                            <i class="material-icons" data-toggle="tooltip" title="Xem thông tin">&#xE417;</i>
                        </a>
                    </td>
                </tr>
            `

            showTenNhomQuyenAccount(accounnt.ma_quyen, index)
        })

        $('.admin-account-list').html(html)
        phanquyen_chucnang("Tài Khoản")
        totalPage(accounts.count)
    }
}

function getAllAccounts() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'get-all' },
            dataType: 'JSON',
            success: accounts => {
                if (accounts && accounts.length > 0) {
                    resolve(accounts)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function addAccount(accountId, accessId, username, password) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'add', accountId, accessId, username, password },
            success: res => {
                if (res === 'success') {
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

function handleAddAccount() {
    $('.btn-add-account').on('click', async e => {
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

        const res = await addAccount(accountId, accessId, accountId, password)
        if (res) {
            alert('Thêm tài khoản thành công')
            $('form').trigger('reset')
            $('#addAccountModal').modal('hide')
            renderAccountData()
        } else {
            alert('Thêm tài khoản thất bại\nVui lòng kiểm tra thông tin nhập vào')
        }
    })
}

function getAccount(accountId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'get', accountId },
            dataType: 'JSON',
            success: account => resolve(account),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function updatePassword(id, password) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'update-password', id, password },
            success: res => res === 'success' ? resolve(true) : resolve(false),
            error: (xhr, status, error) => reject(error)
        })
    })
}

function showUpdateAccountModal() {
    $(document).on('click', '.btn-update-account-modal', async e => {
        const accountId = e.target.closest('.btn-update-account-modal').dataset.id
        const account = await getAccount(accountId)
        if (account) {
            $('#admin-account-id-edit').val(account.ma_tk)
            $('#admin-account-access-edit').val(account.ma_quyen)
            $('#admin-account-username-edit').val(account.username)
            $('#admin-account-password-edit').val(account.password)
        }
    })
}

function updateAccount(accountId, accessId, username, password) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'update', accountId, accessId, username, password },
            success: res => {
                if (res === 'success') {
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

function handleUpdateAccount() {
    $(document).on('click', '.btn-update-account', async e => {
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

        const res = await updateAccount(accountId, accessId, username, password)
        if (res) {
            alert('Sửa thông tin tài khoản thành công')
            $('form').trigger('reset')
            $('#editAccountModal').modal('hide')
            renderAccountData()
        } else {
            alert('Sửa thông tin tài khoản thất bại\nVui lòng kiểm tra thông tin nhập vào')
        }
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

function deleteAccount(accountId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'delete', accountId },
            success: res => {
                if (res === 'success') {
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

function handleDeleteAccount() {
    $(document).on('click', '.btn-delete-account', async e => {
        const accountId = $('#deleteAccountModal .delete-account-id').text()

        if (accountId) {
            if (accountId === 'admin') {
                alert('Không thể xóa tài khoản Admin')
                $('#deleteAccountModal').modal('hide')
                return
            }

            const res = await deleteAccount(accountId)
            if (res) {
                alert('Xóa tài khoản thành công')
                $('form').trigger('reset')
                $('#deleteAccountModal').modal('hide')
                renderAccountData()
            } else {
                alert('Xóa tài khoản thất bại')
            }
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
                if (checkedAccounts.includes('admin')) {
                    alert('Không thể xóa tài khoản admin\nHãy bỏ check tài khoản admin')
                    $('#deleteAccountModal').modal('hide')
                    return
                }

                const promises = checkedAccounts.map(checkedAccount => deleteAccount(checkedAccount))
                const res = await Promise.all(promises)

                if (!res.includes(false)) {
                    alert('Đã xóa tài khoản các tài khoản được chọn')
                    $('form').trigger('reset')
                    firstCheckInputElement.checked = false
                    renderAccountData()
                } else {
                    alert('Xảy ra lỗi trong quá trình xóa tài khoản')
                }
            } else {
                alert('Không có tài khoản nào được chọn\nVui lòng check vào ô các tài khoản muốn xóa')
            }

            $('#deleteAccountModal').modal('hide')
        }
    })
}

function showViewAccountModal() {
    $(document).on('click', '.btn-view-account-modal', async e => {
        const accountId = e.target.closest('.btn-view-account-modal').dataset.id
        const account = await getAccount(accountId)

        if (account) {
            $('#admin-account-id-view').val(account.ma_tk)
            $('#admin-account-access-view').val(account.ma_quyen)
            $('#admin-account-username-view').val(account.username)
            $('#admin-account-password-view').val(account.password)
        }
    })
}

function searchAccount() {
    $(document).on('keyup', '.admin-search-info', e => {
        const search = e.target.value.toLowerCase()

        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', table: 'taikhoan', search },
            dataType: 'JSON',
            success: accounts => renderAccountData(accounts),
            error: (xhr, status, error) => console.log(error)
        })
    })
}

function checkExistUsername(username) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'check-exist', username },
            success: res => resolve(res),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}