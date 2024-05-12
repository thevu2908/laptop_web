<main id="admin-customer-main">
    <div class="container-xl admin-customer__container">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Quản Lý <b>Khách Hàng</b></h2>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover admin-customer-table">
                    <thead>
                        <tr>
                            <th>Mã khách hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Thông tin nhận hàng</th>
                        </tr>
                    </thead>
                    <tbody class="admin-customer-list">
                        
                    </tbody>
                </table>
                <div class="clearfix">
                    <div class="hint-text"></div>
                    <div id="pagination">

                    </div>
                    <input type="hidden" name="currentpage" id="currentpage" value="1">
                </div>
            </div>
        </div>
    </div>

    <div id="customer-address-modal" class="modal fade" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-scrollable">
			<div class="modal-content modal-dialog-scrollable">
				<div class="modal-header">
					<h5 class="modal-title">Thông tin nhận hàng</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					
				</div>
			</div>
		</div>
	</div>
</main>