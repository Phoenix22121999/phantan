$(document).ready(function () {
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    $('#btn_submit').click(function () { 
        var tmp = $('#email').val().split("_")
        var CN =tmp[1]
        if($('#email').val()=='admin'){
            CN = 'admin'
            setCookie('CN',CN,1)
        }else if(CN == 'CN1' || CN =='CN2'){
            setCookie('CN',CN,1)
        }else {
            CN = $('#email').val()
            setCookie('CN',CN,1)
        }      
        
        $.ajax({
            type: "post",
            url: "./php/login.php",
            data: {
                username : $('#email').val(),
                pwd : $('#pwd').val(),
                cn: CN,
            },
            success: function (response) {
                if (response == 1) {
                    window.location.replace("./index.html");
                }else
                alert(response)
            }
        });
    });
});