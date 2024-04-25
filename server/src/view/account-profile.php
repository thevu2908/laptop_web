<?php include 'header.php' ?>

<div id="account-profile__main">
    <div class="account-profile__container container">
        <div class="row">
            <div class="col-2">
                <div class="account-profile__left">
                    <h3 class="account-profile__left-title">Nguyễn Thế Vũ</h3>
                    <div class="account-profile__left-list">
                        <div class="account-profile__left-item active account">
                            <i class="fa-solid fa-user"></i>
                            <span>Thông tin cá nhân</span>
                        </div>
                        <div class="account-profile__left-item address">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>Địa chỉ</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-10">
                <div class="account-profile__right">
                    <div class="account-profile__info-container">
                        <h3 class="account-profile__info-title">Hồ sơ cá nhân</h3>
                        <div class="account-profile__info">
                            <form>
                                <table>
                                    <tr>
                                        <td>
                                            <label for="account-profile__name">Họ tên</label>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="text" id="account-profile__name" class="form-control" value="Nguyễn Thế Vũ" placeholder >
                                            </div>
                                            <div id="name-error" class="invalid-feedback" style="color: #ff424f; font-size: .75rem;"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="account-profile__email">Email</label>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="email" id="account-profile__email" class="form-control" value="vnguyen132az@gmail.com" placeholder >
                                            </div>
                                            <div id="email-error" class="invalid-feedback" style="color: #ff424f; font-size: .75rem;"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="account-profile__phone">Số điện thoại</label>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="tel" id="account-profile__phone" class="form-control" value="" placeholder >
                                            </div>
                                            <div id="phone-error" class="invalid-feedback" style="color: #ff424f; font-size: .75rem;"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button type="button" class="btn btn-update-account">Lưu</button>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="address-modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Địa chỉ mới</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="custom-form__outline">
                                    <span class="custom-form__title">Họ và tên</span>
                                    <input type="text" id="address__name" class="custom-form__input" placeholder="Họ và tên" />
                                </div>
                                <span id="address__name-error" class="custom-form__input-error"></span>
                            </div>
                            <div class="col">
                                <div class="custom-form__outline">
                                    <span class="custom-form__title">Số điện thoại</span>
                                    <input type="text" id="address__phone" class="custom-form__input" placeholder="Số điện thoại" />
                                </div>
                                <span id="address__phone-error" class="custom-form__input-error"></span>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="custom-form__outline">
                                    <span class="custom-form__title">Tỉnh/Thành phố</span>
                                    <select id="address__province" class="custom-form__select">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <span id="address__province-error" class="custom-form__input-error"></span>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="custom-form__outline">
                                    <span class="custom-form__title">Quận/Huyện</span>
                                    <select id="address__district" class="custom-form__select">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <span id="address__district-error" class="custom-form__input-error"></span>
                            </div>
                            <div class="col">
                                <div class="custom-form__outline">
                                    <span class="custom-form__title">Phường/Xã</span>
                                    <select id="address__ward" class="custom-form__select">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <span id="address__ward-error" class="custom-form__input-error"></span>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="custom-form__outline">
                                    <span class="custom-form__title">Địa chỉ cụ thể</span>
                                    <input type="text" id="address__street" class="custom-form__input" placeholder="Địa chỉ cụ thể" />
                                </div>
                                <span id="address__street-error" class="custom-form__input-error"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="d-flex align-items-center address__default-container">
                                    <input type="checkbox" id="address__default" class="custom-form__checkbox" >
                                    <label for="address__default" class="custom-form__label">Đặt làm địa chỉ mặc định</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary btn-address" data-action="add">Thêm</button>
                </div>
            </div>
        </div>
    </div>

    <div id="delete-address-modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Xóa địa chỉ</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3 class="delete-address__confirm">Bạn có chắc chắn muốn xóa địa chỉ này?</h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-danger btn-delete-address">Xóa</button>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php' ?>