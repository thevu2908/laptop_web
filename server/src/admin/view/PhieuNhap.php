<main id="admin-pn-main">
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
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 1)"  class="w-auto">
							Mã sản phẩm
                            </th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 2)"  class="w-auto">
							Mã chi tiết sản phẩm
                            </th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 3)"  class="w-auto">
							Tên sản phẩm
                            </th>
							<th>Hình Ảnh</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 4)"  class="w-auto">
							RAM
                            </th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 5)"  class="w-auto">
							ROM
                            </th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 6)"  class="w-auto">
							Tên Màu
                            </th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 7)"  class="w-auto">
							CPU
                            </th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 8)"  class="w-auto">
							Card
                            </th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 9)"  class="w-auto">
							Số lượng
                            </th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-pn-main table.table', 10)"  class="w-auto">
							Giá
                            </th>
							<th class="w-auto">Actions</th>
						</tr>
					</thead>
					
					<?php
						require_once __DIR__ . '/../../controller/PhieuNhapController.php';
						
						?>
					<tbody id="show-listNH">

								
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
<script src="/client/pages/PhieuNhap1.js"></script>