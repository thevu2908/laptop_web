$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'nhanvien') {
        renderEmployeeData()
        clickPage(renderEmployeeData)
        addEmployeee()
        updateEmployee()
        showEmployee()
        deleteMulEmployee()
        deleteEmployee()
    }
})
var listitemRemove = [];
function getEmployeeData() {
    return new Promise((resolve, reject) => {
        var pageno = $("#currentpage").val();
        $.ajax({
            url: "server/src/controller/PaginationController.php",
            data: { action: "pagination", page: pageno, table: "nhanvien" },
            method: "GET",
            dataType: "json",
            success: employess => resolve(employess),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getAvailableEmployees() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "server/src/controller/NhanVienController.php",
            method: "POST",
            data: { action: "get-available-employees" },
            dataType: "JSON",
            success: employees => resolve(employees),
            error: (xhr, status, error) => reject(error)
        })
    })
}

async function renderEmployeeData() {
    var tmp = await getEmployeeData();
    const employees = tmp.pagination
    if (employees && employees.length > 0) {
        let html = ''

        employees.forEach((employee, index) => {
            html += `
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox-${employee.ma_nv}" name="chk[]" value="${employee.ma_nv}" data-row="${employee.ma_nv}" onclick="removeList(this)">
                            <label for="checkbox-${employee.ma_nv}"></label>
                        </span>
                    </td>
                    <td>${employee.ma_nv}</td>
                    <td>${employee.ten_nv}</td>
                    <td>${employee.tuoi}</td>
                    <td>${employee.so_dien_thoai}</td>
                    <td>
                        <a id='showEmployee' href="#editEmployeeModal" class="edit" data-toggle="modal" data-id="${employee.ma_nv}">
                            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                        </a>
                        <a href="#deleteEmployeeModal" class="delete" id="showId-nhanvien" data-toggle="modal" data-id2="${employee.ma_nv}">
                            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                        </a>
                        <a href="#" class="view" title="View" data-toggle="tooltip" data-id3="${employee.ma_nv}">
                            <i class="material-icons">&#xE417;</i>
                        </a>
                    </td>
                </tr>
            `
        })
        phanquyen_chucnang("Nhân Viên")
        getSizeinTable("nhanvien", "NV", "#admin-nhanvien-manhanvien")
        totalPage(tmp.count);
        displayTotalPage('#admin-employee-main .hint-text', tmp.count, employees.length)
        $('.admin-employee-list').html(html)
    }
}

function showEmployee() {
    $(document).on('click', "#showEmployee", function () {
        var manv = $(this).attr("data-id");
        $.ajax({
            url: "server/src/controller/NhanVienController.php",
            method: "POST",
            data: { action: "get", manv: manv },
            dataType: "JSON",
            success: function (data) {
                $("#admin-update-manhanvien").val(data['ma_nv']);
                $("#admin-update-nhanvien").val(data['ten_nv']);
                $("#admin-update-tuoi").val(data['tuoi']);
                $("#admin-update-sodienthoai").val(data['so_dien_thoai']);
            },
            error: function (xhr, status, error) {
                console.log(error)
            }
        })
    })
}

function updateEmployee() {
    $(document).on('click', "#admin-btn-updateNhanVien", function () {
        var manv = $("#admin-update-manhanvien").val();
        var tennv = $("#admin-update-nhanvien").val();
        var tuoi = $("#admin-update-tuoi").val();
        var sodienthoai = $("#admin-update-sodienthoai").val();
        if (checkSpace(tennv) && checkSpace(tuoi) && checkSpace(sodienthoai)) {
            alert("Vui Lòng Nhập");
        } else if (checkSpace(tennv)) {
            alert("Vui Lòng Nhập Tên Nhân Viên");
        } else if (checkSpace(sodienthoai)) {
            alert("Vui Lòng Nhập Số Điện Thoại");
        } else if (checkSpace(tuoi)) {
            alert("Vui Lòng Nhập Tuổi");
        } else if (!isValidPhone(sodienthoai)) {
            alert("Số Điện Thoại Không Hợp Lệ")
        } else if (!containsOnlyNumbers(tuoi)) {
            alert("Tuổi Không Hợp Lệ")
        } else {
            $.ajax({
                url: 'server/src/controller/NhanVienController.php',
                method: 'POST',
                data: {
                    action: 'checkPhone',
                    sodienthoai: sodienthoai
                },
                dataType: 'JSON',
                success: function (data) {
                    if (data === false) {
                        $.ajax({
                            url: "server/src/controller/NhanVienController.php",
                            method: "POST",
                            data: {
                                action: 'update',
                                manv: manv,
                                tennv: tennv,
                                tuoi: tuoi,
                                sodienthoai: sodienthoai
                            },
                            dataType: "JSON",
                            success: function (data) {
                                $("form").trigger('reset');
                                $("#editEmployeeModal").modal("hide");
                                renderEmployeeData();
                            }
                        })
                    } else {
                        alert("Số Điện Thoại Đã Tồn Tại")
                    }
                }
            })
        }
    })
}

function addEmployeee() {
    getSizeinTable("nhanvien", "NV", "#admin-nhanvien-manhanvien")
    $(document).on('click', '#admin-btn-addNhanVien', function () {
        var manv = $("#admin-nhanvien-manhanvien").val();
        var tennv = $("#admin-nhanvien-tennhanvien").val();
        var tuoi = $("#admin-nhanvien-tuoi").val();
        var sodienthoai = $("#admin-nhanvien-sodienthoai").val();
        if (checkSpace(tennv) && checkSpace(tuoi) && checkSpace(sodienthoai)) {
            alert("Vui Lòng Nhập");
        } else if (checkSpace(tennv)) {
            alert("Vui Lòng Nhập Tên Nhân Viên");
        } else if (checkSpace(sodienthoai)) {
            alert("Vui Lòng Nhập Số Điện Thoại");
        } else if (checkSpace(tuoi)) {
            alert("Vui Lòng Nhập Tuổi");
        } else if (!isValidPhone(sodienthoai)) {
            alert("Số Điện Thoại Không Hợp Lệ")
        } else if (!containsOnlyNumbers(tuoi)) {
            alert("Tuổi Không Hợp Lệ")
        } else {
            $.ajax({
                url: 'server/src/controller/NhanVienController.php',
                method: 'POST',
                data: {
                    action: 'checkPhone',
                    sodienthoai: sodienthoai
                },
                dataType: 'JSON',
                success: function (data) {
                    if (data === false) {
                        $.ajax({
                            url: 'server/src/controller/NhanVienController.php',
                            method: 'POST',
                            data: {
                                action: 'add',
                                manv: manv,
                                tennv: tennv,
                                tuoi: tuoi,
                                sodienthoai: sodienthoai
                            },
                            dataType: 'JSON',
                            success: function (data) {
                                console.log(data);
                                $("form").trigger('reset');
                                $("#addEmployeeModal").modal("hide");
                                renderEmployeeData();
                            },
                        })
                    } else {
                        alert("Số Điện Thoại Đã Tồn Tại")
                    }
                },
            })

        }
    })
}

function getEmployee(manv) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "server/src/controller/NhanVienController.php",
            method: "POST",
            data: { action: "get", manv },
            dataType: "JSON",
            success: data => resolve(data),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function removeList(checkbox) {
    var isChecked = checkbox.checked;
    var manhanvien = checkbox.dataset.row;
    if (isChecked) {
        listitemRemove.push({ manhanvien: manhanvien });
    } else {
        var indexToRemove = listitemRemove.findIndex(item => item.manhanvien === manhanvien);
        if (indexToRemove !== -1) {
            listitemRemove.splice(indexToRemove, 1);
        }
    }
    console.log(listitemRemove);
}

function deleteEmployee() {
    $(document).on("click", "#showId-nhanvien", function () {
        var id = $(this).attr("data-id2");

        if(id==="admin"){
            alert("admin không được xóa")
            return
        }else{
            $(document).off("click", "#admin-btn-deleteNhanvien").on("click","#admin-btn-deleteNhanvien",function(){
                $.ajax({
                    url:"server/src/controller/NhanVienController.php",
                    method:"POST",
                    data:{action:"delete",manv:id},
                    dataType:"JSON",
                    success:function(data){
                        $("form").trigger('reset');
                        $("#deleteEmployeeModal").modal("hide");
                        renderEmployeeData();
                    }
                })
            })
        }
    })
}
function deleteMulEmployee() {
    $(document).on("click", "#admin-btn-deleteNhanvien", function () {
        $.ajax({
            url: "server/src/controller/NhanVienController.php",
            method: "POST",
            data: { action: "deleteMul", listitemRemove: listitemRemove },
            dataType: "JSON",
            success: function (data) {
                $("form").trigger('reset');
                $("#deleteEmployeeModal").modal("hide");
                renderEmployeeData();
            }
        })
    })
}