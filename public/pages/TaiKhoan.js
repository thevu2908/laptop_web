$(document).ready(function () {
    loadTaiKhoanData();
})

function loadTaiKhoanData() {
    $.ajax({
        url: 'src/controller/TaiKhoanController.php',
        method: 'POST',
        data: { action: 'load' },
        success: data => {
            let html = ''
            if (data && data.length > 0) {
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
                            <td>${item['ma_quyen']}</td>
                            <td>${item['username']}</td>
                            <td>${item['password']}</td>
                            <td>
                                <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                <a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
                                <a href="#" class="Status" title="Status"><input type="checkbox" checked data-toggle="toggle" data-onstyle="danger" data-height=""></a>
                            </td>
                        </tr>`
                })
            }
            $('.admin-account-list').html(html);
        }
    })
}