<main id="admin-review-main" >
	<div class="container-xl">
		<div class="table-responsive">
			<div class="table-wrapper">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>Quản Lý <b>ĐÁNH GIÁ</b></h2>
						</div>
						<div class="col-sm-6 d-flex justify-content-end">
							<form>
                                <div class="d-flex align-items-center">
                                    <?php
                                    $productId = "";
                                    if (isset($_REQUEST['id'])) {
                                        $productId = $_REQUEST['id'];
                                    }

                                    ?>
                                    <input type="search" value="<?= $productId ?>" class="form-control form-control-sm" id="product-id" placeholder="Mã sản phẩm" style="border-top-right-radius: 0; border-bottom-right-radius: 0">
                                    <button type="button" class="btn-search-product-detail">
                                        <i class="fas fa-search search-icon"></i>
                                    </button>
                                </div>
                            </form>
							<a href="#deleteReviewModal" class="btn btn-danger btn-delete-checked-review-modal" data-toggle="modal">
								<i class="material-icons">&#xE15C;</i> <span>Xóa</span>
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
							<th style="cursor: pointer;" onclick="sortTable('#admin-review-main table.table', 0)" >
								Mã sản phẩm
								<i class="fa fa-sort" aria-hidden="true"></i>
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-review-main table.table', 1)" >
								Khách Hàng
								<i class="fa fa-sort" aria-hidden="true"></i>
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-review-main table.table', 2)" >
								Rating
								<i class="fa fa-sort" aria-hidden="true"></i>
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-review-main table.table', 3)" >
								Ngày đánh giá
								<i class="fa fa-sort" aria-hidden="true"></i>
							</th>
							<th style="cursor: pointer;" onclick="sortTable('#admin-review-main table.table', 4)" >
								Nội dung
								<i class="fa fa-sort" aria-hidden="true"></i>
							</th>
							<th class="w-auto" >Actions</th>
						</tr>
					</thead>
					<tbody class="admin-review-list">

                    </tbody>
				</table>
				<div class="clearfix">
					<div class="hint-text">Hiển thị <b>5</b> trong <b>25</b> chi tiết</div>
                    <div id="pagination">
						
					</div>
					<input type="hidden" name="currentpage" id="currentpage" value="1">
				</div>
			</div>
		</div>
	</div>

	<!-- Delete Modal HTML -->
	<div id="deleteReviewModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">
						<h4 class="modal-title">Xóa đánh giá</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
						<input type="button" class="btn btn-danger confirm-delete" value="Xóa">
					</div>
				</form>
			</div>
		</div>
	</div>
</main>