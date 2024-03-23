<main id="admin-product-detail-main">
    <div class="container-xl">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Chi Tiết Sản Phẩm <b class="product-name"></b></h2>
                        </div>
                        <div class="col-sm-6 d-flex justify-content-end">
                            <form>
                                <div class="d-flex align-items-center">
                                    <input type="search" class="form-control form-control-sm" id="product-id" placeholder="Nhập mã sản phẩm" style="border-top-right-radius: 0; border-bottom-right-radius: 0">
                                    <button type="button" class="btn-search-product-detail">
                                        <i class="fas fa-search search-icon"></i>
                                    </button>
                                </div>
                            </form>
                            <a href="#addProductDetailModal" class="btn btn-success" data-toggle="modal">
                                <i class="material-icons">&#xE147;</i>
                                <span>Thêm</span>
                            </a>
                            <a href="#deleteProductDetailModal" class="btn btn-danger" data-toggle="modal">
								<i class="material-icons">&#xE15C;</i>
								<span>Xóa</span>
							</a>
                        </div>
                    </div>
                </div>
                <form>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="selectAll">
                                        <label for="selectAll"></label>
                                    </span>
                                </th>
                                <th>ID</th>
                                <th>CPU</th>
                                <th>Màu sắc</th>
                                <th>GPU</th>
                                <th>RAM</th>
                                <th>ROM</th>
                                <th>Giá</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody class="admin-product-detail-list">

                        </tbody>
                    </table>
                </form>
                <div class="clearfix">
                    <div class="hint-text">Hiển thị <b>5</b> trong <b>25</b> chi tiết</div>
                    <ul class="pagination">
                        <li class="page-item disabled">
                            <a href="#">Previous</a>
                        </li>
                        <li class="page-item active">
                            <a href="#" class="page-link">1</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">2</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">3</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">4</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">5</a>
                        </li>
                        <li class="page-item">
                            <a href="#" class="page-link">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</main>