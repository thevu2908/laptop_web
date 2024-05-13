<main id="admin-bill-main">
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row justify-content-between">
						<div class="col-sm-6">
							<h2>Quản Lý <b>HÓA ĐƠN</b></h2>
						</div>
						<select class="form-select" aria-label="Default select example" id="admin-select-hoadon">
							<option value='all'>Tất cả</option>
							<option value='Đã xác nhận'>Đã xác nhận</option>
							<option value='Chưa xác nhận'>Chưa xác nhận</option>
						</select>
					</div>
				</div>
				<table class="table-bill table table-striped table-hover">
					<thead>
						<tr>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 0)" >
								ID
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 1)" >
								Khách Hàng
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 2)" >
								Nhân Viên
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 3)" >
								Ngày Đặt
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 4)" >
								Tổng Tiền
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 5)" >
								Khuyến Mãi
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 6)" >
								Thành tiền
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 7)" >
								Hình thức
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-bill-main table.table', 8)" >
								Tình Trạng
							</th>
							<th class="w-auto">Actions</th>
						</tr>
					</thead>
					<tbody class="admin-bill-list">
						
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

	<div id="viewTTNHModal" class="modal fade product-config-modal" data-backdrop="static" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title product-config-detail-name">Thông tin nhận hàng <b class="ttnh-id"></b></h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body px-0">
					<form class="view-TTNH-form">
						<div class="modal-row">
							<h5 class="modal-row-title">Thông tin người đặt</h5>
							<table class="modal-row-table">
								<tbody>
									<tr>
										<td>Họ tên:</td>
										<td class="sender-name"></td>
									</tr>
									<tr>
										<td>Số điện thoại:</td>
										<td class="sender-phone"></td>
									</tr>
									<tr>
										<td>Email:</td>
										<td class="sender-email"></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="modal-row">
							<h5 class="modal-row-title">Thông tin người nhận</h5>
							<table class="modal-row-table">
								<tbody>
									<tr>
										<td>Họ tên:</td>
										<td class="recipient-name"></td>
									</tr>
									<tr>
										<td>Số điện thoại:</td>
										<td class="recipient-phone"></td>
									</tr>
									<tr>
										<td>Địa chỉ giao:</td>
										<td class="recipient-address"></td>
									</tr>
								</tbody>
							</table>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</main>