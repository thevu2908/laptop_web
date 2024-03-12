$(document).ready(function() {
    loadData();
})

function loadData() {
    $.ajax({
        url: '/src/controller/TaiKhoanController.php',
        method: 'POST',
        data: {action:'load'},
        success: function(data) {
            console.log(data);
            if (data.length > 0) {
                
            }
        }
    })
}