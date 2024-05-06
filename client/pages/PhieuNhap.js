$(document).ready(function() {
    selectNhaCC();
});

$(document).ready(function () {
    $('.btn-add-cartimport').off('click').click(function (e) {
        e.preventDefault();
        
        var deleteid = $(this).val();
        var giaNhapId = "#gia_nhap_" + deleteid; // Sửa ở đây để đảm bảo lấy đúng id của ô input
        var giaNhap = $(giaNhapId).val(); // Sử dụng jQuery để lấy giá trị của ô input

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
            }
        });
    });
});

$(document).ready(function () {
    $('.btn-delete-productcart').click(function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Bạn chắc chắn chưa?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
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
            } else if (willDelete.dismiss === Swal.DismissReason.cancel) {
                // Người dùng chọn "No, cancel!"
                Swal.fire("Cancelled", "Your item is safe :)", "info");
            }
        });
    });
});

// $(document).ready(function () {
//     $('.btn-pay-cartimport').click(function (e) {
//         e.preventDefault();
//         var total = $('input[name="totalPriceImport"]').val();
//         var status = "payimport";
//         var arrQuantity = [];
//         var arrMaSP = [];
//         var arrMaCTSP = [];

//         // Lặp qua tất cả các input để thu thập dữ liệu số lượng
//         $('.change-quanty-cartimport').each(function () {
//             arrQuantity.push($(this).val());
//             arrMaSP.push($(this).data('ma'));
//             arrMaCTSP.push($(this).data('mactsp'));
//         });

//         Swal.fire({
//             title: "Bạn chắc chắn chưa?",
//             text: "Once paid, you will not be able to recover!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, pay it!",
//             cancelButtonText: "No, cancel!",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 $.ajax({
//                     type: "POST",
//                     url: "/server/src/controller/PhieuNhapController.php",
//                     data: {
//                         'quantity': arrQuantity,
//                         'ma': arrMaSP,
//                         'mactsp': arrMaCTSP,
//                         'total': total,
//                         'action': status,
//                     },
//                     success: function () {
//                         // Xóa tất cả các sản phẩm trong giỏ hàng
//                         $('.btn-delete-productcart').each(function () {
//                             var value = $(this).val().split('.');
//                             var ma = value[0];
//                             var mancc = value[1];
//                             var mactsp = value[2];
//                             $.ajax({
//                                 type: "GET",
//                                 url: "/server/src/controller/PhieuNhapController.php",
//                                 data: {
//                                     'ma': ma,
//                                     'mancc': mancc,
//                                     'mactsp': mactsp,
//                                     'action': 'delete'
//                                 },
//                                 success: function () {
//                                     // Sau khi xóa thành công, chuyển hướng đến trang /admin.php?controller=phieunhap
//                                     window.location.href = "/admin.php?controller=phieunhap";
//                                 },
//                                 error: function () {
//                                     Swal.fire("Error!", "There was an error processing your request.", "error");
//                                 }
//                             });
//                         });
//                     },
//                     error: function () {
//                         Swal.fire("Error!", "There was an error processing your request.", "error");
//                     },
//                 });
//             }
//         });
//     });
// });

$(document).ready(function () {
    $('.btn-pay-cartimport').click(function (e) {
        e.preventDefault();

        // Kiểm tra xem đã chọn giá trị từ thẻ select chưa
        var selectedSupplier = $('.form-control').val();
        if (selectedSupplier === "") { // Thay đổi điều kiện thành ""
            // Nếu chưa chọn, hiển thị cảnh báo và không tiếp tục thực hiện thanh toán
            Swal.fire("Vui lòng chọn nhà cung cấp trước khi thanh toán!", "", "warning");
            return; // Ngăn chặn sự kiện click tiếp theo
        }

        var total = $('input[name="totalPriceImport"]').val();
        var status = "payimport";
        var arrQuantity = [];
        var arrMaSP = [];
        var arrMaCTSP = [];

        // Lặp qua tất cả các input để thu thập dữ liệu số lượng
        $('.change-quanty-cartimport').each(function () {
            arrQuantity.push($(this).val());
            arrMaSP.push($(this).data('ma'));
            arrMaCTSP.push($(this).data('mactsp'));
        });

        Swal.fire({
            title: "Bạn chắc chắn chưa?",
            text: "Once paid, you will not be able to recover!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, pay it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "/server/src/controller/PhieuNhapController.php",
                    data: {
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
                                    Swal.fire("Error!", "There was an error processing your request.", "error");
                                }
                            });
                        });
                    },
                    error: function () {
                        Swal.fire("Error!", "There was an error processing your request.", "error");
                    },
                });
            }
        });
    });
});


// $(document).ready(function () {
//     $('.btn-pay-cartimport').click(function (e) {
//         e.preventDefault();
//         var total = $('input[name="totalPriceImport"]').val();
//         var status = "payimport";
//         var arrQuantity = [];
//         var arrMaSP = [];
//         var arrMaCTSP = [];
//         console.log(total)
//         // Lặp qua tất cả các input để thu thập dữ liệu số lượng
//         $('.change-quanty-cartimport').each(function () {
//             arrQuantity.push($(this).val());
//             arrMaSP.push($(this).data('ma'));
//             arrMaCTSP.push($(this).data('mactsp'));
//         });
//         $.ajax({
//             type: "POST",
//             url: "/server/src/controller/PhieuNhapController.php",
//             data: {
//                 quantity: arrQuantity,
//                 ma: arrMaSP,
//                 mactsp: arrMaCTSP,
//                 total: total,
//                 action: status,
//             },
//             dataType: 'json',
//             success: function (data) {
//                 console.log(data);
//                 // Xóa tất cả các sản phẩm trong giỏ hàng
//                 $('.btn-delete-productcart').each(function () {
//                     var value = $(this).val().split('.');
//                     var ma = value[0];
//                     var mancc = value[1];
//                     var mactsp = value[2];
//                     $.ajax({
//                         type: "GET",
//                         url: "/server/src/controller/PhieuNhapController.php",
//                         data: {
//                             'ma': ma,
//                             'mancc': mancc,
//                             'mactsp': mactsp,
//                             'action': 'delete'
//                         },
//                         success: function () {
//                             // Sau khi xóa thành công, chuyển hướng đến trang /admin.php?controller=phieunhap
//                             window.location.href = "/admin.php?controller=phieunhap";
//                         },
//                         error: function () {
//                             Swal.fire("Error!", "There was an error processing your request.", "error");
//                         }
//                     });
//                 });
//             },
//             error: function (error) {
//                 //Swal.fire("Error!", "There was an error processing your request.", error);
//                 console.log(error.responseText)
//             },
//         });
//         // Swal.fire({
//         //     title: "Bạn chắc chắn chưa?",
//         //     text: "Once paid, you will not be able to recover!",
//         //     icon: "warning",
//         //     showCancelButton: true,
//         //     confirmButtonColor: "#3085d6",
//         //     cancelButtonColor: "#d33",
//         //     confirmButtonText: "Yes, pay it!",
//         //     cancelButtonText: "No, cancel!",
//         // }).then((result) => {
//         //     if (result.isConfirmed) {
//         //         console.log(arrQuantity)
//         //         console.log(arrMaSP)
//         //         console.log(arrMaCTSP)
//         //         $.ajax({
//         //             type: "POST",
//         //             url: "server/src/controller/PhieuNhapController.php",
//         //             data: {
//         //                 quantity: arrQuantity,
//         //                 ma: arrMaSP,
//         //                 mactsp: arrMaCTSP,
//         //                 total: total,
//         //                 action: status,
//         //             },
//         //             dataType: 'json',
//         //             success: function (data) {
//         //                 console.log(data);
//         //                 // Xóa tất cả các sản phẩm trong giỏ hàng
//         //                 $('.btn-delete-productcart').each(function () {
//         //                     var value = $(this).val().split('.');
//         //                     var ma = value[0];
//         //                     var mancc = value[1];
//         //                     var mactsp = value[2];
//         //                     $.ajax({
//         //                         type: "GET",
//         //                         url: "server/src/controller/PhieuNhapController.php",
//         //                         data: {
//         //                             'ma': ma,
//         //                             'mancc': mancc,
//         //                             'mactsp': mactsp,
//         //                             'action': 'delete'
//         //                         },
//         //                         success: function () {
//         //                             // Sau khi xóa thành công, chuyển hướng đến trang /admin.php?controller=phieunhap
//         //                             window.location.href = "/admin.php?controller=phieunhap";
//         //                         },
//         //                         error: function () {
//         //                             Swal.fire("Error!", "There was an error processing your request.", "error");
//         //                         }
//         //                     });
//         //                 });
//         //             },
//         //             error: function (error) {
//         //                 Swal.fire("Error!", "There was an error processing your request.", error);
//         //             },
//         //         });
//         //     }
//         // });
//     });
// });




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
            console.log(data);
            var html = "<option value=''>--Chọn Nhà Cung Cấp--</option>"; // Thêm giá trị mặc định vào đầu tiên
            data.forEach((ncc, index) => {
                html += `<option value="${ncc['ma_ncc']}">${ncc['ten_ncc']}</option>`;
            });
            $(".supplier-import-product").html(html); 
        }
    });
}


  