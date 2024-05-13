
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'nhomquyen') {
        loadNhomQuyen();
        clickPage(loadNhomQuyen);
        searchNhomQuyen()
        addNhomQuyen();
        deleteNhomQuyen();
        deleteMulNhomQuyen();
        updateNhomQuyen();
        getNhomQuyen();
        detailNhomQuyen();
    }
    loadNhomQuyenDataAccount()
})
var listitemRemove = [];
function addNhomQuyen() {
    getSizeinTable("nhomquyen","NQ","#ma_quyen")
    $(document).on('click', "#addNhomQuyen", function () {
        var ma_nhomquyen = $("#ma_quyen").val();
        var ten_nhomquyen = $("#ten_quyen").val();
        if (checkSpace(ten_nhomquyen)) {
            alert("Vui Lòng Nhập Tên Nhóm Quyền")
        } else {
            $.ajax({
                url: "server/src/controller/NhomQuyenController.php",
                method: "POST",
                data: { action: "Add", maquyen: ma_nhomquyen, tenquyen: ten_nhomquyen },
                success: function (data) {
                    console.log(data);
                    $("form").trigger('reset');
                    $("#addNhomQuyen").modal("hide");
                    loadNhomQuyen();
                }
            })
        }
    })
}
function loadNhomQuyen() {
    var pageno = $("#currentpage").val();
    $.ajax({
        url: "server/src/controller/PaginationController.php",
        data: { action: "pagination", page: pageno, table: "nhomquyen" },
        method: "GET",
        dataType: "json",
        success: function (data) {
            render(data);
        }
    })
}
function search(search){
    var pageno = $("#currentpage").val();
    $.ajax({
            url:'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', search, table: 'nhomquyen', pageno },
            dataType: 'JSON',        
            success: function (data) {
                 render(data);
            }
    })
}
// function searchNhomQuyen() {
//     $(document).on("keyup", "#search", function () {
//         var search = $(this).val();
//         $.ajax({
//             url: "server/src/controller/NhomQuyenController.php",
//             method: "POST",
//             data: { action: "Search", search: search },
//             success: function (data) {
//                 if (data) {
//                     render(data);
//                 }
//             }
//         })
//     })
// }
function render(data) {
    var html = "";
    if (true) {
        var jsonData = data.pagination;

        jsonData.forEach((nhomquyen, index) => {
            html += `<tr>
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="chk[]" value="1"  data-row="${nhomquyen['ma_quyen']}" onclick="removeList(this)">
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
    getSizeinTable("nhomquyen","NQ","#ma_quyen")
    phanquyen_chucnang("Nhóm Quyền");
    totalPage(data.count);
    displayTotalPage("#admin-access-main .hint-text", data.count, jsonData.length)
}

function loadNhomQuyenDataAccount() {
    $.ajax({
        url: "server/src/controller/NhomQuyenController.php",
        method: "POST",
        data: { action: 'Load' },
        success: data => {
            if (data && data.length > 0) {
                let html = '';
                const jsonData = JSON.parse(data);

                jsonData.forEach((nhomquyen, index) => {
                    const selected = index === 0 ? 'selected' : '';
                    html += `<option value='${nhomquyen['ma_quyen']}' ${selected}>${nhomquyen['ten_quyen']}</option>`
                })

                $("#admin-account-access").html(html)
                $("#admin-account-access-edit").html(html)
                $("#admin-account-access-view").html(html)
            }
        },
        error: (xhr, status, error) => console.log(error)
    })
}

function deleteNhomQuyen() {
    $(document).on("click", "#btnDel", function () {
        var id = $(this).attr("data-id1");
        console.log(id);
        $("#deleteNhomQuyen").modal('show');
        $(document).on("click", "#btnDelete", function () {
            $.ajax({
                url: "server/src/controller/NhomQuyenController.php",
                method: "POST",
                data: { id: id, action: "Delete" },
                success: function (data) {
                    $("#deleteNhomQuyen").modal('hide');
                    loadNhomQuyen();
                }
            })
        })
    })
}
function getNhomQuyen() {
    $(document).on("click", "#btnUp", function () {
        var id = $(this).attr("data-id");
        $.ajax({
            url: "server/src/controller/NhomQuyenController.php",
            method: "POST",
            data: { action: "Get", id: id },
            dataType: "JSON",
            success: function (data) {
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
        data: { action: 'Get', id },
        dataType: 'JSON',
        success: access => {
            if (access) {
                $(`.admin-accounnt-accessname-${index}`).text(access.ten_quyen)
            }
        }
    })
}

function updateNhomQuyen() {
    $(document).on("click", "#btnUpdate", function () {
        var maquyen = $("#maquyen").val();
        var tenquyen = $("#tenquyen").val();
        $.ajax({
            url: "server/src/controller/NhomQuyenController.php",
            method: "POST",
            data: { action: "Update", maquyen: maquyen, tenquyen: tenquyen },
            success: function (data) {
                $("form").trigger('reset');
                $("#editNhomQuyen").modal('hide');
                loadNhomQuyen();
            }
        })
    })
}

function detailNhomQuyen() {
    $(document).on("click", "#btnDetail", function () {
        var id = $(this).attr("data-id2");
        console.log(id);
        $.ajax({
            url: "server/src/controller/NhomQuyenController.php",
            method: "POST",
            data: { action: "Get", id: id },
            dataType: "JSON",
            success: function (data) {
                $("#detail_maquyen").val(data.ma_quyen);
                $("#detail_tenquyen").val(data.ten_quyen);

            }
        })
    })
}
function searchNhomQuyen() {
    $(document).on('keyup', '.admin-search-info', e => {
        const search = e.target.value.toLowerCase()
        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', table: 'nhomquyen', search },
            dataType: 'JSON',
            success: data => render(data),
            error: (xhr, status, error) => console.log(error)
        })
    })
}
function removeList(checkbox) {
    var isChecked = checkbox.checked;
    var maquyen = checkbox.dataset.row;
    if (isChecked) {
        listitemRemove.push({ maquyen: maquyen });
    } else {
        var indexToRemove = listitemRemove.findIndex(item => item.maquyen === maquyen);
        if (indexToRemove !== -1) {
            listitemRemove.splice(indexToRemove, 1);
        }
    }
    console.log(listitemRemove);
}
function deleteMulNhomQuyen(){
    $(document).on("click", "#btnDelete", function () {
        $.ajax({
            url: "server/src/controller/NhomQuyenController.php",
            method: "POST",
            data: { action: "deleteMul", listitemRemove: listitemRemove },
            success: function (data) {
                $("#deleteNhomQuyen").modal('hide');
                $("form").trigger('reset');
                loadNhomQuyen();
            }
        })
    })
}