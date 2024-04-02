
$(document).ready(function(){
    loadNhomQuyen();
    $(document).on("click", "ul.pagination li a", function (e) {
        e.preventDefault();
        var $this = $(this);
        const pagenum = $this.data("page");
        $("#currentpage").val(pagenum);
        loadNhomQuyen();
        $this.parent().siblings().removeClass("active");
        $this.parent().addClass("active");
    });
    addNhomQuyen();
    deleteNhomQuyen();
    updateNhomQuyen();
    getNhomQuyen();
    searchNhomQuyen();
    detailNhomQuyen();
})
function addNhomQuyen(){
    $(document).on('click',"#addNhomQuyen",function(){
        var ma_nhomquyen=$("#ma_quyen").val();
        var ten_nhomquyen=$("#ten_quyen").val();
        if(ma_nhomquyen=="" && ten_nhomquyen==""){
            $("#mess_maquyen").html("Please input maquyen");
            $("#mess_tenquyen").html("Please input tenquyen");
        }else if(ma_nhomquyen==""){
            $("#mess_maquyen").html("Please input maquyen");
        }
        else if(ten_nhomquyen==""){
            $("#mess_tenquyen").html("Please input tenquyen");
        }else{
            $.ajax({
                url:"server/src/controller/NhomQuyenController.php",
                method:"POST",
                data:{action:"Add", maquyen:ma_nhomquyen, tenquyen:ten_nhomquyen},
                success:function(data){
                    console.log(data);
                    $("form").trigger('reset');
                    $("#addNhomQuyen").modal("hide");
                    loadNhomQuyen();
                }
            })
        }
    })
}
function loadNhomQuyen(){
    var pageno = $("#currentpage").val();
    $.ajax({
        url: "server/src/controller/PanigationController.php",
        data: {action:"panigation", page: pageno,table:"nhomquyen"},
        method: "GET",
        dataType: "json",
        success:function(data){
            render(data);
        }
    }) 
}
function searchNhomQuyen(){
    $(document).on("keyup","#search",function(){
        var search=$(this).val();
        console.log(search);
        $.ajax({
            url:"server/src/controller/NhomQuyenController.php",
            method:"POST",
            data:{action:"Search",search:search},
            success:function(data){
                render(data);
            }
        })
    })
}
function render(data){
    var html="";
            //console.log(data);
            if (true) {
                var jsonData=data.panigation;
                
                    jsonData.forEach((nhomquyen,index) => {
                        html+=`<tr>
                        <td>
                            <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox1" name="chk[]" value="1">
                                <label for="checkbox1"></label>
                            </span>
                        </td>
                        <td>${nhomquyen['ma_quyen']}</td>
                        <td>${nhomquyen['ten_quyen']}</td>
                        <td><span class="status text-success">&bull;</span> Active</td>
                        <td id="container">
                            <a id="btnUp" href="#editNhomQuyen" class="edit" data-toggle="modal" data-id=${nhomquyen['ma_quyen']}><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a id="btnDel" href="#deleteNhomQuyen" class="delete" data-toggle="modal" data-id1=${nhomquyen['ma_quyen']}><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            <a id="btnDetail" href="#detailNhomQuyen" class="view" data-id2=${nhomquyen['ma_quyen']} data-toggle="modal"><i class="material-icons">&#xE417;</i></a>
                        </td>
                    </tr>`
                    });
            }
            $("#show-listNhomQuyen").html(html);
            // $.ajax({
            //     url:"server/src/controller/CTQuyenController.php",
            //     data:{action:"kiemtra" ,maquyen:$("#ad-maquyen").val(),machucnang:"CN002"},
            //     method:"POST",
            //     success:function(data){
            //         var jsonData = JSON.parse(data);
            //         console.log(jsonData);
            //         jsonData.some(item => item.hanh_dong === "Thêm")?$(".btn.btn-success.add").show():$(".btn.btn-success.add").hide();
            //         jsonData.some(item => item.hanh_dong === "Xóa")?$(".delete").show():$(".delete").hide();
            //         jsonData.some(item => item.hanh_dong === "Sửa")?$(".edit").show():$(".edit").hide();
            //     }
            // })
            phanquyen("CN002")
            totalPage(data.count);
            // let total = data.count;
            // console.log(total);
            // let totalpages = Math.ceil(parseInt(total) / 4);
            // const currentpage = $("#currentpage").val();
            // pagination(totalpages, currentpage);
}

function loadNhomQuyenDataAccount() {
    $.ajax({
        url:"server/src/controller/NhomQuyenController.php",
        method:"POST",
        data:{ action: 'Load' },
        success: data => {
            if (data && data.length > 0) {
                let html = '';
                const jsonData = JSON.parse(data);

                jsonData.forEach((nhomquyen, index) => {
                    const selected = index === 0 ? 'selected' : '';
                    html += `<option value='${nhomquyen['ma_quyen']}' ${selected}>${nhomquyen['ten_quyen']}</option>`
                })

                $("#admin-account-access").html(html);
                $("#admin-account-access-edit").html(html);
            }
        }
    }) 
}

function deleteNhomQuyen() {
    $(document).on("click","#btnDel",function(){
        console.log(id);
        $("#deleteNhomQuyen").modal('show');
        $(document).on("click","#btnDelete",function(){
            $.ajax({
                url:"server/src/controller/NhomQuyenController.php",
                method:"POST",
                data:{id:id,action:"Delete"},
                success:function(data){
                    $("#deleteNhomQuyen").modal('hide');
                    loadNhomQuyen();
                }
            })
        })
    })
}
function getNhomQuyen(){
    $(document).on("click","#btnUp",function(){
            var id=$(this).attr("data-id");
            $.ajax({
                url:"server/src/controller/NhomQuyenController.php",
                method:"POST",
                data:{action:"Get",id:id},
                dataType:"JSON",
                success:function(data){
                    $("#maquyen").val(data.ma_quyen);
                    $("#tenquyen").val(data.ten_quyen);
                    
                }
            })
    })
}

function showTenNhomQuyenAccount(id, index) {
    $.ajax({
        url: "server/src/controller/NhomQuyenController.php",
        method: "POST",
        data: { action: 'Get', id: id },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                $(`.admin-accounnt-accessname-${index}`).append(data['ten_quyen'])
            }
        }
    })
}

function updateNhomQuyen() {
    $(document).on("click","#btnUpdate",function(){
        var maquyen=$("#maquyen").val();
        var tenquyen=$("#tenquyen").val();
        $.ajax({
            url:"server/src/controller/NhomQuyenController.php",
            method:"POST",
            data:{action:"Update",maquyen:maquyen,tenquyen:tenquyen},
            success:function(data){
                $("form").trigger('reset');
                $("#editNhomQuyen").modal('hide');
                loadNhomQuyen();
            }
        })
    })
}

function searchNhomQuyen() {
    $(document).on("keyup","#search",function(){
        var search=$(this).val();
        console.log(search);
        $.ajax({
            url:"server/src/controller/NhomQuyenController.php",
            method:"POST",
            data:{action:"Search",search:search},
            success:function(data){
            var html="";
            var jsonData=JSON.parse(data);
            if(data.length>0){
                jsonData.forEach((nhomquyen,index) => {
                    html+=`<tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox1" name="options[]" value="1">
                            <label for="checkbox1"></label>
                        </span>
                    </td>
                    <td>${nhomquyen['ma_quyen']}</td>
                    <td>${nhomquyen['ten_quyen']}</td>
                    <td><span class="status text-success">&bull;</span> Active</td>
                    <td>
                        <a id="btnUp" href="#editNhomQuyen" class="edit" data-toggle="modal" data-id=${nhomquyen['ma_quyen']}><i class="material-icons" data-toggle="tooltip" title="Edit" id="editIcon">&#xE254;</i></a>
                        <a id="btnDel" href="#deleteNhomQuyen" class="delete" data-toggle="modal" data-id1=${nhomquyen['ma_quyen']}><i class="material-icons" data-toggle="tooltip" title="Delete" id="deleteIcon">&#xE872;</i></a>
                        <a id="btnDetail" href="#detailNhomQuyen" class="view" title="View" data-id2=${nhomquyen['ma_quyen']} data-toggle="modal"><i class="material-icons">&#xE417;</i></a>
                        <a href="#" class="Status" title="Status"><input type="checkbox" checked data-toggle="toggle" data-onstyle="danger" data-height=""></a>
                    </td>
                </tr>`
                });
            }
            $("#show-listNhomQuyen").html(html);
            }
        })
    })
}

function detailNhomQuyen() {
    $(document).on("click","#btnDetail",function(){
        var id=$(this).attr("data-id2");
        console.log(id);
        $.ajax({
            url:"server/src/controller/NhomQuyenController.php",
            method:"POST",
            data:{action:"Get",id:id},
            dataType:"JSON",
            success:function(data){
                $("#detail_maquyen").val(data.ma_quyen);
                $("#detail_tenquyen").val(data.ten_quyen);
                
            }
        })
})
}
// function panigation(total,current){
//     var pagelist = "";
//     if (totalpages > 1) {
//       currentpage = parseInt(currentpage);
//       pagelist += `<ul class="pagination justify-content-center">`;
//       const prevClass = currentpage == 1 ? " disabled" : "";
//       pagelist += `<li class="page-item${prevClass}"><a class="page-link" href="#" data-page="${
//         currentpage - 1
//       }">Previous</a></li>`;
//       for (let p = 1; p <= totalpages; p++) {
//         const activeClass = currentpage == p ? " active" : "";
//         pagelist += `<li class="page-item${activeClass}"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`;
//       }
//       const nextClass = currentpage == totalpages ? " disabled" : "";
//       pagelist += `<li class="page-item${nextClass}"><a class="page-link" href="#" data-page="${
//         currentpage + 1
//       }">Next</a></li>`;
//       pagelist += `</ul>`;
//     }
   
//     $("#pagination").html(pagelist);
// }