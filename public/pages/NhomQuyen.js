
$(document).ready(function(){
    loadNhomQuyen();
    //addNhomQuyen();
    deleteNhomQuyen();
    updateNhomQuyen();
    getNhomQuyen();
    searchNhomQuyen();
    detailNhomQuyen();
    //$('#addNhomQuyen').modal({backdrop: 'static', keyboard: false}) 
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
                url:"src/controller/NhomQuyenController.php",
                method:"POST",
                data:{action:"Add", maquyen:ma_nhomquyen, tenquyen:ten_nhomquyen},
                success:function(data){
                    console.log(data);
                    //$("#addNhomQuyen").modal("show");
                    $("form").trigger('reset');
                    loadData();
                }
            })
        }
    })
}
function loadNhomQuyen(){
    var tmp="Load";
    $.ajax({
        url:"src/controller/NhomQuyenController.php",
        method:"POST",
        data:{action:tmp},
        success:function(data){
            var html="";
            console.log(data);
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
                        <a id="btnUp" href="#editNhomQuyen" class="edit" data-toggle="modal" data-id=${nhomquyen['ma_quyen']}><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a id="btnDel" href="#deleteNhomQuyen" class="delete" data-toggle="modal" data-id1=${nhomquyen['ma_quyen']}><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        <a id="btnDetail" href="#detailNhomQuyen" class="view" data-id2=${nhomquyen['ma_quyen']} data-toggle="modal"><i class="material-icons">&#xE417;</i></a>
                        <a href="#" class="Status" title="Status"><input type="checkbox" checked data-toggle="toggle" data-onstyle="danger" data-height=""></a>
                    </td>
                </tr>`
                });
            }
            $("#show-listNhomQuyen").html(html);
        }
    }) 
}
function deleteNhomQuyen(){
    $(document).on("click","#btnDel",function(){
        var id=$(this).attr("data-id1");
        $("#deleteNhomQuyen").modal('show');
        $(document).on("click","#btnDelete",function(){
            $.ajax({
                url:"/src/controller/NhomQuyenController.php",
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
                url:"/src/controller/NhomQuyenController.php",
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
function updateNhomQuyen(){
    $(document).on("click","#btnUpdate",function(){
        var maquyen=$("#maquyen").val();
        var tenquyen=$("#tenquyen").val();
        $.ajax({
            url:"/src/controller/NhomQuyenController.php",
            method:"POST",
            data:{action:"Update",maquyen:maquyen,tenquyen:tenquyen},
            success:function(data){
                $("form").trigger('reset');
                $("#editNhomQuyen").modal('hide');
                loadNhomQuyen()();
            }
        })
    })
}
function searchNhomQuyen(){
    $(document).on("keyup","#search",function(){
        var search=$(this).val();
        console.log(search);
        $.ajax({
            url:"/src/controller/NhomQuyenController.php",
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
                        <a id="btnUp" href="#editNhomQuyen" class="edit" data-toggle="modal" data-id=${nhomquyen['ma_quyen']}><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a id="btnDel" href="#deleteNhomQuyen" class="delete" data-toggle="modal" data-id1=${nhomquyen['ma_quyen']}><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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
function detailNhomQuyen(){
    $(document).on("click","#btnDetail",function(){
        var id=$(this).attr("data-id2");
        console.log(id);
        $.ajax({
            url:"/src/controller/NhomQuyenController.php",
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