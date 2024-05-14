<main id="admin-access-main">
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-NhomQuyen">Nhóm Quyền</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="#addNhomQuyen" id="add_NhomQuyen" class="btn btn-success add" data-toggle="modal">
								<i class="material-icons">&#xE147;</i>
								<span>Thêm</span>
							</a>
							<a href="#deleteNhomQuyen" class="btn btn-danger delete" data-toggle="modal">
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
							<th style="cursor: pointer;" onclick="sortTable('#admin-access-main table.table', 1)">Mã Quyền</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-access-main table.table', 2)">Tên Quyền</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody id="show-listNhomQuyen">
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
	</div>
	<!-- Add Modal HTML -->
	<div id="addNhomQuyen" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Thêm Nhóm Quyền</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<input type="hidden" class="form-control" required id="action" value="Add">
						<div class="form-group">
							<p id="mess_maquyen"></p>
							<label>Mã Nhóm Quyền</label>
							<input type="text" class="form-control"  id="ma_quyen" readonly='false'>
						</div>
						<div class="form-group">
							<p id="mess_tenquyen"></p>
							<label>Tên Quyền</label>
							<input type="text" class="form-control" required id="ten_quyen">
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Hủy">
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
								<input class="form-control" type="text" name="" readonly="true" id="maquyen" required>
							</div>
						</div>
						<div class="form-group">
							<label>Tên Nhóm Quyền</label>
							<input type="text" class="form-control" name="" id="tenquyen" required>
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-info" id="btnUpdate" value="Lưu">
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
						<h4 class="modal-title">Xóa Nhóm Quyền</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<có>Bạn có muốn xóa nhóm quyền này không ?</p>
						<p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-danger" value="Xóa" id="btnDelete">
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
				</form>
			</div>
		</div>
	</div>
</main>