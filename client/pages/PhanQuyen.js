function phanquyen(machucnang){
    $.ajax({
        url:"server/src/controller/CTQuyenController.php",
        data:{action:"kiemtra" ,maquyen:$("#ad-maquyen").val(),machucnang:machucnang},
        method:"POST",
        success:function(data){
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            jsonData.some(item => item.hanh_dong === "Thêm")?$(".btn.btn-success.add").show():$(".btn.btn-success.add").hide();
            jsonData.some(item => item.hanh_dong === "Xóa")?$(".delete").show():$(".delete").hide();
            jsonData.some(item => item.hanh_dong === "Sửa")?$(".edit").show():$(".edit").hide();
        }
    })
}