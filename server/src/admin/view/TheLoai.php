<div class="modal fade" id="addProductTypeModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="add-product-type-form">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm thể loại</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="product-type-name">Tên thể loại</label>
                        <input type="text" class="form-control" id="product-type-name" name="product-type-name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary btn-add-type">Thêm</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="deleteProductTypeModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="delete-product-type-form">
                <div class="modal-header">
                    <h4 class="modal-title">Xóa thể loại</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body type-confirm-delete">
                    
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
                    <input type="button" class="btn btn-danger btn-delete-type" value="Xóa">
                </div>
            </form>
        </div>
    </div>
</div>