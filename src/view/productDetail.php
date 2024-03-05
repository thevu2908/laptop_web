<?php
include "src/view/header.php";
?>

<div class="product-detail-container mt-70">
    <div class="container">
        <div class="row">
            <div class="col-5">
                <div class="product-image-container">
                    <img src="src\assets\images\laptop-1.png" class="product-image">
                </div>
                <div class="product-config-container">
                    <div class="product-config-info">
                        <span title="Màn hình" class="product-detail-info d-flex col-6">
                            <span class="material-symbols-outlined">
                                laptop_windows
                            </span>
                            13.6 inch
                        </span>
                        <span title="CPU" class="product-detail-info d-flex col-6">
                            <span class="material-symbols-outlined">
                                memory
                            </span>
                            M2
                        </span>
                        <span title="RAM" class="product-detail-info d-flex col-6">
                            <span class="material-symbols-outlined">
                                memory_alt
                            </span>
                            8GB
                        </span>
                        <span title="Ổ cứng" class="product-detail-info d-flex col-6">
                            <span class="material-symbols-outlined">
                                hard_drive_2
                            </span>
                            SSD 256GB
                        </span>
                        <span title="Card đồ họa" class="product-detail-info d-flex col-6">
                            <span class="material-symbols-outlined">
                                developer_board
                            </span>
                            Apple M2
                        </span>
                        <span title="Trọng lượng" class="product-detail-info d-flex col-6">
                            <span class="material-symbols-outlined">
                                weight
                            </span>
                            1.24 kg
                        </span>
                    </div>
                    <a class="product-config-more-link" data-bs-toggle="modal" data-bs-target="#product-config-detail-modal">Xem chi tiết thông số kỹ thuật</a>
                </div>
            </div>
            <div class="col-7 py-3">
                <h2 class="product-name">MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</h2>
                <h3 class="product-price">
                    ₫26.190.000
                    <del class="product-origin-price">₫28.190.000</del>
                </h3>
                <div class="product-color-box">
                    <span>Màu sắc:</span>
                    <ul class="product-color-list">
                        <li class="product-color-item active" title="Đỏ"></li>
                        <li class="product-color-item" title="Đỏ"></li>
                        <li class="product-color-item" title="Đỏ"></li>
                    </ul>
                </div>
                <div class="product-buy-box">
                    <input type="number" class="product-bought-quantity" step="1" min="1" max="9" name="quantity" value="1" title="Số lượng mua" size="4">
                    <button class="btn btn-add-cart">Thêm vào giỏ</button>
                    <a href="index.php?gio-hang" class="btn btn-buy">Mua ngay</a>
                </div>
                <!-- <ul class="product-guarantee">
                    <li>
                        <i class="fa-solid fa-arrows-rotate"></i>
                        <p>Hư gì đổi nấy trong 12 tháng</p>
                    </li>
                    <li>
                        <i class="fa-solid fa-check"></i>
                        <p>Bảo hành chính hãng 1 năm</p>
                    </li>
                    <li>
                        <i class="fa-solid fa-truck"></i>
                        <p>Giao hàng nhanh toàn quốc</p>
                    </li>
                    <li>
                        <i class="fa-solid fa-phone"></i>
                        <p>Tổng đài: (+84) 123456789 (7:30 - 22:00)</p>
                    </li>
                </ul> -->
            </div>
        </div>
    </div>

    <div class="modal fade product-config-modal" id="product-config-detail-modal" tabindex="-1" aria-labelledby="productConfigDetailModal" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title product-config-detail-name">Chi tiết thông số kỹ thuật MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body px-0">
                    <div class="d-flex justify-content-center">
                        <img class="product-config-detail-img" src="src\assets\images\laptop-1.png">
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Thông tin hàng hóa</h5>
                        <ul class="modal-row-list">
                            <li class="modal-row-item">Xuất xứ: Mỹ</li>
                            <li class="modal-row-item">Thương hiệu: Apple</li>
                            <li class="modal-row-item">Thời gian bảo hành (tháng): 12</li>
                            <li class="modal-row-item">Hướng dẫn bảo quản: Để nơi khô ráo, nhẹ tay, dễ vỡ</li>
                        </ul>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">Thiết kế & trọng lượng</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Trọng lượng sản phẩm:</td>
                                    <td>1.24 kg</td>
                                </tr>
                                <tr>
                                    <td>Màu sắc:</td>
                                    <td>Xám</td>
                                </tr>
                                <tr>
                                    <td>Chất liệu:</td>
                                    <td>Kim loại</td>
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
                                    <td>M2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-row">
                        <h5 class="modal-row-title">RAM</h5>
                        <table class="modal-row-table">
                            <tbody>
                                <tr>
                                    <td>Dung lượng RAM</td>
                                    <td>8GB</td>
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
                                    <td>13.6 inch</td>
                                </tr>
                                <tr>
                                    <td>Độ phân giải</td>
                                    <td>2560 x 1644 Pixels</td>
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
                                    <td>Apple M2</td>
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
                                        <ul class="modal-row-list">
                                            <li class="modal-row-item">2 Type C</li>
                                            <li class="modal-row-item">Audio Jack: Jack 3.5 mm</li>
                                            <li class="modal-row-item">Cổng sạc: Magsafe Charger</li>
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
                                    <td>English International Backlit Keyboard</td>
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
                                    <td>Lithium polymer</td>
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
                                    <td>macOS</td>
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
include "src/view/footer.php";
?>