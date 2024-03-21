<div class="modal fade" id="addProductCPUModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thêm CPU</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="add-product-cpu-form">
                    <div class="form-group">
                        <label for="product-cpu-name">Tên CPU</label>
                        <input type="text" class="form-control" id="product-cpu-name" name="product-cpu-name">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary btn-add-cpu">Thêm</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="deleteProductCPUModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <h4 class="modal-title">Xóa cpu</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body delete-product-cpu-confirm">
                    
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
                    <input type="button" class="btn btn-danger btn-delete-cpu" value="Xóa">
                </div>
            </form>
        </div>
    </div>
</div>