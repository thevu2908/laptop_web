$(document).ready(function(){
    loadPhanQuyen();
    addPhanQuyen();
    //getAction();
})
function loadPhanQuyen(){
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
                <td id="admin-TenQuyen-${index}">${chitietquyen['ma_quyen']}</td>
                <td id="admin-TenChucNang-${index}">${chitietquyen['ma_chuc_nang']}</td>
                <td><input type="checkbox" name="xem" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Xem" id="chkxem" onclick="change(this)"></td>
                <td><input type="checkbox" name="them" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Thêm" id="chkthem" onclick="change(this)"></td>
                <td><input type="checkbox" name="xoa" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Xóa" id="chkxoa" onclick="change(this)"></td>
                <td><input type="checkbox" name="sua" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Sửa" id="chksua" onclick="change(this)"></td> 
                </tr>`;
            })
            // $("#show-ListPhanQuyen").html(html);
            jsonData.forEach((chitietquyen,index) => {
                console.log(chitietquyen['ma_quyen'],index);
                console.log(chitietquyen['ma_chuc_nang'],index);
                getTenQuyen(chitietquyen['ma_quyen'],index);
                getTenChucNang(chitietquyen['ma_chuc_nang'],index);
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
            $("#show-ListPhanQuyen").html(html);
        }
    });
}
function addPhanQuyen(){
    getAllListChucNang();
    getAllListNhomQuyen();
    $(document).on("click","#add_PhanQuyen",function(){
        var maquyen=$("#select_nhomquyen").val();
        var machucnang=$("#select_chucnang").val();
        $.ajax({
            url: "server/src/controller/CTQuyenController.php",
            data: {action:"add",maquyen:maquyen,machucnang:machucnang},
            method: "post",
            success: function (data) {
                if(data==="true"){
                    console.log(data);
                $("form").reset();
                loadNhomQuyen();
                }else{
                    console.log(data);
                }
            }
        })
    })
}
function getTenQuyen(maquyen,index){
    $.ajax({
        url: "server/src/controller/NhomQuyenController.php",
        data: {action:"Get",id:maquyen},
        method: "post",
        success: function (data) {
            var nhomquyen=JSON.parse(data);
            console.log(nhomquyen);
            $("#admin-TenQuyen-"+index+"").text(nhomquyen['ten_quyen']);
        }

    })
}
function getTenChucNang(machucnang,index){
    $.ajax({
        url: "server/src/controller/ChucNangQuyenController.php",
        data: {action:"getchucnang",id:machucnang},
        method: "post",
        success: function (data) {
            var chucnang=JSON.parse(data);
            console.log(chucnang);
            $("#admin-TenChucNang-"+index+"").text(chucnang['ten_chuc_nang']);
        }

    })
}
function getAllListNhomQuyen(){
    $.ajax({
        url: "server/src/controller/NhomQuyenController.php",
        data: {action:"Load"},
        method: "post",
        success: function (data) {
            var jsonData=JSON.parse(data);
            var html="";
            jsonData.forEach((nhomquyen,index) => {
                html+=`<option value="${nhomquyen['ma_quyen']}">${nhomquyen['ten_quyen']}</option>`;
            })
            $("#select_nhomquyen").html(html);
        }

    })
}
function getAllListChucNang(){
    $.ajax({
        url: "server/src/controller/ChucNangQuyenController.php",
        data: {action:"get"},
        method: "post",
        success: function (data) {
            var jsonData=JSON.parse(data);
            var html="";
            jsonData.forEach((nhomquyen,index) => {
                html+=`<option value="${nhomquyen['ma_chuc_nang']}">${nhomquyen['ten_chuc_nang']}</option>`;
            })
            $("#select_chucnang").html(html);
        }

    })
}
// function phanquyen($id){
//     $.ajax({
//         url: "server/src/controller/CTQuyenController.php",
//         data: {action:"phanquyen",id:$id},
//         method: "post",
//         success: function (data) {
//             jsonData=JSON.parse(data);
//             jsonData.forEach((chucnang,index)=>{
//                 if(chucnang['ma_chuc_nang']==="CN002"){
//                     $.ajax({
//                         url: "server/src/controller/CTQuyenController.php",
//                         data: {action:"get",maquyen:$id,machucnang:chucnang['ma_chuc_nang']},
//                         method: "post",
//                         success: function (data) {
//                             var detailData = JSON.parse(data);     
//                             if(!detailData.some(item => item.hanh_dong === "Xóa")){
//                                 ("#add_NhomQuyen").hide()
//                             }
//                             if(!detailData.some(item => item.hanh_dong === "Thêm")){
//                                 //btnUp
//                                 ("#btnUp").hide()
//                             }   
//                             if(!detailData.some(item => item.hanh_dong === "Sửa")){
//                                 ("#btnDel").hide()
//                             }            
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }
function change(checkbox){
    var isChecked = checkbox.checked;
    var maquyen = checkbox.dataset.row;
    var machucnang = checkbox.dataset.row1;
    var hanhdong=checkbox.dataset.column;
    if (isChecked) {
        update("add",maquyen,machucnang,hanhdong);
    } else {
        update("update",maquyen,machucnang,hanhdong);
    }
}
function update(action,maquyen,machucnang,hanhdong){
    $.ajax({
        url: "server/src/controller/CTQuyenController.php",
        data: {action:action,maquyen:maquyen,machucnang:machucnang,hanhdong:hanhdong},
        method: "post",
        success: function (data) {
            console.log(data);
        }
    })
}