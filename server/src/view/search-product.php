<?php
include "header.php";
?>

<div class="search-product-main">
    <div class="container">
        <div class="row">
            <div class="col-12 search-info">

            </div>
            <div class="col-12 sort-container">
                
            </div>
            <div class="search-product-list row">

            </div>
            <div class="search-empty">
                <p class="title">Để tìm được kết quả chính xác hơn, bạn vui lòng:</p>
                <p class="circle">Kiểm tra lỗi chính tả của từ khóa đã nhập</p>
                <p class="circle">Thử lại bằng từ khóa khác</p>
                <p class="circle">Thử lại bằng những từ khóa tổng quát hơn</p>
                <p class="circle">Thử lại bằng những từ khóa ngắn gọn hơn</p>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <nav class="enduser-pagination">

                </nav>
                <input type="hidden" name="currentpage" id="currentpage" value="1">
            </div>
        </div>
    </div>
</div>

<?php
include "footer.php";
?>