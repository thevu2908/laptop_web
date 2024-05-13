$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'nhanvien') {
        renderEmployeeData()
        clickPage(renderEmployeeData)
        renderEmployeeAccountData()
        addEmployeee()
        updateEmployee()
        showEmployee()
    }
})

function getEmployeeData() {
    return new Promise((resolve, reject) => {
        var pageno = $("#currentpage").val();
        $.ajax({
            url:"server/src/controller/PaginationController.php",
            data: {action:"pagination", page: pageno,table:"nhanvien"},
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

async function renderEmployeeData() {
    var tmp=await getEmployeeData();
    const employees = tmp.pagination
    if (employees && employees.length > 0) {
        let html = ''

        employees.forEach((employee, index) => {
            console.log(employee)
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
                        <a id='showEmployee' href="#editEmployeeModal" class="edit" data-toggle="modal" data-id="${employee.ma_nv}">
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
        getSizeinTable("nhanvien","NV","#admin-nhanvien-manhanvien")
        totalPage(tmp.count);
        $('.admin-employee-list').html(html)
        
    }
}

function showEmployee(){
    $(document).on('click',"#showEmployee",function(){
        var manv = $(this).attr("data-id");
        $.ajax({
            url:"server/src/controller/NhanVienController.php",
            method:"POST",
            data:{action:"get",manv:manv},
            dataType:"JSON",
            success:function(data){
                $("#admin-update-manhanvien").val(data['ma_nv']);
                $("#admin-update-nhanvien").val(data['ten_nv']);
                $("#admin-update-tuoi").val(data['tuoi']);
                $("#admin-update-sodienthoai").val(data['so_dien_thoai']);
            },
            error:function(xhr,status,error){
                console.log(error)
            }
        })
    })
}

function updateEmployee(){
    $(document).on('click',"#admin-btn-updateNhanVien",function(){
        var manv=$("#admin-update-manhanvien").val();
        var tennv=$("#admin-update-nhanvien").val();
        var tuoi=$("#admin-update-tuoi").val();
        var sodienthoai=$("#admin-update-sodienthoai").val();
        $.ajax({
            url:"server/src/controller/NhanVienController.php",
            method:"POST",
            data:{  action: 'update',
            manv:manv,
            tennv:tennv,
            tuoi:tuoi,
            sodienthoai:sodienthoai},
            dataType:"JSON",
            success:function(data){
                $("form").trigger('reset');
                $("#editEmployeeModal").modal("hide");
                renderEmployeeData();
            }
        })
    })
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

function addEmployeee(){
    getSizeinTable("nhanvien","NV","#admin-nhanvien-manhanvien")
    $(document).on('click', '#admin-btn-addNhanVien',function(){
        var manv=$("#admin-nhanvien-manhanvien").val();
        var tennv=$("#admin-nhanvien-tennhanvien").val();
        var tuoi=$("#admin-nhanvien-tuoi").val();
        var sodienthoai=$("#admin-nhanvien-sodienthoai").val();
        if(checkSpace(tennv) && checkSpace(tuoi) && checkSpace(sodienthoai)){
            alert("Vui Lòng Nhập");
        }else if(checkSpace(tennv)){
            alert("Vui Lòng Nhập Tên Nhân Viên");
        }else if(checkSpace(sodienthoai)){
            alert("Vui Lòng Nhập Số Điện Thoại");
        }else if(checkSpace(tuoi)){
            alert("Vui Lòng Nhập Tuổi");
        }else{
            $.ajax({
                url:'server/src/controller/NhanVienController.php',
                method: 'POST',
                data: {
                    action: 'add',
                    manv:manv,
                    tennv:tennv,
                    tuoi:tuoi,
                    sodienthoai:sodienthoai
                },
                dataType: 'JSON',
                success: function(data){
                    console.log(data);
                    $("form").trigger('reset');
                    $("#addEmployeeModal").modal("hide");
                    renderEmployeeData();
                },
            })
        }
    })
}

function getEmployee(manv){
    return new Promise((resolve, reject) => {
        $.ajax({
            url:"server/src/controller/NhanVienController.php",
            method:"POST",
            data:{action:"get", manv},
            dataType:"JSON",
            success: data => resolve(data),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}