<main id="admin-product-main">
    <div class="container-xl">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Quản Lý <b>Sản Phẩm</b></h2>
                        </div>
                        <div class="col-sm-6">
                            <a href="#" class="btn btn-secondary">
                                <i class="material-icons">&#xE24D;</i>
                                <span>Import Excel</span>
                            </a>
                            <a href="#" class="btn btn-secondary">
                                <i class="material-icons">&#xE24D;</i>
                                <span>Export Excel</span>
                            </a>
                            <a href="#addProductModal" class="btn btn-success" data-toggle="modal">
                                <i class="material-icons">&#xE147;</i>
                                <span>Thêm</span>
                            </a>
                            <a href="#deleteProductModal" class="btn btn-danger" data-toggle="modal">
                                <i class="material-icons">&#xE15C;</i>
                                <span>Xóa</span>
                            </a>
                        </div>
                    </div>
                </div>
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
                            <th>Tên sản phẩm</th>
                            <th>Thương hiệu</th>
                            <th>Giá nhập</th>
                            <th>Chiết khấu</th>
                            <th>Giá bán</th>
                            <th>Số lượng tồn</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="admin-product-list">

                    </tbody>
                </table>
                <div class="clearfix">
                    <div class="hint-text">Hiển thị <b>5</b> trong <b>25</b> sản phẩm</div>
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