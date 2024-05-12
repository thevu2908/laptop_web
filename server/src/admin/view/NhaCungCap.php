
<main id="admin-ncc-main">
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b>Nhà Cung Cấp</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="#addSuppilerModal" class="btn btn-success add" data-toggle="modal">
								<i class="material-icons">&#xE147;</i>
								<span>Thêm</span>
							</a>
							<a href="#deleteSuppilerModal" class="btn btn-danger btn-delete-checked-ncc-modal delete" data-toggle="modal">
								<i class="material-icons">&#xE15C;</i>
								<span>Xóa</span>
							</a>
						</div>
					</div>
				</div>
				<table class="table table-striped table-hover admin-ncc-table">
					<thead>
						<tr>
							<th>
								<span class="custom-checkbox">
									<input type="checkbox" id="selectAll">
									<label for="selectAll"></label>
								</span>
							</th>
							<th>Mã Nhà Cung Cấp</th>
							<th>Tên Nhà Cung Cấp</th>
							<th>Địa Chỉ</th>
							<th>Số điện thoại</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody class="admin-suppiler-list">
						
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

	<div id="addSuppilerModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Thêm Nhà Cung Cấp</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label>Mã Nhà Cung Cấp</label>
							<input type="text" class="form-control" readonly="true" required id="admin-nhacungcap-manhacungcap">
						</div>
						<div class="form-group">
							<label>Nhà Cung Cấp</label>
							<input type="text" class="form-control" required id="admin-nhacungcap-tennhacungcap">
						</div>
						<div class="form-group">
							<label>Địa Chỉ</label>
							<input type="text" class="form-control" required id="admin-nhacungcap-diachi">
						</div>
						<div class="form-group">
							<label>Số Điện Thoại</label>
							<input type="text" class="form-control" required id="admin-nhacungcap-sodienthoai">
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancel">
						<input type="button" class="btn btn-success" id="admin-btn-addNhaCungCap" value="Add">
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="editSuppilerModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Sửa thông tin Nhà Cung Cấp</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<input type="hidden" name="ma_tk">
						<div class="form-group">
						    <label>Mã Nhà Cung Cấp</label>
							<input class="form-control" type="text" readonly='true' name="password" id='admin-update-manhacungcap' required>
						</div>
						<div class="form-group">
							<label>Nhà Cung Cấp</label>
							<input type="text" class="form-control" name="username" id='admin-update-nhacungcap' required>
						</div>
						<div class="form-group">
							<label>Địa Chỉ</label>
							<input class="form-control" type="text" name="age" id='admin-update-diachi' required>
						</div>
						<div class="form-group">
							<label>Số Điện Thoại</label>
							<input class="form-control" type="text" name="phone" id='admin-update-sodienthoai' required>
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
						<input type="button" class="btn btn-info" id="admin-btn-updateNhaCungCap" value="Save">
					</div>
				</form>
			</div>
		</div>
	</div>

	

 <div id="deleteSuppilerModal" class="modal fade" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Xóa Nhà Cung Cấp</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body confirm-delete-ncc">

					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-danger btn-delete-ncc" value="Xóa">
					</div>
				</form>
			</div>
		</div>
	</div> 
	
</main>

