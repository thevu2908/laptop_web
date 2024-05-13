<main id="admin-guarantee-main">
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-NhomQuyen">Bảo Hành</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="#addBaoHanh" id="admin-addBaoHanh" class="btn btn-success add" data-toggle="modal">
								<i class="material-icons">&#xE147;</i> <span>Thêm</span>
							</a>
							<a href="#tracuuThoiGianBaoHanh" id="admin-tracuuThoiGianBaoHanh" class="btn btn-success" data-toggle="modal">
								<i class="material-icons">&#xE147;</i> <span>Tra cứu thời gian bảo hành</span>
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
							<th>Mã Phiếu Bảo Hành</th>
							<th>Nhân Viên</th>
							<th>Mã Hóa Đơn</th>
							<th>Khách Hàng</th>
							<th>Ngày Bảo Hành</th>
							<th>Ngày Trả</th>
							<th>Tình Trạng</th>
							<th class='w-auto'>Actions</th>
						</tr>
					</thead>
					<tbody id="show-listBaoHanh">
					</tbody>
					<p id="show-mess"></p>
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
	<!-- Add Modal HTML -->
	<div id="addBaoHanh" class="modal fade">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Tạo Phiếu Bảo Hành</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<input type="hidden" class="form-control" required id="action" value="Add">
						<input type="hidden" class="form-control" id="admin-mabaohanh">
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
									<input type="text" name="" id="admin-baohanh-manhanvien" class="form-control form-control-sm">

								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<p id="mess_tenquyen"></p>
									<label>Khách Hàng</label>
									<input type="text" class="form-control form-control-sm" required id="admin-baohanh-makhachhang" readonly='false'>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div class="form-group">
									<label for="table1">Chi Tiết Bảo Hành</label>
									<table class="table" id="tableChiTietBaoHanh">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Mã IME</th>
												<th scope="col">ID</th>
												<th scope="col">Lý Do</th>
												<th scope="col">Nội Dung</th>
												<th scope="col">Giá</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody id="show-adminBaoHanh">

										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="form-group">
							<p id="mess_maquyen"></p>
							<label>Trình Trạng</label>
							<select class="form-control form-control-sm" aria-label="Default select example" id="admin-select-trinhtrang">
								<option value="Đang Bảo Hành" selected>Đang Bảo Hành</option>
								<option value="Đã Bảo Hành">Đã Bảo Hành</option>
								<option value="Từ Chối Bảo Hành">Từ Chối Bảo Hành</option>
							</select>
						</div>
						<div class="row">
							<div class="col">
								<div class="form-group">
									<label for="table1">Chi Tiết Bảo Hành</label>
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
						<input type="button" class="btn btn-danger" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-success" value="Thêm" id="admin-add-BaoHanh">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- Tra Cuu Modal HTML -->
	<div id="tracuuThoiGianBaoHanh" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Tra Cứu Thời Hạn Bảo Hành</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<select class="form-control form-control-sm mb-3" aria-label="Default select example" id="admin-select-hinhthuctracuu">
							<option value="imei" selected>Mã IMEI</option>
							<option value="sdt">Số Điện Thoại</option>
						</select>
						<div class="form-group" id="imei">
							<label>Số Điện Thoại hoặc IMEI(Phía Dưới Đế LapTop)</label>
							<input type="text" class="form-control" name="" id="thoigian-imei">
						</div>
					</div>
					<div id="ketqua-tracuu" class="modal-body">
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-danger" data-dismiss="modal" id="btnCancelTraCuu" value="Hủy">
						<input type="button" class="btn btn-info" id="btnTraCuuThoiGian" value="Tra cứu">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- LyDo Modal HTML -->
	<div id="lydobaohanh" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Lý Do Bảo Hành</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<textarea name="" id="lydoBH" cols="30" rows="10" class="form-control"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-primary" data-dismiss="modal" value="Save" id="save-lydoBH">
						<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancel">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- Detail Modal HTML -->
	<div id="detailPhieuBaoHanh" class="modal fade">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Chi Tiết Phiếu Bảo Hành</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<div class="table-responsive">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">STT</th>
									<th scope="col">Mã IME</th>
									<th scope="col">Sản Phẩm</th>
									<th scope="col">Lý Do</th>
									<th scope="col">Nội Dung Bảo Hành</th>
								</tr>
							</thead>
							<tbody id="admin-showChiTietBaoHanh">

							</tbody>
						</table>

					</div>

					<select class="form-control form-control-sm" aria-label="Default select example" id="admin-updateBaoHanh">
						<option value="Đang Bảo Hành" selected>Đang Bảo Hành</option>
						<option value="Đã Bảo Hành">Đã Bảo Hành</option>
					</select>
					<div class="modal-footer">
						<input type="button" class="btn btn-primary" data-dismiss="modal" value="Save" id="admin-updateChiTietBaoHanh">
						<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancel">
					</div>
				</div>
			</div>
		</div>
	</div>
</main>