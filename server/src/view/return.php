
<div class="container">
  <h1 class="mt-5 mb-4 text-center">Tra cứu đổi trả sản phẩm</h1>
  <form>
    <div class="form-group">
      <label for="phoneNumber">Nhập số điện thoại:</label>
      <p id="show-err"></p>
      <input type="text" class="form-control" id="sodienthoai" placeholder="Nhập số điện thoại">
    </div>
    <button type="button" class="btn btn-danger" id="tracuudoitra">Tra cứu</button>
  </form>
  <div id="searchResult" class="mt-4">
    <table class="table table-striped table-hover">
		<thead>
            <tr>
                <th>Mã IME</th>
                <th>Tên Sản Phẩm</th>
                <th>Ngày Đổi Trả</th>
                <th>Lý Do</th>
                <th>Giá Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Thành Tiền</th>
                <th>Hình Ảnh</th>
            </tr>
		</thead>
		<tbody id="show-listTraCuuDoiTra">
		</tbody>
	</table>
  </div>
</div>
<?php include "./server/src/view/footer.php"?>