$(document).ready(function() {
    getAllChuNangQuyen();
})

function getAllChuNangQuyen(){
    $.ajax({
        url:"server/src/controller/ChucNangQuyenController.php",
        method:"post",
        data:{action:"get"},
        success:function(data){
            var jsondata=JSON.parse(data);
            var html="";
            jsondata.forEach((chucnangquyen,index) => {
                html+=`<tr>
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1">
                        <label for="checkbox1"></label>
                    </span>
                </td>
                <td>${chucnangquyen['ma_chuc_nang']}</td>
                <td>${chucnangquyen['ten_chuc_nang']}</td>
                <td><span class="status text-success">&bull;</span> Active</td>
                <td>
                    <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    <a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
                </td>
            </tr>`
            });
            $("#show-listChucNang").html(html);
            $.ajax({
                url:"server/src/controller/CTQuyenController.php",
                data:{action:"kiemtra" ,maquyen:$("#ad-maquyen").val(),
                machucnang:"CN005"},
                method:"POST",
                success:function(data){
                    var jsonData = JSON.parse(data);
                    console.log(jsonData);
                    jsonData.some(item => item.hanh_dong === "Thêm")?$(".btn.btn-success.add").show():$(".btn.btn-success.add").hide();
                    jsonData.some(item => item.hanh_dong === "Xóa")?$(".delete").show():$(".delete").hide();
                    jsonData.some(item => item.hanh_dong === "Sửa")?$(".edit").show():$(".edit").hide();
                    //jsonData.some(item => item.hanh_dong === "Xem")?$(".btn.btn-success.add").show():$(".btn.btn-success.add").hide();
                }
            })
        }
    })
}