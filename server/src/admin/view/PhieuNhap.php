<main id="admin-nh-main">
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-NhomQuyen">Nhập Hàng</b></h2>
						</div>
						<div class="col-sm-6">
							<a href="/admin.php?controller=nhaphang" class="btn btn-success add d-flex align-items-center">
								<i class="fa-solid fa-receipt" style="font-size: 18px;"></i>
								<span>Phiếu Nhập</span>
							</a>
							<a href="/admin.php?controller=giohang" class="btn btn-danger delete d-flex align-items-center">
								<i class="fa-solid fa-cart-shopping" style="font-size: 18px;"></i>
								<span>Giỏ Hàng</span>
							</a>
						</div>
					</div>
				</div>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 0)" class="w-auto">Mã sản phẩm</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 1)">Mã chi tiết sản phẩm</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 2)">Tên sản phẩm</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 3)">Hình Ảnh</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 4)">RAM</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 5)">ROM</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 6)">Tên Màu</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 7)">CPU</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 8)">Card</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 9)">Số lượng</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 10)">Giá</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-nh-main table.table', 11)" class="w-auto">Actions</th>
						</tr>
					</thead>
					
					<?php require_once __DIR__ . '/../../controller/PhieuNhapController.php';?>
					<tbody id="show-listNH">

					</tbody>
				</table>
				<div class="clearfix">
					<div class="hint-text"></div>
					<div id="pagination"></div>
					<input type="hidden" name="currentpage" id="currentpage" value="1">
				</div>
			</div>
		</div>
	</div>
</main>

<script src="/client/pages/PhieuNhap.js"></script>
<script src="/client/pages/PhieuNhap1.js"></script>