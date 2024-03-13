<?php
    include "header.php";
?>

<div class="cart-main">
    <div class="container">
        <div class="cart__top d-flex p-2 justify-content-between">
            <div class="d-flex justify-content-between col-6">
                <div class="">Giỏ hàng</div>
                <button class="">Xóa tất cả</button>
            </div>
            <div class="col-4">Tải báo giá</div>
        </div>

        <div class="d-flex p-2 justify-content-between">
            <div class="cart__left bg-white col-6">
                <div class="cart__left-title d-flex p-2">
                    <span class="d-flex justify-content-between w-100">
                        <div class="w-50">Sản phẩm</div>
                        <div>Đơn giá</div>
                        <div>Số lượng</div>
                        <div>Thành tiền</div>
                    </span>
                </div>
                <ul class="cart__left-product">
                    <li class="d-flex justify-content-between w-100 align-items-center">
                        <div class="cart__left-product-name d-flex">
                            <img src="server\src\assets\images\laptop-1.png" alt="">
                            <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span>
                        </div>
                        <div class="cart__left-product-price">₫26.190.000</div>
                        <div class="">
                            <input type="number" name="" id="">
                        </div>
                        <div class="cart__left-product-total">₫45.190.000</div>
                    </li>
                    <li class="d-flex justify-content-between w-100 align-items-center">
                        <div class="cart__left-product-name d-flex">
                            <img src="server\src\assets\images\laptop-1.png" alt="">
                            <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span>
                        </div>
                        <div class="cart__left-product-price">₫26.190.000</div>
                        <div class="">
                            <input type="number" name="" id="">
                        </div>
                        <div class="cart__left-product-total">₫45.190.000</div>
                    </li>
                    <li class="d-flex justify-content-between w-100 align-items-center">
                        <div class="cart__left-product-name d-flex">
                            <img src="server\src\assets\images\laptop-1.png" alt="">
                            <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span>
                        </div>
                        <div class="cart__left-product-price">₫26.190.000</div>
                        <div class="">
                            <input type="number" name="" id="">
                        </div>
                        <div class="cart__left-product-total">₫45.190.000</div>
                    </li>
                </ul>
            </div>
            <div class="cart__right d-flex flex-column col-4">
                <div class="cart__right-promotion bg-white p-3">
                    <div class="d-flex justify-content-between" >
                        <h6>Khuyến mãi</h6>
                        <a href="">Chọn hoặc nhập khuyến mãi</a>
                    </div>
                    <div class="cart__right-condition">Đơn hàng chưa đủ điều kiện áp dụng khuyến mãi. Vui lòng mua thêm để áp dụng</div>
                </div>
                <div class="cart__right-pay bg-white p-3">
                    <h6 class="cart__right-header">Thanh toán</h6>
                    <div class="cart__right-checkout-summary">
                        <div class="d-flex justify-content-between" >
                            <div>Tổng tạm tính</div>
                            <div>5.593.000₫</div>
                        </div>
                        <div class="d-flex justify-content-between" >
                            <div>Thành tiền</div>
                            <div>5.593.000₫</div>
                        </div>
                    </div>
                    <button class="w-100" >Tiếp tục</button>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="overlay">
        <div class="modal">
            <div class="modal__inner">
                <div class="modal__inner-header">Khuyến mãi và mã giảm giá</div>
                <div class="modal__inner-promotion">
                    <div class="modal__inner-code">
                        <input type="text" placeholder="Mã giảm giá/phiếu mua hàng">
                    </div>
                    <button>Áp dụng</button>
                </div>
                <ul class="modal__inner-list">

                </ul>
                <button class="modal__inner-close" >Đóng</button>
            </div>
        </div>
        <div class="cart-notify">
            
        </div>
    </div> -->
</div>

<?php
    include "footer.php";
?>