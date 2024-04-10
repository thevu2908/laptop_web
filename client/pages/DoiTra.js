$(document).ready(function() {
//     var html=`<tr data-row="IME1">
//     <th scope="row">1</th>
//     <td scope="row">IME1</td>
//     <td scope="row">Mark</td>
//     <td scope="row"><input type="text" class="form-control"></td>
//     <td scope="row">20000000</td>
//     <td scope="row">20000000</td>
//     <td data-row="IME1" onclick=removeItem(this)><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
// </tr>
// <tr data-row="IME2">
//     <th scope="row">2</th>
//     <td scope="row">IME2</td>
//     <td scope="row">Mark</td>
//     <td scope="row"><input type="text" class="form-control"></td>
//     <td scope="row">30500000</td>
//     <td scope="row">30500000</td>
//     <td data-row="IME2" onclick=removeItem(this)><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
// </tr><tr data-row="IME3">
// <th scope="row">2</th>
// <td scope="row">IME3</td>
// <td scope="row">Mark</td>
// <td scope="row"><input type="text" class="form-control"></td>
// <td scope="row">40500000</td>
// <td scope="row">40500000</td>
// <td data-row="IME3" onclick=removeItem(this)><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
// </tr>`;
//     $("#admin-showDoiTra").html(html)
    phanquyen_chucnang("Đổi Trả")
    getValue()
})
var listitemDoiTra=[]
function getValue(){
    //getNhanVien();
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
        var ngaydoitra=date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+":"+date.getHours()+"h-"+date.getMinutes()+"m-"+date.getSeconds()+"s"
        var maphieudoitra="PDT01";
        var mahoadon=$("#admin-select-mahoadon").val()
        var manhanvien=$("#admin-doitra-manhanvien").val()
        var thanhtien=0;
        var soluong=0;
        listitemDoiTra.forEach(item=>thanhtien+=Number.parseFloat(item.giasanpham))
        listitemDoiTra.forEach(item=>soluong+=Number.parseInt(item.soluong))
        var thanhtienSP=thanhtien;
        var tongsoluongSP=soluong;
        console.log("--------------")
        console.log(maphieudoitra)
        console.log(mahoadon)
        console.log(manhanvien)
        console.log(ngaydoitra)
        console.log(thanhtienSP)
        console.log(tongsoluongSP)
        console.log(listitemDoiTra) 
        console.log("--------------")   
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
function selectMaHoaDon(){
    $(document).on("change","#admin-select-mahoadon",function(){
        console.log($(this).val());
        $.ajax({
            url:"server/src/controller/CTHDController.php",
            method:"POST",
            data:{action:"getcthd",mahoadon:$(this).val()},
            success:function(data){
                console.log(data);
                var html=`<tr>
                <th scope="row">1</th>
                <td scope="row">IME4</td>
                <td scope="row">SP1</td>
                <td scope="row">LapTop</td>
                <td scope="row">30500000</td>
                <td scope="row"><i class="material-icons">&#xE147;</i></td>
                </tr>`;
                //$("#admin-showChitiethoadon").html("");
            }
        })
    })
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
