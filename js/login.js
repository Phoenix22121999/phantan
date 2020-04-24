$(document).ready(function () {
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    $('#btn_submit').click(function () { 
        if($('#email').val()!='admin'){
            var CN = $('#email').val().split("_")
        }else if($('#email').val()=='admin'){
            CN = 'TT'
        }      
        setCookie('CN',CN[1],1)
        $.ajax({
            type: "post",
            url: "./php/login.php",
            data: {
                username : $('#email').val(),
                pwd : $('#pwd').val(),
                cn: CN[1],
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