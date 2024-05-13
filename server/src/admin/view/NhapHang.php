<main id="admin-pn-main">
    <div class="container-xl">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">

                    <!-- <div class="col-sm-6">
                            <h2>Quản Lý <b id="ad-NhomQuyen">Phiếu Nhập</b></h2>
                        </div>
                        <select class="form-select" aria-label="Default select example" id="admin-select-phieunhap">
							<option value='all'>Tất cả</option>
							<option value='0'>Duyệt</option>
							<option value='1'>Đã duyệt</option>
						</select>
                        <div class="col-sm-6">
                            <a href="/admin.php?controller=phieunhap" class="btn btn-success add d-flex align-items-center">
                                <i class='fa-solid fa-file-import' style="font-size: 18px;"></i>
                                <span>Nhập hàng</span>
                            </a>
                        </div> -->

                    <div class="row align-items-center">
                        <div class="col-sm-6">
                            <h2>Quản Lý <b id="ad-NhomQuyen">Nhập Hàng</b></h2>
                        </div>
                        <?php if (true) { ?>
                            <div class="col-sm-6 d-flex justify-content-end align-items-center">
                                <select class="form-select w-65 rounded" aria-label="Default select example" id="admin-select-phieunhap" required>
                                    <option value='all'>Tất cả</option>
                                    <option value='0'>Chưa xác nhận</option>
                                    <option value='1'>Đã xác nhận</option>
                                </select>
                                <a href="/admin.php?controller=phieunhap" class="btn btn-success add d-flex align-items-center">
                                    <i class="fa-solid fa-file-import me-1" style="font-size: 18px;"></i>
                                    <span>Nhập hàng</span>
                                </a>
                            </div>
                        <?php } else echo "Nothing" ?>
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
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">

            </div>
        </div>
    </div>

    <div id="confirm-import-modal" class="modal fade" data-backdrop="static" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <h4 class="modal-title">Xác nhận duyệt phiếu nhập</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body confirm-import">
                        <p>Bạn có chắc chắn muốn duyệt phiếu nhập <b></b> không ?</p>
                        <p class="text-danger"><small>Điều này sẽ cập nhật số lượng sản phẩm trong kho, giá nhập của sản phẩm và tạo mã IMEI cho sản phẩm</small></p>
                    </div>
                    <div class="modal-footer">
                        <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
                        <input type="button" class="btn btn-primary btn-confirm-import" value="Duyệt">
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script src="/client/pages/NhapHang.js"></script>
<script src="/client/pages/ChiTietPhieuNhap.js"></script>