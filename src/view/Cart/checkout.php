<?php
    include "./src/view/header.php";
?>

<div class="checkout-main">
    <div class="container">
        <div class="justify-content-between row">
            <div class="checkout__left col-7">
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header">Thông tin nhận hàng</h5>
                    <ul class="checkout-address row ps-4" style="row-gap: 16px;">
                        <li class="col-6" >
                            <div class="checkout-address-btn select" >
                                <div class="checkout-address__info">
                                    <h5>ĐỖ MINH QUÂN</h5>
                                    <h6 class="mb-1 mt-1" >0909123456</h6>
                                    <h6>137/2 Lý Thái Tổ, Phường Tân Định, Quận 1, Thành phố Hồ Chí Minh</h6>
                                </div>
                            </div>
                        </li>
                        <li class="col-6" >
                            <div class="checkout-address-btn">Thêm địa chỉ</div>
                        </li>
                        <li class="col-6" >
                            <div class="checkout-address-btn">Thêm địa chỉ</div>
                        </li>
                    </ul>
                </div>
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header">Ghi chú cho đơn hàng</h5>
                    <div class="checkout-note ps-4">
                        <input class="w-100" type="text" name="" id="" placeholder="Nhập thông tin ghi chú cho nhà bán hàng">
                    </div>
                </div>
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header">Phương thức thanh toán</h5>
                    <ul class="checkout-method row ps-4" style="row-gap: 16px;">
                        <li class="col-6" >
                            <div class="checkout-address-btn flex-column select">
                                <div class="checkout-method-title">Thanh toán VNPAY-QR</div>
                                <div class="checkout-method-describe">Thanh toán qua Internet Banking, Visa, Master, JCB, VNPAY-QR</div>
                            </div>
                        </li>
                        <li class="col-6" >
                            <div class="checkout-address-btn flex-column">
                                <div class="checkout-method-title">Thanh toán khi nhận hàng</div>
                                <div class="checkout-method-describe">HEHE</div>
                            </div>
                        </li>
                        <li class="col-6" >
                            <div class="checkout-address-btn flex-column">
                                <div class="checkout-method-title">Thanh toán QR Code MoMo</div>
                                <div class="checkout-method-describe">HEHE</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="checkout__right col-4">
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header d-flex justify-content-between">
                        <div class="">Thông tin đơn hàng</div>
                        <a href="index.php?gio-hang" class="edit-order align-self-center">Chỉnh sửa</a>
                    </h5>
                    <ul>
                        <li class="d-flex" >
                            <div class="checkout__right-image">
                                <img src="src\assets\images\laptop-1.png" alt="">
                            </div>
                            <div class="checkout__right-info ms-3 align-self-center">
                                <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span> 
                                <div class="checkout__right-quantity" style="display: flex;">Số lượng 4</div>
                                <div class="checkout__right-product-price">₫26.190.000</div>
                            </div>
                        </li>
                        <li class="d-flex" >
                            <div class="checkout__right-image">
                                <img src="src\assets\images\laptop-1.png" alt="">
                            </div>
                            <div class="checkout__right-info ms-3 align-self-center">
                                <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span> 
                                <div class="checkout__right-quantity" style="display: flex;">Số lượng 4</div>
                                <div class="checkout__right-product-price">₫26.190.000</div>
                            </div>
                        </li>
                        <li class="d-flex" >
                            <div class="checkout__right-image">
                                <img src="src\assets\images\laptop-1.png" alt="">
                            </div>
                            <div class="checkout__right-info ms-3 align-self-center">
                                <span>MacBook Air M2 13 2022 8CPU 8GPU 8GB 256GB</span> 
                                <div class="checkout__right-quantity" style="display: flex;">Số lượng 4</div>
                                <div class="checkout__right-product-price">₫26.190.000</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header">Khuyến mãi đơn hàng</h5>
                    <ul class="ps-4" >
                        <li class="btn btn-warning w-100 align-self-start text-white mb-2" style="font-weight: 500; align-self: flex-start;" >DCT12563943 - Tuần lễ vàng</li>
                        <li class="btn btn-warning w-100 align-self-start text-white mb-2" style="font-weight: 500;" >HKS45238752 - Ngày hội việc làm</li>
                        <li class="btn btn-warning w-100 align-self-start text-white mb-2" style="font-weight: 500;" >HKS45238752 - Ngày hội việc làm</li>
                    </ul>                
                </div>
                <div class="checkout-confirm row bg-white mb-4 p-4 rounded-3">
                    <div class="d-flex justify-content-between" >
                        <div>Tổng tạm tính</div>
                        <span>5.593.000₫</span>
                    </div>
                    <div class="d-flex justify-content-between" >
                        <div>Phí vận chuyển</div>
                        <span>Miễn phí</span>
                    </div>
                    <div class="d-flex justify-content-between" >
                        <div>Khuyến mãi</div>
                        <span>20%</span>
                    </div>
                    <div class="d-flex justify-content-between" >
                        <div>Thành tiền</div>
                        <span style="font-size: 20px; color: red;" >5.593.000₫</span>
                    </div>
                    <button class="btn btn-success mt-4 mx-2" >THANH TOÁN</button>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
    include "./src/view/footer.php";
?>