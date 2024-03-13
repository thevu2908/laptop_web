<?php
include "server/src/view/header.php";
?>

<div class="product-main">
    <div class="container">
        <div class="row">
            <div class="product-filter col-2">
                <div class="filter-container category-filter">
                    <h5>Hãng sản xuất</h5>
                    <div class="filter-list row">
                        <div class="filter-item col-6">
                            <a href="index.php?san-pham" class="filter-item-link active">
                                <i class="fa-regular fa-square"></i>
                                Tất cả
                            </a>
                        </div>
                        <div class="filter-item col-6">
                            <a href="index.php?san-pham&loai=dell" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Dell
                            </a>
                        </div>
                        <div class="filter-item col-6">
                            <a href="index.php?san-pham&loai=asus" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Asus
                            </a>
                        </div>
                        <div class="filter-item col-6">
                            <a href="index.php?san-pham&loai=hp" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                HP
                            </a>
                        </div>
                        <div class="filter-item col-6">
                            <a href="index.php?san-pham&loai=acer" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Acer
                            </a>
                        </div>
                    </div>
                </div>
                <div class="filter-container price-filter">
                    <h5>Mức giá</h5>
                    <div class="filter-list row">
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham" class="filter-item-link active">
                                <i class="fa-regular fa-square"></i>
                                Tất cả
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&muc-gia=duoi-10-trieu" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Dưới 10 triệu
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&muc-gia=tu-10-15-trieu" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Từ 10 - 15 triệu
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&muc-gia=tu-15-20-trieu" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Từ 15 - 20 triệu
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&muc-gia=tu-20-25-trieu" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Từ 20 - 25 triệu
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&muc-gia=tren-25-trieu" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Trên 25 triệu
                            </a>
                        </div>
                    </div>
                </div>
                <div class="filter-container cpu-filter">
                    <h5>CPU</h5>
                    <div class="filter-list row">
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham" class="filter-item-link active">
                                <i class="fa-regular fa-square"></i>
                                Tất cả
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&cpu=intel-core-i3" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Intel core i3
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&cpu=intel-core-i5" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Intel core i5
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&cpu=intel-core-i7" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                Intel core i7
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&cpu=amd-ryzen-3" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                AMD ryzen 3
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&cpu=amd-ryzen-5" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                AMD ryzen 5
                            </a>
                        </div>
                        <div class="filter-item col-12">
                            <a href="index.php?san-pham&cpu=amd-ryzen-7" class="filter-item-link">
                                <i class="fa-regular fa-square"></i>
                                AMD ryzen 7
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-list col-10">
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <div class="d-flex align-items-center sort-filter-container show-sort-filter">
                            <i class="fa-solid fa-filter"></i>
                            <div class="sort-filter-list">
                                <p class="sort-filter-item-default">Mặc định</p>
                                <ul class="sort-filter-menu">
                                    <li class="sort-filter-item active">
                                        <a class="sort-filter-item-link" href="index.php?san-pham&sort=default">Mặc định</a>
                                    </li>
                                    <li class="sort-filter-item">
                                        <a class="sort-filter-item-link" href="index.php?san-pham&sort=ban-chay">Bán chạy</a>
                                    </li>
                                    <li class="sort-filter-item">
                                        <a class="sort-filter-item-link" href="index.php?san-pham&sort=gia-cao-thap">Giá từ cao đến thấp</a>
                                    </li>
                                    <li class="sort-filter-item">
                                        <a class="sort-filter-item-link" href="index.php?san-pham&sort=gia-thap-cao">Giá từ thấp đến cao</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="product-item">
                            <a href="index.php?san-pham&id=123" class="product-item-link">
                                <div class="product-image-wrapper">
                                    <img src="server\src\assets\images\laptop-1.png" class="product-image">
                                </div>
                                <div class="product-info">
                                    <div class="product-price">
                                        <p class="product-price-number">₫26.190.000</p>
                                    </div>
                                    <div class="product-name">
                                        <p>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</p>
                                    </div>
                                    <div class="product-detail row">
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
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="product-item">
                            <a href="index.php?san-pham?laptop-name" class="product-item-link">
                                <div class="product-image-wrapper">
                                    <img src="server\src\assets\images\laptop-1.png" class="product-image">
                                </div>
                                <div class="product-info">
                                    <div class="product-price">
                                        <p class="product-price-number">₫26.190.000</p>
                                    </div>
                                    <div class="product-name">
                                        <p>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</p>
                                    </div>
                                    <div class="product-detail row">
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
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="product-item">
                            <a href="index.php?san-pham?laptop-name" class="product-item-link">
                                <div class="product-image-wrapper">
                                    <img src="server\src\assets\images\laptop-1.png" class="product-image">
                                </div>
                                <div class="product-info">
                                    <div class="product-price">
                                        <p class="product-price-number">₫26.190.000</p>
                                    </div>
                                    <div class="product-name">
                                        <p>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</p>
                                    </div>
                                    <div class="product-detail row">
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
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="product-item">
                            <a href="index.php?san-pham?laptop-name" class="product-item-link">
                                <div class="product-image-wrapper">
                                    <img src="server\src\assets\images\laptop-1.png" class="product-image">
                                </div>
                                <div class="product-info">
                                    <div class="product-price">
                                        <p class="product-price-number">₫26.190.000</p>
                                    </div>
                                    <div class="product-name">
                                        <p>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</p>
                                    </div>
                                    <div class="product-detail row">
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
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="product-item">
                            <a href="index.php?san-pham?laptop-name" class="product-item-link">
                                <div class="product-image-wrapper">
                                    <img src="server\src\assets\images\laptop-1.png" class="product-image">
                                </div>
                                <div class="product-info">
                                    <div class="product-price">
                                        <p class="product-price-number">₫26.190.000</p>
                                    </div>
                                    <div class="product-name">
                                        <p>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</p>
                                    </div>
                                    <div class="product-detail row">
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
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="product-item">
                            <a href="index.php?san-pham?laptop-name" class="product-item-link">
                                <div class="product-image-wrapper">
                                    <img src="server\src\assets\images\laptop-1.png" class="product-image">
                                </div>
                                <div class="product-info">
                                    <div class="product-price">
                                        <p class="product-price-number">₫26.190.000</p>
                                    </div>
                                    <div class="product-name">
                                        <p>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</p>
                                    </div>
                                    <div class="product-detail row">
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
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">3</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
include "server/src/view/footer.php";
?>