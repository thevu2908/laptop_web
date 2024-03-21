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
                    <div class="form-group">
                        <label for="product-color-id">Mã màu</label>
                        <input type="text" class="form-control" id="product-color-id" name="product-color-id">
                    </div>
                    <div class="form-group">
                        <label for="product-color-name">Tên màu</label>
                        <input type="text" class="form-control" id="product-color-name" name="product-color-name">
                    </div>
                    <div class="form-group d-flex align-items-center">
                        <span class="mr-2">Màu hiển thị:</span>
                        <div class="product-color-display" style="width: 30px; height: 30px;"></div>
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

<div class="modal fade" id="deleteProductColorModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <h4 class="modal-title">Xóa màu sắc</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body delete-product-color-confirm">
                    
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
                    <input type="button" class="btn btn-danger btn-delete-color" value="Xóa">
                </div>
            </form>
        </div>
    </div>
</div>