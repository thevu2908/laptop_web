<main>
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-KhuyenMai">Khuyến Mãi</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="#addEmployeeModal" class="btn btn-success add" data-toggle="modal">
								<i class="material-icons">&#xE147;</i>
								<span>Thêm</span>
							</a>
							<a href="#deleteEmployeeModal" class="btn btn-danger delete" data-toggle="modal">
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
							<th>Mã Quyền</th>
							<th>Tên Quyền</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<span class="custom-checkbox">
									<input type="checkbox" id="checkbox1" name="options[]" value="1">
									<label for="checkbox1"></label>
								</span>
							</td>
							<td>1</td>
							<td>Admin</td>
							<td><span class="status text-success">&bull;</span> Active</td>
							<td>
								<a href="#editEmployeeModal" class="edit" data-toggle="modal">
									<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#deleteEmployeeModal" class="delete" data-toggle="modal">
									<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
								<a href="#" class="view" title="View" data-toggle="tooltip">
									<i class="material-icons">&#xE417;</i>
								</a>
							</td>
						</tr>
						<tr>
							<td>
								<span class="custom-checkbox">
									<input type="checkbox" id="checkbox1" name="options[]" value="1">
									<label for="checkbox1"></label>
								</span>
							</td>
							<td>1</td>
							<td>Admin</td>
							<td><span class="status text-success">&bull;</span> Active</td>
							<td>
								<a href="#editEmployeeModal" class="edit" data-toggle="modal">
									<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#deleteEmployeeModal" class="delete" data-toggle="modal">
									<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
								<a href="#" class="view" title="View" data-toggle="tooltip">
									<i class="material-icons">&#xE417;</i>
								</a>
							</td>
						</tr>
						<tr>
							<td>
								<span class="custom-checkbox">
									<input type="checkbox" id="checkbox1" name="options[]" value="1">
									<label for="checkbox1"></label>
								</span>
							</td>
							<td>1</td>
							<td>Admin</td>
							<td><span class="status text-success">&bull;</span> Active</td>
							<td>
								<a href="#editEmployeeModal" class="edit" data-toggle="modal">
									<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#deleteEmployeeModal" class="delete" data-toggle="modal">
									<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
								<a href="#" class="view" title="View" data-toggle="tooltip">
									<i class="material-icons">&#xE417;</i>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="clearfix">
					<div class="hint-text">Hiển thị <b>5</b> trong <b>25</b> kết quả</div>
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

	<div id="addPromotionModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Thêm khuyến mãi</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label>Name</label>
							<input type="text" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Email</label>
							<input type="email" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Address</label>
							<textarea class="form-control" required></textarea>
						</div>
						<div class="form-group">
							<label>Phone</label>
							<input type="text" class="form-control" required>
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
						<input type="submit" class="btn btn-success" value="Add">
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="editPromotionModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Sửa thông tin khuyến mãi</h4>
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
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
						<input type="submit" class="btn btn-info" value="Save">
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="deletePromotionModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Xóa khuyến mãi</h4>
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