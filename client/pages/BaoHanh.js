$(document).ready(function() {
    loadBaoHanh()
    addBaoHanh()
    TraCuu()
})
var listitemBaoHanh=[];
function addBaoHanh(){
    loadMaHoaDon()
    selectMaHoaDon();
    $(document).on("click","#admin-add-BaoHanh",function(){
        var maphieubaohanh="BH01";
        var mahoadon=$("#admin-select-mahoadon").val();
        var makhachhang=$("#admin-baohanh-makhachhang").val().split("-")[0];
        var manhanvien="NV01";
        var date=new Date()
        var ngaybaohanh=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+":"+date.getHours()+"h-"+date.getMinutes()+"m-"+date.getSeconds()+"s";
        var tinhtrangbaohanh=$("#admin-select-trinhtrang").val();
        listitemBaoHanh=[];
        $('#tableChiTietBaoHanh tbody tr').each(function() {
            var ime = $(this).find('td:nth-child(2)').text();
            var masanpham = $(this).find('td:nth-child(3)').text();
            var lyDoBaoHanh = $(this).find('td:nth-child(4) input').val();
            var noiDungBaoHanh = $(this).find('td:nth-child(5) input').val();
            console.log("IME:", ime);
            console.log("ID:", masanpham);
            console.log("Lý Do Bảo Hành:", lyDoBaoHanh);
            console.log("Nội Dung Bảo Hành:", noiDungBaoHanh);
            listitemBaoHanh.push({ime:ime,masanpham:masanpham,lyDoBaoHanh:lyDoBaoHanh,noiDungBaoHanh:noiDungBaoHanh})
        });
        console.log(maphieubaohanh);
        console.log(mahoadon);
        console.log(makhachhang+"------")
        console.log(manhanvien);
        console.log(tinhtrangbaohanh);
        console.log(listitemBaoHanh);
        addPhieuBaoHanh(maphieubaohanh,mahoadon,makhachhang,manhanvien,tinhtrangbaohanh);
    
    })
}
function addPhieuBaoHanh(maphieubaohanh,mahoadon,makhachhang,manhanvien,tinhtrangbaohanh) {
    console.log("AAAAAAAAAAAA")
    $.ajax({
        url:"server/src/controller/PhieuBaoHanhController.php",
        data:{action:"add",maphieubaohanh:maphieubaohanh,mahoadon:mahoadon,makhachhang:makhachhang,manhanvien:manhanvien,tinhtrangbaohanh:tinhtrangbaohanh},
        method:"POST",
        dataType:"json",
        success:function(data){
            console.log(data);
            addChiTietPhieuBaoHanh(maphieubaohanh,listitemBaoHanh);
            loadBaoHanh();
        },error:function(xhr,status,error){
            console.error(xhr.responseText); 
        }
    })
}
function addChiTietPhieuBaoHanh(maphieubaohanh,listitemBaoHanh){
    console.log("BBBBBBBBB")
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
// function getNhanVien(){
//     $.ajax({
//         url:"server/src/controller/NhanVienController.php",
//         data:{action:"load"},
//         method:"POST",
//         success:function(data){
//             var html="";
//             var jsonData = JSON.parse(data);
//             jsonData.forEach((nhanvien,index) => {
//                 html+=`<option value="${nhanvien['0']}">${nhanvien['0']}-${nhanvien['1']}</option>`;
//             });
//             $("#admin-baohanh-manhanvien").html(html);
//         }
//     })
// }
// function getKhachHang(){
//     $.ajax({
//         url:"server/src/controller/KhachHangController.php",
//         data:{action:"get-khachhang"},
//         method:"POST",
//         dataType:"json",
//         success:function(data){
//             $("#admin-baohanh-manhanvien").html(html);
//         }
//     })
// }
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
                <td>${phieubaohanh['ma_kh']}</td>
                <td>${phieubaohanh['ma_hd']}</td>
                <td>${phieubaohanh['ngay_bao_hanh']}</td>
                <td>${checkTime(phieubaohanh['ngay_tra'])?" ":phieubaohanh['ngay_tra']}</td>
                <td>${phieubaohanh['tinh_trang']}</td>
                <td>
                    <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    <a href="#detailPhieuBaoHanh" class="view" data-toggle="modal" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
                </td>
            </tr>`
            });
            $("#show-listBaoHanh").html(html);
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
function checkTime(str){
    console.log(str);
    if (str.startsWith('0000')) {
        return true;
    } else {
        return false;
    }
}
function TraCuu(){
    $(document).on('click',"#tracuu",function(){
        var ime=$("#imei").val();
        if(ime==""){
            $("#show-err").text("Please input");
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
            console.log(data['hinh_anh']);
            if(data!==null){
                    html=`<tr>
                    <td>${data['ma_imei']}</td>
                    <td>${data['ten_sp']}</td>
                    <td>${data['ngay_bao_hanh']}</td>
                    <td>${checkTime(data['ngay_tra'])?" ":data['ngay_tra']}</td>
                    <td>${data['ly_do']}</td>
                    <td>${data['noi_dung_bao_hanh']}</td>
                    <td>${data['tinh_trang']}</td>
                    <td><img src="${data['hinh_anh']}" alt="Hình ảnh sản phẩm" style="max-width: 100px; max-height: 100px;"></td>
                    </tr>`;
                    $("#show-listTraCuu").html(html);
            }else{

            }
        },error:function(xhr,status,error){
            console.error(xhr.responseText); 
        }
    })
}