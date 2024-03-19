<div class="modal fade" id="addProductGPUModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thêm GPU</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="add-product-gpu-form">
                    <div class="form-group">
                        <label for="product-gpu-name">Tên gpu</label>
                        <input type="text" class="form-control" id="product-gpu-name" name="product-gpu-name">
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

<div class="modal fade" id="deleteProductGPUModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Xóa GPU</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="add-product-gpu-form">
                    <div class="form-group">
                        <label for="product-gpu-name">Chọn GPU</label>
                        <select id="product-gpu-name" class="form-control">
                            <option value="">RTX 3060</option>
                        </select>
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