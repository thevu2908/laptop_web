
$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'nhacungcap') {
        renderSuppilerData(null)
        clickPage(renderSuppilerData)
        addSuppiler()
        updateSuppiler()
        renderDeleteNCCModal()
        handleDeleteNCC()
        showSuppiler()
        searchNCC()
    }
})

function getSuppilerData() {
    return new Promise((resolve, reject) => {
        var pageno = $("#currentpage").val();
        $.ajax({
            url: 'server/src/controller/NhaCungCapController.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: employess => resolve(employess),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function searchNCC() {
    $(document).on('keyup', '.admin-search-info', e => {
        const search = e.target.value.toLowerCase()

        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', table: 'nhacungcap', search },
            dataType: 'JSON',
            success: accounts => renderSuppilerData(accounts),
            error: (xhr, status, error) => console.log(error)
        })
    })
}

function getPaginationNCC() {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'nhacungcap', page },
            dataType: 'JSON',
            success: review => resolve(review),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function renderSuppilerData(data) {
    try {
        const dataPromo = data ? data : await getPaginationNCC()

        if (dataPromo && dataPromo.pagination && dataPromo.pagination.length > 0) {
            let html = ''

            for (const item of dataPromo.pagination) {
                html += `
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox-${item.ma_ncc}" name="chk[]" value="${item.ma_ncc}">
                            <label for="checkbox-${item.ma_ncc}"></label>
                        </span>
                    </td>
                    
                    <td>${item.ma_ncc}</td>
                    <td>${item.ten_ncc}</td>
                    <td>${item.dia_chi}</td>
                    <td>${item.so_dien_thoai}</td>
                    <td>
                        <a id='showSuppiler' href="#editSuppilerModal" class="edit" data-toggle="modal" data-id="${item.ma_ncc}">
                            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                        </a>
                        <a href="#deleteSuppilerModal" class="delete btn-delete-ncc-modal" data-toggle="modal" data-id="${item.ma_ncc}">
                            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                        </a>
                       
                    </td>
                </tr>
            `
            }

            phanquyen_chucnang("Nhà Cung Cấp")
            getSizeinTable("nhacungcap", "NCC", "#admin-nhacungcap-manhacungcap")
            $('.admin-suppiler-list').html(html)
            totalPage(dataPromo.count)
            displayTotalPage("#admin-ncc-main .hint-text", dataPromo.count, dataPromo.pagination.length)
        }

    } catch (error) {
        console.log(error);
    }
}

function showSuppiler() {
    $(document).on('click', "#showSuppiler", function () {
        var mancc = $(this).attr("data-id");
        $.ajax({
            url: "server/src/controller/NhaCungCapController.php",
            method: "POST",
            data: { action: "get", mancc: mancc },
            dataType: "JSON",
            success: function (data) {
                $("#admin-update-manhacungcap").val(data['ma_ncc']);
                $("#admin-update-nhacungcap").val(data['ten_ncc']);
                $("#admin-update-diachi").val(data['dia_chi']);
                $("#admin-update-sodienthoai").val(data['so_dien_thoai']);
            },
            error: function (xhr, status, error) {
                console.log(error)
            }
        })
    })
}

function updateSuppiler() {
    $(document).on('click', "#admin-btn-updateNhaCungCap", function () {
        var mancc = $("#admin-update-manhacungcap").val();
        var tenncc = $("#admin-update-nhacungcap").val();
        var diachi = $("#admin-update-diachi").val();
        var sodienthoai = $("#admin-update-sodienthoai").val();

        // Kiểm tra thông tin không được trống và số điện thoại hợp lệ
        if (checkSpace(tenncc) || checkSpace(diachi) || checkSpace(sodienthoai)) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        // Kiểm tra số điện thoại hợp lệ
        let phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (!phone_regex.test(sodienthoai)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập lại!");
            return;
        }

        // Kiểm tra thông tin đã được thay đổi so với thông tin cũ
        if (mancc === $("#admin-nhacungcap-manhacungcap").val() &&
            tenncc === $("#admin-nhacungcap-tennhacungcap").val() &&
            diachi === $("#admin-nhacungcap-diachi").val() &&
            sodienthoai === $("#admin-nhacungcap-sodienthoai").val()) {
            alert("Thông tin không có thay đổi. Vui lòng chỉnh sửa ít nhất một trường.");
            return;
        }

        // Gửi Ajax request
        $.ajax({
            url: "server/src/controller/NhaCungCapController.php",
            method: "POST",
            data: {
                action: 'update',
                mancc: mancc,
                tenncc: tenncc,
                diachi: diachi,
                sodienthoai: sodienthoai
            },
            dataType: "JSON",
            success: function (data) {
                $("form").trigger('reset');
                $("#editSuppilerModal").modal("hide");
                console.log(data);
                renderSuppilerData();
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    });
}

function addSuppiler() {
    getSizeinTable("nhacungcap", "NCC", "#admin-nhacungcap-manhacungcap");
    $(document).on('click', '#admin-btn-addNhaCungCap', function () {
        console.log('information');
        var mancc = $("#admin-nhacungcap-manhacungcap").val();
        console.log('ma' + mancc);
        var tenncc = $("#admin-nhacungcap-tennhacungcap").val();
        var diachi = $("#admin-nhacungcap-diachi").val();
        var sodienthoai = $("#admin-nhacungcap-sodienthoai").val();

        let phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (!phone_regex.test(sodienthoai)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập lại!");
            return;
        }

        if (checkSpace(tenncc) && checkSpace(diachi) && checkSpace(sodienthoai)) {
            alert("Vui lòng nhập đầy đủ thông tin");
        } else if (checkSpace(tenncc)) {
            alert("Vui lòng nhập tên nhà cung cấp");
        } else if (checkSpace(sodienthoai)) {
            alert("Vui lòng nhập số điện thoại");
        } else if (checkSpace(diachi)) {
            alert("Vui lòng nhập địa chỉ");
        } else {
            $.ajax({
                url: 'server/src/controller/NhaCungCapController.php',
                method: 'POST',
                data: {
                    action: 'add',
                    mancc: mancc,
                    tenncc: tenncc,
                    diachi: diachi,
                    sodienthoai: sodienthoai
                },
                dataType: 'JSON',
                success: function (data) {
                    console.log('inf');
                    console.log(data);
                    $("form").trigger('reset');
                    $("#addSuppilerModal").modal("hide");
                    renderSuppilerData();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }
    });
}

function getNCC(mancc) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/NhaCungCapController.php',
            method: 'POST',
            data: { action: 'get', mancc },
            dataType: 'JSON',
            success: product => resolve(product),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderDeleteNCCModal() {
    $(document).on('click', '.btn-delete-ncc-modal', e => {
        const mancc = e.target.closest('.btn-delete-ncc-modal').dataset.id

        if (mancc) {
            getNCC(mancc)
                .then(product => {
                    const html = `
                        <p>Bạn có chắc chắn muốn xóa nhà cung cấp có mã "<b class="ncc-id">${product.ma_ncc}</b>" không ?</p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `
                    $('#deleteSuppilerModal .confirm-delete-ncc').html(html)
                })
        }
    })

    $('.btn-delete-checked-ncc-modal').on('click', () => {
        const html = `
            <p>Bạn có chắc muốn xóa các nhà cung cấp được chọn không ?</p>
            <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
        `
        $('#deleteSuppilerModal .confirm-delete-ncc').html(html)
    })
}

function deleteNCC(mancc) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/NhaCungCapController.php',
            method: 'POST',
            data: { action: 'delete', mancc },
            success: data => {
                if (data === 'success') {
                    resolve(true)
                } else {
                    resolve(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleDeleteNCC() {
    $(document).on('click', '.btn-delete-ncc', () => {
        const mancc = $('#deleteSuppilerModal .ncc-id').text()
        console.log(mancc)
        if (mancc) {
            deleteNCC(mancc)
                .then(res => {
                    if (res === true) {
                        alert('Xóa nhà cung cấp thành công')
                        $('#deleteSuppilerModal').modal('hide')
                        renderSuppilerData()
                    } else {
                        alert('Xảy ra lỗi trong quá trình xóa nhà cung cấp')
                    }
                })
                .catch(error => console.log(error))
        } else {
            let checkedProducts = []
            const firstCheckInputElement = document.querySelector('table.table thead input[type=checkbox]')
            const checkInputElements = document.querySelectorAll('.admin-suppiler-list input[name="chk[]"]')

            checkInputElements.forEach(item => {
                if (item.checked) {
                    checkedProducts.push(item.value)
                }
            })

            if (checkedProducts.length > 0) {
                let promises = []

                checkedProducts.forEach(mancc => promises.push(deleteNCC(mancc)))

                Promise.all(promises).then(results => {
                    if (results.includes(false)) {
                        alert('Xảy ra lỗi trong quá trình xóa các nhà cung cấp')
                    } else {
                        alert('Đã xóa nhà cung cấp các nhà cung cấp được chọn')
                        firstCheckInputElement.checked = false
                        renderSuppilerData()
                    }
                })
            } else {
                alert('Không có nhà cung cấp nào được chọn\nVui lòng check vào ô các nhà cung cấp muốn xóa')
            }

            $('#deleteSuppilerModal').modal('hide')
        }
    })
}