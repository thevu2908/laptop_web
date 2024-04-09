$(document).ready(function() {
    $.ajax({
        url:"server/src/controller/CTQuyenController.php",
        method:"get",
        data:{action:"taskbar",maquyen:"NQ02"},
        dataType:"json",
        success:function(data){
            var html="<li class='side-menu-item <?php echo $page == dashboard || $page == '' ? 'active' : '' ?>'><a href='/admin.php?controller=dashboard' class='nav-link'><i class='fas fa-border-all'></i><span class='text'>Dashboard</span></a></li>";
            data.forEach((taskbar,index) => {
                html+=`<li class="side-menu-item <?php echo $page == ${taskbar['ten_chuc_nang']} ? 'active' : ''?>">
                <a href="/admin.php?controller=${taskbar['ten_chuc_nang']}" class="nav-link">
                  <i class="fas fa-shopping-cart"></i>
                  <span class="text">${taskbar['ten_chuc_nang']}</span>
                </a>
              </li>`
            });
            $("#show-TaskBar").html(html);
            console.log(html);
        }
    })
})

function loadTaskBar(){
    $.ajax({
        url:"server/src/controller/CTQuyenController.php",
        method:"get",
        data:{action:"taskbar",maquyen:"NQ02"},
        dataType:"json",
        success:function(data){
            var html="<li class='side-menu-item <?php echo $page == dashboard || $page == '' ? 'active' : '' ?>'><a href='/admin.php?controller=dashboard' class='nav-link'><i class='fas fa-border-all'></i><span class='text'>Dashboard</span></a></li>";
            data.forEach((taskbar,index) => {
                html+=`<li class="side-menu-item <?php echo $page == ${taskbar['ten_chuc_nang']} ? 'active' : ''?>">
                <a href="/admin.php?controller=${taskbar['ten_chuc_nang']}" class="nav-link">
                  <i class="fas fa-shopping-cart"></i>
                  <span class="text">${taskbar['ten_chuc_nang']}</span>
                </a>
              </li>`
            });
            $("#show-TaskBar").html(html);
            console.log(html);
        }
    })
}