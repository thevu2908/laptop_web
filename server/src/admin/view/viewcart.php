<main>
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b id="ad-NhomQuyen">Nhập Hàng</b></h2>
						</div>
						<?php if (true) {  ?>
                        <div class="col-sm-6">

                        <a href="#addimportModal" class="btn btn-success add" data-toggle="modal">
								<i class="material-icons">&#xE147;</i>
								<span>Thanh Toán</span>
							</a>
						</div>
						<?php } else echo "Nothing"  ?>
					</div>
				</div>
			
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<!-- <th>
								<span class="custom-checkbox">
									<input type="checkbox" id="selectAll">
									<label for="selectAll"></label>
								</span>
							</th> -->
							<th class="w-auto">Mã sản phẩm</th>
							<th class="w-auto">Mã Chi Tiết Sản Phẩm</th>
							<th class="w-auto">Tên Sản Phẩm</th>
                            <th class="w-auto">Hình Ảnh</th>
							<th class="w-auto">Nhà Cung Cấp</th>
							<th class="w-auto">Số Lượng</th>
							<th class="w-auto">Giá</th>
							<th class="w-auto">Tổng Tiền</th>
                            <th class="w-auto">Action(Xóa)</th>
                            
						</tr>
					</thead>
					<tbody id="show-listNhomQuyen">
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
	
	
</main>