$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'nhaphang') {
        renderPhieuNhapData()
    }
})

function getPhieuNhapData() {
    return new Promise((resolve, reject) => {
        var pageno = $("#currentpage").val();
        $.ajax({
            url: 'server/src/controller/PhieuNhap1Controller.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: phieunhaps => resolve(phieunhaps),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })

}

async function renderPhieuNhapData() {
    const phieunhaps = await getPhieuNhapData()
    if (phieunhaps && phieunhaps.length > 0) {
        let html = ''

        phieunhaps.forEach((phieunhap, index) => {
            console.log(phieunhap)
            html += `
            <tr>
                <td>${phieunhap.ma_pn}</td>
                <td>${phieunhap.ma_ncc}</td>
                <td>${phieunhap.ma_nv}</td>
                <td>${phieunhap.ngay_nhap}</td>
                <td>${phieunhap.tong_tien}</td>
                
                <td>`;

            if (phieunhap.tinh_trang == 0) {
                html += `<button class="btn btn-success btn-process-bill" value="${phieunhap.tinh_trang}">Xử lý</button>`;
            } else {
                html += `<span style="color: red; font-weight: bold;">Đã xử lý</span>`;
            }


            html += `</td>
            <td style="padding-top: 10px;">
                <a href="/admin.php?controller=giohang&ma=${phieunhap.ma_pn}" style="display: block;">
                    <button style="width: 60%;" class="btn btn-primary">Chi tiết</button>
                </a>
            </td>
        </tr>`;

        })
        phanquyen_chucnang("Phiếu nhập")
        getSizeinTable("nhanvien", "NV", "#admin-phieunhap-maphieunhap")
        $('.admin-phieunhap-list').html(html)

    }
}
