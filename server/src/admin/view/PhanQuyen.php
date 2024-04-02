<main>
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-PhanQuyen">Phân Quyền</b></h2>
							<select class="form-select" aria-label="Default select example" id="admin-select-nhomquyen">
                                
                            </select>
						</div>
						<div class="col-sm-6">
							<a href="#" class="btn btn-secondary"><i class="material-icons">&#xE24D;</i> <span>Import Excel</span></a>
							<a href="#" class="btn btn-secondary"><i class="material-icons">&#xE24D;</i> <span>Export Excel</span></a>
							<a href="#addPhanQuyenModal" id="admin-add-phanquyen" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Thêm</span></a>
							<a href="#deletePhanQuyenModal" class="btn btn-danger delete" data-toggle="modal" id="admin-delete-phanquyen"><i class="material-icons">&#xE15C;</i> <span>Xóa</span></a>
						</div>
					</div>
				</div>
				<table class="table table-striped table-hover" id="mytable">
					<thead>
						<tr>
							<th>
								<span class="custom-checkbox">
									<input type="checkbox" id="selectAll">
									<label for="selectAll"></label>
								</span>
							</th>
							<th>Nhóm Quyền</th>
							<th>Chức Năng</th>
							<th>Xem</th>
							<th>Thêm</th>
                            <th>Xóa</th>
                            <th>Sửa</th>
						</tr>
					</thead>
					<tbody id="show-ListPhanQuyen">
                    
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
	<div id="addPhanQuyenModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Thêm Mới Phân Quyền</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label>Nhóm Quyền</label>
							<br>
							<select name="" id="select_nhomquyen" class="form-control"></select>
						</div>
						<div class="form-group">
							<label>Chức Năng</label>
							<br>
							<select name="" id="select_chucnang" class="form-control"></select>
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
						<input type="button" class="btn btn-success" value="Add" id="add_PhanQuyen">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- Edit Modal HTML -->
	<div id="editEmployeeModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Sửa Tài Khoản</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<input type="hidden" name="ma_tk">
						<div class="form-group">
							<div class="form-group">
								<label>Mã Tài Khoản</label>
								<input class="form-control" type="text" name="password" required>
							</div>
							<!-- <input type="text" class="form-control" required> -->
							<select name="" id="" class="form-control" required>
								<option value="">A</option>
								<option value="">B</option>
								<option value="">C</option>
							</select>
						</div>
						<div class="form-group">
							<label>Username</label>
							<input type="text" class="form-control" name="username" required>
						</div>
						<div class="form-group">
							<label>Password</label>
							<input class="form-control" type="password" name="password" required>
						</div>
						<!-- <div class="form-group">
						<label>Phone</label>
						<input type="text" class="form-control" required>
					</div>					 -->
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
						<input type="submit" class="btn btn-info" value="Save">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- Delete Modal HTML -->
	<div id="deletePhanQuyenModal" class="modal fade">
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
						<input type="button" class="btn btn-danger" value="Delete" id="admin-delete">
					</div>
				</form>
			</div>
		</div>
	</div>
</main>