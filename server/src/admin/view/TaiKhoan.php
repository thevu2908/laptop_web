<main id="admin-account-main">
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b>Tài Khoản</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="#addAccountModal" class="btn btn-success btn-open-add-account-modal add" data-toggle="modal">
								<i class="material-icons">&#xE147;</i>
								<span>Thêm</span>
							</a>
							<a href="#deleteAccountModal" class="btn btn-danger btn-delete-checked-account-modal delete" data-toggle="modal">
								<i class="material-icons">&#xE15C;</i>
								<span>Xóa</span>
							</a>
						</div>
					</div>
				</div>
				<table class="table table-striped table-hover admin-account-table">
					<thead>
						<tr>
							<th>
								<span class="custom-checkbox">
									<input type="checkbox" id="selectAll">
									<label for="selectAll"></label>
								</span>
							</th>
							<th>Mã Tài Khoản</th>
							<th>Quyền</th>
							<th>Username</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody class="admin-account-list">

					</tbody>
				</table>
				<div class="clearfix">
					<div class="hint-text"></div>
					<div id="pagination">

					</div>
					<input type="hidden" name="currentpage" id="currentpage" value="1">
				</div>
			</div>
		</div>
	</div>

	<div id="addAccountModal" class="modal fade" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Thêm tài khoản</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="admin-account-employee-choose">Chọn nhân viên để cấp tài khoản</label>
							<select class="form-control" name="admin-account-employee-choose" id="admin-account-employee-choose">
									
							</select>
						</div>
						<div class="form-group">
							<label for="admin-account-password">Password</label>
							<div class="admin-account-pwd">
								<input type="password" class="form-control" id="admin-account-password">
								<span class="showhide-pwd-icon">
									<i class="fa-regular fa-eye open"></i>
									<i class="fa-regular fa-eye-slash"></i>
								</span>
							</div>
						</div>
						<div class="form-group">
							<label for="admin-account-access">Quyền tài khoản</label>
							<select name="admin-account-access" id="admin-account-access" class="form-control">

							</select>
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-success btn-add-account" value="Thêm">
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="editAccountModal" class="modal fade" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Sửa thông tin tài khoản</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<input type="hidden" name="ma_tk">
						<div class="form-group">
							<div class="form-group">
								<label for="admin-account-id-edit">Mã tài khoản</label>
								<input type="text" class="form-control" name="admin-account-id-edit" id="admin-account-id-edit" disabled>
							</div>
							<div class="form-group">
							<label for="admin-account-access-edit">Quyền tài khoản</label>
								<select name="admin-account-access-edit" id="admin-account-access-edit" class="form-control">
									
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="admin-account-username-edit">Username</label>
							<input type="text" class="form-control" name="admin-account-username-edit" id="admin-account-username-edit" disabled>
						</div>
						<div class="form-group">
							<label for="admin-account-password-edit">Password</label>
							<div class="admin-account-pwd">
								<input class="form-control" type="password" name="admin-account-password-edit" id="admin-account-password-edit">
								<span class="showhide-pwd-icon">
									<i class="fa-regular fa-eye open"></i>
									<i class="fa-regular fa-eye-slash"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-info btn-update-account" value="Lưu">
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="deleteAccountModal" class="modal fade" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Xóa tài khoản</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body confirm-delete-account">

					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-danger btn-delete-account" value="Xóa">
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="viewAccountModal" class="modal fade" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Thông tin tài khoản</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<input type="hidden" name="ma_tk">
						<div class="form-group">
							<div class="form-group">
								<label for="admin-account-id-view">Mã tài khoản</label>
								<input type="text" class="form-control" name="admin-account-id-view" id="admin-account-id-view" disabled>
							</div>
							<div class="form-group">
							<label for="admin-account-access-view">Quyền tài khoản</label>
								<select name="admin-account-access-view" id="admin-account-access-view" class="form-control" disabled>
									
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="admin-account-username-view">Username</label>
							<input type="text" class="form-control" name="admin-account-username-view" id="admin-account-username-view" disabled>
						</div>
						<div class="form-group">
							<label for="admin-account-password-view">Password</label>
							<div class="admin-account-pwd">
								<input class="form-control" type="password" name="admin-account-password-view" id="admin-account-password-view" disabled>
								<span class="showhide-pwd-icon">
									<i class="fa-regular fa-eye open"></i>
									<i class="fa-regular fa-eye-slash"></i>
								</span>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</main>