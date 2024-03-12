<main>
      <div class="container-xl">
	  <div class="table-responsive">
		<div class="table-wrapper">
		<div class="table-title">
				<div class="row">
					<div class="col-sm-6">
						<h2>Quản Lý <b>Tài Khoản</b></h2>
					</div>
					<div class="col-sm-6">
						<a href="#" class="btn btn-secondary"><i class="material-icons">&#xE24D;</i> <span>Import Excel</span></a>
						<a href="#" class="btn btn-secondary"><i class="material-icons">&#xE24D;</i> <span>Export Excel</span></a>
						<a href="#addAccountModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Thêm</span></a>
						<a href="#deleteAccountModal" class="btn btn-danger" data-toggle="modal"><i class="material-icons">&#xE15C;</i> <span>Xóa</span></a>						
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
						<th>Mã Tài Khoản</th>
						<th>Quyền</th>
						<th>UserName</th>
						<th>Password</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody class="admin-account-list">
				</tbody>
			</table>
			<div class="clearfix">
				<div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
				<ul class="pagination">
					<li class="page-item disabled"><a href="#">Previous</a></li>
					<li class="page-item"><a href="#" class="page-link">1</a></li>
					<li class="page-item"><a href="#" class="page-link">2</a></li>
					<li class="page-item active"><a href="#" class="page-link">3</a></li>
					<li class="page-item"><a href="#" class="page-link">4</a></li>
					<li class="page-item"><a href="#" class="page-link">5</a></li>
					<li class="page-item"><a href="#" class="page-link">Next</a></li>
				</ul>
			</div>
		</div>
	</div>        
</div>
<!-- Add Modal HTML -->
<div id="addAccountModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form>
				<div class="modal-header">						
					<h4 class="modal-title">Thêm Tài Khoản</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label for="admin-account-username">Username</label>
						<input id="admin-account-username" type="text" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="admin-account-password">Password</label>
						<input type="password" class="form-control" id="admin-account-password" required>
					</div>				
					<div class="form-group">
						<label for="admin-account-access">Quyền tài khoản</label>
						<select id="admin-account-access" class="form-control">
						</select>
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
					<input type="submit" class="btn btn-success" value="Thêm">
				</div>
			</form>
		</div>
	</div>
</div>

<div id="editAccountModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form>
				<div class="modal-header">						
					<h4 class="modal-title">Sửa Tài Khoản</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
                    <input type="hidden" name="ma_tk" >									
					<div class="form-group">
                    <div class="form-group">
						<label>Mã Tài Khoản</label>
						<input class="form-control" type="text" name="password" required>
					</div>
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

				</div>
				<div class="modal-footer">
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
					<input type="submit" class="btn btn-info" value="Save">
				</div>
			</form>
		</div>
	</div>
</div>

<div id="deleteAccountModal" class="modal fade">
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
					<input type="submit" class="btn btn-danger" value="Delete">
				</div>
			</form>
		</div>
	</div>
</div>
</main>