$(document).ready(function () {
    function setDateOut(select,num) {
        let today = new Date()
        let fur = new Date(today.setMonth(today.getMonth()+parseInt(num)));
        $(select).val(fur.toISOString().slice(0, 10));
    }

    $('#form_ruttien #SoTien').keyup(function () { 
        console.log($('#form_ruttien #NgayRut').val())
        var gui = new Date($('#form_ruttien #NgayRut').val())
        console.log(gui)
        if($('#form_ruttien #LaiSuat').val()==' '){
            lai = 0
        }
    });

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
});
