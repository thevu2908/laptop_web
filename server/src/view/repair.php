
<div class="container">
  <h1 class="mt-5 mb-4 text-center">Tra cứu bảo hành sản phẩm</h1>
  <form>
    <div class="form-group">
      <label for="serialNumber">Nhập số IMEI(Phía Dưới Đế LapTop):</label>
      <p id="show-err"></p>
      <input type="text" class="form-control" id="imei" placeholder="Nhập mã imei">
    </div>
    <button type="button" class="btn btn-primary" id="tracuu">Tra cứu</button>
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
<?php include "./server/src/view/footer.php"?>