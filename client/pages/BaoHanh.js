$(document).ready(function() {
    getValue();
    //selectMaHoaDon();
})

function getValue(){
    getNhanVien();
    $(document).on("click","#admin-add-BaoHanh",function(){
        var mahoadon=$("#admin-select-mahoadon").val()
        var makhachhang=$("#admin-baohanh-makhachhang").val()
        var manhanvien=$("#admin-baohanh-manhanvien").val() //
        var date=new Date()
        var ngaybaohanh=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+":"+date.getHours()+"h-"+date.getMinutes()+"m-"+date.getSeconds()+"s"
        console.log(mahoadon+" "+makhachhang+" "+manhanvien+" "+ngaybaohanh)
        var arr=[];
        $('#tableChiTietBaoHanh tbody tr').each(function() {
            var ime = $(this).find('td:nth-child(2)').text();
            var id = $(this).find('td:nth-child(3)').text();
            var lyDoBaoHanh = $(this).find('td:nth-child(4) input').val();
            var noiDungBaoHanh = $(this).find('td:nth-child(5) input').val();
            console.log("IME:", ime);
            console.log("ID:", id);
            console.log("Lý Do Bảo Hành:", lyDoBaoHanh);
            console.log("Nội Dung Bảo Hành:", noiDungBaoHanh);
        });

    
    })
}
function selectMaHoaDon(){
    $(document).on("change","#admin-select-mahoadon",function(){
        loadChiTietHoaDon($(this).val())
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
function loadChiTietHoaDon(mahoadon){
    if(mahoadon !="choose"){
        console.log(mahoadon)
    }else{
        console.log("Please select")
    }
    // $.ajax({
    //     url:"server/src/controller/CTHoaDonController.php",
    //     data:{action:"loadChiTietHoaDon",mahoadon:mahoadon},
    //     method:"POST",
    //     success:function(data){
    //         var html="";
    //         var jsonData = JSON.parse(data);
    //         console.log(jsonData);
    //         $("#admin-showChitiethoadon").html();
    //     }
    // })
}