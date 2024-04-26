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
                        <a href="#addimportModal" class="btn btn-success add" data-toggle="modal">
								<i class="material-icons">&#xE147;</i>
								<span>Thêm</span>
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
							<th>Mã sản phẩm</th>
                            <th>Hình Ảnh</th>
							<th>Tên Sản Phẩm</th>
                            <th>Action</th>
                            
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
	

    <!-- Add Modal HTML  -->
	<div id="addimportModal" class="modal fade">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Nhập hàng</h5>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      </div>
      <div class="modal-body">
        <form class="modal-form">
          <!-- <div class="input_container">
            <label for="profit-import-product" class="label fw-bold">Tỉ lệ lợi nhuận</label>
            <div class="input">
              <input
                id="profit-import-product"
                type="number"
                class="form-control"
                placeholder="Tỉ lệ..."
                min="1"
                max="100"
                required
              />
              %
            </div>
            <span class="text-danger mb-1 error"></span>
          </div> -->
          <div class="input_container">
            <label for="employee-import-product" class="label fw-bold">Mã nhân viên</label>
            <div class="input">
              <input
                id="employee-import-product"
                type="text"
                
                class="form-control"
                placeholder="Nhân viên..."
                disabled
              />
            </div>
            <span class="text-danger mb-1 error"></span>
          </div>
          <div class="select_container">
            <label for="supplier-import-product" class="label fw-bold">Nhà cung cấp</label>
            <div class="select">
              <select
                name="supplier-import-product"
                id="supplier-import-product"
                class="form-control"
                required
              >
              <!-- <option value="A">A</option>
			  <option value="B">B</option>
			  <option value="C">C</option> -->
            </select>
            </div>
            <span class="text-danger mb-1 error"></span>
          </div>
          <div class="ordered-product">
            <label class="label fw-bold">Các sản phẩm cần nhập</label>
            <div class="product-list"></div>
          </div>
          <div class="order-total-price fw-bold">Tổng tiền: <span></span></div>
        </form>
      </div>
      <div class="modal-footer">
        <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
        <!-- <button type="button" class="btn btn-primary btn-add">Tạo</button> -->
		<input type="submit" class="btn btn-info" id="btnAdd" value="Save">
      </div>
    </div>
  </div>
</div>
	
	
	

	
</main>