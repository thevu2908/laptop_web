<main class="admin-dashboard">
  <div class="d-flex align-items-center statistic-filter mb-3">
    <div style="margin-right: 16px;">
      <label for="brand-filter" style="margin-bottom: 0px;">Thương hiệu:</label>
      <select id="brand-filter" class="brand-filter__list" style="margin-left: 4px; padding: 4px 6px;">

      </select>
    </div>
    <div>
      <label for="start-date">Từ</label>
      <input type="date" id="start-date" min="2024-01-01">
    </div>
    <div class="mx-1">
      <label for="end-date">Đến</label>
      <input type="date" id="end-date" min="2023-01-01">
    </div>
    <button type="button" class="btn btn-primary btn-filter__date">Thống kê</button>
  </div>
  <div class="box-info">
    <li>
      <i class="fas fa-calendar-check"></i>
      <div class="text order-statistic">
        <p>Đơn hàng</p>
        <h3 class="order-statistics__quantity"></h3>
      </div>
    </li>
    <li>
      <i class="fas fa-dollar-sign"></i>
      <div class="text revenue-statistic">
        <p>Doanh thu</p>
        <h3 class="revenue-statistic__number"></h3>
      </div>
    </li>
    <li>
      <i class="fa-solid fa-laptop"></i>
      <div class="text product-statistic">
        <p>Sản phẩm</p>
        <h3 class="product-statistic__number"></h3>
      </div>
    </li>
    <li>
      <i class="fas fa-people-group"></i>
      <div class="text customer-statistic">
        <p>Khách hàng</p>
        <h3 class="customer-statistic__number"></h3>
      </div>
    </li>
  </div>

  <div class="table-data">
    <div class="order recent-order__container">
      <div class="head">
        <h3>Hóa đơn gần đây</h3>
      </div>
      <table class="recent-order__table">
        <thead>
          <tr>
            <th>Mã hóa đơn</th>
            <th>Ngày mua</th>
            <th>Tổng tiền</th>
            <th>Khuyến mãi</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody class="recent-order__list">

        </tbody>
      </table>
      <div class="clearfix">
        <div id="pagination">

        </div>
        <input type="hidden" name="currentpage" id="currentpage" value="1">
      </div>
    </div>
    <div class="todo best-seller-product__container">
      <div class="head">
        <h3>Sản phẩm bán chạy</h3>
        <span class="view-quantity">
          Hiển thị
          <input type="number" class="view-product-quantity" title="Số sản phẩm hiển thị" value="5">
          sản phẩm
        </span>
      </div>

      <ul class="product-list d-flex flex-column">

      </ul>
    </div>
  </div>

  <div class="table-data">
    <div class="order">
      <div class="head">
        <h3>Hóa đơn</h3>
      </div>
      <div class="order-chart__container">
        <div class="order-chart__box">
          <canvas id="order-chart"></canvas>
        </div>
      </div>
      <div class="text-center">Tháng</div>
    </div>
    <div class="order">
      <div class="head">
        <h3>Doanh số</h3>
        <div class="statistic-filter">
          <form>
            <div class="d-flex align-items-center">
              <div>
                <!-- <label for="brand-filter__chart">Thương hiệu:</label> -->
                <select id="brand-filter__chart" class="brand-filter__list" style="margin-left: 4px; padding: 4px 6px;">

                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="revenue-chart__container">
        <div class="revenue-chart__box">
          <canvas id="revenue-chart"></canvas>
        </div>
      </div>
      <div class="text-center">Tháng</div>
    </div>
  </div>

  <div id="order-detail-modal" class="modal fade" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

        </div>
        <div class="modal-footer">

        </div>
      </div>
    </div>
  </div>
</main>