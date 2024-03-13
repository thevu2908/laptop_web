$(document).ready(function() {
    loadData();
    getListNhomQuyen();
})

function loadData() {
    $.ajax({
        url: 'src/controller/TaiKhoanController.php',
        method: 'POST',
        data: {action:'load'},
        success: data => {
            let html = '';
            console.log(data);
            if (data && data.length > 0) {
                const dataJson = JSON.parse(data);
                dataJson.forEach((item, index) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" value="1">
                                    <label for="checkbox1"></label>
                                </span>
                            </td>
                            <td>${item['ma_tk']}</td>
                            <td>${getNhomQuyen(item['ma_quyen'])}</td>
                            <td>${item['username']}</td>
                            <td>${item['password']}</td>
                            <td>
                                <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                <a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
                                <a href="#" class="Status" title="Status"><input type="checkbox" checked data-toggle="toggle" data-onstyle="danger" data-height=""></a>
                            </td>
                        </tr>
                    `
                });
            }
            $('.admin-account-list').html(html);
        }
    })
}
function getNhomQuyen(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/src/controller/NhomQuyenController.php",
            method: "POST",
            data: { action: 'Get', id: id },
            dataType: 'JSON',
            success: data => {
                if (data && data.ten_nhom) {
                    resolve(data.ten_nhom);
                } else {
                    resolve('Unknown');
                }
            },
            error: () => {
                resolve('Unknown');
            }
        });
    });
}
function  getListNhomQuyen(){
    var tmp="Load";
    $.ajax({
        url:"src/controller/NhomQuyenController.php",
        method:"POST",
        data:{action:tmp},
        success:function(data){
            var html="";
            console.log(data);
            var jsonData=JSON.parse(data);
            if(data.length>0){
                jsonData.forEach((nhomquyen,index) => {
                   html+=`<option value="">${nhomquyen['ma_quyen']} - ${nhomquyen['ten_quyen']}</option>`
                });
            }
            $("#select").html(html);
        }
    }) 
}