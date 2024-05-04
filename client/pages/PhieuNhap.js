
$(document).ready(function () {
      console.log($('.btn-add-cartimport'))
      $('.btn-add-cartimport').click(function (e) {
          e.preventDefault();
          var deleteid = $(this).val();
          console.log(deleteid)
          var mancc = document.querySelector('.item-ma-ncc').value;

          
          id_giasp = "gia_nhap"+deleteid
          giaNhap = document.getElementById(id_giasp).value
          if (giaNhap.includes('.')) {
            giaNhap = giaNhap.replace(/\./g, "");
            } else if (giaNhap.includes(',')) {
            giaNhap = giaNhap.replace(/,/g, "");
            }
          console.log(giaNhap)

          var status = "addtocart";
            $.ajax({
                    type: "GET",
                    url: "/server/src/controller/PhieuNhapController.php",
                    data: {
                            'ma': deleteid,
                            'mancc': mancc,
                            'gianhap': giaNhap,
                            'action': status
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
          swal({
                title: "Bạn chắc chắn chưa?",
                text: "Once deleted, you will not be able to recover!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
          })
                .then((willDelete) => {
                      if (willDelete) {
                        var deleteid = $(this).val();
                        var tmp = deleteid.split(".");
                        var status = "delete";
                            $.ajax({
                                  type: "GET",
                                  url: "/server/src/controller/PhieuNhapController.php",
                                  data:  {
                                        'ma': tmp[0],
                                        'mancc': tmp[1],
                                        'action': status
                                  },
                                    success: function () {
                                              location.reload();
                                  }
                            });
                      } else {
                            swal("Your imaginary file is safe!");
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
  