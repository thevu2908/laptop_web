$(document).ready(() => {
    loadEmployeeData()
    loadEmployeeAccountData()
})

function loadEmployeeData() {
    $.ajax({
        url: 'server/src/controller/NhanVienController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''

                data.forEach((item, index) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox-${item.ma_nv}" name="chk[]" value="${item.ma_nv}">
                                    <label for="checkbox-${item.ma_nv}"></label>
                                </span>
                            </td>
                            <td>${item.ma_nv}</td>
                            <td>${item.ten_nv}</td>
                            <td>${item.tuoi}</td>
                            <td>${item.so_dien_thoai}</td>
                            <td>
                                <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-id="${item.ma_nv}">
                                    <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                </a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-id="${item.ma_nv}">
                                    <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                                <a href="#" class="view" title="View" data-toggle="tooltip" data-id="${item.ma_nv}">
                                    <i class="material-icons">&#xE417;</i>
                                </a>
                            </td>
                        </tr>
                    `
                })

                $('.admin-employee-list').html(html)
            }
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function loadEmployeeAccountData() {
    $('.btn-open-add-account-modal').on('click', e => {
        $.ajax({
            url: 'server/src/controller/NhanVienController.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: data => {
                getAllAccounts().then(accounts => {
                    if (data && data.length > 0) {
                        let availableAccounts = []
    
                        data.forEach(item => {
                            let flag = true
                            
                            accounts.forEach(account => {
                                if (item.ma_nv === account.ma_tk) {
                                    flag = false
                                    return
                                }
                            })
                            
                            if (flag) {
                                availableAccounts.push(item)
                            }
                        })
    
                        let html = ''
        
                        availableAccounts.forEach((item, index) => {
                            const selected = index === 0 ? 'selected' : '';
                            html += `<option value='${item.ma_nv}' ${selected}>${item.ma_nv} - ${item.ten_nv}</option>`
                        })
        
                        $('#admin-account-employee-choose').html(html)
                        showAccountId()
                    }
                })
            },
            error: (xhr, status, error) => {
                console.log(error)
            }
        })
    })
}