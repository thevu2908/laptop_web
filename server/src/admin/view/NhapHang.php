<main>
    <div class="container-xl">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Quản Lý <b id="ad-NhomQuyen">Phiếu Nhập</b></h2>
                        </div>
                        <div class="col-sm-6">
                            <a href="/admin.php?controller=phieunhap" class="btn btn-success add d-flex align-items-center">
                                <i class='fa-solid fa-file-import' style="font-size: 18px;"></i>
                                <span>Nhập hàng</span>
                            </a>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th class="w-auto">Mã phiếu nhập</th>
                            <th class="w-auto">Mã nhà cung cấp</th>
                            <th class="w-auto">Mã nhân viên</th>
                            <th class="w-auto">Ngày tạo phiếu</th>
                            <th class="w-auto">Tổng tiền</th>
                            <th class="w-auto">Tình trạng</th>
                            <th class="w-auto">Chi tiết phiếu nhập</th>
                        </tr>
                    </thead>
                    <tbody class="admin-phieunhap-list">

                    </tbody>
                </table>
                <div class="clearfix">
                    <div class="hint-text">Showing <b id="cur">5</b> out of <b id="total">25</b> entries</div>
                    <div id="pagination"></div>
                    <input type="hidden" name="currentpage" id="currentpage" value="1">
                </div>
            </div>
        </div>
    </div>

    <div id="order-detail-modal" class="modal fade" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                
            </div>
        </div>
    </div>
</main>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script src="/client/pages/NhapHang.js"></script>
<script src="/client/pages/ChiTietPhieuNhap.js"></script>