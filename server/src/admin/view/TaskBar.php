<?php
include("server/src/model/ConnectDB.php");                                                                                                                                                                                                               
include("server/src/model/ChiTietQuyen/ChiTietQuyen.php");
include("server/src/model/ChiTietQuyen/ChiTietQuyenRepo.php");
include("server/src/model/ChucNangQuyen/ChucNangQuyenRepo.php");

$chitietquyen = new ChiTietQuyenRepo();
$chucnang = new ChucNangQuyenRepo();

$maquyen = $_SESSION['ma_quyen'];
$tmp = $chitietquyen->getChucNang($maquyen);
$arr = json_decode(json_encode($tmp),true);

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
  <ul class="side-menu" id="show-TaskBar">
    <li class="side-menu-item <?php echo $page === 'dashboard' || $page === '' ? 'active' : '' ?>">
      <a href="/admin.php?controller=dashboard" class="nav-link">
        <i class="fas fa-border-all"></i>
        <span class="text">Dashboard</span>
      </a>
    </li>
    <?php
    if(!empty($maquyen)){
      if(kiemtraquyen($arr,"Tài Khoản") && $chitietquyen->kiemtrahangdong($maquyen,"Tài Khoản","Xem")){
        echo "<li class='side-menu-item ".($page === 'taikhoan' ? 'active' : '')."'>
        <a href='/admin.php?controller=taikhoan' class='nav-link'>
          <i class='fas fa-shopping-cart'></i>
          <span class='text'>Tài Khoản</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Nhóm Quyền") && $chitietquyen->kiemtrahangdong($maquyen,"Nhóm Quyền","Xem")){
        echo "<li class='side-menu-item ".($page === 'nhomquyen' ? 'active' : '' )."'>
        <a href='/admin.php?controller=nhomquyen' class='nav-link'>
          <i class='fas fa-chart-simple'></i>
          <span class='text'>Nhóm Quyền</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Sản Phẩm") && $chitietquyen->kiemtrahangdong($maquyen,"Sản Phẩm","Xem")){
        echo "<li class='side-menu-item pr-0'>
        <button class='btn btn-toggle align-items-center rounded collapsed' data-toggle='collapse' data-target='#dashboard-collapse' aria-expanded='<?php echo $page === 'sanpham' || $page === 'chitietsanpham' ? 'true' : 'false'; ?>
          <i class='fa-solid fa-chevron-right'></i>
          Sản phẩm
        </button>
        <div class='collapse ".($page === 'sanpham' || $page === 'chitietsanpham' ? 'show' : 'hide')."' id='dashboard-collapse'>
          <ul class='btn-toggle-nav list-unstyled fw-normal pb-1 small'>
            <li class='side-menu-item ".($page === 'sanpham' ? 'active' : '')."'>
              <a href='/admin.php?controller=sanpham' class='nav-link'>
                <i class='fa-solid fa-laptop'></i>
                <span class='text'>Sản Phẩm</span>
              </a>
            </li>
            <li class='side-menu-item ".($page === 'chitietsanpham' ? 'active' : '')."'>
              <a href='/admin.php?controller=chitietsanpham' class='nav-link'>
                <i class='fa-solid fa-laptop-code'></i>
                <span class='text'>Chi Tiết Sản Phẩm</span>
              </a>
            </li>
          </ul>
        </div>
      </li>";
      }
      if(kiemtraquyen($arr,"Phân Quyền")){
        echo " <li class='side-menu-item ".($page === 'phanquyen' ? 'active' : '')."'>
        <a href='/admin.php?controller=phanquyen' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Phân Quyền</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Chức Năng") && $chitietquyen->kiemtrahangdong($maquyen,"Chức Năng","Xem")){
        echo " <li class='side-menu-item ".( $page === 'chucnang' ? 'active' : '')."'>
        <a href='/admin.php?controller=chucnang' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Chức Năng</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Khuyến Mãi") && $chitietquyen->kiemtrahangdong($maquyen,"Khuyến Mãi","Xem")){
        echo " <li class='side-menu-item ".( $page === 'khuyenmai' ? 'active' : '')."'>
        <a href='/admin.php?controller=khuyenmai' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Khuyến Mãi</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Bảo Hành") && $chitietquyen->kiemtrahangdong($maquyen,"Bảo Hành","Xem")){
        echo " <li class='side-menu-item ".( $page === 'baohanh' ? 'active' : '')."'>
        <a href='/admin.php?controller=baohanh' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Bảo Hành</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Nhân Viên") && $chitietquyen->kiemtrahangdong($maquyen,"Nhân Viên","Xem")){
        echo " <li class='side-menu-item ".( $page === 'nhanvien' ? 'active' : '')."'>
        <a href='/admin.php?controller=nhanvien' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Nhân Viên</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Đổi Trả") && $chitietquyen->kiemtrahangdong($maquyen,"Đổi Trả","Xem")){
        echo " <li class='side-menu-item ".( $page === 'doitra' ? 'active' : '')."'>
        <a href='/admin.php?controller=doitra' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Đổi Trả</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Thống Kê") && $chitietquyen->kiemtrahangdong($maquyen,"Thống Kê","Xem")){
        echo " <li class='side-menu-item ".( $page === 'thongke' ? 'active' : '')."'>
        <a href='/admin.php?controller=thongke' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Thống Kê</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Đánh Giá") && $chitietquyen->kiemtrahangdong($maquyen,"Đánh Giá","Xem")){
        echo " <li class='side-menu-item ".( $page === 'danhgia' ? 'active' : '')."'>
        <a href='/admin.php?controller=danhgia' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Đánh Giá</span>
        </a>
      </li>";
      }
    }
    ?>
  </ul>
  <!-- <?php
    if(!empty($maquyen)){
      if(kiemtraquyen($arr,"Tài Khoản") && $chitietquyen->kiemtrahangdong($maquyen,"Tài Khoản","Xem")){
        echo "<li class='side-menu-item ".($page === 'taikhoan' ? 'active' : '')."'>
        <a href='/admin.php?controller=taikhoan' class='nav-link'>
          <i class='fas fa-shopping-cart'></i>
          <span class='text'>Tài Khoản</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Nhóm Quyền") && $chitietquyen->kiemtrahangdong($maquyen,"Nhóm Quyền","Xem")){
        echo "<li class='side-menu-item ".($page === 'nhomquyen' ? 'active' : '' )."'>
        <a href='/admin.php?controller=nhomquyen' class='nav-link'>
          <i class='fas fa-chart-simple'></i>
          <span class='text'>Nhóm Quyền</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Sản Phẩm") && $chitietquyen->kiemtrahangdong($maquyen,"Sản Phẩm","Xem")){
        echo " <li class='side-menu-item ".($page === 'sanpham' ? 'active' : '')."'>
        <a href='/admin.php?controller=sanpham' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Sản Phẩm</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Phân Quyền")){
        echo " <li class='side-menu-item ".($page === 'phanquyen' ? 'active' : '')."'>
        <a href='/admin.php?controller=phanquyen' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Phân Quyền</span>
        </a>
      </li>";
      }
      if(kiemtraquyen($arr,"Chức Năng") && $chitietquyen->kiemtrahangdong($maquyen,"Chức Năng","Xem")){
        echo " <li class='side-menu-item ".( $page === 'chucnang' ? 'active' : '')."'>
        <a href='/admin.php?controller=chucnang' class='nav-link'>
          <i class='fas fa-message'></i>
          <span class='text'>Chức Năng</span>
        </a>
      </li>";
      }
    }
    ?> -->
  <ul class="side-menu">
    <li>
      <a href="#" style="text-decoration: none;">
        <i class="fas fa-cog"></i>
        <span class="text">Settings</span>
      </a>
    </li>
    <li>
      <a class="btn-logout" style="text-decoration: none;">
        <i class="fas fa-right-from-bracket"></i>
        <span class="text">Logout</span>
      </a>
    </li>
  </ul>
</section>