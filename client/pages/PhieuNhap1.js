$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'phieunhap') {
        renderPhieuNhapData(null)
        searchNH()
        clickPage(renderPhieuNhapData)
    }
})

function getPhieuNhapData() {
    return new Promise((resolve, reject) => {
        var pageno = $("#currentpage").val();
        $.ajax({
            url: 'server/src/controller/PhieuNhap2Controller.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: phieunhaps1 => resolve(phieunhaps1),
            error: (xhr, status, error) => reject(error)
        })
    })
}

function searchNH() {
    $(document).on('keyup', '.admin-search-info', e => {
        const search = e.target.value.toLowerCase()
        const page = $('#currentpage').val()

        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', search, table: 'nhaphang', page },
            dataType: 'JSON',
            success: accounts => renderPhieuNhapData(accounts),
            // success: accounts => console.log(accounts),

            error: (xhr, status, error) => console.log(error)
        })
    })
}

function getPaginationNH(limit) {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'nhaphang', page: page, limit: limit},
            dataType: 'JSON',
            
            success: review => resolve(review),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

// async function renderPhieuNhapData() {
//     try {
//         const phieunhaps1 = await getPhieuNhapData();
//         let html = ''; // Initialize HTML outside the loop

//         if (phieunhaps1 && phieunhaps1.length > 0) {
//             phieunhaps1.forEach((phieunhap, index) => {
//                 html += `
    
//                     <tr>
//                         <td>${phieunhap.ma_sp}</td>
//                         <td>${phieunhap.ma_ctsp}</td>
//                         <td>${phieunhap.ten_sp}</td>
//                         <td><img style="width: 60px" src="${phieunhap.hinh_anh}" alt="Hình ảnh sản phẩm"></td>
//                         <td>${phieunhap.ram}</td>
//                         <td>${phieunhap.rom}</td>
//                         <td>${phieunhap.ten_mau}</td>
//                         <td>${phieunhap.ten_chip}</td>
//                         <td>${phieunhap.ten_card}</td>
//                         <td>${phieunhap.so_luong}</td>
//                         <td>
//                             <div style="position: relative; display: inline-block;">
//                                 <input type="number" id="gia_nhap_${phieunhap.ma_ctsp}" class="input-gia-sp form-control" value="${phieunhap.gia_nhap}" style="width: 120px; " onkeyup="formatCurrency(this)" min="0" step="1000">
//                                 <span style="position: absolute; left: calc(100% + 10px); top: 50%; transform: translate(-100%, -50%); white-space: nowrap;">đ</span>
//                             </div>
//                         </td>
//                         <script>
//                         function formatCurrency(input) {
//                             let value = input.value;
//                             value = value.replace(/[^\d]/g, '');
//                             value = new Intl.NumberFormat('vi-VN').format(value);
//                             input.value = value;
//                         }
//                     </script>
//                         <td>
//                             <button type="button" class="btn btn-primary btn-add-cartimport" value="${phieunhap.ma_ctsp}">Thêm</button>
//                         </td>
//                     </tr>
//                 `;
//             });
//         } else {
//             html = '<tr><td colspan="11" style="color: red; font-weight: bold;">Không có dữ liệu để hiển thị.</td></tr>';
//         }
//         phanquyen_chucnang("Nhập Hàng")
//         $('#show-listNhomQuyen').html(html);
//         totalPage(dataPromo.count)

//     } catch (error) {
//         console.error(error);
//     }
// }


async function renderPhieuNhapData(data) {
    try {
        const dataPromo = data ? data : await getPaginationNH()

        let html = '';
        
        if (dataPromo && dataPromo.pagination && dataPromo.pagination.length > 0) {
        // const phieunhaps1 = await getPhieuNhapData();
        // if (phieunhaps1 && phieunhaps1.length > 0) {
            for (const phieunhap of dataPromo.pagination) {
            // phieunhaps1.forEach((phieunhap, index) => {
                console.log(dataPromo)
                html += `
                    <tr>
                        <td>${phieunhap.ma_sp}</td>
                        <td>${phieunhap.ma_ctsp}</td>
                        <td>${phieunhap.ten_sp}</td>
                        <td><img style="width: 60px" src="${phieunhap.hinh_anh}" alt="Hình ảnh sản phẩm"></td>
                        <td>${phieunhap.ram}</td>
                        <td>${phieunhap.rom}</td>
                        <td>${phieunhap.ten_mau}</td>
                        <td>${phieunhap.ten_chip}</td>
                        <td>${phieunhap.ten_card}</td>
                        <td>${phieunhap.so_luong}</td>
                        <td>
                            <div style="position: relative; display: inline-block;">
                                <input type="number" id="gia_nhap_${phieunhap.ma_ctsp}" class="input-gia-sp form-control" value="${phieunhap.gia_nhap}" style="width: 120px; " onkeyup="formatCurrency(this)" min="0" step="1000">
                                <span style="position: absolute; left: calc(100% + 10px); top: 50%; transform: translate(-100%, -50%); white-space: nowrap;">đ</span>
                            </div>
                        </td>
                        <script>
                        function formatCurrency(input) {
                            let value = input.value;
                            value = value.replace(/[^\d]/g, '');
                            value = new Intl.NumberFormat('vi-VN').format(value);
                            input.value = value;
                        }
                    </script>
                        <td>
                            <button type="button" class="btn btn-primary btn-add-cartimport" value="${phieunhap.ma_ctsp}">Thêm</button>
                        </td>
                    </tr>
                `;
            }

            // phanquyen_chucnang("Nhập Hàng")
            // getSizeinTable("nhacungcap", "NCC", "#admin-nhacungcap-manhacungcap")
            // $('.show-listNhomQuyen').html(html)
            
        } else {
            html = '<tr><td colspan="11" style="color: red; font-weight: bold;">Không có dữ liệu để hiển thị.</td></tr>';
        }

        $('#show-listNH').html(html);
            totalPage(dataPromo.count)
            displayTotalPage("#admin-pn-main .hint-text", dataPromo.count, dataPromo.pagination.length)

        // $('#show-listNH').html(html);
    } catch (error) {
        console.error(error);
    }
}

$(document).ready(function() {
    selectNhaCC();
});

$(document).ready(function () {
    $(document).on('click', '.btn-add-cartimport', function (e) {
        e.preventDefault();

        var deleteid = $(this).val();
        var giaNhapId = "gia_nhap_" + deleteid;
        var giaNhap = document.getElementById(giaNhapId).value;
        console.log(giaNhap);
        $.ajax({
            type: "GET",
            url: "/server/src/controller/PhieuNhapController.php",
            data: {
                'ma': deleteid,
                'gianhap': giaNhap,
                'action': "addtocart"
            },
            success: function () {
                alert("Đã thêm vào giỏ");
            },
            error: function () {
                alert("Xảy ra lỗi. Không thể thêm vào giỏ hàng.");
            }
        });
    });
});


$(document).ready(function () {
    $('.btn-delete-productcart').click(function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Bạn chắc chắn chưa?",
            text: "Khi xóa sẽ không thể hoàn tác",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {
                var deleteid = $(this).val();
                var tmp = deleteid.split(".");
                var ma = tmp[0];
                var mancc = tmp[1];
                var mactsp = tmp[2];
                var status = "delete";
                $.ajax({
                    type: "GET",
                    url: "/server/src/controller/PhieuNhapController.php",
                    data:  {
                        'ma': ma,
                        'mancc': mancc,
                        'mactsp': mactsp,
                        'action': status
                    },
                    success: function () {
                        location.reload();
                    }
                });
            }
        });
    });
});


$(document).ready(function () {
    $('.btn-pay-cartimport').click(function (e) {
        e.preventDefault();

        var selectedSupplier = $('.form-control').val();
        if (selectedSupplier === "") { 
            Swal.fire("Vui lòng chọn nhà cung cấp trước khi thanh toán!", "", "warning");
            return; 
        }

        var total = $('input[name="totalPriceImport"]').val();
        var status = "payimport";
        var arrQuantity = [];
        var arrMaSP = [];
        var mancc1 = $('.form-control').val();
        var arrMaCTSP = [];
        console.log(mancc1);

        $('.change-quanty-cartimport').each(function () {
            arrQuantity.push($(this).val());
            arrMaSP.push($(this).data('ma'));
            arrMaCTSP.push($(this).data('mactsp'));
        });

        Swal.fire({
            title: "Bạn chắc chắn chưa?",
            text: "Tạo phiếu nhập hàng",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Thanh toán",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "/server/src/controller/PhieuNhapController.php",
                    data: {
                        'mancc': mancc1,
                        'quantity': arrQuantity,
                        'ma': arrMaSP,
                        'mactsp': arrMaCTSP,
                        'total': total,
                        'action': status,
                    },
                    success: function () {
                        $('.btn-delete-productcart').each(function () {
                            var value = $(this).val().split('.');
                            var ma = value[0];
                            var mancc = value[1];
                            var mactsp = value[2];
                            $.ajax({
                                type: "GET",
                                url: "/server/src/controller/PhieuNhapController.php",
                                data: {
                                    'ma': ma,
                                    'mancc': mancc,
                                    'mactsp': mactsp,
                                    'action': 'delete'
                                },
                                success: function () {
                                    // Sau khi xóa thành công, chuyển hướng đến trang /admin.php?controller=phieunhap
                                    window.location.href = "/admin.php?controller=phieunhap";
                                },
                                error: function () {
                                    Swal.fire("Error!", "Xảy ra lỗi, vui lòng thử lại sau", "error");
                                }
                            });
                        });
                    },
                    error: function () {
                        Swal.fire("Error!", "Xảy ra lỗi, vui lòng thử lại sau", "error");
                    },
                });
            }
        });
    });
});

$(document).ready(function () {
      $('.change-quanty-cartimport').on('change', () => {
          var data = document.querySelectorAll('.change-quanty-cartimport');
          var manccTMP = document.querySelectorAll('.inp-ma-ncc');
          
          // Keep track of the number of successful AJAX requests
          var successCount = 0;
          
          for (let i = 0; i < data.length; i++) {
              var deleteid = data[i].value;
              var ma = data[i].dataset.ma;
              var mactsp = data[i].dataset.mactsp;
              var mancc = manccTMP[i].value;
              var status = "changequantity";

              $.ajax({
                  type: "GET",
                  url: "/server/src/controller/PhieuNhapController.php",
                  data: {
                      'quantity': deleteid,
                      'ma': ma,
                      'mactsp':mactsp,
                      'mancc': mancc,
                      'action': status,
                  },
                  success: function () {successCount++;
                    if (successCount >= data.length)
                    
                         location.reload();
                  },
                  error: function (xhr, status, error) {
                      console.error(xhr.responseText);
                  }
              });
          }
      });
  });


function selectNhaCC() {
    $.ajax({
        url: "server/src/controller/NhaCungCapController.php",
        data: { action: "load" },
        method: "post",
        dataType: "json",
        success: function (data) {
            var html = "<option value=''>--Chọn Nhà Cung Cấp--</option>"; // Thêm giá trị mặc định vào đầu tiên
            data.forEach((ncc, index) => {
                html += `<option value="${ncc['ma_ncc']}">${ncc['ten_ncc']}</option>`;
            });
            $(".supplier-import-product").html(html); 
        }
    });
} 