$(document).ready(function() {
    getAllChuNangQuyen();
    clickPage(getAllChuNangQuyen());
})

function getAllChuNangQuyen(){
    var pageno = $("#currentpage").val();
    $.ajax({
        url:"server/src/controller/PaginationController.php",
        data: {action:"pagination", page: pageno,table:"chucnangquyen"},
        method: "GET",
        dataType: "json",
        success:function(data){
            var jsondata=data.paginattion;
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
            phanquyen("CN005");
            totalPage(data.count);
        }
    })
}