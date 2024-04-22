$(document).ready(() => {
    getProvince()
    
    $("#province").on("change", changeProvinces)
    $("#district").on("change", changeDistricts)

    $('.closemodal').on('click', clearSelect);
})

function getProvince() {
    $.ajax({
        url: 'server/src/controller/KhachHangController.php',
        method: 'POST',
        dataType: 'JSON',
        data: { action: "get-province" },
        success: data => {
            $.each(data, function(i, province) {
                $('#province').append($('<option>', {
                    value: province.province_id,
                    text: province.name
                }));
            });
        },
        error: function(xhr, textStatus, error) {
            console.log(error)
        }
    });
}

function changeProvinces() {
    var province_id = $('#province').val();
    if(province_id) {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: {
                action: "get-district",
                province_id: province_id 
            },
            dataType: 'JSON',
            success: data => {
                $('#district').empty();

                $.each(data, function(i, district) {
                    $('#district').append($('<option>', {
                        value: district.id,
                        text: district.name
                    }));
                });
                $('#wards').empty();
            },
            error: function(xhr, textStatus, error) {
                console.log('Error: ' + error);
            }
        });
        $("#wards").empty();
    }
    else
        $('#district').empty();
}

function changeDistricts() {
    var district_id = $('#district').val();
    if(district_id) {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: {
                action: "get-ward",
                district_id: district_id 
            },
            dataType: 'JSON',
            success: data => {
                $('#wards').empty();

                $.each(data, function(i, ward) {
                    $('#wards').append($('<option>', {
                        value: ward.id,
                        text: ward.name
                    }));
                });
            },
            error: function(xhr, textStatus, error) {
                console.log('Error: ' + error);
            }
        });
    }
    else
        $('#wards').empty();
}

function clearSelect() {
    $('#province').prop('selectedIndex', 0);

    $('#district').prop('selectedIndex', 0);
    
    $('#wards').prop('selectedIndex', 0);
}
