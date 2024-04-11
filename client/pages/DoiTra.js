$(document).ready(function() {
    loadDoiTra()
    addDoiTra()
})
var listitemDoiTra=[]
function addDoiTra(){
    $("#admin-doitra-manhanvien").val("NV01")
    loadMaHoaDon();
    selectMaHoaDon();
    $(document).on("click","#admin-add-DoiTra",function(){
        listitemDoiTra=[];
        $('#tableChiTietDoiTra tbody tr').each(function() {
            var ime = $(this).find('td:nth-child(2)').text();
            var masanpham = $(this).find('td:nth-child(3)').text();
            var lydo = $(this).find('td:nth-child(4) input').val()
            var giasanpham = $(this).find('td:nth-child(5)').text()
            listitemDoiTra.push({ime:ime,masanpham:masanpham,lydo:lydo,giasanpham:giasanpham,soluong:1,thanhtien:giasanpham})
        });
        var date=new Date()
        var ngaydoitra = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        var maphieudoitra="PDT01";
        var mahoadon=$("#admin-select-mahoadon").val()
        var manhanvien=$("#admin-doitra-manhanvien").val()
        var thanhtien=0;
        var soluong=0;
        listitemDoiTra.forEach(item=>thanhtien+=Number.parseFloat(item.giasanpham))
        listitemDoiTra.forEach(item=>soluong+=Number.parseInt(item.soluong))
        var thanhtienSP=thanhtien;
        var tongsoluongSP=soluong;
        console.log(thanhtienSP,tongsoluongSP,manhanvien)
        callAddPhieuDoiTra(maphieudoitra,manhanvien,mahoadon,ngaydoitra,tongsoluongSP,thanhtienSP)
    })
}
function loadDoiTra(){
    var pageno = $("#currentpage").val();
    $.ajax({
        url:"server/src/controller/PaginationController.php",
        data: {action:"pagination", page: pageno,table:"phieudoitra"},
        method: "GET",
        dataType: "json",
        success:function(data){
            var jsondata=data.pagination;
            var html="";
            jsondata.forEach((phieudoitra,index) => {
                html+=`<tr>
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1">
                        <label for="checkbox1"></label>
                    </span>
                </td>
                <td>${phieudoitra['ma_pdt']}</td>
                <td>${phieudoitra['ma_hd']}</td>
                <td>${phieudoitra['ma_nv']}</td>
                <td>${phieudoitra['ngay_tra']}</td>
                <td>${phieudoitra['tong_so_luong']}</td>
                <td>${phieudoitra['tong_tien_tra']}</td>
                <td>
                    <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    <a href="#detailPhieuDoiTra" class="view" data-toggle="modal" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
                </td>
            </tr>`
            });
            $("#show-listDoiTra").html(html);
            phanquyen_chucnang("Đổi Trả");
            totalPage(data.count);
        }
    })
}
function callAddPhieuDoiTra(maphieudoitra,manhanvien,mahoadon,ngaydoitra,tongsoluongSP,thanhtienSP){
    console.log("ajax-1")
    $.ajax({
        url:"server/src/controller/PhieuDoiTraController.php",
        method:"POST",
        data:{action:"add",
        maphieudoitra:maphieudoitra,
        manhanvien:manhanvien,
        mahoadon:mahoadon,
        ngaydoitra:ngaydoitra,
        tongsoluongSP:tongsoluongSP,
        thanhtienSP:thanhtienSP},
        dataType:"json",
        success:function(data){
            console.log(data);
            callAddChiTietPhieuDoiTra(maphieudoitra,listitemDoiTra)
            $("#adminDoiTra").modal('hide');
            loadDoiTra()
        },error:function(xhr,status,error){
            console.error(xhr.responseText); 
        }
    })
}
function callAddChiTietPhieuDoiTra(maphieudoitra,listitemDoiTra){
    console.log("ajax-2")
    $.ajax({
        url:"server/src/controller/CTPhieuDoiTraController.php",
        method:"POST",
        data:{action:"add",maphieudoitra:maphieudoitra,listitemDoiTra:listitemDoiTra},
        dataType:"json",
        success:function(data){
            console.log(data);
        },error:function(xhr,status,error){
            console.error(xhr.responseText); 
        }
    })
}
function removeItem(element){
    var ime=element.dataset.row;
    console.log(ime);
    var indexToRemove = listitemDoiTra.findIndex(item => item.ime === ime);
    $(element).closest("tr").remove();
    if (indexToRemove !== -1) {
        listitemDoiTra.splice(indexToRemove, 1);
    }
    console.log(listitemDoiTra)
}
function loadMaHoaDon(){
    $.ajax({
        url:"server/src/controller/HoaDonController.php",
        method:"POST",
        data:{action:"getmahoadon"},
        dataType:"json",
        success:function(data){
            var html="<option value='choose' selected>Choose</option>";
            data.forEach((hoadon,index)=>{
                html+=`<option value="${hoadon['ma_hd']}">${hoadon['ma_hd']}</option>`
            })
            $("#admin-select-mahoadon").html(html)
        }
    })
}
function selectMaHoaDon(){
    $(document).on("change","#admin-select-mahoadon",function(){
        console.log($(this).val());
        $.ajax({
            url:"server/src/controller/CTHDController.php",
            method:"POST",
            data:{action:"getcthd",mahoadon:$(this).val()},
            dataType:"json",
            success:function(data){
                console.log(data);
                var html="";
                data.forEach((cthd,index)=>{
                    html+=`<tr>
                    <th scope="row">${index+1}</th>
                    <td scope="row">${cthd['ma_imei']}</td>
                    <td scope="row">${cthd['ma_ctsp']}</td>
                    <td scope="row">${cthd['ten_sp']}</td>
                    <td scope="row">${cthd['gia_sp']}</td>
                    <td scope="row"><i class="material-icons">&#xE147;</i></td>
                    </tr>`
                })
                $("#admin-showChitiethoadon").html(html);
            }
        })
    })
}
function chitietPhieuDoiTra(){
    
}
$("#tableChiTietHoaDon tbody").on("click", "tr", function(){
    var ime = $(this).find("td:eq(0)").text();
    var ID = $(this).find("td:eq(1)").text();
    var giasanpham = $(this).find("td:eq(3)").text();
    //var thanhtien = $(this).find("td:eq(3)").text();
    var tmp=false;
    $("#tableChiTietDoiTra tbody tr").each(function(){
        console.log($(this).find('td:nth-child(2)').text()+"-"+ime)
        if(ime===$(this).find('td:nth-child(2)').text()){
            tmp=true;
            return;
        }
    });
    if(!tmp){
        var newRow = `<tr data-row="${ime}">
                <th scope="row">1</th>
                <td scope="row">${ime}</td>
                <td scope="row">${ID}</td>
                <td scope="row"><input type="text" class="form-control"></td>
                <td scope="row">${giasanpham}</td>
                <td data-row="IME1" onclick="removeItem(this)"><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
                </tr>`;
        $("#tableChiTietDoiTra tbody").append(newRow);
    }
});
