<?php
session_start();
include("server/src/model/ConnectDB.php");                                                                                                                                                                                                               
include("server/src/model/ChiTietQuyen/ChiTietQuyen.php");
include("server/src/model/ChiTietQuyen/ChiTietQuyenRepo.php");
include("server/src/model/ChucNangQuyen/ChucNangQuyenRepo.php");
$chitietquyen=new ChiTietQuyenRepo();
$chucnang=new ChucNangQuyenRepo();
if(isset($_SESSION['maquyen'])){
  $maquyen=$_SESSION['maquyen'];
  $tmp=$chitietquyen->getChucNang($maquyen);
  $arr=json_decode(json_encode($tmp),true);
  //echo $_SESSION['maquyen'];
}else{
  $maquyen="";
}
$page = "";
if (isset($_REQUEST['controller'])) {
  $page = $_REQUEST['controller'];
}
function kiemtraquyen($arr,$chucnang){
  foreach ($arr as $item){
      if(in_array($chucnang,$item)){
        return true;
      }
  }
  return false;
}
?>
<section class="sidebar">
  <a href="/admin.php" class="logo">
    <i class="fab fa-slack"></i>
    <span class="text">Admin</span>
  </a>
  <ul class="side-menu">
    <li class="side-menu-item <?php echo $page === 'dashboard' || $page === '' ? 'active' : '' ?>">
      <a href="/admin.php?controller=dashboard" class="nav-link">
        <i class="fas fa-border-all"></i>
        <span class="text">Dashboard</span>
      </a>
    </li>
    
    <?php
    if(!empty($maquyen)){
      if(kiemtraquyen($arr,"CN001") && $chitietquyen->kiemtrahangdong($maquyen,"CN001","Xem")){
        echo "<li class='side-menu-item ".($page === 'taikhoan' ? 'active' : '')."'>
        <a href='/admin.php?controller=taikhoan' class='nav-link'>
          <i class='fas fa-shopping-cart'></i>
          <span class='text'>Tài Khoản</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"CN002") && $chitietquyen->kiemtrahangdong($maquyen,"CN002","Xem")){
        echo "<li class='side-menu-item ".($page === 'nhomquyen' ? 'active' : '' )."'>
        <a href='/admin.php?controller=nhomquyen' class='nav-link'>
          <i class='fas fa-chart-simple'></i>
          <span class='text'>Nhóm Quyền</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"CN003") && $chitietquyen->kiemtrahangdong($maquyen,"CN003","Xem")){
        echo " <li class='side-menu-item ".($page === 'sanpham' ? 'active' : '')."'>
        <a href='/admin.php?controller=sanpham' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Sản Phẩm</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"CN004")){
        echo " <li class='side-menu-item ".($page === 'phanquyen' ? 'active' : '')."'>
        <a href='/admin.php?controller=phanquyen' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Phân Quyền</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"CN005") && $chitietquyen->kiemtrahangdong($maquyen,"CN005","Xem")){
        echo " <li class='side-menu-item ".( $page === 'chucnang' ? 'active' : '')."'>
        <a href='/admin.php?controller=chucnang' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Chức Năng</span>
        </a>
      </li>";
      }
    }
    ?>
    <!-- <li class="side-menu-item <?php echo $page === 'taikhoan' ? 'active' : ''?>">
      <a href="/admin.php?controller=taikhoan" class="nav-link">
        <i class="fas fa-shopping-cart"></i>
        <span class="text">Tài Khoản</span>
      </a>
    </li>
    <li class="side-menu-item pr-0">
      <button class="btn btn-toggle align-items-center rounded collapsed" data-toggle="collapse" data-target="#dashboard-collapse" aria-expanded="<?php echo $page === 'sanpham' || $page === 'chitietsanpham' ? 'true' : 'false'; ?>">
        <i class="fa-solid fa-chevron-right"></i>
        Sản phẩm
      </button>
      <div class="collapse <?php echo $page === 'sanpham' || $page === 'chitietsanpham' ? 'show' : 'hide'; ?>" id="dashboard-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <li class="side-menu-item <?php echo $page === 'sanpham' ? 'active' : '' ?>">
            <a href="/admin.php?controller=sanpham" class="nav-link">
              <i class="fa-solid fa-laptop"></i>
              <span class="text">Sản Phẩm</span>
            </a>
          </li>
          <li class="side-menu-item <?php echo $page === 'chitietsanpham' ? 'active' : '' ?>">
            <a href="/admin.php?controller=chitietsanpham" class="nav-link">
              <i class="fa-solid fa-laptop-code"></i>
              <span class="text">Chi Tiết Sản Phẩm</span>
            </a>
          </li>
        </ul>
      </div>
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
        <i class="fa-regular fa-clipboard"></i>
        <span class="text">Đơn Hàng</span>
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
    <li class="side-menu-item <?php echo $page === 'phanquyen' ? 'active' : '' ?>">
      <a href="/admin.php?controller=phanquyen" class="nav-link">
        <i class="fas fa-people-group"></i>
        <span class="text">Phân Quyền</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'baohanh' ? 'active' : '' ?>">
      <a href="/admin.php?controller=baohanh" class="nav-link">
        <i class="fas fa-people-group"></i>
        <span class="text">Bảo Hành</span>
      </a>
    </li>
    <li class="side-menu-item <?php echo $page === 'doitra' ? 'active' : '' ?>">
      <a href="/admin.php?controller=doitra" class="nav-link">
        <i class="fas fa-people-group"></i>
        <span class="text">Đổi Trả</span>
      </a>
    </li> -->
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
