$(document).ready(function() {
    var html=`<tr data-row="IME1">
    <th scope="row">1</th>
    <td scope="row">IME1</td>
    <td scope="row">Mark</td>
    <td scope="row"><input type="text" class="form-control"></td>
    <td scope="row">20000000</td>
    <td scope="row">20000000</td>
    <td data-row="IME1" onclick=removeItem(this)><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
</tr>
<tr data-row="IME2">
    <th scope="row">2</th>
    <td scope="row">IME2</td>
    <td scope="row">Mark</td>
    <td scope="row"><input type="text" class="form-control"></td>
    <td scope="row">30500000</td>
    <td scope="row">30500000</td>
    <td data-row="IME2" onclick=removeItem(this)><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
</tr><tr data-row="IME3">
<th scope="row">2</th>
<td scope="row">IME2</td>
<td scope="row">Mark</td>
<td scope="row"><input type="text" class="form-control"></td>
<td scope="row">40500000</td>
<td scope="row">40500000</td>
<td data-row="IME3" onclick=removeItem(this)><i class="material-icons" data-toggle="tooltip" title="Remove">&#xE872;</i></td>
</tr>`;
    $("#admin-showDoiTra").html(html)
    phanquyen_chucnang("Đổi Trả")
    getValue()
})
var listitemDoiTra=[]
function getValue(){
    //getNhanVien();
    $(document).on("click","#admin-add-DoiTra",function(){
        //var makhachhang=$("#admin-baohanh-makhachhang").val()
        // var mahoadon=$("#admin-select-mahoadon").val()
        // var manhanvien=$("#admin-doitra-manhanvien").val() //
        // var date=new Date()
        // var ngaybaohanh=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+":"+date.getHours()+"h-"+date.getMinutes()+"m-"+date.getSeconds()+"s"
        // console.log(mahoadon+" "+makhachhang+" "+manhanvien+" "+ngaybaohanh)
        // var arr=[];
        $('#tableChiTietDoiTra tbody tr').each(function() {
            var ime = $(this).find('td:nth-child(2)').text();
            var id = $(this).find('td:nth-child(3)').text();
            var lydo = $(this).find('td:nth-child(4) input').val()
            var giasanpham = $(this).find('td:nth-child(5)').text()
            var thanhtien = $(this).find('td:nth-child(6)').text()
            listitemDoiTra.push({ime:ime,lydo:lydo,giasanpham:giasanpham,soluong:1,thanhtien:thanhtien})
            // console.log("IME:", ime)
            // console.log("ID:", id)
            // console.log("Lý Do Bảo Hành:", lydo)
            // console.log("Giá Sản Phẩm:", giasanpham)
            // console.log("Thành Tiền:", thanhtien)
        });
        console.log(listitemDoiTra)    
    })
}
function removeItem(element){
    var ime=element.dataset.row;
    console.log(ime);
    $(element).closest("tr").remove();
    var indexToRemove = listitemDoiTra.findIndex(item => item.ime === ime);
    if (indexToRemove !== -1) {
        listitemDoiTra.splice(indexToRemove, 1);
    }
}
