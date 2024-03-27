<main id="admin-product-detail-main">
    <div class="container-xl">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Chi Tiết Sản Phẩm <b class="product-name"></b></h2>
                        </div>
                        <div class="col-sm-6 d-flex justify-content-end">
                            <form>
                                <div class="d-flex align-items-center">
                                    <?php
                                    $productId = "";
                                    if (isset($_REQUEST['id'])) {
                                        $productId = $_REQUEST['id'];
                                    }
                                    ?>
                                    <input type="search" value="<?= $productId ?>" class="form-control form-control-sm" id="product-id" placeholder="Nhập mã sản phẩm" style="border-top-right-radius: 0; border-bottom-right-radius: 0">
                                    <button type="button" class="btn-search-product-detail">
                                        <i class="fas fa-search search-icon"></i>
                                    </button>
                                </div>
                            </form>
                            <a href="#addProductDetailModal" class="btn btn-success btn-add-product-detail-modal" data-toggle="modal">
                                <i class="material-icons">&#xE147;</i>
                                <span>Thêm</span>
                            </a>
                            <a href="#deleteProductDetailModal" class="btn btn-danger btn-delete-checked-product-detail-modal" data-toggle="modal">
								<i class="material-icons">&#xE15C;</i>
								<span>Xóa</span>
							</a>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="selectAll">
                                    <label for="selectAll"></label>
                                </span>
                            </th>
                            <th>ID</th>
                            <th>CPU</th>
                            <th>Màu sắc</th>
                            <th>Card đồ họa</th>
                            <th>RAM</th>
                            <th>ROM</th>
                            <th>Cổng kết nối</th>
                            <th>Giá</th>
                            <th>Số lượng tồn</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="admin-product-detail-list">

                    </tbody>
                </table>
                <div class="clearfix">
                    <div class="hint-text">Hiển thị <b>5</b> trong <b>25</b> chi tiết</div>
                    <ul class="pagination">
                        <li class="page-item disabled">
                            <a href="#">Previous</a>
                        </li>
                        <li class="page-item active">
                            <a href="#" class="page-link">1</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">2</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">3</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">4</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">5</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

	<div id="addProductDetailModal" class="modal fade product-config-modal" data-backdrop="static" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title product-config-detail-name">Thêm chi tiết sản phẩm <b class="product-detail-id"></b></h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body px-0">
					<form class="add-product-detail-form">
                        <div class="modal-row">
							<h5 class="modal-row-title">Thiết kế & trọng lượng</h5>
							<table class="modal-row-table">
								<tbody>
									<tr>
										<td>Màu sắc:</td>
										<td>
											<select id="product-color" class="form-control">
												
											</select>
										</td>
										<td>
											<button href="#addProductColorModal" data-toggle="modal" type="button" class="btn btn-outline-primary btn-ssm br-50 ml-2">
												<i class="fa-solid fa-plus"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="modal-row">
							<h5 class="modal-row-title">Bộ xử lý</h5>
							<table class="modal-row-table">
								<tbody>
									<tr>
										<td>CPU</td>
										<td>
											<select id="product-cpu" class="form-control">
												
											</select>
										</td>
										<td>
											<button href="#addProductCPUModal" data-toggle="modal" type="button" class="btn btn-outline-primary btn-ssm br-50 ml-2">
												<i class="fa-solid fa-plus"></i>
											</button>
											<button href="#deleteProductCPUModal" type="button" class="btn-delete-cpu-modal btn btn-outline-danger btn-ssm br-50 ml-1">
												<i class="fa-solid fa-minus"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="modal-row">
							<h5 class="modal-row-title">Bộ nhớ</h5>
							<table class="modal-row-table">
								<tbody>
									<tr>
										<td>Dung lượng RAM</td>
										<td>
											<select id="product-ram" class="form-control">
												<option value="8gb">8GB</option>
												<option value="16gb">16GB</option>
												<option value="32gb">32GB</option>
												<option value="64gb">64GB</option>
											</select>
										</td>
									</tr>
									<tr>
										<td>Dung lượng ROM</td>
										<td>
											<select id="product-rom" class="form-control">
												<option value="256gb">256GB</option>
												<option value="512gb">512GB</option>
												<option value="1tb">1TB</option>
												<option value="2TB">2TB</option>
											</select>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="modal-row">
							<h5 class="modal-row-title">Đồ họa</h5>
							<table class="modal-row-table">
								<tbody>
									<tr>
										<td>Card đồ họa</td>
										<td>
											<select id="product-gpu" class="form-control">
												
											</select>
										</td>
										<td>
											<button href="#addProductGPUModal" data-toggle="modal" type="button" class="btn btn-outline-primary btn-ssm br-50 ml-2">
												<i class="fa-solid fa-plus"></i>
											</button>
											<button href="#deleteProductGPUModal" type="button" class="btn-delete-gpu-modal btn btn-outline-danger btn-ssm br-50 ml-1">
												<i class="fa-solid fa-minus"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="modal-row">
							<h5 class="modal-row-title">Giao tiếp & kết nối</h5>
							<table class="modal-row-table">
								<tbody>
									<tr>
										<td>Cổng kết nối</td>
										<td>
											<select id="product-plug" class="form-control selectpicker" multiple data-live-search="true">
												
											</select>
										</td>
										<td>
											<button href="#addProductPlugModal" data-toggle="modal" type="button" class="btn btn-outline-primary btn-ssm br-50 ml-2">
												<i class="fa-solid fa-plus"></i>
											</button>
											<button href="#deleteProductPlugModal" type="button" class="btn-delete-plug-modal btn btn-outline-danger btn-ssm br-50 ml-1">
												<i class="fa-solid fa-minus"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
					<input type="button" class="btn btn-primary btn-add-product-detail" value="Thêm">
				</div>
			</div>
		</div>
	</div>

	<div id="deleteProductDetailModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Xóa chi tiết sản phẩm</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body confirm-delete">
						
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-danger btn-delete-product-detail" value="Xóa">
					</div>
				</form>
			</div>
		</div>
	</div>

    <?php 
    include 'ThuongHieu.php';
	include 'TheLoai.php';
	include 'MauSac.php';
	include 'ChipXuLy.php';
	include 'CardDoHoa.php';
	include 'CongKetNoi.php';
	include 'HeDieuHanh.php';
    ?>
</main>