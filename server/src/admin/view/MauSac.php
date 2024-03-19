<div class="modal fade" id="addProductColorModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thêm màu sắc</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="add-product-color-form">
                    <div class="form-group">
                        <label for="product-color-id">Mã màu</label>
                        <input type="text" class="form-control" id="product-color-id" name="product-color-id">
                    </div>
                    <div class="form-group">
                        <label for="product-color-name">Tên màu</label>
                        <input type="text" class="form-control" id="product-color-name" name="product-color-name">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary">Thêm</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="deleteProductColorModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Xóa màu sắc</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="add-product-color-form">
                    <div class="form-group">
                        <label for="product-color-name">Chọn màu sắc</label>
                        <select id="product-color-name" class="form-control">
                            <option value="">Đen</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="product-color-id">Mã màu</label>
                        <input type="text" class="form-control" id="product-color-id" name="product-color-id">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary">Xóa</button>
            </div>
        </div>
    </div>
</div>