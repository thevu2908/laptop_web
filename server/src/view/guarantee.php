<?php include 'header.php' ?>

<div class="container">
  <h1 class="mt-5 mb-4 text-center">Tra cứu bảo hành sản phẩm</h1>
  <form>
  <div class="form-group">
      <a href="#" id="ThoiGianBaoHanhUser" class="btn btn-success" data-toggle="modal">
							<span>Tra cứu thời gian bảo hành</span>
							</a>
    </div>
    <div class="form-group">
      <label for="serialNumber">Nhập số IMEI(Phía Dưới Đế LapTop):</label>
      <p id="show-err"></p>
      <input type="text" class="form-control" id="imei" placeholder="Nhập mã imei">
    </div>
    <button type="button" class="btn btn-danger" id="tracuu">Tra cứu</button>
  </form>
  <div id="searchResult" class="mt-4">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Mã IME</th>
          <th>Tên Sản Phẩm</th>
          <th>Ngày Bảo Hành</th>
          <th>Ngày Trả</th>
          <th>Lý Do</th>
          <th>Nội Dung</th>
          <th>Tình Trạng</th>
          <th>Hình Ảnh</th>
        </tr>
      </thead>
      <tbody id="show-listTraCuu">
      </tbody>
    </table>
  </div>
</div>
<div id="tracuuThoiGianBaoHanhUser" class="modal fade">
<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Tra Cứu Thời Hạn Bảo Hành</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
<?php include "./server/src/view/footer.php" ?>