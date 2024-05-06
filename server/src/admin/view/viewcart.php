<main>
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">

					<div class="row align-items-center">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-NhomQuyen">Nhập Hàng</b></h2>
						</div>
						<?php if (true) {  ?>
							<div class="col-sm-6 d-flex justify-content-end align-items-center">
								<select class="form-control form-control-sm w-auto">
									<option value="1">--Chọn Nhà Cung Cấp--</option>
									<option value="2">Option 2</option>
									<option value="3">Option 3</option>
								</select>
								<a href="#addimportModal" class="btn btn-success btn-pay-cartimport add" data-toggle="modal">
									<i class="material-icons">&#xE147;</i>
									<span>Thanh Toán</span>
								</a>
							</div>
						<?php } else echo "Nothing" ?>
					</div>
				</div>

				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th class="w-auto">Mã sản phẩm</th>
							<th class="w-auto">Mã Chi Tiết Sản Phẩm</th>
							<th class="w-auto">Tên Sản Phẩm</th>
							<th class="w-auto">Hình Ảnh</th>
							<!-- <th class="w-auto">Nhà Cung Cấp</th> -->
							<th class="w-auto">ram</th>
							<th class="w-auto">rom</th>
							<th class="w-auto">Tên Màu</th>
							<th class="w-auto">Số Lượng</th>
							<th class="w-auto">Giá</th>
							<th class="w-auto">Tổng Tiền</th>
							<th class="w-auto">Action(Xóa)</th>
						</tr>
					</thead>
					<tbody id="show-listNhomQuyen">
						<?php
						if (isset($_SESSION['cartimport']) && is_array($_SESSION['cartimport'])) {
							$cart = $_SESSION['cartimport'];
							$tongtien = 0;
							foreach ($cart as $cart1) {
								foreach ($cart1 as $ma => $each) {
									if (array_key_exists("gia_nhap", $each)) {
										$gia_nhap = intval($each['gia_nhap']);
										var_dump($gia_nhap);
									} else {
										continue;
									}
									$quantity = intval($each['quantity']);

									$thanhtien = ($gia_nhap * $quantity);

									$tongtien += $thanhtien;
						?>
									<input type="hidden" class="inp-ma-ncc" value="<?php echo $each['ma_ncc'] ?>">
									<tr>
										<td><?php echo $each['ma_sp'] ?></td>
										<td><?php echo $each['ma_ctsp'] ?></td>
										<td><?php echo $each['ten_sp'] ?></td>
										<td><img style="width: 70px;" src="<?php echo $each['hinh_anh'] ?>" alt="Hình ảnh sản phẩm"></td>
										<!-- <td>
											<select id="mancc" class="item-ma-ncc">
												<?php foreach ($rows1 as $each1) { ?>
													<option value="<?php echo $each1['ma_ncc'] ?>"><?php echo $each1['ten_ncc'] ?></option>
												<?php } ?>
											</select>
										</td> -->

										<!-- <td><input class="change-quanty-cartimport" data-ma="<?php echo $each['ma_sp'] ?>" data-mactsp="<?php echo $each['ma_ctsp'] ?>" style="width: 50px" type="number" min=1 value="<?php echo $quantity ?>"></td> -->
										<td><?php echo $each['ram'] ?></td>
										<td><?php echo $each['rom'] ?></td>
										<td><?php echo $each['ten_mau'] ?></td>
										<td>
											<input class="change-quanty-cartimport form-control" data-ma="<?php echo $each['ma_sp'] ?>" data-mactsp="<?php echo $each['ma_ctsp'] ?>" style="width: 70px" type="number" min="1" value="<?php echo $quantity ?>">
										</td>

										<td><?php echo number_format($gia_nhap, 0, ',', '.') . 'VND' ?></td>
										<td><?php echo number_format($thanhtien, 0, ',', '.') . 'VND' ?></td>
										<td>
											<?php if (true) { ?>
												<!-- <button style="background-color: #ff0000; color: #fff; padding: 10px 12px; font-size: 16px; width: 80px;" class="btn-delete-productcart" value="<?php echo $ma . '.' . $each['ma_ncc'] . '.' . $each['ma_ctsp'] ?>">Xóa</button> -->
												<button type="button" class="btn btn-danger btn-delete-productcart" value="<?php echo $ma . '.' . $each['ma_ncc'] . '.' . $each['ma_ctsp'] ?>">Xóa</button>
											<?php } else echo 'Nothing' ?>
										</td>
									</tr>
						<?php
								}
							}
						} else {
							echo "<tr><td colspan='8' style='color: red; font-weight: bold;'>Không có dữ liệu giỏ hàng.</td></tr>";
						}
						?>

					</tbody>
				</table>
				<div class="clearfix">
					<input type="hidden" name="totalPriceImport" value="<?php echo isset($tongtien) ? $tongtien : 0 ?>">
					<p style="margin-top: 20px; font-size: 1.4rem;">Tổng thanh toán: <?php echo isset($tongtien) ? number_format($tongtien, 0, ',', '.') . 'VND' : '0 VND' ?></p>

					<div class="hint-text">
						Showing <b id="cur">5</b> out of <b id="total">25</b> entries
					</div>

					<div id="pagination">
					</div>
					<input type="hidden" name="currentpage" id="currentpage" value="1">
				</div>
			</div>
		</div>
	</div>
</main>

<script src="path/to/sweetalert2.all.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script src="/client/pages/PhieuNhap.js"></script>