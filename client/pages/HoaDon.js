$(document).ready(() => {
    // loadBillData()


})

// function loadBillData() {
//     $.ajax({
//         url: 'server/src/controller/HoaDonController.php',
//         method: 'POST',
//         data: { action: 'load' },
//         dataType: 'JSON',
//         success: data => {
//             if (data && data.length > 0) {
//                 let html = ''

//                 data.forEach((item, index) => {
//                     html += `
//                         <tr>
//                             <td>
//                                 <span class="custom-checkbox">
//                                     <input type="checkbox" id="checkbox-${item.ma_hd}" name="chk[]" value="${item.ma_hd}">
//                                     <label for="checkbox-${item.ma_hd}"></label>
//                                 </span>
//                             </td>
//                             <td>${item.ma_km}</td>
//                             <td>${item.dieu_kien}</td>
//                             <td>${item.muc_khuyen_mai}</td>
//                             <td>${item.thoi_gian_bat_dau}</td>
//                             <td>${item.thoi_gian_ket_thuc}</td>
// 							<td><span class="status text-success">&bull;</span> Active</td>
//                             <td>
//                                 <a href="#editbilltion" class="edit" data-toggle="modal" data-id="${item.ma_km}">
//                                     <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
//                                 </a>
//                                 <a href="#deletebilltion" class="delete" data-toggle="modal" data-id="${item.ma_km}">
//                                     <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
//                                 </a>
//                                 <a href="#" class="view" title="View" data-toggle="tooltip" data-id="${item.ma_km}">
//                                     <i class="material-icons">&#xE417;</i>
//                                 </a>
//                             </td>
//                         </tr>
//                     `
//                 })

//                 // $('.admin-billtion-list').html(html)
//             }
//         },
//         error: (xhr, status, error) => {
//             console.log(error)
//         }
//     })
// }

function addBill(bill) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'add', bill },
            success: res => {
                resolve(res)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}