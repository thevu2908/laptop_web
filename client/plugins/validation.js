function checkSpace(str){
    var partten=/^\s*$/;
    return partten.test(str)
}

function isValidEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

function isValidPhone(phone) {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone)
}

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str)
}
function checkValidation(id,idmessage, message,type){
    $(document).on('keyup', id,function(){
        if(type==="text"){
            if(checkSpace($(id).val())){
                $(idmessage).text(message);
            }
        }else if(type==="phone"){
            if(isValidPhone($(id).val())){
                $(idmessage).text(message);
            }
        }else{
            return true;
        }
    })
}