$(document).ready(function () {
    function setDateOut(select,num) {
        let today = new Date()
        let fur = new Date(today.setMonth(today.getMonth()+parseInt(num)));
        $(select).val(fur.toISOString().slice(0, 10));
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    } 
    $('.btn_guitien').click(function () { 
        let today = new Date()
        $('#form_guitien #NgayGui').val(today.toISOString().slice(0, 10));
        $('#form_guitien #MaGDV').val(getCookie('username'));
        
    });
    
    $('#form_guitien #myState').change(function () {
        setDateOut('#form_guitien #NgayRut',$(this).val())
        console.log($('#form_guitien #myState option:selected').data('name'))
        // setNameSV('#form_guitien #TenDichVu',$('#myState option:selected').data('name'))
        $('#form_guitien #TenDichVu').val($('#form_guitien #myState option:selected').data('name'));
        $.ajax({
            type: "post",
            url: "./php/getLaiSuat.php",
            data: {
                MaDV : $('#myState option:selected').text()
            },
            success: function (response) {
                var obj = JSON.parse(response)
                $('#form_guitien #LaiSuat').val(obj.LaiSuat);
            }
        });
    });
    
    $('#form_guitien .save_guitien').click(function () { 
        console.log('dâdada')
    });
});