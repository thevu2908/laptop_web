<?php
include "header.php";
?>

<div class="product-detail-container mt-70">
    <div class="container">
        <div class="row">
            <div class="col-5 produt-info-left">
                
            </div>
            <div class="col-6 py-3 product-info-right">
                
            </div>
        </div>
    </div>

    <div class="modal fade product-config-modal" id="product-config-detail-modal" tabindex="-1" aria-labelledby="productConfigDetailModal" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title product-config-detail-name">
                        Chi tiết thông số kỹ thuật
                        <span></span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body px-0">
                    <div class="d-flex justify-content-center">
                        <img class="product-config-detail-img">
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Thông tin hàng hóa</h5>
                        <ul class="modal-row-list">
                            <li class="modal-row-item product-origin">
                                Xuất xứ:
                                <span></span>
                            </li>
                            <li class="modal-row-item product-brand">
                                Thương hiệu:
                                <span></span>
                            </li>
                            <li class="modal-row-item product-type">
                                Loại:
                                <span></span>
                            </li>
                            <li class="modal-row-item">Thời gian bảo hành (tháng): 12</li>
                            <li class="modal-row-item">Hướng dẫn bảo quản: Để nơi khô ráo, nhẹ tay, dễ vỡ</li>
                        </ul>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Thiết kế & trọng lượng</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Trọng lượng sản phẩm</td>
                                    <td class="product-weight"></td>
                                </tr>
                                <tr>
                                    <td>Màu sắc</td>
                                    <td class="product-color"></td>
                                </tr>
                                <tr>
                                    <td>Chất liệu</td>
                                    <td class="product-material"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Bộ xử lý</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>CPU</td>
                                    <td class="product-cpu"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Dung lượng & Bộ nhớ</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Dung lượng RAM</td>
                                    <td class="product-ram"></td>
                                </tr>
                                <tr>
                                    <td>Dung lượng ROM</td>
                                    <td class="product-rom"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Màn hình</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Kích cỡ màn hình</td>
                                    <td class="product-screen"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Đồ họa</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Card đồ họa</td>
                                    <td class="product-gpu"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Giao tiếp & kết nối</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Cổng kết nối</td>
                                    <td>
                                        <ul class="modal-row-list product-plug" style="list-style-type: disc;">
                                            
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Bàn phím & TouchPad</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Kiểu bàn phím</td>
                                    <td class="product-keyboard"></td>
                                </tr>
                                <tr>
                                    <td>TouchPad</td>
                                    <td>Multi-touch touchpad</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Thông tin pin & Sạc</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Loại PIN</td>
                                    <td class="product-battery"></td>
                                </tr>
                                <tr>
                                    <td>Power Supply</td>
                                    <td>30W</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Hệ điều hành</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>OS</td>
                                    <td class="product-os"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
include "footer.php";
?>