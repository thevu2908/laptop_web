<main>
    <div class="container-xl">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Quản Lý <b id="ad-NhomQuyen">Phiếu Nhập</b></h2>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th class="w-auto">Mã Phiếu Nhập</th>
                            <th class="w-auto">Mã Nhà Cung Cấp</th>
                            <th class="w-auto">Mã Nhân Viên</th>
                            <th class="w-auto">Ngày Nhập</th>
                            <th class="w-auto">Tổng Tiền</th>
                            <th class="w-auto">Tình trạng</th>
                            <th class="w-auto">Action(Chi Tiết)</th>
                        </tr>
                    </thead>
                    <tbody class="admin-phieunhap-list">
						
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

    <!-- Add Modal HTML -->
    <div id="addimportModal" class="modal fade">
        <!-- Modal content goes here -->
    </div>
</main>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script src="/client/pages/NhapHang.js"></script>