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
							<th>ID</th>
							<th>Khách Hàng</th>
							<th>Nhân Viên</th>
							<th>Ngày Tạo</th>
							<th>Tổng Tiền</th>
							<th>Khuyến Mãi</th>
							<th>Thành tiền</th>
							<th>Hình thức</th>
							<th>Tình Trạng</th>
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
</main>