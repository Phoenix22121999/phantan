$(document).ready(function () {
    $('#btn_submit').click(function () { 
        $.ajax({
            type: "post",
            url: "./php/login.php",
            data: {
                username : $('#email').val(),
                pwd : $('#pwd').val(),
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