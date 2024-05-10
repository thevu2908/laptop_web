
<?php
    include "header.php";
?>


<div class="checkout-main">
    <div class="container">
        <div class="justify-content-between row">
            <div class="checkout__left col-7">
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header">Thông tin nhận hàng</h5>
                    <ul class="checkout-address row ps-4" style="row-gap: 16px;">

                    </ul>
                </div>
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header">Ghi chú cho đơn hàng</h5>
                    <div class="checkout-note ps-4">
                        <input class="w-100 checkout-note-input" type="text" placeholder="Nhập thông tin ghi chú cho nhà bán hàng">
                    </div>
                </div>
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header">Phương thức thanh toán</h5>
                    <ul class="checkout-method row ps-4" style="row-gap: 16px;">
                        <li class="col-6" >
                            <div data-id="VNPAY" class="checkout-address-btn flex-column select select-payment-method">
                                <div class="checkout-method-title">Thanh toán VNPAY-QR</div>
                                <div class="checkout-method-describe">Thanh toán qua Internet Banking, Visa, Master, JCB, VNPAY-QR</div>
                            </div>
                        </li>
                        <li class="col-6" >
                            <div data-id="COD" class="checkout-address-btn flex-column select-payment-method">
                                <div class="checkout-method-title">Thanh toán khi nhận hàng</div>
                                <div class="checkout-method-describe">COD</div>
                            </div>
                        </li>
                        <li class="col-6" >
                            <div data-id="QR" class="checkout-address-btn flex-column select-payment-method">
                                <div class="checkout-method-title">Thanh toán bằng mã QR</div>
                                <div class="checkout-method-describe">ACB, BIDV, Techcombank, MBBank, VPBank, VietinBank, Agribank</div>
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
                    <ul class="checkout__right-cart">
                        
                    </ul>
                </div>
                <div class="row bg-white mb-4 p-4 rounded-3">
                    <h5 class="checkout-header">Khuyến mãi đơn hàng</h5>
                    <ul class="checkout__right-promo" >
                        
                    </ul>                
                </div>
                <div class="checkout-confirm row bg-white mb-4 p-4 rounded-3">
                    <div class="d-flex justify-content-between" >
                        <div>Tổng tạm tính</div>
                        <span class="checkout-confirm__tmp-total" >5.593.000₫</span>
                    </div>
                    <div class="d-flex justify-content-between" >
                        <div>Phí vận chuyển</div>
                        <span>Miễn phí</span>
                    </div>
                    <div class="d-flex justify-content-between" >
                        <div>Khuyến mãi</div>
                        <span class="checkout-confirm__promo" >-₫0</span>
                    </div>
                    <div class="d-flex justify-content-between" >
                        <div>Thành tiền</div>
                        <span class="checkout-confirm__money-total" style="font-size: 20px; color: red;" >5.593.000₫</span>
                    </div>
                    <button class="btn btn-payment mt-4 mx-2" id="btn-payment" >THANH TOÁN</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal-cart checkout" >
        <div class="modal-cart-dialog">
            <div class="modal-cart-header">
                <h2>Thông tin người nhận hàng</h2>
                <i class="fa-solid fa-xmark closemodal"></i>
            </div>

            <div class="modal-cart-body" style="min-height: 450px;" >
                <form>
                    <div class="form-group">
                        <label for="inputName"><span>*</span> Họ tên</label>
                        <input type="text" class="form-control" id="inputName" placeholder="Vui lòng nhập tên người nhận">
                    </div>
                    <div class="form-group">
                        <label for="inputPhone"><span>*</span> Số điện thoại</label>
                        <input type="tel" class="form-control" id="inputPhone" placeholder="Nhập số điện thoại">
                    </div>
                    
                    <h3 class="" style="margin: 0;" >Địa chỉ nhận hàng</h3>
                    <div class="form-row row">
                        <div class="col-6 my-1 d-flex flex-column">
                            <label class="mr-sm-2" for="province"><span>*</span> Tỉnh/Thành phố</label>
                            <select class="custom-select mr-sm-2" id="province" name="province">
                                <option value="">Chọn một tỉnh</option>
                                
                            </select>
                        </div>
                        <div class="col-6 my-1 d-flex flex-column">
                            <label class="mr-sm-2" for="district"><span>*</span> Quận/Huyện</label>
                            <select class="custom-select mr-sm-2" id="district" name="district" >
                                <option value="">Chọn một quận/huyện</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row row">
                        <div class="col-6 my-1 d-flex flex-column">
                            <label class="mr-sm-2" for="wards"><span>*</span> Phường/Xã</label>
                            <select class="custom-select mr-sm-2" id="wards" name="wards" >
                                <option value="">Chọn một xã</option>
                            </select>
                        </div>
                        <div class="col-6 my-1 d-flex flex-column">
                            <label for="inputStreet"><span>*</span> Địa chỉ cụ thể</label>
                            <input type="text" class="form-control" id="inputStreet" placeholder="Số nhà, ngõ, tên đường ...">
                        </div>
                    </div>

                    <div class="form-group d-flex justify-content-end">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkDefault" style="margin-top: 6px;">
                            <label class="form-check-label" for="checkDefault" style="line-height: normal;">
                                Đặt làm mặc định
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" id="saveAddress" name="saveAddress">Lưu địa chỉ</button>
                </form>
            </div>

            <div class="modal-cart-footer">
                <button class="btn btn-danger btn-cancel closemodal">Hủy bỏ</button>
            </div>
        </div>
    </div>

    <div class="modal-cart qr-code" >
        <div class="modal-cart-dialog" style="min-width: 410px;">
            <div class="modal-cart-body" style="min-height: 450px;" >
                <div id="img-qrcode mt-2" style="text-align: center; margin-top: 20px;">
                    <img style="width: 270px; " src="server/src/assets/images/qrcode.png" >
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <h5 class="text" >Mã QR thanh toán tự động</h5>
                </div>
                <div class="text d-flex justify-content-center">
                    <h6 class="text" style="font-size: 15px;" >(Xác nhận tự động - Thường không quá 3')</h6>
                </div>
                <div class="d-flex justify-content-start" >
                    <label>Số tiền: </label>
                    <span class="checkout-qrcode-price mx-2" >5.593.000₫</span>
                </div>
                <div class="d-flex justify-content-start" >
                    <label>Nội dung: </label>
                    <span class="checkout-qrcode-content mx-2">Miễn phí</span>
                </div>
                <div class="d-flex justify-content-start" >
                    <label>Người thụ hưởng: </label>
                    <span class="checkout-qrcode-receiver mx-2" >Do Minh Quan</span>
                </div>
                <hr style="color: white;" >
                <div class="d-flex justify-content-between mb-3" >
                    <label>Đang chờ thanh toán</label>
                    <span id="checkout-qrcode-countdown" class="mx-2" >10:00</span>
                </div>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-cart qr-code-success" >
        <div class="modal-cart-dialog" style="min-width: 410px; min-height: 40px;">
            <div class="modal-cart-body" >
                <div class="d-flex justify-content-center mt-3">
                    <h5 class="text" >THANH TOÁN THÀNH CÔNG</h5>
                </div>
                <hr style="color: white;" >
                <div class="d-flex justify-content-between mb-3" >
                    <label>Bắt đầu sau</label>
                    <span id="checkout-qrcode-countdown2" class="mx-2" >4s</span>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
    include "footer.php";
?>