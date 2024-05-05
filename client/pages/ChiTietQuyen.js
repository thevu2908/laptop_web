var tmp="";
var listitemRemove = [];
var listitemAdd = [];
var listitemAddMul=[];
$(document).ready(function(){
    console.log($("#admin-select-nhomquyen").val())
    selectNhomQuyen();
    if($("#admin-select-nhomquyen").val()==null){
        loadPhanQuyen();
        clickPage(loadPhanQuyen);
    }
    var search="";
    $(document).on("change","#admin-select-nhomquyen",function(){
        tmp="";
        search=$("#admin-select-nhomquyen").val()
        console.log(search+"--fill--")
        if(search=="All" || search===""){
            $("#currentpage").val(1);
            loadPhanQuyen();
            clickPage(loadPhanQuyen);
        }else{
            if(search!="All"){
                filterPhanQuyen(search);
                clickPage(filterPhanQuyen);
            }
        }
    })
    addPhanQuyen();
    deletePhanQuyen();
})
function loadPhanQuyen(){
    var pageno = $("#currentpage").val();
    $.ajax({
        url: "server/src/controller/PaginationController.php",
        data: {action:"pagination", page: pageno,table:"chitietquyen"},
        method: "GET",
        dataType: "json",
        success: function (data) {
           renderPhanQuyen(data);
        }
    });
}
function renderPhanQuyen(data){
    var jsonData=data.pagination;
    var html="";
    jsonData.forEach((chitietquyen,index) => {
        html+=`<tr data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}">
        <td>
            <span class="custom-checkbox">
                <input type="checkbox" id="checkbox2" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" onclick="removeList(this)">
                <label for="checkbox2"></label>
            </span>
            
        </td>
        <td id="admin-TenQuyen-${index}">${chitietquyen['ma_quyen']}</td>
        <td id="admin-TenChucNang-${index}">${chitietquyen['ma_chuc_nang']}</td>
        <td><input type="checkbox" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Xem" onclick="change(this)"></td>
        <td><input type="checkbox" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Thêm" onclick="change(this)"></td>
        <td><input type="checkbox" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Xóa" onclick="change(this)"></td>
        <td><input type="checkbox" class="checkbox" data-row="${chitietquyen['ma_quyen']}" data-row1="${chitietquyen['ma_chuc_nang']}" data-column="Sửa" onclick="change(this)"></td> 
        </tr>`;
    })
    $("#show-ListPhanQuyen").html(html);
    jsonData.forEach((chitietquyen,index) => {
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
            }
        })
    })

    totalPage(data.count);
}
function selectNhomQuyen(){
    $.ajax({
        url: "server/src/controller/NhomQuyenController.php",
        data: {action:"Load"},
        method: "post",
        success: function (data) {
            var jsonData=JSON.parse(data);
            var html="<option value='All'>All</option>";
            jsonData.forEach((nhomquyen,index) => {
                html+=`<option value="${nhomquyen['ma_quyen']}">${nhomquyen['ten_quyen']}</option>`;
            })
            $("#admin-select-nhomquyen").html(html);
        }

    })
}
function addPhanQuyen(){
    getAllListNhomQuyen()
    selectChangeItem()
    $(document).on("click","#add_PhanQuyen",function(){
        var maquyen=$("#admin-select-MaNhomQuyen").val();
        console.log(maquyen)
        console.log(listitemAddMul)
        $.ajax({
            url: "server/src/controller/CTQuyenController.php",
            data: {action:"addMul",maquyen:maquyen,listitemAdd:listitemAddMul},
            method: "post",
            success: function (data) {
                clearModal();
                $("#addMulPhanQuyen").modal("hide");
                loadPhanQuyen();
            }
        })
        if(maquyen===$("#admin-nhomquyen").val()){
            location.reload()
        }
    })
}
function clearModal(){
    $('#admin-select-MaNhomQuyen').prop('selectedIndex', 0);
    $("#admin-show-ChucNang").html("");
}
function getTenQuyen(maquyen,index){
    $.ajax({
        url: "server/src/controller/NhomQuyenController.php",
        data: {action:"Get",id:maquyen},
        method: "post",
        success: function (data) {
            var nhomquyen=JSON.parse(data);
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
            $("#admin-select-MaNhomQuyen").html(html);
        }

    })
}
function selectChangeItem(){
    $(document).on("change","#admin-select-MaNhomQuyen",function(){
        console.log($(this).val());
        getAllListChucNang($(this).val());
    })
}
function getAllListChucNang($maquyen){
    $.ajax({
        url: "server/src/controller/CTQuyenController.php",
        data: {action:"dschucnang",maquyen:$("#admin-select-MaNhomQuyen").val()},
        method: "post",
        success: function (data) {
            var jsonData=JSON.parse(data);
            var html="";
            jsonData.forEach((chucnang,index) => {
                html+=`<tr data-row="${chucnang['ma_chuc_nang']}">
                <td id="admin-TenChucNang-${index}">${chucnang['ten_chuc_nang']}</td>
                <td>
                    <input type="checkbox" class="checkbox" data-row="${chucnang['ma_chuc_nang']}" data-column="Xem" onclick="changechk(this)">
                </td>
                <td>
                    <input type="checkbox" class="checkbox" data-row="${chucnang['ma_chuc_nang']}" data-column="Thêm" onclick="changechk(this)">
                </td>
                <td>
                    <input type="checkbox" class="checkbox" data-row="${chucnang['ma_chuc_nang']}" data-column="Xóa" onclick="changechk(this)">
                </td>
                <td>
                    <input type="checkbox" class="checkbox" data-row="${chucnang['ma_chuc_nang']}" data-column="Sửa" onclick="changechk(this)">
                </td> 
            </tr>`;
            })
            $("#admin-show-ChucNang").html(html);
        }

    })
}
function deletePhanQuyen(){
    $(document).on("click","#admin-delete-phanquyen",function(){
        if(listitemRemove.length===0){
            console.log("Vui Lòng Chọn");
        }else{
            console.log(listitemRemove);
            $(document).on("click","#admin-delete",function(){
                $.ajax({
                    url: "server/src/controller/CTQuyenController.php",
                    data:{action:"delete",listitemRemove:listitemRemove},
                    method: "post",
                    success: function (data) {
                        console.log(data);
                        $("#deletePhanQuyenModal").modal("hide");
                        var currentPage = parseInt($("#currentpage").val());
                        var totalEmployees = parseInt($("#totalEmployees").val());
                        var employeesPerPage = 4;
                        var totalPages = Math.ceil(totalEmployees / employeesPerPage);
                        if ($("#mytable tbody tr").length === 1 && currentPage !== 1) {
                            currentPage--;
                            $("#currentpage").val(currentPage);
                        }
                       loadPhanQuyen();
                       pagination(totalPages, currentPage);
                    }
                })
                location.reload();
            })
        }
    })
}
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
    console.log($("#admin-nhomquyen"))
    if($("#admin-nhomquyen").val()===maquyen){
        if((!isChecked || isChecked) && hanhdong==="Xem"){
            location.reload();
        }
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
function removeList(checkbox) {
    var isChecked = checkbox.checked;
    var maquyen = checkbox.dataset.row;
    var machucnang = checkbox.dataset.row1;
    if (isChecked) {
        listitemRemove.push({ maquyen: maquyen, machucnang: machucnang });
    } else {
        var indexToRemove = listitemRemove.findIndex(item => item.maquyen === maquyen && item.machucnang === machucnang);
        if (indexToRemove !== -1) {
            listitemRemove.splice(indexToRemove, 1);
        }
    }
}
function addMulChucNang(checkbox){
    var isChecked = checkbox.checked;
    var machucnang = checkbox.dataset.row;
    if (isChecked) {
        listitemAdd.push({machucnang: machucnang });
    } else {
        var indexToAdd = listitemAdd.findIndex(item => item.machucnang === machucnang);
        if (indexToAdd !== -1) {
            listitemAdd.splice(indexToAdd, 1);
        }
    }
    console.log(listitemAdd)
}
function filterPhanQuyen(search){
    console.log(tmp);
    var pageno;
    if(tmp===""){
        $("#currentpage").val(1);
        pageno=$("#currentpage").val();
        tmp=search;
    }else if(tmp==$("#admin-select-nhomquyen").val()){
       pageno = $("#currentpage").val();
    }
    console.log(pageno+'----')
    $.ajax({
        url:"server/src/controller/SearchController.php",
        data: {action:"filter", page: pageno,table:"chitietquyen",search:$("#admin-select-nhomquyen").val()},
        method:"get",
        dataType:'json',
        success:function(data){
            renderPhanQuyen(data);
        }
    })
}
//
function changechk(obj){
    var check=obj.checked;
    var machucnang=obj.dataset.row;
    var hanhdong=obj.dataset.column;
    if(check){
        var indexAdd=listitemAddMul.findIndex(item=>item.machucnang===machucnang);
        if(indexAdd!==-1){
            listitemAddMul[indexAdd].hanhdong.push(hanhdong)
        }else{
            listitemAddMul.push({machucnang:machucnang,hanhdong:[hanhdong]});
        }
    }else{
        var indexRemove=listitemAddMul.findIndex(item=>item.machucnang===machucnang);
        if(indexRemove!==-1){
            listitemAddMul[indexRemove].hanhdong = listitemAddMul[indexRemove].hanhdong.filter(item => item !== hanhdong);
            if (listitemAddMul[indexRemove].hanhdong.length === 0) {
                listitemAddMul.splice(indexRemove, 1);
            }
        }
    }
}
$(document).on('click', "#add-admin-NQ", function () {
    getSizeinTable("nhomquyen", "NQ", "#ma_quyen")
    $('#addMulPhanQuyen').modal('hide');
    $("#addNhomQuyen").modal('show');
});

$(document).on('click', "#add-close", function () {
    $('#addMulPhanQuyen').modal('show');
});

$(document).on('click', "#addNhomQuyen", function () {
    var ma_nhomquyen = $("#ma_quyen").val();
    var ten_nhomquyen = $("#ten_quyen").val();
    if (checkSpace(ten_nhomquyen)) {
        $("#mess_tenquyen").html("Please input tenquyen");
    } else {
        $.ajax({
            url: "server/src/controller/NhomQuyenController.php",
            method: "POST",
            data: { action: "Add", maquyen: ma_nhomquyen, tenquyen: ten_nhomquyen },
            success: function (data) {
                console.log(data);
                $("form").trigger('reset');
                $("#addNhomQuyen").modal("hide");
                getSizeinTable("nhomquyen", "NQ", "#ma_quyen");
                getAllListNhomQuyen();    
                $('#addMulPhanQuyen').modal('show');
            }
        })
    }
});
