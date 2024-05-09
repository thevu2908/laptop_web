$(document).ready(function() {
    selectNhaCC();
});

$(document).ready(function () {
    $('.btn-add-cartimport').off('click').click(function (e) {
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
                // 'mancc': mancc,
                'gianhap': giaNhap,
                'action': "addtocart"
            },
            success: function () {
                alert("Đã thêm vào giỏ");
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

        // Lặp qua tất cả các input để thu thập dữ liệu số lượng
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
                        // Xóa tất cả các sản phẩm trong giỏ hàng
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