$(document).ready(function() {
    phanquyen_chucnang("Bảo Hành")
    getAdd();
})
var listitemBaoHanh=[];
function getAdd(){
    loadMaHoaDon()
    selectMaHoaDon();
    //getNhanVien();
    $(document).on("click","#admin-add-BaoHanh",function(){
        var mahoadon=$("#admin-select-mahoadon").val()
        var makhachhang=$("#admin-baohanh-makhachhang").val()
        var manhanvien=$("#admin-baohanh-manhanvien").val()
        var date=new Date()
        var ngaybaohanh=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+":"+date.getHours()+"h-"+date.getMinutes()+"m-"+date.getSeconds()+"s"
        console.log(mahoadon+" "+makhachhang+" "+manhanvien+" "+ngaybaohanh)
        listitemBaoHanh=[];
        $('#tableChiTietBaoHanh tbody tr').each(function() {
            var ime = $(this).find('td:nth-child(2)').text();
            var id = $(this).find('td:nth-child(3)').text();
            var lyDoBaoHanh = $(this).find('td:nth-child(4) input').val();
            var noiDungBaoHanh = $(this).find('td:nth-child(5) input').val();
            console.log("IME:", ime);
            console.log("ID:", id);
            console.log("Lý Do Bảo Hành:", lyDoBaoHanh);
            console.log("Nội Dung Bảo Hành:", noiDungBaoHanh);
            listitemBaoHanh.push({ime:ime,id:id,lyDoBaoHanh:lyDoBaoHanh,noiDungBaoHanh:noiDungBaoHanh,soluong:1})
        });
        console.log(listitemBaoHanh);
    
    })
}
function removeItem(element){
    var ime=element.dataset.row;
    console.log(ime);
    var indexToRemove = listitemBaoHanh.findIndex(item => item.ime === ime);
    $(element).closest("tr").remove();
    if (indexToRemove !== -1) {
        listitemBaoHanh.splice(indexToRemove, 1);
    }
    console.log(listitemBaoHanh)
}
function selectMaHoaDon(){
    $(document).on("change","#admin-select-mahoadon",function(){
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
function getNhanVien(){
    $.ajax({
        url:"server/src/controller/NhanVienController.php",
        data:{action:"load"},
        method:"POST",
        success:function(data){
            var html="";
            var jsonData = JSON.parse(data);
            jsonData.forEach((nhanvien,index) => {
                html+=`<option value="${nhanvien['0']}">${nhanvien['0']}-${nhanvien['1']}</option>`;
            });
            $("#admin-baohanh-manhanvien").html(html);
        }
    })
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
$("#tableChiTietHoaDon tbody").on("click", "tr", function(){
    var ime = $(this).find("td:eq(0)").text();
    var ID = $(this).find("td:eq(1)").text();
    var ten = $(this).find("td:eq(2)").text();
    var giasanpham=$(this).find("td:eq(3)").text();
    console.log(ime, ID, ten, giasanpham);
    var tmp=false;
    $("#tableChiTietBaoHanh tbody tr").each(function(){
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
                <td scope="row"><input type="text" class="form-control"></td>
                <td scope="row">${giasanpham}</td>
                <td data-row="IME1" onclick="removeItem(this)"><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
                </tr>`;
        $("#tableChiTietBaoHanh tbody").append(newRow);
    }
});