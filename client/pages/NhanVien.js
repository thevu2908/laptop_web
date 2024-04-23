$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'nhanvien') {
        renderEmployeeData()
        renderEmployeeAccountData()
    }
})

function getEmployeeData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/NhanVienController.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: employess => resolve(employess),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })

}

async function renderEmployeeData() {
    const employees = await getEmployeeData()
    if (employees && employees.length > 0) {
        let html = ''

        employees.forEach((employee, index) => {
            html += `
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox-${employee.ma_nv}" name="chk[]" value="${employee.ma_nv}">
                            <label for="checkbox-${employee.ma_nv}"></label>
                        </span>
                    </td>
                    <td>${employee.ma_nv}</td>
                    <td>${employee.ten_nv}</td>
                    <td>${employee.tuoi}</td>
                    <td>${employee.so_dien_thoai}</td>
                    <td>
                        <a href="#edemployeeployeeModal" class="edit" data-toggle="modal" data-id="${employee.ma_nv}">
                            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                        </a>
                        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-id="${employee.ma_nv}">
                            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                        </a>
                        <a href="#" class="view" title="View" data-toggle="tooltip" data-id="${employee.ma_nv}">
                            <i class="material-icons">&#xE417;</i>
                        </a>
                    </td>
                </tr>
            `
        })
        phanquyen_chucnang("Nhân Viên")
        $('.admin-employee-list').html(html)
        
    }
}

function renderEmployeeAccountData() {
    $('.btn-open-add-account-modal').on('click', async e => {
        const employees = await getEmployeeData()

        if (employees && employees.length > 0) {
            const accounts = await getAllAccounts()
            let availableEmployees = []

            employees.forEach(employee => {
                let flag = true

                accounts.forEach(account => {
                    if (employee.ma_nv === account.ma_tk) {
                        flag = false
                        return
                    }
                })

                if (flag) availableEmployees.push(employee)
            })

            let html = ''

            availableEmployees.forEach((employee, index) => {
                const selected = index === 0 ? 'selected' : '';
                html += `<option value='${employee.ma_nv}' ${selected}>${employee.ma_nv} - ${employee.ten_nv}</option>`
            })

            $('#admin-account-employee-choose').html(html)
        }
    })
}