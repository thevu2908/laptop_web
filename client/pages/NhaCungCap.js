// $(document).ready(() => {
//     loadPromotionData()

//     updateStatusPromo()
//     getNextPromoId()

//     handleAddPromotion()

//     renderDeletePromoModal()
//     handleDeletePromo()

//     renderUpdatePromoModal()
//     handleUpdatePromo()
// })

// function loadPromotionData() {
//     $.ajax({
//         url: 'server/src/controller/NhaCungCapController.php',
//         method: 'POST',
//         data: { action: 'get-all' },
//         dataType: 'JSON',
//         success: data => {
//             console.log(data)
//             if (data && data.length > 0) {
//                 let html = ''
                
//                 data.forEach((item) => {
//                     html += `
//                         <tr>
//                             <td>
//                                 <span class="custom-checkbox">
//                                     <input type="checkbox" id="checkbox-${item.ma_ncc}" name="chk[]" value="${item.ma_ncc}">
//                                     <label for="checkbox-${item.ma_ncc}"></label>
//                                 </span>
//                             </td>
//                             <td>${item.ma_ncc}</td>
//                             <td>${item.ten_ncc}</td>
//                             <td>${item.dia_chi}</td>
//                             <td>${item.so_dien_thoai}</td>
                            
//                             <td>
//                                 <a href="#updatePromotion" class="edit btn-update-promo-modal" data-toggle="modal" data-id="${item.ma_km}">
//                                     <i class="material-icons" data-toggle="tooltip" title="Chỉnh sửa">&#xE254;</i>
//                                 </a>
//                                 <a href="#deletePromotion" class="delete btn-delete-promo-modal" data-toggle="modal" data-id="${item.ma_km}">
//                                     <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
//                                 </a>
//                             </td>
//                         </tr>
//                     `

                   
//                 })

//                 $('.admin-suppiler-list').html(html)
                
//             }
//         }
//     })
// }


// function validatePromo(promo) {
//     if(promo.promoName === '' && promo.promoName != undefined) {
//         alert('Vui lòng nhập tên của Nhà Cung Cấp')
//         $("#promotion-name").focus()
//         return false;
//     }
//     if(promo.promoPercent === '' && promo.promoPercent != undefined) {
//         alert('Vui lòng nhập địa chỉ của Nhà Cung Cấp')
//         $("#promotion-percent").focus()
//         return false;
//     }
//     if(promo.promoCondition === '' && promo.promoCondition != undefined) {
//         alert('Vui lòng nhập số điện thoại Nhà Cung Cấp')
//         $("#promotion-condition").focus()
//         return false;
//     }

//     if (!/^\d+$/.test(promo.promoCondition)) {
//         alert('Số điện thoại không hợp lệ. Vui lòng chỉ nhập số.')
//         $("#promotion-condition").focus()
//         return false;
//     }

//     if (!(/^09\d{8}$/.test(promo.promoCondition))) {
//         alert('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại đúng định dạng.')
//         $("#promotion-condition").focus()
//         return false;
//     }
    
//     return true;
// }



// function addPromotion(promo) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: 'server/src/controller/NhaCungCapController.php',
//             method: 'POST',
//             data: { action: 'add', promo },
//             success: res => {
//                 resolve(res)
//             },
//             error: (xhr, status, error) => {
//                 console.log(error)
//                 reject(error)
//             }
//         })
//     })
// }

// function handleAddPromotion() {
//     $(document).on('click', '.btn-add-promotion', e => {
//         e.preventDefault();
//         const promo = {
//             promoName: $('#addPromotion #promotion-name').val().trim(),
//             promoPercent: $('#addPromotion #promotion-percent').val().trim(),
//             promoCondition: $('#addPromotion #promotion-condition').val().trim(),
//         }

//         if(!validatePromo(promo)) {
//             return
//         }

//         addPromotion(promo)
//             .then(res => {
//                 if (res) {
//                     alert('Thêm Nhà Cung Cấp thành công')
//                     $('form').trigger('reset')
//                     $('#addPromotion').modal('hide')
//                     loadPromotionData()
//                 } 
//                 else {
//                     alert('Xảy ra lỗi trong quá trình thêm Nhà Cung Cấp')
//                 }
//             })
//             .catch(error => console.log(error))
//     })
// }

// function getPromotion(promoId) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: 'server/src/controller/NhaCungCapController.php',
//             method: 'POST',
//             data: { action: 'get', promoId },
//             dataType: 'JSON',
//             success: promo => resolve(promo),
//             error: (xhr, status, error) => {
//                 console.log(error)
//                 reject(error)
//             }
//         })
//     })
// }

// function renderDeletePromoModal() {
//     $(document).on('click', '.btn-delete-promo-modal', e => {
//         const promoId = e.target.closest('.btn-delete-promo-modal').dataset.id

//         if (promoId) {
//             getPromotion(promoId)
//                 .then(promo => {
//                     const html = `
//                         <p>Bạn có chắc chắn muốn xóa Nhà Cung Cấp có mã "<b class="promo-id">${promo.ma_ncc}</b>" không?</p>
//                         <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
//                     `
//                     $('#deletePromotion .delete-body').html(html)
//                 })
//         }
//     })

//     $('.btn-delete-checked-promo-modal').on('click', () => {
//         const html = `
//             <p>Bạn có chắc muốn xóa các khuyến mãi được chọn không ?</p>
//             <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
//         `
//         $('#deletePromotion .delete-body').html(html)
//     })
// }

// function deletePromotion(promoId) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: 'server/src/controller/NhaCungCapController.php',
//             method: 'POST',
//             data: { action: 'delete', promoId },
//             success: data => {
//                 resolve(data)
//             },
//             error: (xhr, status, error) => {
//                 console.log(error)
//                 reject(error)
//             }
//         })
//     })
// }

// function handleDeletePromo() {
//     $(document).on('click', '#confirm-delete', () => {
//         const promoId = $('#deletePromotion .promo-id').text()

//         if (promoId) {
//             deletePromotion(promoId)
//                 .then(res => {
//                     if (res === 'success') {
//                         alert('Xóa sản phẩm thành công')
//                         $('#deletePromotion').modal('hide')
//                         loadPromotionData()
//                     } 
//                     else if(res === 'fail') {
//                         alert('Không thể xóa khuyến mãi có chương trình "Đang diễn ra"')
//                     }
//                     else {
//                         alert('Xảy ra lỗi trong quá trình xóa sản phẩm')
//                     }
//                 })
//                 .catch(error => console.log(error))
//         }
//     })
// }

// function getNextPromoId() {
//     $.ajax({
//         url: 'server/src/controller/NhaCungCapController.php',
//         method: 'POST',
//         data: { action: 'get-size' },
//         dataType: 'JSON',
//         success: size => {
//             if(size) {
//                 id = 'NCC' + String(size+1).padStart(3, '0');
//                 $("#promotion-id").val(id)
//             }
//         },
//         error: (xhr, status, error) => {
//             console.log(error)
//         }
//     })

//     return 1;
// }

// function renderUpdatePromoModal() {
//     $(document).on('click', '.btn-update-promo-modal', e => {
//         const promoId = e.target.closest('.btn-update-promo-modal').dataset.id

//         getPromotion(promoId)
//             .then(promo => {
//                 $('#updatePromotion #promotion-id').val(promo.ma_km),
//                 $('#updatePromotion #promotion-name').val(promo.ten_khuyen_mai),
//                 $('#updatePromotion #promotion-percent').val(promo.muc_khuyen_mai),
//                 $('#updatePromotion #promotion-condition').val(promo.dieu_kien)
//             })
//             .catch(error => console.log(error))
//     })
// }

// function updatePromo(promo) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: 'server/src/controller/NhaCungCapController.php',
//             method: 'POST',
//             data: { action: 'update', promo },
//             success: res => {
//                 if (res == 'success') {
//                     resolve(true)
//                 } 
//                 else {
//                     console.log(res)
//                     resolve(false)
//                 }
//             },
//             error: (xhr, status, error) => {
//                 console.log(error)
//                 reject(error)
//             }
//         })
//     })
// }

// function handleUpdatePromo() {
//     $(document).on('click', '.btn-update-promo', () => {
//         const promo = {
//             promoId: $('#updatePromotion #promotion-id').val().trim(),
//             promoName: $('#updatePromotion #promotion-name').val().trim(),
//             promoPercent: $('#updatePromotion #promotion-percent').val().trim(),
//             promoCondition: $('#updatePromotion #promotion-condition').val().trim(),
            
//         }

//         if(!validatePromo(promo)) {
//             return
//         }

//         updatePromo(promo)
//             .then(res => {
//                 if(res) {
//                     alert('Cập nhật Nhà Cung Cấp thành công')
//                     $('form').trigger('reset')
//                     $('#updatePromotion').modal('hide')
//                     loadPromotionData()
//                 } 
//                 else {
//                     alert('Xảy ra lỗi trong quá trình cập nhật Nhà Cung Cấp')
//                 }
//             })
//             .catch(error => console.log(error))
//     })
// }


$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'nhacungcap') {
        renderSuppilerData()
        renderSuppilerAccountData()
        addSuppiler()
        updateSuppiler()
        // deleteNCC()
        renderDeleteNCCModal()
        handleDeleteNCC()
        showSuppiler()
        
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

async function renderSuppilerData() {
    const employees = await getSuppilerData()
    if (employees && employees.length > 0) {
        let html = ''
        employees.forEach((employee, index) => {
            console.log(employee)
            html += `
                <tr data-id="${employee.ma_ncc}">
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox-${employee.ma_ncc}" name="chk[]" value="${employee.ma_ncc}" '>
                            <label for="checkbox-${employee.ma_ncc}"></label>
                        </span>
                    </td>
                    <td>${employee.ma_ncc}</td>
                    <td>${employee.ten_ncc}</td>
                    <td>${employee.dia_chi}</td>
                    <td>${employee.so_dien_thoai}</td>
                    <td>
                        <a id='showSuppiler' href="#editSuppilerModal" class="edit" data-toggle="modal" data-id="${employee.ma_ncc}">
                            <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                        </a>
                        <a href="#deleteSuppilerModal" class="delete btn-delete-ncc-modal" data-toggle="modal" data-id="${employee.ma_ncc}">
                            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                        </a>
                       
                    </td>
                </tr>
            `
        })
        phanquyen_chucnang("Nhà Cung Cấp")
        getSizeinTable("nhacungcap","NCC","#admin-nhacungcap-manhacungcap")
        $('.admin-suppiler-list').html(html)
        
    }
}
function showSuppiler(){
    $(document).on('click',"#showSuppiler",function(){
        var mancc = $(this).attr("data-id");
        $.ajax({
            url:"server/src/controller/NhaCungCapController.php",
            method:"POST",
            data:{action:"get",mancc:mancc},
            dataType:"JSON",
            success:function(data){
                $("#admin-update-manhacungcap").val(data['ma_ncc']);
                $("#admin-update-nhacungcap").val(data['ten_ncc']);
                $("#admin-update-diachi").val(data['dia_chi']);
                $("#admin-update-sodienthoai").val(data['so_dien_thoai']);
            },
            error:function(xhr,status,error){
                console.log(error)
            }
        })
    })
}




function updateSuppiler() {
    $(document).on('click', "#admin-btn-updateNhaCungCap", function() {
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
            success: function(data) {
                $("form").trigger('reset');
                $("#editSuppilerModal").modal("hide");
                console.log(data);
                renderSuppilerData();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    });
}

function renderSuppilerAccountData() {
    $('.btn-open-add-account-modal').on('click', async e => {
        const employees = await getSuppilerData()

        if (employees && employees.length > 0) {
            const accounts = await getAllAccounts()
            let availableEmployees = []

            employees.forEach(employee => {
                let flag = true

                accounts.forEach(account => {
                    if (employee.ma_ncc === account.ma_tk) {
                        flag = false
                        return
                    }
                })

                if (flag) availableEmployees.push(employee)
            })

            let html = ''

            availableEmployees.forEach((employee, index) => {
                const selected = index === 0 ? 'selected' : '';
                html += `<option value='${employee.ma_ncc}' ${selected}>${employee.ma_ncc} - ${employee.ten_ncc}</option>`
            })

            $('#admin-account-employee-choose').html(html)
        }
    })
}
function addSuppiler() {
    getSizeinTable("nhacungacap", "NCC", "#admin-nhacungcap-manhacungcap");
    $(document).on('click', '#admin-btn-addNhaCungCap', function() {
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
                success: function(data) {
                    console.log('inf');
                    console.log(data);
                    $("form").trigger('reset');
                    $("#addSuppilerModal").modal("hide");
                    renderSuppilerData();
                },
                error: function(xhr, status, error) {
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
                        <p>Bạn có chắc chắn muôn xóa Nhà Cung Cấp có mã "<b class="ncc-id">${product.ma_ncc}</b>" không ?</p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `
                    $('#deleteSuppilerModal .confirm-delete-ncc').html(html)
                })
        }
    })

    $('.btn-delete-checked-ncc-modal').on('click', () => {
        const html = `
            <p>Bạn có chắc muốn xóa các Nhà Cung Cấp được chọn không ?</p>
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
                        alert('Xóa sản phẩm thành công')
                        $('#deleteSuppilerModal').modal('hide')
                        renderSuppilerData()
                    } else {
                        alert('Xảy ra lỗi trong quá trình xóa sản phẩm')
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
                        alert('Xảy ra lỗi trong quá trình xóa các sản phẩm')
                    } else {
                        alert('Đã xóa sản phẩm các sản phẩm được chọn')
                        firstCheckInputElement.checked = false
                        renderSuppilerData()
                    }
                })
            } else {
                alert('Không có sản phẩm nào được chọn\nVui lòng check vào ô các sản phẩm muốn xóa')
            }

            $('#deleteSuppilerModal').modal('hide')
        }
    })
}


// function deleteNCC() {
//     $(document).on("click", "#btnDel", function () {
//         console.log(id);
//         $("#deleteSuppilerModal").modal('show');
//         $(document).on("click", "#btnDeleteNCC", function () {
//             $.ajax({
//                 url: "server/src/controller/NhaCungCapController.php",
//                 method: "POST",
//                 data: { id: id, action: "delete" },
//                 success: function (data) {
//                     $("#deleteSuppilerModal").modal('hide');
//                     renderSuppilerData();
//                 }
//             })
//         })
//     })
// }



//xóa

// function renderDeleteNCCtModal() {
//     $(document).on('click', '.btn-delete-ncc-modal', e => {
//         const productId = e.target.closest('.btn-delete-ncc-modal').dataset.id

//         if (productId) {
//             getNCC(productId)
//                 .then(product => {
//                     const html = `
//                         <p>Bạn có chắc chắn muôn xóa Nhà Cung Cấp có mã "<b class="ncc-id">${product.ma_ncc}</b>" không ?</p>
//                         <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
//                     `
//                     $('#deleteSuppilerModal .confirm-delete-ncc').html(html)
//                 })
//         }
//     })

//     $('.btn-delete-checked-ncc-modal').on('click', () => {
//         const html = `
//             <p>Bạn có chắc muốn xóa các sản phẩm được chọn không ?</p>
//             <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
//         `
//         $('#deleteSuppilerModal .confirm-delete-ncc').html(html)
//     })
// }

// function deleteNCC(productId) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: 'server/src/controller/NhaCungCapController.php',
//             method: 'POST',
//             data: { action: 'delete', productId },
//             dataType:'json',
//             success: data => {
//                 console.log(data)
//                 if (data === 'success') {
//                     resolve(true)
//                 } else {
//                     resolve(false)
//                 }
//             },
//             error: (xhr, status, error) => {
//                 console.log(error)
//                 reject(error)
//             }
//         })
//     })
// }
// function handleDeleteNCC() {
//     var data=$(
//     $(document).on('click', '.btn-delete-ncc', () => {
        
//         const mancc =;
//         console.log(mancc+"----")
//         if (mancc) {
//             deleteNCC(mancc)
//                 .then(res => {
//                     if (res === true) {
//                         alert('Xóa NCC thành công');
//                         $('#deleteSuppilerModal').modal('hide');
//                         renderSuppilerData();
//                     } else {
//                         alert('Xảy ra lỗi trong quá trình xóa NCC');
//                     }
//                 })
//                 .catch(error => console.log(error));
//         } else {
//             let checkedSuppliers = [];
//             const firstCheckInputElement = document.querySelector('table.table thead input[type=checkbox]');
//             const checkInputElements = document.querySelectorAll('.admin-suppiler-list input[name="chk[]"]');

//             checkInputElements.forEach(item => {
//                 if (item.checked) {
//                     checkedSuppliers.push(item.value);
//                 }
//             });

//             if (checkedSuppliers.length > 0) {
//                 let promises = [];

//                 checkedSuppliers.forEach(mancc => promises.push(deleteNCC(mancc)));

//                 console.log(checkedSuppliers)
//                 Promise.all(promises).then(results => {
//                     if (results.includes(false)) {
//                         alert('Xảy ra lỗi trong quá trình xóa các NCC');
//                     } else {
//                         alert('Đã xóa các NCC được chọn');
//                         firstCheckInputElement.checked = false;
//                         renderSuppilerData();
//                     }
//                 });
//             } else {
//                 alert('Không có NCC nào được chọn\nVui lòng check vào ô các NCC muốn xóa');
//             }

//             $('#deleteSuppilerModal').modal('hide');
//         }
//     });
// }



//xóa2



// function showDeleteNCCModal() {
//     $(document).on('click', '.btn-delete-ncc-modal', e => {
//         const accountId = e.target.closest('.btn-delete-ncc-modal').dataset.id
//         const html = `
//             <p>
//                 Bạn có chắc muốn xóa nhà cung cấp có mã
//                 "<b class="delete-ncc-id">${accountId}</b>"
//                 không ?
//             </p>
//             <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
//         `

//         $('.confirm-delete-ncc').html(html)
//     })
// }

// function showDeleteCheckedNCCModal() {
//     $('.btn-delete-checked-ncc-modal').on('click', e => {
//         const html = `
//             <p>Bạn có chắc muốn xóa các tài khoản được chọn không ?</p>
//             <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
//         `
//         $('.confirm-delete-ncc').html(html)
//     })
// }

// function deleteNCC(accountId) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: 'server/src/controller/NhaCungCapController.php',
//             method: 'POST',
//             data: { action: 'delete', accountId },
//             success: res => {
//                 if (res === 'success') {
//                     resolve(true)
//                 } else {
//                     resolve(false)
//                 }
//             },
//             error: (xhr, status, error) => {
//                 console.log(error)
//                 reject(error)
//             }
//         })
//     })

// }

// function handleDeleteNCC() {
//     $(document).on('click', '.btn-delete-ncc', async e => {
//         const accountId = $('#deleteSuppilerModal .delete-ncc-id').text()

//         if (accountId) {
//             const res = await deleteNCC(accountId)
//             if (res) {
//                 alert('Xóa Nhà Cung Cấp thành công')
//                 $('form').trigger('reset')
//                 $('#deleteSuppilerModal').modal('hide')
//                 renderSuppilerData()
//             } else {
//                 alert('Xóa Nhà Cung Cấp thất bại')
//             }
//         } else {
//             let checkedAccounts = []
//             const firstCheckInputElement = document.querySelector('table.table thead input[type=checkbox]')
//             const checkedInputElements = document.querySelectorAll('.admin-ncc-table input[name="chk[]"]')

//             checkedInputElements.forEach(item => {
//                 if (item.checked) {
//                     checkedAccounts.push(item.value)
//                 }
//             })

//             if (checkedAccounts.length > 0) {

//                 const promises = checkedAccounts.map(checkedAccount => deleteNCC(checkedAccount))
//                 const res = await Promise.all(promises)

//                 if (!res.includes(false)) {
//                     alert('Đã xóa NCC các NCC được chọn')
//                     $('form').trigger('reset')
//                     firstCheckInputElement.checked = false
//                     renderSuppilerData()
//                 } else {
//                     alert('Xảy ra lỗi trong quá trình xóa NCC')
//                 }
//             } else {
//                 alert('Không có NCC nào được chọn\nVui lòng check vào ô các tài khoản muốn xóa')
//             }

//             $('#deleteSuppilerModal').modal('hide')
//         }
//     })
// }

