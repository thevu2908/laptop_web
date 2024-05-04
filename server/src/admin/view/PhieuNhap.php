<main>
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-NhomQuyen">Nhập Hàng</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="/admin.php?controller=nhaphang" class="btn btn-success add">
								<i class="material-icons">&#xE147;</i>
								<span>Phiếu Nhập</span>
							</a>
							<a href="/admin.php?controller=giohang" class="btn btn-danger delete">
								<i class="material-icons">&#xE15C;</i>
								<span>Giỏ Hàng</span>
							</a>
						</div>
					</div>
				</div>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th class="w-auto">Mã sản phẩm</th>
                            <th>Mã chi tiết sản phẩm</th>
							<th>Tên sản phẩm</th>
                            <th>Nhà cung cấp</th>
                            <th>Số lượng</th>
							<th>Giá</th>
							<th class="w-auto">Actions</th>
						</tr>
					</thead>
					<tbody id="show-listNhomQuyen">
						
					<?php 
					require_once __DIR__ . '/../../controller/PhieuNhapController.php';
					// var_dump($rows);
					// var_dump($x);
					if(isset($rows) && is_array($rows)) {
						foreach ($rows as $each) { 
					?>
                    <tr>
                        <td><?php echo $each['ma_sp'] ?></td>
						<td><?php echo $each['ma_ctsp'] ?></td>
                        <td><?php echo $each['ten_sp'] ?></td>
                        <td>
                            <select id="mancc" class="item-ma-ncc">
                                <?php foreach ($rows1 as $each1) { ?>
                                    <option value="<?php echo $each1['ma_ncc'] ?>"><?php echo $each1['ten_ncc'] ?></option>
                                <?php } ?>
                            </select>
                        </td>
                        <td><?php echo $each['so_luong'] ?></td>
                        <td>
    						<input type="text" id="gia_nhap<?php echo $each['ma_ctsp'] ?>" class="input-gia-sp" value="<?php echo number_format($each['gia_nhap'], 0, ',', ',') ?>" style="width: 100px;" onkeyup="formatCurrency(this)" min="0" step="1000"> VND
						</td>

						<script>
							function formatCurrency(input) {
								let value = input.value;
								value = value.replace(/[^\d]/g, '');
								value = new Intl.NumberFormat('vi-VN').format(value);
								input.value = value;
							}
						</script>

                        <td>
                                <button style="background-color: blue;" class="btn-add-cartimport" value="<?php echo $each['ma_ctsp'] ?>">Thêm</button>
                        </td>
                    </tr>
                <?php 
						} 
					} else { ?>
						<tr>
    						<td colspan="7" style="color: red; font-weight: bold;">Không có dữ liệu để hiển thị.</td>
						</tr>

					<?php } ?>
					</tbody>
				</table>
				<div class="clearfix">
					<div class="hint-text">Showing <b id="cur">5</b> out of <b id="total">25</b> entries</div>
					<div id="pagination"></div>
					<input type="hidden" name="currentpage" id="currentpage" value="1">
				</div>
			</div>
		</div>
	</div>
</main>

<script src="/client/pages/PhieuNhap.js"></script>