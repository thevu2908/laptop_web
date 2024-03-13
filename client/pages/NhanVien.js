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
                                    <input type="checkbox" id="checkbox-${item.ma_nv}" name="options[]" value="${item.ma_nv}">
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
        }
    })
}

function loadEmployeeAccountData() {
    $.ajax({
        url: 'server/src/controller/NhanVienController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''

                data.forEach((item, index) => {
                    const selected = index === 0 ? 'selected' : '';
                    html += `<option value='${item.ma_nv}' ${selected}>${item.ma_nv} - ${item.ten_nv}</option>`
                })

                $('#admin-account-employee-choose').html(html)
                showAccountId()
            }
        }
    })
}