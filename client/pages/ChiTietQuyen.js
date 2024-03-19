$(document).ready(function(){
    getAllNhomQuyen();
    //getAction();
})

function getAllNhomQuyen(){
    $.ajax({
        url: "server/src/controller/CTQuyenController.php",
        data: {action:"load"},
        method: "post",
        success: function (data) {
            var jsonData=JSON.parse(data);
            var html="";
            jsonData.forEach((chitietquyen,index) => {
                html+=`<tr data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}">
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox2" name="options[]" value="1">
                        <label for="checkbox2"></label>
                    </span>
                </td>
                <td id="nameMaQuyen">${chitietquyen['ma_quyen']}</td>
                <td id="nameTenChucNang">${chitietquyen['ma_chuc_nang']}</td>
                <td><input type="checkbox" name="xem" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Xem" id="chkxem" onclick="change(this)"></td>
                <td><input type="checkbox" name="them" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Thêm" id="chkthem" onclick="change(this)"></td>
                <td><input type="checkbox" name="xoa" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Xóa" id="chkxoa" onclick="change(this)"></td>
                <td><input type="checkbox" name="sua" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Sửa" id="chksua" onclick="change(this)"></td> 
                </tr>`;
            })
            $("#show-ListPhanQuyen").html(html);
            jsonData.forEach((chitietquyen,index) => {
                $.ajax({
                    url: "server/src/controller/CTQuyenController.php",
                    data: {action:"get",maquyen:chitietquyen['ma_quyen'],machucnang:chitietquyen['ma_chuc_nang']},
                    method: "post",
                    success: function (data) {
                        var detailData = JSON.parse(data);                       
                        var row=$("tr[data-row='" + chitietquyen['ma_quyen'] + "'][data-row1='" + chitietquyen['ma_chuc_nang'] + "']");
                        row.find("td:eq(3) input[type='checkbox']").prop("checked", detailData.some(item => item.hanh_dong === "Xem"));
                        row.find("td:eq(4) input[type='checkbox']").prop("checked", detailData.some(item => item.hanh_dong === "Thêm"));
                        row.find("td:eq(5) input[type='checkbox']").prop("checked", detailData.some(item => item.hanh_dong === "Xóa"));
                        row.find("td:eq(6) input[type='checkbox']").prop("checked", detailData.some(item => item.hanh_dong === "Sửa"));
                        //phanquyen(chitietquyen['ma_quyen']);
                    }
                })
            })
        }
    });
}
function phanquyen($id){
    $.ajax({
        url: "server/src/controller/CTQuyenController.php",
        data: {action:"phanquyen",id:$id},
        method: "post",
        success: function (data) {
            jsonData=JSON.parse(data);
            jsonData.forEach((chucnang,index)=>{
                if(chucnang['ma_chuc_nang']==="CN002"){
                    $.ajax({
                        url: "server/src/controller/CTQuyenController.php",
                        data: {action:"get",maquyen:$id,machucnang:chucnang['ma_chuc_nang']},
                        method: "post",
                        success: function (data) {
                            var detailData = JSON.parse(data);     
                            if(!detailData.some(item => item.hanh_dong === "Xóa")){
                                ("#add_NhomQuyen").hide()
                            }
                            if(!detailData.some(item => item.hanh_dong === "Thêm")){
                                //btnUp
                                ("#btnUp").hide()
                            }   
                            if(!detailData.some(item => item.hanh_dong === "Sửa")){
                                ("#btnDel").hide()
                            }            
                        }
                    })
                }
            })
        }
    })
}
function change(checkbox){
    var isChecked = checkbox.checked;

    if (isChecked) {
        console.log("Checkbox được chọn.");
    } else {
        console.log("Checkbox không được chọn.");
    }
}