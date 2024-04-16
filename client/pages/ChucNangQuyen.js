$(document).ready(function() {
    loadChucNangQuyen()
    clickPage(loadChucNangQuyen)
    addChucNang();
})

function loadChucNangQuyen(){
    var pageno = $("#currentpage").val();
    $.ajax({
        url:"server/src/controller/PaginationController.php",
        data: {action:"pagination", page: pageno,table:"chucnangquyen"},
        method: "GET",
        dataType: "json",
        success:function(data){
            var jsondata=data.pagination;
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
            getSizeinTable("chucnangquyen","CN","#admin-MaChucNang");
            phanquyen_chucnang("Chức Năng");
            totalPage(data.count);
        }
    })
}
function addChucNang(){
    getSizeinTable("chucnangquyen","CN","#admin-MaChucNang");
    $(document).on("click","#admin-addChucNang",function(){
        var maChucNang=$("#admin-MaChucNang").val();
        var tenChucNang=$("#admin-TenChucNang").val();
        $.ajax({
            url:"server/src/controller/ChucNangQuyenController.php",
            method:"POST",
            data:{action:"add",maChucNang:maChucNang,tenChucNang:tenChucNang},
            dataType:"json",
            success:function(data){
                $("form").trigger('reset');
                $("#addChucNang").modal("hide");
                loadChucNangQuyen()
            }
        })

    })
}