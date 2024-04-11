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
        <div class="row" id="review-index" >
            <div class="col-5 mt-5">
                <div class="mb-5 text-dark">
                    <div class="row" style="margin: 15px 0;">
                        <div class="col-md-10 col-lg-8 col-xl-6 w-100">
                            <div class="card">
                                <div class="card-body p-4">
                                    <div class="d-flex flex-start w-100">
                                        <img class="rounded-circle shadow-1-strong me-3"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="65"
                                            height="65" />
                                        <div class="w-100">
                                            <ul class="rating d-flex">
                                                <li class="rate">
                                                    <input type="radio" name="radio1" id="star1" value="1">
                                                    <div class="face"></div>
                                                    <i class="far fa-star star one-star"></i>
                                                </li>
                                                <li class="rate">
                                                    <input type="radio" name="radio1" id="star2" value="2">
                                                    <div class="face"></div>
                                                    <i class="far fa-star star two-star"></i>
                                                </li>
                                                <li class="rate">
                                                    <input type="radio" name="radio1" id="star3" value="3">
                                                    <div class="face"></div>
                                                    <i class="far fa-star star three-star"></i>
                                                </li>
                                                <li class="rate">
                                                    <input type="radio" name="radio1" id="star4" value="4">
                                                    <div class="face"></div>
                                                    <i class="far fa-star star four-star"></i>
                                                </li>
                                                <li class="rate">
                                                    <input type="radio" name="radio1" id="star5" value="5">
                                                    <div class="face"></div>
                                                    <i class="far fa-star star five-star"></i>
                                                </li>
                                            </ul>
                                            <h5>Đánh giá của bạn</h5>
                                            <div class="form-outline">
                                                <textarea class="form-control" style="min-height: 100px; max-height: 100px;" id="content-review" rows="4"></textarea>
                                                <!-- <label class="form-label" for="textAreaExample">Hãy nêu cảm nhận của bạn?</label> -->
                                            </div>
                                            <div class="d-flex justify-content-end mt-3">
                                                <button id="btn-add-review" type="button" class="btn btn-danger">
                                                    Gửi
                                                    <i class="fas fa-long-arrow-alt-right ms-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6 py-3">
                <section style="background-color: #e7effd;">
                    <div class="container my-5 py-5 text-dark">
                        <div class="row d-flex justify-content-center">
                            <div class="list-review col-md-11 col-lg-9 col-xl-7 w-100">
                                <div class="d-flex flex-start mb-4">
                                    <img class="rounded-circle shadow-1-strong me-3" id="comment-ava"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar" width="65" height="65" />
                                    <div class="card w-100">
                                        <div class="card-body p-4">
                                            <div class="">
                                                <h5 id="comment-name">Johny Cash</h5>
                                                <p id="comment-time" class="small">3 hours ago</p>
                                                <p id="comment-content" >
                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                                ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                                viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                                Donec lacinia congue felis in faucibus ras purus odio, vestibulum in
                                                vulputate at, tempus viverra turpis.
                                                </p>

                                                <div class="d-flex justify-content-between align-items-center">
                                                    <ul class="rating d-flex">
                                                        <li class="rate">
                                                            <input type="radio" name="radio1" id="star1" value="1">
                                                            <div class="face"></div>
                                                            <i class="far fa-star star one-star"></i>
                                                        </li>
                                                        <li class="rate">
                                                            <input type="radio" name="radio1" id="star2" value="2">
                                                            <div class="face"></div>
                                                            <i class="far fa-star star two-star"></i>
                                                        </li>
                                                        <li class="rate">
                                                            <input type="radio" name="radio1" id="star3" value="3">
                                                            <div class="face"></div>
                                                            <i class="far fa-star star three-star"></i>
                                                        </li>
                                                        <li class="rate">
                                                            <input type="radio" name="radio1" id="star4" value="4">
                                                            <div class="face"></div>
                                                            <i class="far fa-star star four-star"></i>
                                                        </li>
                                                        <li class="rate">
                                                            <input type="radio" name="radio1" id="star5" value="5">
                                                            <div class="face"></div>
                                                            <i class="far fa-star star five-star"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-start">
                                <img class="rounded-circle shadow-1-strong me-3"
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp" alt="avatar" width="65"
                                    height="65" />
                                <div class="card w-100">
                                    <div class="card-body p-4">
                                    <div class="">
                                        <h5>Mindy Campbell</h5>
                                        <p class="small">5 hours ago</p>
                                        <p>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                                        cumque doloribus dolorum dolor repellat nemo animi at iure autem fuga
                                        cupiditate architecto ut quam provident neque, inventore nisi eos quas?
                                        </p>

                                        <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center">
                                            <a href="#!" class="link-muted me-2"><i class="fas fa-thumbs-up me-1"></i>158</a>
                                            <a href="#!" class="link-muted"><i class="fas fa-thumbs-down me-1"></i>13</a>
                                        </div>
                                        <a href="#!" class="link-muted"><i class="fas fa-reply me-1"></i> Reply</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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

<!-- <div class="d-flex flex-start mb-4">
    <img class="rounded-circle shadow-1-strong me-3" id="comment-ava"
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar" width="65" height="65" />
    <div class="card w-100">
        <div class="card-body p-4">
            <div class="">
                <h5 id="comment-name">Johny Cash</h5>
                <p id="comment-time" class="small">3 hours ago</p>
                <p id="comment-content" >
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                Donec lacinia congue felis in faucibus ras purus odio, vestibulum in
                vulputate at, tempus viverra turpis.
                </p>

                <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <a href="#!" class="link-muted me-2"><i class="fas fa-thumbs-up me-1"></i>132</a>
                    <a href="#!" class="link-muted"><i class="fas fa-thumbs-down me-1"></i>15</a>
                </div>
                <a href="#!" class="link-muted"><i class="fas fa-reply me-1"></i> Reply</a>
                </div>
            </div>
        </div>
    </div>
</div> -->

<?php
include "footer.php";
?>