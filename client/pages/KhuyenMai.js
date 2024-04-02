$(document).ready(() => {
    loadPromotionData()
})

function loadPromotionData() {
    $.ajax({
        url: 'server/src/controller/KhuyenMaiController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            console.log(data)
            if (data && data.length > 0) {
                let html = ''

                data.forEach((item, index) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox-${item.ma_km}" name="chk[]" value="${item.ma_km}">
                                    <label for="checkbox-${item.ma_km}"></label>
                                </span>
                            </td>
                            <td>${item.ma_km}</td>
                            <td>${item.dieu_kien}</td>
                            <td>${item.muc_khuyen_mai}</td>
                            <td>${item.thoi_gian_bat_dau}</td>
                            <td>${item.thoi_gian_ket_thuc}</td>
							<td><span class="status text-success">&bull;</span> Active</td>
                            <td>
                                <a href="#editPromotion" class="edit" data-toggle="modal" data-id="${item.ma_km}">
                                    <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                </a>
                                <a href="#deletePromotion" class="delete" data-toggle="modal" data-id="${item.ma_km}">
                                    <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                                <a href="#" class="view" title="View" data-toggle="tooltip" data-id="${item.ma_km}">
                                    <i class="material-icons">&#xE417;</i>
                                </a>
                            </td>
                        </tr>
                    `
                })

                $('.admin-promotion-list').html(html)
            }
        }
    })
}