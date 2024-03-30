<div class="modal fade" id="addProductColorModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="add-product-color-form">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm màu sắc</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-6 row align-items-center">
                            <label for="product-color-select" class="mb-0 col-6 pr-0">Chọn màu:</label>
                            <input type="color" class="form-control col-4" id="product-color-select" name="product-color-select">
                        </div>
                        <div class="col-6 row align-items-center">
                            <label for="product-color-id" class="mb-0 col-4 px-0">Mã màu:</label>
                            <input type="text" class="form-control col-8" id="product-color-id" name="product-color-id" disabled style="height: 30px;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="product-color-name">Tên màu</label>
                        <input type="text" class="form-control" id="product-color-name" name="product-color-name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary btn-add-color">Thêm</button>
                </div>
            </form>
        </div>
    </div>
</div>