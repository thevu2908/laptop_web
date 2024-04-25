$(document).ready(() => {    
    getProvince()
    $(document).on('change', '#address__province', changeProvinces)
    $(document).on('change', '#address__district', changeDistricts)
    
    $("#province").on("change", changeProvinces)
    $("#district").on("change", changeDistricts)
    $('.closemodal').on('click', clearSelect)
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
                $('#address__province').append($('<option>', {
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

function getDistricts(province_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            dataType: 'JSON',
            data: { action: 'get-district', province_id },
            success: districts => resolve(districts),
            error: (xhr, textStatus, error) => reject(error)
        });
    })
}

async function changeProvinces() {
    const province_id = $('#province').val() || $('#address__province').val();
    if (province_id) {
        const districts = await getDistricts(province_id)
        if (districts && districts.length > 0) {
            $('#district').empty();
            $('#address__district').empty();
            
            districts.forEach(district => {
                $('#district').append($('<option>', {
                    value: district.id,
                    text: district.name
                }));
                district.id 
                    ? $('#address__district').append($('<option>', {
                        value: district.id,
                        text: district.name
                    }))
                    : $('#address__district').append($('<option>', {
                        value: "",
                        text: "Quận/Huyện"
                    }));
            })
        }
    } else {
        $('#district').empty();
        $('#address__district').empty();
    }
}

function getWards(district_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            dataType: 'JSON',
            data: { action: 'get-ward', district_id },
            success: wards => resolve(wards),
            error: (xhr, textStatus, error) => reject(error)
        });
    })
}

async function changeDistricts() {
    var district_id = $('#district').val() || $('#address__district').val();
    if(district_id) {
        const wards = await getWards(district_id)
        if (wards && wards.length > 0) {
            $('#wards').empty();
            $('#address__ward').empty();

            wards.forEach(ward => {
                $('#wards').append($('<option>', {
                    value: ward.id,
                    text: ward.name
                }));
                ward.id 
                    ? $('#address__ward').append($('<option>', {
                        value: ward.id,
                        text: ward.name
                    }))
                    : $('#address__ward').append($('<option>', {
                        value: "",
                        text: "Phường/Xã"
                    }));
            })
        }
    } else {
        $('#wards').empty();
        $('#address__ward').empty();
    }
}

function clearSelect() {
    $('#province').prop('selectedIndex', 0);
    $('#district').prop('selectedIndex', 0);
    $('#wards').prop('selectedIndex', 0);
}