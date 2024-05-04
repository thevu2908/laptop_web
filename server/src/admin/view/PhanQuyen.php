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
						<div class="col-sm-6 ">
							<!-- <a href="#" class="btn btn-secondary"><i class="material-icons">&#xE24D;</i> <span>Import Excel</span></a>
							<a href="#" class="btn btn-secondary"><i class="material-icons">&#xE24D;</i> <span>Export Excel</span></a> -->
							<!-- <a href="#addPhanQuyenModal" id="admin-add-phanquyen" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Thêm</span></a> -->
							<a href="#addMulPhanQuyen" id="admin-add-phanquyen" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Thêm</span></a>
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
				   <div id="pagination">
                    </div>
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
	<!-- <div id="addMulPhanQuyen" class="modal fade">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thêm Phân Quyền</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <select class="form-control mb-3" id="admin-select-MaNhomQuyen">
                </select>
                <table class="table">
                    <thead>
                        <tr>
                            <th class='w-auto'>Chức Năng</th>
                            <th class='w-auto'>Quyền</th>
                        </tr>
                    </thead>
                    <tbody id="admin-show-ChucNang">
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="add_PhanQuyen">Save</button>
            </div>
        </div>
    </div>
</div> -->
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
	<!-- <p>Add Mul</p> -->
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
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
						<input type="button" class="btn btn-success" value="Thêm" id="addNhomQuyen">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- Modal -->
    <div id="addMulPhanQuyen" class="modal fade">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Danh sách quyền</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
			<div class="modal-header">
				<div class="col-md-8"> <!-- Adjust the width of the select element -->
					<select class="form-control mb-3" id="admin-select-MaNhomQuyen">
					</select>
				</div>
				<div class="col-md-4 text-right"> <!-- Adjust the width of the button -->
					<button type="button" class="btn btn-primary" href="#addNhomQuyen">Thêm Nhóm Quyền</button>
				</div>
			</div>
            <div class="modal-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col" colspan="1">Chức Năng</th>
                            <th scope="col">Xem</th>
                            <th scope="col">Thêm</th>
                            <th scope="col">Xóa</th>
                            <th scope="col">Sửa</th>
                        </tr>
                    </thead>
                    <tbody id="admin-show-ChucNang">
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
			<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="add_PhanQuyen">Save</button>
            </div>
        </div>
    </div>
</div>

</div>

</div>

</div>

</main>