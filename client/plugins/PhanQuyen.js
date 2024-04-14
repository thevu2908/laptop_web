function phanquyen_chucnang(tenchucnang){
    $.ajax({
        url: "server/src/controller/ChucNangQuyenController.php",
        data: {action:"machucnang",tenchucnang:tenchucnang},
        method: "post",
        dataType:'json',
        success: function (data) {
            phanquyen(data['ma_chuc_nang']);
        }
    })
}
function phanquyen(machucnang){
    $.ajax({
        url:"server/src/controller/CTQuyenController.php",
        data:{action:"kiemtra" ,maquyen:$("#admin-nhomquyen").val(),machucnang:machucnang},
        method:"POST",
        success:function(data){
            var jsonData = JSON.parse(data);
            jsonData.some(item => item.hanh_dong === "Thêm")?$(".btn.btn-success.add").show():$(".btn.btn-success.add").hide();
            jsonData.some(item => item.hanh_dong === "Xóa")?$(".delete").show():$(".delete").hide();
            jsonData.some(item => item.hanh_dong === "Sửa")?$(".edit").show():$(".edit").hide();
        }
    })
}