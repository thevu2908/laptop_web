function getSizeinTable(table,ma,id){
    $(id).val("");
    $.ajax({
        url:"server/src/controller/GetIdTableController.php",
        method:"POST",
        data:{action:"ma",table:table},
        dataType:"json",
        success:function(data){
            $(id).val(ma+"0"+(Number.parseInt(data)+1));
        },
        error: (xhr, status, error) => {
            console.log(xhr.responseText);
        }
    })
}