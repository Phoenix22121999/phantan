$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "./php/get_inf.php",
        success: function (response) {
            var obj = JSON.parse(response)
            //console.log(obj)
            for (let i = 1; i <= Object.keys(obj).length; i++) {
                var HoTen = $('<td>',{
                    text: obj[i].HoTen
                })
                var diachi = $('<td>',{
                    text: obj[i].diachi
                })
                var cmnd = $('<td>',{
                    text: obj[i].cmnd
                })
                var ngaycap = $('<td>',{
                    text: obj[i].ngaycap.date.substr(0, 10)
                })
                var MACN = $('<td>',{
                    text: obj[i].MACN
                })
                var edit = $('<a>',{
                    href : '#',
                    'class': 'Edit',
                    'data-cmnd' : obj[i].cmnd,
                    text : 'Sửa'
                })
                var span = $('<span>',{
                    text : ' | '
                })
                var del = $('<a>',{
                    href : '#',
                    'class': 'Delete',
                    'data-cmnd' : obj[i].cmnd,
                    text : 'Xóa'
                })
                var action = $('<td>')
                $(edit).appendTo(action);
                $(span).appendTo(action);
                $(del).appendTo(action);
                var row = $('<tr>',{'class': 'comment'})
                $(HoTen).appendTo(row);
                $(diachi).appendTo(row);
                $(cmnd).appendTo(row);
                $(ngaycap).appendTo(row);
                $(MACN).appendTo(row);
                $(action).appendTo(row);
                $(row).appendTo('#table');
            }
        }
    });
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
    function checkCookie() {
        var user = getCookie("username");
            if (user != "") {
            alert("Welcome again " + user);
            } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 365);
            }
        }
    }

    if (getCookie('isLogin')==true) {
        $('#btn_logout').css('display', 'block');
        $('#btn_login').css('display', 'none');
        $('#name_user').css('display', 'block');
        $('#name_user').html(getCookie('username').trim());
    }
    if (getCookie('isLogin')==0) {
        
        window.location.replace("./login.html")
    }
    if (getCookie('role')==1) {
        $('#btn_admin').css('display', 'block');
    }
    $('#btn_logout').click(function () { 
        $.ajax({
            type: "post",
            url: "./php/logout.php",
            success: function (response) {
                if(response == 1){
                    window.location.replace("./login.html")
                }
            }
        });
    });
    function setDateOut(select,num) {
        let today = new Date()
        let fur = new Date(today.setMonth(today.getMonth()+parseInt(num)));
        $(select).val(fur.toISOString().slice(0, 10));
    }
    function setNameSV(select,name) {
        
        $(select).text(name);
    }
    $.ajax({
        type: "post",
        url: "./php/getDichVu.php",
        success: function (response) {
            var obj = JSON.parse(response)
            //console.log(obj)
            for (let i = 1; i <= Object.keys(obj).length; i++){
                var op = $('<option>',{ 
                    'data-name':  obj[i].TenDV,
                    text: obj[i].MaDV.trim(),
                    attr:{
                        value : obj[i].KyHang,       
                    }
                })
                $(op).appendTo('#form_guitien #myState');
                var op2= $('<option>',{ 
                    'data-name':  obj[i].TenDV,
                    text: obj[i].MaDV.trim(),
                    attr:{
                        value : obj[i].KyHang,       
                    }
                })
                
                $(op2).appendTo('#form_ruttien #myState');
            }
            
        }
    });
    $('.btn_guitien').click(function () { 

        let today = new Date()
        $('#form_guitien #NgayGui').val(today.toISOString().slice(0, 10));
        
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
    // $('#submit_ruttien').click(function () { 
    //     console.log('dat')
        
    // });
});