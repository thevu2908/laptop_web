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
                            <th>Mã Nhà Cung Cấp</th>
                            <th>Mã Nhân Viên</th>
                            <th>Ngày Nhập</th>
                            <th>Tổng Tiền</th>
                            <th>Action(Chi Tiết)</th>
                        </tr>
                    </thead>
                    <tbody id="show-listNhomQuyen">
                        <?php 
                        if(isset($result) && is_array($result)) { // Kiểm tra xem biến $result đã được khai báo và có dữ liệu chưa
                            foreach ($result as $each) { 
                        ?>
                                <tr>
                                    <td><?php echo $each['MaPN'] ?></td>
                                    <td><?php echo $each['MaNCC'] ?></td>
                                    <td><?php echo $each['NgayNhap'] ?></td>
                                    <td><?php echo $each['MaNV'] ?></td>
                                    <td><?php echo number_format($each['TongTien'], 0, ',', '.') . 'VND' ?></td>
                                    <td>
                                        <?php if (true) {  ?>
                                            <a href="/admin.php?controller=giohang&ma=<?php echo $each['MaPN'] ?>">
                                                <button style="width:80px;" class="bnt-create-authorize">Chi tiết</button>
                                            </a>
                                        <?php } else echo "Nothing" ?>
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

<script src="/client/pages/PhieuNhap.js"></script>