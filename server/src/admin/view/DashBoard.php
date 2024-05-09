<main>
  <div class="box-info">
    <li>
      <i class="fas fa-calendar-check"></i>
      <div class="text order-statistic">
        <h3>1.5K</h3>
        <p>Đơn hàng</p>
      </div>
    </li>
    <li>
      <i class="fas fa-dollar-sign"></i>
      <span class="text revenue-statistic">
        <h3>$900k</h3>
        <p>Doanh thu</p>
      </span>
    </li>
    <li>
      <i class="fas fa-people-group"></i>
      <span class="text customer-statistic">
        <h3>1M</h3>
        <p>Khách hàng</p>
      </span>
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
        <div class="dropdown">
          <button class="btn dropdown-toggle shadow-none" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="view-quantity">
              Mặc định
              <i class="fa-solid fa-chevron-down"></i>
            </span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" data-value="10">10 sản phẩm</button>
            <button class="dropdown-item" data-value="15">15 sản phẩm</button>
            <button class="dropdown-item" data-value="20">20 sản phẩm</button>
          </div>
        </div>
      </div>

      <ul class="product-list d-flex flex-column">
        <li class="product-item">
          <div class="product-img">
            <img src="server\src\assets\images\products\SP001.png" >
          </div>
          <div class="d-flex align-items-center justify-content-between flex-grow-1">
            <div class="d-flex flex-column">
              <span class="body-title-2 product-name">Macbook 2022 Pro Đen i5-10500H GTX-1650 8GB/256GB</span>
              <span class="product-sell-quantity text-tiny mt-1">100 sản phẩm</span>
            </div>
            <div>
              <span class="body-title-2 product-price">₫15.000.000</span>
            </div>
          </div>
        </li>
        <li class="product-item">
          <div class="product-img">
            <img src="server\src\assets\images\products\SP001.png" >
          </div>
          <div class="d-flex align-items-center justify-content-between flex-grow-1">
            <div class="d-flex flex-column">
              <span class="body-title-2 product-name">Macbook 2022 Pro Đen i5-10500H GTX-1650 8GB/256GB</span>
              <span class="product-sell-quantity text-tiny mt-1">100 sản phẩm</span>
            </div>
            <div>
              <span class="body-title-2 product-price">₫15.000.000</span>
            </div>
          </div>
        </li>
        <li class="product-item">
          <div class="product-img">
            <img src="server\src\assets\images\products\SP001.png" >
          </div>
          <div class="d-flex align-items-center justify-content-between flex-grow-1">
            <div class="d-flex flex-column">
              <span class="body-title-2 product-name">Macbook 2022 Pro Đen i5-10500H GTX-1650 8GB/256GB</span>
              <span class="product-sell-quantity text-tiny mt-1">100 sản phẩm</span>
            </div>
            <div>
              <span class="body-title-2 product-price">₫15.000.000</span>
            </div>
          </div>
        </li>
        <li class="product-item">
          <div class="product-img">
            <img src="server\src\assets\images\products\SP001.png" >
          </div>
          <div class="d-flex align-items-center justify-content-between flex-grow-1">
            <div class="d-flex flex-column">
              <span class="body-title-2 product-name">Macbook 2022 Pro Đen i5-10500H GTX-1650 8GB/256GB</span>
              <span class="product-sell-quantity text-tiny mt-1">100 sản phẩm</span>
            </div>
            <div>
              <span class="body-title-2 product-price">₫15.000.000</span>
            </div>
          </div>
        </li>
        <li class="product-item">
          <div class="product-img">
            <img src="server\src\assets\images\products\SP001.png" >
          </div>
          <div class="d-flex align-items-center justify-content-between flex-grow-1">
            <div class="d-flex flex-column">
              <span class="body-title-2 product-name">Macbook 2022 Pro Đen i5-10500H GTX-1650 8GB/256GB</span>
              <span class="product-sell-quantity text-tiny mt-1">100 sản phẩm</span>
            </div>
            <div>
              <span class="body-title-2 product-price">₫15.000.000</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</main>