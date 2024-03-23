<div class="modal fade" id="addProductBrandModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="add-product-brand-form">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm thương hiệu sản phẩm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="product-brand-name">Tên thương hiệu</label>
                        <input type="text" class="form-control" id="product-brand-name" name="product-brand-name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary btn-add-brand">Thêm</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="deleteProductBrandModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="delete-product-brand-form">
                <div class="modal-header">
                    <h4 class="modal-title">Xóa thương hiệu</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body brand-confirm-delete">

                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
                    <input type="button" class="btn btn-danger btn-delete-brand" value="Xóa">
                </div>
            </form>
        </div>
    </div>
</div>