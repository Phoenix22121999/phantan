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

    // $('#form_ruttien #SoTien').keyup(function () { 
    //     console.log($('#form_ruttien #NgayRut').val())
    //     var han = new Date($('#form_ruttien #NgayRut').val())
    //     var now = new Date($('#form_ruttien #NgayGui').val())
    //     console.log(gui)
    //     if($('#form_ruttien #LaiSuat').val()==' '){
    //         lai = 0
    //     }
    
    // });

    $('.btn_ruttien').click(function () { 
        let today = new Date()
        $('#form_ruttien #NgayGui').val(today.toISOString().slice(0, 10));
        
    });

    $('#form_ruttien #myState').change(function () {
        
        setDateOut('#form_ruttien #NgayRut',$(this).val())
        console.log($('#form_ruttien #myState option:selected').data('name'))
        //console.log($('#myState option:selected').data('name'))
        // setNameSV('#form_guitien #TenDichVu',$('#myState option:selected').data('name'))
        $('#form_ruttien #TenDichVu').val($('#form_ruttien #myState option:selected').data('name'));
        // $('#form_guitien #TenDichVu').val($('#myState option:selected').data('name'));
        $.ajax({
            type: "post",
            url: "./php/getLaiSuat.php",
            data: {
                MaDV : $('#form_ruttien #myState option:selected').text()
            },
            success: function (response) {
                var obj = JSON.parse(response)
                console.log(obj);
                $('#form_ruttien #LaiSuat').val(obj.LaiSuat);
            }
        });
    });
    $('#form_ruttien .save_ruttien').click(function () { 
        $.ajax({
            type: "post",
            url: "./php/updatePhieu.php",
            data: {
                CMND: $('#form_ruttien #CMND').val(),
                NgayRut: $('#form_ruttien #NgayRut').val(),
                TienLai :$('#form_ruttien #TienLai').val(),
                MaGDVR : getCookie('username')
            },
            success: function (response) {
                if(response == 1){
                    alert('Cập Nhật Thành Công')
                }
            }
        });
        
    });
});
