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
                <td>
                    <a href="/admin.php?controller=giohang&ma=${phieunhap.ma_pn}">
                        <button style="width: 80px;" class="bnt-create-authorize">Chi tiết</button>
                    </a>
                </td>
                <td>`;
                
        if (phieunhap.trang_thai == 0) {
            html += `<button class="btn-process-bill" value="${phieunhap.trang_thai}">Xử lý</button>`;
        } else {
            html += `Đã xử lý`;
        }
        
        html += `</td>
        </tr>`;
        
        })
        phanquyen_chucnang("Phiếu nhập")
        getSizeinTable("nhanvien","NV","#admin-phieunhap-maphieunhap")
        $('.admin-phieunhap-list').html(html)
        
    }
}
