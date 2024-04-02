// $(document).ready(function() {
//     listChucNang();
//     $(document).on("click", "ul.pagination li a", function (e) {
//         e.preventDefault();
//         var $this = $(this);
//         const pagenum = $this.data("page");
//         $("#currentpage").val(pagenum);
//         listChucNang();
//         $this.parent().siblings().removeClass("active");
//         $this.parent().addClass("active");
//     });
// })
//
function totalPage(count){
  let total = count;
  console.log(total);
  let totalpages = Math.ceil(parseInt(total) / 8);
  const currentpage = $("#currentpage").val();
  console.log(currentpage);
  pagination(totalpages, currentpage);
}
function pagination(totalpages, currentpage) {
    var pagelist = "";
    if (totalpages > 1) {
      currentpage = parseInt(currentpage);
      pagelist += `<ul class="pagination justify-content-center">`;
      const prevClass = currentpage == 1 ? " disabled" : "";
      pagelist += `<li class="page-item${prevClass}"><a class="page-link" href="#" data-page="${
        currentpage - 1
      }">Previous</a></li>`;
      for (let p = 1; p <= totalpages; p++) {
        const activeClass = currentpage == p ? " active" : "";
        pagelist += `<li class="page-item${activeClass}"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`;
      }
      const nextClass = currentpage == totalpages ? " disabled" : "";
      pagelist += `<li class="page-item${nextClass}"><a class="page-link" href="#" data-page="${
        currentpage + 1
      }">Next</a></li>`;
      pagelist += `</ul>`;
    }
    $("#panigation").html(pagelist);
}

//
// function listChucNang() {
//     var pageno = $("#currentpage").val();
//     $.ajax({
//       url: "server/src/controller/PanigationController.php",
//       method: "GET",
//       data: {action:"panigation", page: pageno,table:"chucnangquyen" },
//       dataType: "json",
//       success: function (data) {
//         console.log(data);
//         jsondata=data.panigation;
//         console.log(jsondata);  
//         var html="";
//         jsondata.forEach((chucnangquyen,index) => {
//         html+=`<tr>
//             <td>
//                 <span class="custom-checkbox">
//                     <input type="checkbox" id="checkbox1" name="options[]" value="1">
//                     <label for="checkbox1"></label>
//                 </span>
//             </td>
//             <td>${chucnangquyen['ma_chuc_nang']}</td>
//             <td>${chucnangquyen['ten_chuc_nang']}</td>
//             <td><span class="status text-success">&bull;</span> Active</td>
//             <td>
//                 <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
//                 <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
//                 <a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
//             </td>
//         </tr>`
//         });
//         $("#show-listChucNang").html(html);
//         let totalemployees = data.count;
//         console.log(totalemployees);
//         let totalpages = Math.ceil(parseInt(totalemployees) / 2);
//         const currentpage = $("#currentpage").val();
//         pagination(totalpages, currentpage);
//       }
//     });
// }