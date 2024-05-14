$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'danhgia') {
        // Trang Admin
        renderReviewAdmin("")
        clickPage(renderReviewAdmin)
        renderDeleteReviewModal()
        handleDeleteReview()
    }
    // Trang User
    handleAddReview()
    // renderListReview()
})

async function getMaKH() {
    const loginSession = await getLoginSession()
    return loginSession ? loginSession.customerId : ''
}

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: { action: 'get-customer', id },
            dataType: 'JSON',
            success: customer => resolve(customer),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function renderListReview() {
    const productId = $('.btn-add-cart').attr('data-id');
    const dataReview = await getPaginationReview(productId)
    const page = $('#currentpage').val() || ''

    if (dataReview && dataReview.pagination && dataReview.pagination.length > 0) {
        let html = ''

        for (const item of dataReview.pagination) {

            const res = await getCustomer(item.ma_kh);
            html += `
                <div class="d-flex flex-start mb-4">
                    <div class="card w-100">
                        <div class="card-body">
                            <div class="">
                                <h5 class="m-0">${res.ten_kh}</h5>
                                <p class="small">${convertDate(item.thoi_gian_danh_gia.slice(0, 10))}</p>
                                <p class="m-0">
                                    ${item.noi_dung}
                                </p>

                                <div class="d-flex justify-content-between align-items-center">
                                    <ul class="rating d-flex">
                                        <li class="rate">
                                            <i class="far fa-star star ${item.rating > 0 ? 'fas rate-active' : '' }"></i>
                                        </li>
                                        <li class="rate">
                                            <i class="far fa-star star ${item.rating - 1 > 0 ? 'fas rate-active' : '' }"></i>
                                        </li>
                                        <li class="rate">
                                            <i class="far fa-star star ${item.rating - 2 > 0 ? 'fas rate-active' : '' }"></i>
                                        </li>
                                        <li class="rate">
                                            <i class="far fa-star star ${item.rating - 3 > 0 ? 'fas rate-active' : '' }"></i>
                                        </li>
                                        <li class="rate">
                                            <i class="far fa-star star ${item.rating - 4 > 0 ? 'fas rate-active' : '' }"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        $('.list-review').html(html);
        // totalPage(dataReview.count)
        enduserTotalPage(dataReview.count, 4, page)
    }
}

function searchKhuyenMai() {
    $(document).on('keyup', '.admin-search-info', e => {
        const search = e.target.value.toLowerCase()

        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', table: 'danhgia', search },
            dataType: 'JSON',
            success: data => renderReviewAdmin(data),
            error: (xhr, status, error) => console.log(error)
        })
    })
}

async function renderReviewAdmin(productId) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        productId = urlParams.get('id');
    }

    const dataReview = await getPaginationReview(productId)

    if (dataReview && dataReview.pagination && dataReview.pagination.length > 0) {
        let html = ''

        dataReview.pagination.forEach((review, index) => {  
            html += `
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox-${review.ma_kh}" name="chk[]" 
                            maKH="${review.ma_kh}" maSP="${review.ma_sp}" thoiGian="${review.thoi_gian_danh_gia}">
                            <label for="checkbox-${review.ma_kh}"></label>
                        </span>
                    </td>
                    <td>${review.ma_sp}</td>
                    <td>${review.ma_kh}</td>
                    <td>${review.rating} sao</td>
                    <td>${review.thoi_gian_danh_gia}</td>
                    <td>${review.noi_dung}</td>
                    <td>
                        <a href="#deleteReviewModal" class="delete btn-delete-review-modal" 
                            data-toggle="modal" masp="${review.ma_sp}" makh="${review.ma_kh}" thoigian="${review.thoi_gian_danh_gia}">
                            <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                        </a>
                    </td>
                </tr>
            `
        })

        phanquyen_chucnang("Đánh Giá")
        $('.admin-review-list').html(html)
        totalPage(dataReview.count)
        displayTotalPage("#admin-review-main .hint-text", dataReview.count, dataReview.pagination.length)
    } else {
        $('.admin-review-list').html('')
    }
}

function getPaginationReview(productId) {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'danhgia', page, id: productId },
            dataType: 'JSON',
            success: review => resolve(review),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function validateReviewEmpty(review) {
    if(review.customerId === '' || review.customerId == undefined) {
        alert('Vui lòng đăng nhập để có thể đánh giá')
        window.location.href = 'index.php?dang-nhap'
        return false;
    }
    if(review.productId === '' || review.productId == undefined) {
        alert('Lỗi không tìm thấy id sản phẩm')
        return false;
    }
    if(review.rating === '' || review.rating == undefined) {
        alert('Hãy đánh giá số sao cho sản phẩm này')
        return false;
    }
    if(review.content === '' || review.content == undefined) {
        alert('Vui lòng điền nội dung đánh giá')
        return false;
    }
    return true
}

function addReview(review) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/DanhGiaController.php',
            method: 'POST',
            data: { action: 'add', review },
            success: data => {
                if (data && data.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function handleAddReview() {
    $(document).off('click', '#btn-add-review').on('click', '#btn-add-review', async (e) => {
        var currentDate = new Date();
        // var formattedDate = currentDate.toISOString();
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = String(currentDate.getMonth() + 1).padStart(2, '0');
        var day = String(currentDate.getDate()).padStart(2, '0');
        var hours = String(currentDate.getHours()).padStart(2, '0');
        var minutes = String(currentDate.getMinutes()).padStart(2, '0');
        var seconds = String(currentDate.getSeconds()).padStart(2, '0');

        var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        console.log(formattedDate)
        let productId = $('.btn-add-cart').attr('data-id');
        let customerId = await getMaKH()

        const dataReview = {
            productId: productId,
            customerId: customerId,
            rating: $('#review-index .rating input[type="radio"].rate-active').val(),
            time: formattedDate,
            content: $('#review-index #content-review').val(),
        }

        if (!validateReviewEmpty(dataReview)) {
            return
        }

        addReview(dataReview)
            .then(data => {
                if (data) {
                    alert('Đánh giá thành công')
                    $('.rating').html(`
                        <li class="rate">
                            <input type="radio" name="radio1" id="star1" value="1">
                            <div class="face"></div>
                            <i class="far review fa-star star one-star"></i>
                        </li>
                        <li class="rate">
                            <input type="radio" name="radio1" id="star2" value="2">
                            <div class="face"></div>
                            <i class="far review fa-star star two-star"></i>
                        </li>
                        <li class="rate">
                            <input type="radio" name="radio1" id="star3" value="3">
                            <div class="face"></div>
                            <i class="far review fa-star star three-star"></i>
                        </li>
                        <li class="rate">
                            <input type="radio" name="radio1" id="star4" value="4">
                            <div class="face"></div>
                            <i class="far review fa-star star four-star"></i>
                        </li>
                        <li class="rate">
                            <input type="radio" name="radio1" id="star5" value="5">
                            <div class="face"></div>
                            <i class="far review fa-star star five-star"></i>
                        </li>
                    `)
                    $('#review-index #content-review').val('')
                    renderListReview()
                } else {
                    alert('Xảy ra lỗi trong quá trình đánh giá')
                }
            })
            .catch(error => console.log(error))
    })
}

function renderDeleteReviewModal() {
    $(document).on('click', '.btn-delete-review-modal', function() {
        const maKH = $(this).attr('makh')
        const maSP = $(this).attr('masp')
        const thoiGian = $(this).attr('thoigian')

        if (maKH && maSP && thoiGian) {
            const html = `
                <p>Bạn có chắc chắn muốn xóa đánh giá này không?</p>
                <p class="d-none delete-id" customer-id="${maKH}" product-id="${maSP}" time="${thoiGian}"></p>
                <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
            `
            $('#deleteReviewModal .modal-body').html(html)
        }
    })

    $('.btn-delete-checked-review-modal').on('click', () => {
        const html = `
            <p>Bạn có chắc muốn xóa các đánh giá được chọn không ?</p>
            <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
        `
        $('#deleteReviewModal .modal-body').html(html)
    })

}

function deleteReview(maKH, maSP, thoiGian) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/DanhGiaController.php',
            method: 'POST',
            data: { action: 'delete', maKH, maSP, thoiGian },
            success: data => {
                resolve(data)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleDeleteReview() {
    $(document).on('click', '#deleteReviewModal .confirm-delete', () => {
        const customerId = $('#deleteReviewModal .delete-id').attr('customer-id')
        const productId = $('#deleteReviewModal .delete-id').attr('product-id')
        const time = $('#deleteReviewModal .delete-id').attr('time')

        console.log(time)

        if (customerId && productId && time) {
            deleteReview(customerId, productId, time)
                .then(res => {
                    if (res === 'success') {
                        alert('Xóa đánh giá thành công')
                        $('#deleteReviewModal').modal('hide')
                        renderReviewAdmin("")
                        clickPage(renderReviewAdmin)
                    } 
                    else {
                        alert('Xảy ra lỗi trong quá trình xóa đánh giá')
                    }
                })
                .catch(error => console.log(error))
        }
        else {
            let checkedReviews = []
            const firstCheckInputElement = document.querySelector('table.table thead input[type=checkbox]')
            const checkInputElements = document.querySelectorAll('.admin-review-list input[name="chk[]"]')
            
            checkInputElements.forEach(item => {
                if (item.checked) {
                    const maKH = item.getAttribute('maKH');
                    const maSP = item.getAttribute('maSP');
                    const thoiGian = item.getAttribute('thoiGian');
                    checkedReviews.push([maKH, maSP, thoiGian]);
                }
            })
            console.log(checkedReviews)

            if (checkedReviews.length > 0) {
                let promises = []

                checkedReviews.forEach(reviewId => promises.push(deleteReview(reviewId[0], reviewId[1], reviewId[2])))

                Promise.all(promises).then(results => {
                    if (results.includes(false)) {
                        alert('Xảy ra lỗi trong quá trình xóa các đánh giá')
                    } else {
                        alert('Đã xóa các đánh giá được chọn')
                        firstCheckInputElement.checked = false
                        renderReviewAdmin("")
                    }
                })
            } else {
                alert('Không có đánh giá nào được chọn\nVui lòng check vào ô các đánh giá muốn xóa')
            }

            $('#deleteReviewModal').modal('hide')
        }
    })
}