<div class="modal fade" id="addProductGPUModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="add-product-gpu-form">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm GPU</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="product-gpu-name">Tên gpu</label>
                        <input type="text" class="form-control" id="product-gpu-name" name="product-gpu-name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary btn-add-gpu">Thêm</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="deleteProductGPUModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="delete-product-gpu-form">
                <div class="modal-header">
                    <h4 class="modal-title">Xóa card đồ họa</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body delete-product-gpu-confirm">
                    
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
                    <input type="button" class="btn btn-danger btn-delete-gpu" value="Xóa">
                </div>
            </form>
        </div>
    </div>
</div>