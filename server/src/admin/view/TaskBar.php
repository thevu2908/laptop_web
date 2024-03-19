<?php
$page = "";
if (isset($_REQUEST['controller'])) {
  $page = $_REQUEST['controller'];
}
?>

<section class="sidebar">
  <a href="/admin.php" class="logo">
    <i class="fab fa-slack"></i>
    <span class="text">Admin</span>
  </a>
  <ul class="side-menu top">
    <li class="side-menu-item <?php echo $page === 'dashboard' || $page === '' ? 'active' : '' ?>">
      <a href="/admin.php?controller=dashboard" class="nav-link">
        <i class="fas fa-border-all"></i>
        <span class="text">Dashboard</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'taikhoan' ? 'active' : '' ?>">
      <a href="/admin.php?controller=taikhoan" class="nav-link">
        <i class="fas fa-shopping-cart"></i>
        <span class="text">Tài Khoản</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'donhang' ? 'active' : '' ?>">
      <a href="/admin.php?controller=donhang" class="nav-link">
        <i class="fas fa-chart-simple"></i>
        <span class="text">Đơn Hàng</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'sanpham' ? 'active' : '' ?>">
      <a href="/admin.php?controller=sanpham" class="nav-link">
        <i class="fas fa-message"></i>
        <span class="text">Sản Phẩm</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'danhgia' ? 'active' : '' ?>">
      <a href="/admin.php?controller=danhgia" class="nav-link">
        <i class="fas fa-message"></i>
        <span class="text">Đánh Giá</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'nhanvien' ? 'active' : '' ?>">
      <a href="/admin.php?controller=nhanvien" class="nav-link">
        <i class="fas fa-people-group"></i>
        <span class="text">Nhân Viên</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'hoadon' ? 'active' : '' ?>">
      <a href="/admin.php?controller=hoadon" class="nav-link">
        <i class="fas fa-people-group"></i>
        <span class="text">Hóa Đơn</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'khuyenmai' ? 'active' : '' ?>">
      <a href="/admin.php?controller=khuyenmai" class="nav-link">
        <i class="fas fa-people-group"></i>
        <span class="text">Khuyến Mãi</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'nhomquyen' ? 'active' : '' ?>">
      <a href="/admin.php?controller=nhomquyen" class="nav-link">
        <i class="fas fa-people-group"></i>
        <span class="text">Nhóm Quyền</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'chucnang' ? 'active' : '' ?>">
      <a href="/admin.php?controller=chucnang" class="nav-link">
        <i class="fas fa-people-group"></i>
        <span class="text">Chức Năng</span>
      </a>
    </li>
  </ul>
  <ul class="side-menu">
    <li>
      <a href="#" style="text-decoration: none;">
        <i class="fas fa-cog"></i>
        <span class="text">Settings</span>
      </a>
    </li>
    <li>
      <a href="/index.php" class="logout" style="text-decoration: none;">
        <i class="fas fa-right-from-bracket"></i>
        <span class="text">Logout</span>
      </a>
    </li>
  </ul>
</section>