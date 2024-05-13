<main>
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-NhomQuyen">Đổi Trả</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="#adminDoiTra" id="add_NhomQuyen" class="btn btn-success add" data-toggle="modal"><i class="material-icons">&#xE147;</i><span>Thêm</span></a>
							<a href="#deleteNhomQuyen" class="btn btn-danger delete" data-toggle="modal"><i class="material-icons">&#xE15C;</i> <span>Xóa</span></a>
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
							<th>Mã Phiếu Đổi Trả</th>
							<th>Mã Hóa Đơn</th>
							<th>Nhân Viên</th>
							<th>Ngày Trả</th>
							<th>Số Lượng Trả</th>
							<th>Tổng Tiền Trả</th>
							<th class='w-auto'>Actions</th>
						</tr>
					</thead>
					<tbody id="show-listDoiTra">
					</tbody>
				</table>
				<div class="clearfix">
					<div class="hint-text">Showing <b id="cur">5</b> out of <b id="total">25</b> entries</div>
					<div id="pagination">
					</div>
					<input type="hidden" name="currentpage" id="currentpage" value="1">
				</div>
			</div>
		</div>
		<!-- Add Modal HTML -->
		<div id="adminDoiTra" class="modal fade">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<form>
						<div class="modal-header">
							<h4 class="modal-title">Tạo Phiếu Đổi Trả</h4>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<input type="hidden" class="form-control" required id="action" value="Add">
							<input type="hidden" class="form-control" required id="admin-maphieudoitra">
							<div class="form-group">
								<p id="mess_maquyen"></p>
								<label>Mã Hóa Đơn</label>
								<select class="form-control form-control-sm" aria-label="Default select example" id="admin-select-mahoadon">
								</select>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<p id="mess_tenquyen"></p>
										<label>Nhân Viên</label>
										<input type="text" class="form-control form-control-sm" required id="admin-doitra-manhanvien" readonly='false'>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col">
										<div class="form-group">
											<label for="table1">Chi Tiết Đổi Trả</label>
											<table class="table" id="tableChiTietDoiTra">
												<thead>
													<tr>
														<th scope="col">#</th>
														<th scope="col">Mã IME</th>
														<th scope="col">ID</th>
														<th scope="col">Lý Do</th>
														<th scope="col">Giá Sản Phẩm</th>
														<th scope="col">Action</th>
													</tr>
												</thead>
												<tbody id="admin-showDoiTra">
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="form-group">
										<p id="mess_tenquyen"></p>
										<label>Tổng Số Lượng</label>
										<br>
										<input type="text" name="" id="admin-DoiTra-tongsoluong" class="form-control" readonly='false'>
									</div>
								</div>
								<div class="col">
									<div class="form-group">
										<p id="mess_tenquyen"></p>
										<label>Tổng Tiền Trả</label>
										<br>
										<input type="text" name="" id="admin-DoiTra-tongtientra" class="form-control" readonly='false'>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="form-group">
										<label for="table1">Chi Tiết Hóa Đơn</label>
										<table class="table" id="tableChiTietHoaDon">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">Mã IME</th>
													<th scope="col">ID</th>
													<th scope="col">Tên</th>
													<th scope="col">Giá</th>
													<th scope="col">Action</th>
												</tr>
											</thead>
											<tbody id="admin-showChitiethoadon">
	
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancel">
							<input type="button" class="btn btn-success" value="Thêm" id="admin-add-DoiTra">
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- Edit Modal HTML -->
		<div id="detailPhieuDoiTra" class="modal fade">
			<div class="modal-dialog modal-lg"> <!-- Sử dụng lớp modal-lg để làm cho modal lớn hơn -->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Chi Tiết Phiếu Đổi Trả</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body"> <!-- Thêm lớp modal-body để chứa nội dung của modal -->
						<div class="table-responsive"> <!-- Thêm lớp table-responsive để tạo bảng có khả năng cuộn ngang -->
							<table class="table">
								<thead>
									<tr>
										<th scope="col">STT</th>
										<th scope="col">Mã IME</th>
										<th scope="col">Sản Phẩm</th>
										<th scope="col">Lý Do</th>
										<th scope="col">Giá Sản Phẩm</th>
										<th scope="col">Số Lượng</th>
										<th scope="col">Thành Tiền</th>
									</tr>
								</thead>
								<tbody id="admin-showChiTietDoiTra">

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Delete Modal HTML -->
		<div id="deleteNhomQuyen" class="modal fade">
			<div class="modal-dialog">
				<div class="modal-content">
					<form>
						<div class="modal-header">
							<h4 class="modal-title">Delete Employee</h4>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<p>Are you sure you want to delete these Records?</p>
							<p class="text-warning"><small>This action cannot be undone.</small></p>
						</div>
						<div class="modal-footer">
							<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
							<input type="button" class="btn btn-danger" value="Delete" id="btnDelete">
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- Detail Modal HTML -->
		<div id="detailNhomQuyen" class="modal fade">
			<div class="modal-dialog">
				<div class="modal-content">
					<form>
						<div class="modal-header">
							<h4 class="modal-title">Chi Tiết Quyền</h4>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<div class="form-group">
								<div class="form-group">
									<label>Mã Nhóm Quyền</label>
									<input class="form-control" type="text" name="" id="detail_maquyen" required readonly="false">
								</div>
							</div>
							<div class="form-group">
								<label>Tên Nhóm Quyền</label>
								<input type="text" class="form-control" name="" id="detail_tenquyen" required readonly="false">
							</div>
						</div>
						<div class="modal-footer">
							<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancel">
							<!-- <input type="button" class="btn btn-info" id="btnUpdate" value="Update"> -->
						</div>
					</form>
				</div>
			</div>
		</div>
</main>