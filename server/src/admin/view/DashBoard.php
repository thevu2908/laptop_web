<main>
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
      <i class="fas fa-people-group"></i>
      <div class="text customer-statistic">
        <p>Khách hàng</p>
        <h3 class="customer-statistic__number"></h3>
      </div>
    </li>
    <li>
      <i class="fa-solid fa-laptop"></i>
      <div class="text product-statistic">
        <p>Sản phẩm</p>
        <h3 class="product-statistic__number"></h3>
      </div>
    </li>
  </div>

  <div class="table-data">
    <div class="order">
      <div class="head">
        <h3>Doanh số</h3>
      </div>
      <div class="statistic-filter">
        <form>
          <div class="d-flex align-items-center">
            <div>
              <label for="from">Từ</label>
              <input type="date" id="from">
            </div>
            <div class="mx-1">
              <label for="to">Đến</labelf>
                <input type="date" id="to">
            </div>
            <button type="button" class="btn btn-primary btn-filter__date">Thống kê</button>
            <div style="margin-left: 20px;">
              <label for="brand-filter">Thương hiệu:</label>
              <select id="brand-filter" style="margin-left: 4px; padding: 4px 6px;">
                <option value="">Tất cả</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="revenue-chart__container">
        <div class="revenue-chart__box">
          <canvas id="revenue-chart"></canvas>
          <span>Tháng</span>
        </div>
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
</main>