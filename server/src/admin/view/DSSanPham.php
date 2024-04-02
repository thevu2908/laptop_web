<main id="admin-list-products-main">
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Danh sách <b>Sản Phẩm</b></h2>
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
							<th>ID</th>
							<th>Tên sản phẩm</th>
							<th>Thương hiệu</th>
							<th>Thể loại</th>
							<th>Hệ điều hành</th>
							<th>Xuất xứ</th>
							<th>Số đánh giá</th>
							<th>Trung bình đánh giá</th>
						</tr>
					</thead>
					<tbody class="product-list">
						
					</tbody>
				</table>
				<div class="clearfix">
					<div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
					<ul class="pagination">
						<li class="page-item disabled">
							<a href="#">Previous</a>
						</li>
						<li class="page-item active">
							<a href="#" class="page-link">1</a>
						</li>
						<li class="page-item">
							<a href="#" class="page-link">2</a>
						</li>
						<li class="page-item">
							<a href="#" class="page-link">3</a>
						</li>
						<li class="page-item">
							<a href="#" class="page-link">4</a>
						</li>
						<li class="page-item">
							<a href="#" class="page-link">5</a>
						</li>
						<li class="page-item">
							<a href="#" class="page-link">Next</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<?php 
	include 'ThuongHieu.php';
	include 'TheLoai.php';
	include 'MauSac.php';
	include 'ChipXuLy.php';
	include 'CardDoHoa.php';
	include 'CongKetNoi.php';
	include 'HeDieuHanh.php';
	?>
</main>