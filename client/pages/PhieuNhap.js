$(document).ready(function () {
    // Đảm bảo rằng sự kiện click chỉ được gán một lần
    $('.btn-add-cartimport').off('click').click(function (e) {
        e.preventDefault();
        
        var deleteid = $(this).val();
        var mancc = document.querySelector('.item-ma-ncc').value;
        var id_giasp = "gia_nhap" + deleteid;
        var giaNhap = document.getElementById(id_giasp).value;

        // Tiếp tục với AJAX request
        $.ajax({
            type: "GET",
            url: "/server/src/controller/PhieuNhapController.php",
            data: {
                'ma': deleteid,
                'mancc': mancc,
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
            if (willDelete) {
                var deleteid = $(this).val();
                console.log(deleteid);
                var tmp = deleteid.split(".");
                var ma = tmp[0]; // Lấy phần tử đầu tiên sau khi cắt chuỗi
                var mancc = tmp[1]; // Lấy phần tử thứ hai sau khi cắt chuỗi
                var mactsp = tmp[2]; // Lấy phần tử thứ ba sau khi cắt chuỗi
                var status = "delete";
                $.ajax({
                    type: "GET",
                    url: "/server/src/controller/PhieuNhapController.php",
                    data:  {
                        'ma': ma,
                        'mancc': mancc,
                        'mactsp': mactsp, // Thêm mã ctsp vào dữ liệu truyền đi
                        'action': status
                    },
                    success: function () {
                        location.reload();
                    }
                });
            } else {
                Swal.fire("Your imaginary file is safe!");
            }
        });
    });
});







$(document).ready(function () {
    $('.btn-pay-cartimport').click(function (e) {
          e.preventDefault();
          var data = document.querySelectorAll('.change-quanty-cartimport');
          var total = $('input[name="totalPriceImport"]').val();
          var status = "payimport";
          var arrQuantity = [];
          var arrMaSP = [];
          for (let i = 0; i < data.length; i++) {
            arrQuantity.push(data[i].value);
            arrMaSP.push(data[i].dataset.ma);
          }
          swal({
                title: "Bạn chắc chắn chưa?",
                text: "Once paid, you will not be able to recover!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
          })
                .then((willDelete) => {
                      if (willDelete) {
                        var data = document.querySelectorAll('.change-quanty-cartimport');
                            $.ajax({
                                    type: "GET",
                                    url: "../../controller/ImportController.php",
                                    data: {
                                            'quantity': arrQuantity,
                                            'ma': arrMaSP,
                                            'total': total, 
                                             'action': status,
                                        },
                                    success: function () {
                                        location.href = "/view/admin/index.php?controller=import";
                                    }
                            });
                      } else {
                            swal("Your imaginary file is safe!");
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
  