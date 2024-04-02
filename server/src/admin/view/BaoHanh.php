<main>
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-NhomQuyen">Bảo Hành</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="#" class="btn btn-secondary"><i class="material-icons">&#xE24D;</i> <span>Import
									Excel</span></a>
							<a href="#" class="btn btn-secondary"><i class="material-icons">&#xE24D;</i> <span>Export
									Excel</span></a>
							<a href="#addNhomQuyen" id="add_NhomQuyen" class="btn btn-success add" data-toggle="modal"><i
									class="material-icons">&#xE147;</i> <span>Thêm</span></a>
							<a href="#deleteNhomQuyen" class="btn btn-danger delete" data-toggle="modal"><i
									class="material-icons">&#xE15C;</i> <span>Xóa</span></a>
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
							<th>Mã Phiếu Bảo Hành</th>
                            <th>Mã Hóa Đơn</th>
							<th>Nhân Viên</th>
							<th>Khách Hàng</th>
                            <th>Ngày Bảo Hành</th>
                            <th>Ngày Trả</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody id="show-listNhomQuyen">
					</tbody>
				</table>
				<div class="clearfix">
				<div class="hint-text">Showing <b id="cur">5</b> out of <b id="total">25</b> entries</div>
					<nav id="panigation">
                    </nav>
					<input type="hidden" name="currentpage" id="currentpage" value="1">
				</div>
			</div>
		</div>
	</div>
	<!-- Add Modal HTML -->
	<div id="addNhomQuyen" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Tạo Phiếu Bảo Hành</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<input type="hidden" class="form-control" required id="action" value="Add">
						<div class="form-group">
							<p id="mess_maquyen"></p>
							<label>Mã Hóa Đơn</label>
							<select class="form-select" aria-label="Default select example" id="admin-select-mahoadon">
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                            </select>
						</div>
						<div class="form-group">
							<p id="mess_tenquyen"></p>
							<label>Tên Quyền</label>
							<input type="text" class="form-control" required id="ten_quyen">
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
						<input type="button" class="btn btn-success" value="Thêm" id="addNhomQuyen">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- Edit Modal HTML -->
	<div id="editNhomQuyen" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Sửa Nhóm Quyền</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<div class="form-group">
								<label>Mã Nhóm Quyền</label>
								<input class="form-control" type="text" name="" id="maquyen" required>
							</div>
						</div>
						<div class="form-group">
							<label>Tên Nhóm Quyền</label>
							<input type="text" class="form-control" name="" id="tenquyen" required>
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
						<input type="button" class="btn btn-info" id="btnUpdate" value="Update">
					</div>
				</form>
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
								<input class="form-control" type="text" name="" id="detail_maquyen" required
									readonly="false">
							</div>
						</div>
						<div class="form-group">
							<label>Tên Nhóm Quyền</label>
							<input type="text" class="form-control" name="" id="detail_tenquyen" required
								readonly="false">
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