<div class="modal fade" id="addProductPlugModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form c>
                <div class="modal-header">
                    <h5 class="modal-title">Thêm cổng kết nối</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="product-plug-name">Tên cổng kết nối</label>
                        <input type="text" class="form-control" id="product-plug-name" name="product-plug-name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary btn-add-plug">Thêm</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="deleteProductPlugModal" tabindex="-1" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form class="delete-product-plug-form">
                <div class="modal-header">
                    <h4 class="modal-title">Xóa cổng kết nối</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body delete-product-plug-confirm">
                    
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Hủy">
                    <input type="button" class="btn btn-danger btn-delete-plug" value="Xóa">
                </div>
            </form>
        </div>
    </div>
</div>