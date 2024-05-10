<main id="admin-bill-detail-main">
    <div class="px-3">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Chi Tiết Hóa Đơn <b class="bill-name"></b></h2>
                        </div>
                        <?php
                            $billId = "";
                            if (isset($_REQUEST['id'])) {
                                $billId = $_REQUEST['id'];
                            }
                        ?>
                        <div class="col-sm-6 d-flex justify-content-end">
                            <div class="status alert alert-danger" style="margin-right: 15px; padding: 3px; font-weight: 500;" role="alert">
                                Chưa xác nhận
                            </div>
                            <a href="#updateStatusBill" style="margin-right: 15px; padding: 10px; height: 32px;" data-id="<?= $billId ?>" class="d-flex align-items-center btn btn-primary btn-update-status-bill update" title="Cập nhật tình trạng" data-toggle="modal">
                                <i class="material-icons">&#xe9d2;</i>
                                <span>Cập nhật</span>
                            </a>
                            <form>
                                <div class="d-flex align-items-center">
                                    <input type="search" value="<?= $billId ?>" class="form-control form-control-sm" id="bill-id" placeholder="Nhập mã hóa đơn" style="border-top-right-radius: 0; border-bottom-right-radius: 0">
                                    <button type="button" class="btn-search-product-detail">
                                        <i class="fas fa-search search-icon"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover admin-product-detail-table">
                    <thead>
                        <tr>
                            <th>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="selectAll">
                                    <label for="selectAll"></label>
                                </span>
                            </th>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Tên màu</th>
                            <th>Giá tiền</th>
                            <th>Số lượng</th>
                            <th class="w-auto">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody class="admin-bill-detail-list">

                    </tbody>
                </table>
                <div class="clearfix">
                    <div class="hint-text">Hiển thị <b>5</b> trong <b>25</b> chi tiết</div>
                    <div id="pagination">
						
					</div>
					<input type="hidden" name="currentpage" id="currentpage" value="1">
                </div>
            </div>
        </div>
    </div>

    <div id="updateStatusBill" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Cập nhật tình trạng hóa đơn</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body confirm-save">
						
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-danger btn-confirm-bill" value="Xác nhận">
					</div>
				</form>
			</div>
		</div>
	</div>

    <?php 
	include 'MauSac.php';
    ?>
</main>