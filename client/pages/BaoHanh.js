$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'baohanh') {
        loadBaoHanh()
        clickPage(loadBaoHanh)
        addBaoHanh()
    }
    TraCuu()
    kiemtrathoigianbaohanh()
    // loadBaoHanh()
    // clickPage(loadBaoHanh)
    // addBaoHanh()
    // TraCuu()
    // kiemtrathoigianbaohanh()
    //$('#addBaoHanh').modal({backdrop: 'static', keyboard: false})
})
var listitemBaoHanh=[];
function addBaoHanh(){
    getSizeinTable("phieubaohanh","BH","#admin-mabaohanh");
    loadMaHoaDon()
    selectMaHoaDon();
    $(document).on("click","#admin-add-BaoHanh",function(){
        var maphieubaohanh=$("#admin-mabaohanh").val();
        var mahoadon=$("#admin-select-mahoadon").val();
        var makhachhang=$("#admin-baohanh-makhachhang").val().split("-")[0];
        var manhanvien="NV01";
        var date=new Date()
        var tinhtrangbaohanh=$("#admin-select-trinhtrang").val();
        listitemBaoHanh=[];
        $('#tableChiTietBaoHanh tbody tr').each(function() {
            var ime = $(this).find('td:nth-child(2)').text();
            var masanpham = $(this).find('td:nth-child(3)').text();
            var lyDoBaoHanh = $(this).find('td:nth-child(4) textarea').val();
            var noiDungBaoHanh = $(this).find('td:nth-child(5) textarea').val();
            console.log("IME:", ime);
            console.log("ID:", masanpham);
            console.log("Lý Do Bảo Hành:", lyDoBaoHanh);
            console.log("Nội Dung Bảo Hành:", noiDungBaoHanh);
            listitemBaoHanh.push({ime:ime,masanpham:masanpham,lyDoBaoHanh:lyDoBaoHanh,noiDungBaoHanh:noiDungBaoHanh})
            console.log(noiDungBaoHanh+"---"+lyDoBaoHanh)
            //listitemBaoHanh.push({ime:ime,masanpham:masanpham,lyDoBaoHanh:"Bung Chân Ốc Bản Lề",noiDungBaoHanh:noiDungBaoHanh})
        });
        console.log(maphieubaohanh);
        console.log(mahoadon);
        console.log(makhachhang+"------")
        console.log(manhanvien);
        console.log(tinhtrangbaohanh);
        console.log(listitemBaoHanh);
        if(checkSpace(manhanvien) && checkSpace(mahoadon)){
            alert("Vui lòng chọn nhân viên");
        }else if(mahoadon=="choose"){
            alert("Vui lòng chọn mã hóa đơn");
        }else if(checkSpace(manhanvien)){
            alert("Vui lòng chọn nhân viên");
        }else if(listitemBaoHanh.length===0){
            alert("Vui lòng chọn sản phẩm cần bảo hành");
        }else{
            addPhieuBaoHanh(maphieubaohanh,mahoadon,makhachhang,manhanvien,tinhtrangbaohanh)
            //console.log(noiDungBaoHanh+"---"+lyDoBaoHanh)
        }
    
    })
}
function addPhieuBaoHanh(maphieubaohanh,mahoadon,makhachhang,manhanvien,tinhtrangbaohanh) {
    $.ajax({
        url:"server/src/controller/PhieuBaoHanhController.php",
        data:{action:"add",maphieubaohanh:maphieubaohanh,mahoadon:mahoadon,makhachhang:makhachhang,manhanvien:manhanvien,tinhtrangbaohanh:tinhtrangbaohanh},
        method:"POST",
        dataType:"json",
        success:function(data){
            console.log(data);
            addChiTietPhieuBaoHanh(maphieubaohanh,listitemBaoHanh);
            clearModal()
            $("#addBaoHanh").modal("hide");
            loadBaoHanh();
        },error:function(xhr,status,error){
            console.error(xhr.responseText); 
        }
    })
}
function addChiTietPhieuBaoHanh(maphieubaohanh,listitemBaoHanh){
    $.ajax({
        url:"server/src/controller/CTPhieuBaoHanhController.php",
        data:{action:"add",maphieubaohanh:maphieubaohanh,listitemBaoHanh:listitemBaoHanh},
        method:"POST",
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
    var indexToRemove = listitemBaoHanh.findIndex(item => item.ime === ime);
    $(element).closest("tr").remove();
    if (indexToRemove !== -1) {
        listitemBaoHanh.splice(indexToRemove, 1);
    }
    console.log(listitemBaoHanh)
}
function selectMaHoaDon(){
    $("#show-mess").text("")
    $(document).on("change","#admin-select-mahoadon",function(){
        var mahoadon=$(this).val();
        $.ajax({
            url:"server/src/controller/CTHDController.php",
            method:"POST",
            data:{action:"getcthd",mahoadon:mahoadon},
            dataType:"json",
            success:function(data){
                var count=0;
                if(data!==null){
                    var html="";
                    data.forEach((cthd,index)=>{
                        count++;
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
                }else{
                    $("#show-mess").text("Sản Phẩm Thuộc Hóa Đơn Đã Được Đổi Hoặc Trả");
                }
                if(count==0){
                    $("#show-mess").val("Sản Phẩm Thuộc Hóa Đơn Đã Được Đổi Hoặc Trả");
                }
                ThongTinKhachHang(mahoadon);
            }
        })
    })
}
function ThongTinKhachHang(mahoadon){
    $.ajax({
        url:"server/src/controller/HoaDonController.php",
        method:"POST",
        data:{action:"getkhachhang",id:mahoadon},
        dataType:"json",
        success:function(data){
            if(data!==null){
                var khachhang=data['ma_kh']+"-"+data['ten_kh'];
                console.log(khachhang)
                $("#admin-baohanh-makhachhang").val(khachhang);
            }else{
                $("#admin-baohanh-makhachhang").val("");
            }
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
function loadBaoHanh(){
    var pageno = $("#currentpage").val();
    $.ajax({
        url:"server/src/controller/PaginationController.php",
        data: {action:"pagination", page: pageno,table:"phieubaohanh"},
        method: "GET",
        dataType: "json",
        success:function(data){
            var jsondata=data.pagination;
            var html="";
            jsondata.forEach((phieubaohanh,index) => {
                html+=`<tr>
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1">
                        <label for="checkbox1"></label>
                    </span>
                </td>
                <td>${phieubaohanh['ma_pbh']}</td>
                <td>${phieubaohanh['ma_nv']}</td>
                <td id='ma_nv_${index}'>${phieubaohanh['ma_hd']}</td>
                <td>${phieubaohanh['ma_kh']}</td>
                <td>${phieubaohanh['ngay_bao_hanh']}</td>
                <td>${checkTime(phieubaohanh['ngay_tra'])?" ":phieubaohanh['ngay_tra']}</td>
                <td>${phieubaohanh['tinh_trang']}</td>
                <td data-row=${phieubaohanh['ma_pbh']}>
                    <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    <a href="#detailPhieuBaoHanh" class="view" data-toggle="modal" title="View" data-toggle="tooltip" data-row=${phieubaohanh['ma_pbh']} onclick="ShowChiTietBaoHanh(this)"><i class="material-icons">&#xE417;</i></a>
                </td>
            </tr>`
            });
            jsondata.forEach((phieubaohanh,index) => {
                getTenNhanVien(phieubaohanh['ma_kh'],index)
            })
            $("#show-listBaoHanh").html(html);
            getSizeinTable("phieubaohanh","BH","#admin-mabaohanh");
            phanquyen_chucnang("Bảo Hành");
            totalPage(data.count);
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
                <td>${ime}</td>
                <td>${ID}</td>
                <td><textarea class="form-control" rows="6" cols="100"></textarea>
                <td><textarea class="form-control" rows="6" cols="100"></textarea>
                <td>${giasanpham}</td>
                <td data-row="IME1" onclick="removeItem(this)"><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
                </tr>`;
        $("#tableChiTietBaoHanh tbody").append(newRow);
    }
});
function checkTime(str){
    console.log(typeof str);
    if (str.startsWith('0000')) {
        return true;
    } else {
        return false;
    }
}
function tinhNgayBaoHanh(ngaymua){
    ngaymua=new Date(ngaymua);
    var ngayhethan=new Date(ngaymua);
    ngayhethan.setFullYear(ngaymua.getFullYear() + 1);
    var ngayHienTai = new Date();
    var soNgayConLai = Math.floor((ngayhethan - ngayHienTai) / (1000 * 60 * 60 * 24));
    return soNgayConLai;
}
function kiemtrathoigianbaohanh(){
    hinhthuctracuu="imei";
    $(document).on("change","#admin-select-hinhthuctracuu", function(){
        hinhthuctracuu=$(this).val();
        $("#ketqua-tracuu").html("");
        $("#thoigian-imei").val("")

    })
    $(document).on("click","#btnTraCuuThoiGian",function(){
        thoigianbaohanh(hinhthuctracuu,$("#thoigian-imei").val())
    })
}
function thoigianbaohanh(hinhthuc,data){
    $.ajax({
        url:"server/src/controller/PhieuBaoHanhController.php",
        data:{action:"tracuuthoigianbaohanh",hinhthuc:hinhthuc,data:data},
        method:"POST",
        dataType:"json",
        success:function(data){
            var html="";
            console.log(data);
            data.forEach((item,index)=>{
                html+=`<p>Mã Hóa Đơn: ${item['ma_hd']}<br>Ngày Mua:${item['ngay_tao']}<br>Mã IMEI: ${item['ma_imei']}<br>Sản Phẩm: ${item['ten_sp']}<br>Thời Gian Bảo Hành: 12 tháng<br>Thời Gian Bảo Hành Còn Lại: ${tinhNgayBaoHanh(item['ngay_tao'])}</p>`;
            })
            $("#ketqua-tracuu").html(html);
        }
    })
}
function TraCuu(){
    $(document).on('click',"#tracuu",function(){
        var ime=$("#imei").val();
        if(ime==""){
            $("#show-err").text("Please input");
            $("#show-listTraCuu").html("")
        }else{
            $("#show-err").text("");
            TraCuuBaoHanh(ime);
        }
    })
}
function TraCuuBaoHanh(ime){
    $.ajax({
        url:"server/src/controller/PhieuBaoHanhController.php",
        data:{action:"tracuubaohanh",ma_imei:ime},
        method:"POST",
        dataType:"json",
        success:function(data){
            var html="";
            console.log(data);
            if(data!=[]){
                data.forEach((phieubaohanh,index) => {
                    html+=`<tr>
                    <td>${phieubaohanh['ma_imei']}</td>
                    <td>${phieubaohanh['ten_sp']}</td>
                    <td>${phieubaohanh['ngay_bao_hanh']}</td>
                    <td>${checkTime(phieubaohanh['ngay_tra'])?" ":phieubaohanh['ngay_tra']}</td>
                    <td>${phieubaohanh['ly_do']}</td>
                    <td>${phieubaohanh['noi_dung_bao_hanh']}</td>
                    <td>${phieubaohanh['tinh_trang']}</td>
                    <td><img src="${phieubaohanh['hinh_anh']}" alt="Hình ảnh" style="max-width: 100px; max-height: 100px;"></td>
                    </tr>`;
                })
                $("#show-listTraCuu").html(html);
            }else{
                $("#show-listTraCuu").html(html);
            }
        },error:function(xhr,status,error){
            console.error(xhr.responseText); 
        }
    })
}
function getTenNhanVien(makhachhang,index){
    $.ajax({
        url:"server/src/controller/KhachHangController.php",
        data:{action:"get-khachhang",id:makhachhang},
        method:"POST",
        dataType:"json",
        success:function(data){
            $("#ma_nv_"+index+"").text(data['ten_kh'])
        }
    })
}
function clearModal(){
    $("#admin-select-mahoadon").prop("selectedIndex", 0);
    $("#admin-baohanh-manhanvien").val('');
    $("#admin-baohanh-makhachhang").val('');
    $("#show-adminBaoHanh").html("");
    $("#admin-showChitiethoadon").html("");
}
$(document).on("click","#btnCancelTraCuu",function(){
    $("#ketqua-tracuu").html("");
    $("#thoigian-imei").val("")
})
function updatePhieuBaoHanh(mapbh){
    $(document).on("click","#admin-updateChiTietBaoHanh",function(){
        var tinhtrang=$("#admin-updateBaoHanh").val();
        console.log(tinhtrang)
        if(tinhtrang==="Đã Bảo Hành"){
            $.ajax({
                url:"server/src/controller/PhieuBaoHanhController.php",
                data:{action:"updatephieubaohanh",mapbh:mapbh},
                method:"POST",
                dataType:"json",
                success:function(data){
                    loadBaoHanh();
                }
            })
        }
    })
}
function showTinhTrang(mapbh){
    $.ajax({
        url:"server/src/controller/PhieuBaoHanhController.php",
        data:{action:"tinhtrangbaohanh",mapbh:mapbh},
        method:"POST",
        dataType:"json",
        success:function(data){
            $("#admin-updateBaoHanh").val(data['tinh_trang'])
            if(data['tinh_trang']==="Đã Bảo Hành"){
                $("#admin-updateBaoHanh").prop("disabled",true);
            }else{
                $("#admin-updateBaoHanh").prop("disabled",false);
            }
        }
    })
}
function ShowChiTietBaoHanh(obj){
    var mapbh=obj.dataset.row;
    $.ajax({
        url:"server/src/controller/PhieuBaoHanhController.php",
        data:{action:"xemchitietphieubaohanh",mapbh:mapbh},
        method:"POST",
        dataType:"json",
        success:function(data){
            var html="";
            console.log(data);
            data.forEach((item,index)=>{
                html+=`<tr>
                <td>${index+1}</td>
                <td>${item['ma_imei']}</td>
                <td>${item['ten_sp']}</td>
                <td>${item['ly_do']}</td>
                <td>${item['noi_dung_bao_hanh']}</td>
                </tr>`;
            })
            $("#admin-showChiTietBaoHanh").html(html);
        }
    })
    showTinhTrang(mapbh);
    updatePhieuBaoHanh(mapbh)
}