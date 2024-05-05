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
                            <th class="w-auto">Action(Chi Tiết)</th>
                            <th class="w-auto">Tình trạng</th>
                        </tr>
                    </thead>
                    <tbody id="show-listNhomQuyen">
                        <?php 
					    require_once __DIR__ . '/../../controller/PhieuNhapController.php';

                        if(isset($result) && is_array($result)) { // Kiểm tra xem biến $result đã được khai báo và có dữ liệu chưa
                            foreach ($result as $each) { 
                        ?>
                                <tr>
                                    <td><?php echo $each['ma_pn'] ?></td>
                                    <td><?php echo $each['ma_ncc'] ?></td>
                                    <td><?php echo $each['ma_nv'] ?></td>
                                    <td><?php echo $each['ngay_nhap'] ?></td>
                                    
                                    <td><?php echo number_format($each['tong_tien'], 0, ',', '.') . 'VND' ?></td>
                                    <td>
                                            <a href="/admin.php?controller=giohang&ma=<?php echo $each['ma_pn'] ?>">
                                                <button style="width: 80px;" class="bnt-create-authorize">Chi tiết</button>
                                            </a>
                                            <?php if ($each['tinh_trang'] == 0) {
                                                echo '<button class="btn-process-bill" value="' . $each['ma_pn'] . '">Xử lý</button>';
                                            } else {
                                                echo 'Đã xử lý';
                                            } ?>
                                    </td>
                                </tr>
                        <?php 
                            } 
                        } else { 
                            echo "<tr><td colspan='6' style='color: red; font-weight: bold;'>Không có dữ liệu để hiển thị.</td></tr>";
                        } 
                        ?>
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
<script src="/client/pages/PhieuNhap.js"></script>