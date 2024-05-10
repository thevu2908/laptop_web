$(document).ready(() => {
    // Trang Admin
    renderReviewAdmin(null)
    clickPage(renderReviewAdmin)

    // Trang User
    handleAddReview()
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
    try {
        const response = await $.ajax({
            url: 'server/src/controller/DanhGiaController.php',
            method: 'POST',
            data: { action: 'get-by-masp', productId },
            dataType: 'JSON'
        });

        if (response && response.length > 0) {
            let html = '';

            for (const item of response) {
                try {
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
                } catch (error) {
                    console.log(error);
                }
            }

            $('.list-review').html(html);
        }
    } catch (error) {
        console.log(error);
    }
}

async function renderReviewAdmin(data) {
    let productId = $('#admin-review-main #product-id').val()

    if (productId) {
        // productId = productId.toUpperCase().trim()
        // renderProductName(productId)

        const dataReview = data ? data : await getPaginationReview(productId)

        if (dataReview && dataReview.pagination && dataReview.pagination.length > 0) {
            let html = ''

            dataReview.pagination.forEach((review, index) => {
                if(review.ma_sp === productId) {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox-${review.ma_kh}" name="chk[]" value="${review.ma_kh}">
                                    <label for="checkbox-${review.ma_kh}"></label>
                                </span>
                            </td>
                            <td>${review.ma_kh}</td>
                            <td>${review.rating}</td>
                            <td>${review.thoi_gian_danh_gia}</td>
                            <td>${review.noi_dung}</td>
                            <td>
                                <a href="#deleteReviewModal" class="delete btn-delete-product-detail-modal" data-toggle="modal" data-id=${review.ma_kh}>
                                    <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                                </a>
                            </td>
                        </tr>
                    `
                }
            })

            $('.admin-review-list').html(html)
            totalPage(dataReview.count)
        } else {
            $('.admin-review-list').html('')
        }
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
    if(review.productId === '' || review.productId == undefined) {
        alert('Lỗi không tìm thấy id sản phẩm')
        return false;
    }
    if(review.customerId === '' || review.customerId == undefined) {
        alert('Vui lòng đăng nhập để có thể đánh giá')
        // *** Quay lại trang đăng nhập
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
        var formattedDate = currentDate.toISOString();

        let productId = $('.btn-add-cart').attr('data-id');
        let customerId = await getMaKH()
        console.log(customerId)

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

        console.log(dataReview.productId)
        console.log(dataReview.customerId)
        console.log(dataReview.rating)
        console.log(dataReview.time)
        console.log(dataReview.content)

        addReview(dataReview)
            .then(data => {
                if (data) {
                    alert('Đánh giá thành công')
                    renderListReview()
                } else {
                    alert('Xảy ra lỗi trong quá trình đánh giá')
                }
            })
            .catch(error => console.log(error))
    })
}