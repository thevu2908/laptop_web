<?php
    include "header.php";
?>

<div class="cart-main">
    <div class="container">
        <div class="cart__top d-flex p-2 justify-content-between">
            <div class="d-flex justify-content-between" style="width: 68%;">
                <div style="font-size: 24px; font-weight: 500;">Giỏ hàng</div>
                <div class="btn btn-danger">Xóa tất cả</div>
            </div>
        </div>

        <div class="d-flex p-2 justify-content-between">
            <div class="cart__left bg-white col-6">
                <div class="cart__left-title d-flex p-2">
                    <span class="d-flex justify-content-between w-100">
                        <div class="w-50 p-2">Sản phẩm</div>
                        <div class="p-2">Đơn giá</div>
                        <div class="p-2">Số lượng</div>
                        <div class="p-2">Thành tiền</div>
                    </span>
                </div>
                <ul class="cart__left-product">
                    <li class="d-flex justify-content-between w-100 align-items-center">
                        <div class="cart__left-product-name d-flex p-2">
                            <img src=".\server\src\assets\images\laptop-1.png" alt="">
                            <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span>
                        </div>
                        <div class="cart__left-product-price p-2">₫26.190.000</div>
                        <div class="cart__left-quantity p-2" style="display: flex;">
                            <input class="minus is-form" type="button" style="border-right: transparent !important;" value="-">
                            <input class="input-qty" type="text" value="1" min="1" max="10" id="quantity" value="1">
                            <input class="plus is-form" type="button" style="border-left: transparent !important;" value="+">
                        </div>
                        <div class="cart__left-product-total p-2">₫41.190.000</div>
                    </li>
                    <li class="d-flex justify-content-between w-100 align-items-center">
                        <div class="cart__left-product-name d-flex p-2">
                            <img src=".\server\src\assets\images\laptop-1.png" alt="">
                            <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span>
                        </div>
                        <div class="cart__left-product-price p-2">₫26.190.000</div>
                        <div class="cart__left-quantity p-2" style="display: flex;">
                            <input class="minus is-form" type="button" style="border-right: transparent !important;" value="-">
                            <input class="input-qty" type="text" value="1" min="1" max="10" id="quantity" value="1">
                            <input class="plus is-form" type="button" style="border-left: transparent !important;" value="+">
                        </div>
                        <div class="cart__left-product-total p-2">₫45.190.000</div>
                    </li>
                    <li class="d-flex justify-content-between w-100 align-items-center">
                        <div class="cart__left-product-name d-flex p-2">
                            <img src=".\server\src\assets\images\laptop-1.png" alt="">
                            <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span>
                        </div>
                        <div class="cart__left-product-price p-2">₫26.190.000</div>
                        <div class="cart__left-quantity p-2" style="display: flex;">
                            <input class="minus is-form" type="button" style="border-right: transparent !important;" value="-">
                            <input class="input-qty" type="text" value="1" min="1" max="10" id="quantity" value="1">
                            <input class="plus is-form" type="button" style="border-left: transparent !important;" value="+">
                        </div>
                        <div class="cart__left-product-total p-2">₫45.190.000</div>
                    </li>
                    <li class="d-flex justify-content-between w-100 align-items-center">
                        <div class="cart__left-product-name d-flex p-2">
                            <img src=".\server\src\assets\images\laptop-1.png" alt="">
                            <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span>
                        </div>
                        <div class="cart__left-product-price p-2">₫26.190.000</div>
                        <div class="cart__left-quantity p-2" style="display: flex;">
                            <input class="minus is-form" type="button" style="border-right: transparent !important;" value="-">
                            <input class="input-qty" type="text" value="1" min="1" max="10" id="quantity" value="1">
                            <input class="plus is-form" type="button" style="border-left: transparent !important;" value="+">
                        </div>
                        <div class="cart__left-product-total p-2">₫45.190.000</div>
                    </li>
                </ul>
            </div>
            <div class="cart__right d-flex flex-column col-4">
                <div class="cart__right-promotion bg-white mb-4 p-4 rounded-3">
                    <div class="d-flex justify-content-between" >
                        <h6>Khuyến mãi</h6>
                        <a href="#"class="openmodal">Chọn khuyến mãi</a>
                    </div>
                    <div class="cart__right-condition">Đơn hàng chưa đủ điều kiện áp dụng khuyến mãi. Vui lòng mua thêm để áp dụng</div>
                </div>
                <div class="cart__right-pay bg-white mb-4 p-4 rounded-3">
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
                    <a href="index.php?thanh-toan" class="btn btn-success w-100" >Tiếp tục</a>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal-cart">
            <div class="modal-cart-dialog">
                <div class="modal-cart-header">
                    <h2>Khuyến mãi và mã giảm giá</h2>
                    <i class="fa-solid fa-xmark closemodal"></i>
                </div>

                <div class="modal-cart-body" style="min-height: 450px;" >
                    <div class="modal-cart-promotion">
                        <div class="modal-cart-code">
                            <input class="w-100" type="text" placeholder="Mã giảm giá/phiếu mua hàng">
                        </div>
                        <button class="btn disabled">Tìm kiếm</button>
                    </div>

                    <ul class="modal-cart-list">
                        <li class="modal-promo-item" >
                            <div class="modal-promo-name d-flex align-items-center" >
                                <div class="modal-promo-code">KM0012</div>
                                <div class="modal-promo-name2 ms-2" style="font-weight: 500;">Khuyến mãi siêu sốc</div>
                            </div>
                            <div class="modal-promo-percent mt-2 mb-2" >
                                Giảm 20%
                            </div>
                            <div class="modal-promo-bottom d-flex justify-content-between">
                                <div class="modal-promo-expiry" >HSD: 31/4/2024</div>
                                <div class="modal-promo-add" >Áp dụng</div>
                            </div>
                        </li>
                        <li class="modal-promo-item" >
                            <div class="modal-promo-name d-flex align-items-center" >
                                <div class="modal-promo-code">KM0012</div>
                                <div class="modal-promo-name2 ms-2" style="font-weight: 500;">Khuyến mãi siêu sốc</div>
                            </div>
                            <div class="modal-promo-percent mt-2 mb-2" >
                                Giảm 20%
                            </div>
                            <div class="modal-promo-bottom d-flex justify-content-between">
                                <div class="modal-promo-expiry" >HSD: 31/4/2024</div>
                                <div class="modal-promo-add" >Áp dụng</div>
                            </div>
                        </li>
                        <li class="modal-promo-item" >
                            <div class="modal-promo-name d-flex align-items-center" >
                                <div class="modal-promo-code">KM0012</div>
                                <div class="modal-promo-name2 ms-2" style="font-weight: 500;">Khuyến mãi siêu sốc</div>
                            </div>
                            <div class="modal-promo-percent mt-2 mb-2" >
                                Giảm 20%
                            </div>
                            <div class="modal-promo-bottom d-flex justify-content-between">
                                <div class="modal-promo-expiry" >HSD: 31/4/2024</div>
                                <div class="modal-promo-add" >Áp dụng</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="modal-cart-footer">
                    <button class="btn btn-danger closemodal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    var input = document.querySelector(".modal-cart-code input");
    var button = document.querySelector(".modal-cart-promotion button");
    input.addEventListener('input', function() {
        if (input.value.trim() === '') {
            button.classList.add('disabled');
        } else {
            button.classList.remove('disabled');
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        const listContainer = document.querySelector('.modal-cart-body');
        const list = document.querySelector('.modal-cart-list');

        const minHeight = parseInt(getComputedStyle(list).minHeight, 10);
        const containerHeight = listContainer.offsetHeight;

        if (containerHeight < minHeight) {
            listContainer.style.overflow = 'initial'; // Không cần hiển thị thanh cuộn
        }
    });
</script>

<?php
    include "footer.php";
?>