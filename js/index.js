$(document).ready(function () {
    getOP()
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
                    'data-hoten' : obj[i].HoTen,
                    'data-diachi' :  obj[i].diachi,
                    'data-cmnd' : obj[i].cmnd,
                    'data-ngaycap' :obj[i].ngaycap.date.substr(0, 10),
                    'data-macn' : obj[i].MACN,
                    text : 'Sửa'
                })
                var span = $('<span>',{
                    text : ' | '
                })
                var del = $('<a>',{
                    href : '#',
                    'class': 'Delete',
                    'data-hoten' : obj[i].HoTen,
                    'data-diachi' :  obj[i].diachi,
                    'data-cmnd' : obj[i].cmnd,
                    'data-ngaycap' :obj[i].ngaycap.date.substr(0, 10),
                    'data-macn' : obj[i].MACN,
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
                $(row).appendTo('#table_khach');
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
    function getOP(){
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
                    //$(op2).appendTo('#form_ruttien #myState');
                    $('#form_ruttien #myState').append(op2);
                    var op3= $('<option>',{ 
                        'data-name':  obj[i].TenDV,
                        text: obj[i].MaDV.trim(),
                        attr:{
                            value : obj[i].KyHang,       
                        }
                    })                
                    //$(op3).appendTo('#form_service #myState');
                    $('#form_service #myState').append(op3);
                    var op4= $('<option>',{ 
                        'data-name':  obj[i].TenDV,
                        text: obj[i].MaDV.trim(),
                        attr:{
                            value : obj[i].KyHang,       
                        }
                    })                
                    //$(op3).appendTo('#form_service #myState');
                    $('#form_rate #myState').append(op4);
                }
                
            }
        });
    }
    
    
    
    $('.btn_rate').click(function (e) { 
        let today = new Date()
        $('#form_rate #NgauAp').val(today.toISOString().slice(0, 10));
    });
    
    $('#form_service #myState').change(function () { 
        $('#form_service #MaPhieu').val($('#form_service #myState option:selected').text());
        $('#form_service #KyHang').val($('#form_service #myState option:selected').val());
        $('#form_service #TenDichVu').val($('#form_service #myState option:selected').data('name'));
    });
    $('#form_rate #myState').change(function () { 
        $('#form_rate #MaPhieu').val($('#form_rate #myState option:selected').text());
        $.ajax({
            type: "post",
            url: "./php/getLaiSuat.php",
            data: {
                MaDV : $('#form_rate option:selected').text()
            },
            success: function (response) {
                var obj = JSON.parse(response)
                $('#form_rate #LaiSuat').val(obj.LaiSuat);
            }
        });
       
        $('#form_rate #TenDichVu').val($('#form_rate #myState option:selected').data('name'));
    });
    $('#btn_DV').click(function () {
        if ($('#form_service #MaPhieu').val() != '' &&  $('#form_service #KyHang').val() != '' &&  $('#form_service #TenDichVu').val() != '' ){
            $.ajax({
            type: "post",
            url: "./php/updateDichVu.php",
            data: {
                MaDV  : $('#form_service #MaPhieu').val(),
                KyHan : $('#form_service #KyHang').val(),
                TenDV : $('#form_service #TenDichVu').val()
            },
            success: function (response) {
                if(response == 1){
                    $('#form_service #myState').empty().append('<option>Chọn Dịch Vụ</option>');
                    getOP()
                    alert('Lưu thành công')
                }
            }
        });
        }else{
            alert('Chưa nhập đầy đủ thông tin')
        }
        
    });
    $('#btn_rate').click(function () {
        if ($('#form_rate #MaPhieu').val() != '' &&   $('#form_rate #LaiSuat').val() != '' &&  $('#form_rate #NgauAp').val() != '' ){
            console.log($('#form_rate #NgauAp').val())
            $.ajax({
            type: "post",
            url: "./php/updateLaisuat.php",
            data: {
                MaDV  : $('#form_rate #MaPhieu').val(),
                LaiSuat : $('#form_rate #LaiSuat').val(),
                NgayAD : $('#form_rate #NgauAp').val()
            },
            success: function (response) {
                if(response == 1){
                    $('#form_rate #myState').empty().append('<option>Chọn Dịch Vụ</option>');
                    getOP()
                    alert('Lưu thành công')
                }
            }
        });
        }else{
            alert('Chưa nhập đầy đủ thông tin')
        }
        
    });
    $(document).on('click','.Edit',function(){
        document.getElementById('form_customer').style.display = 'block';
        // document.getElementById('save_customer').style.display = 'none';
        document.getElementById('edit_customer').style.display = 'block'
        $('#form_customer #CMND').val($(this).data('cmnd'));
        $('#form_customer #NgayCap').val($(this).data('ngaycap'));
        $('#form_customer #Name').val($(this).data('hoten'));
        $('#form_customer #Address').val($(this).data('diachi'));
        $('#form_customer #MaCN').val($(this).data('macn'));
    });
    $('.edit_customer').click(function () { 
        if($('#form_customer #CMND').val()!='' && $('#form_customer #NgayCap').val()!='' && $('#form_customer #Name').val()!='' && $('#form_customer #Address').val()!='' && $('#form_customer #MaCN').val()!=''){
            $.ajax({
                type: "post",
                url: "./php/updateKhachHang.php",
                data: {
                    HoTen  : $('#form_customer #Name').val(),
                    CMND : $('#form_customer #CMND').val(),
                    NgayCap : $('#form_customer #NgayCap').val(),
                    DiaChi : $('#form_customer #Address').val(),
                    MaCN : $('#form_customer #MaCN').val(),
                },
                success: function (response) {
                    if(response == 1){
                        $('#form_rate #myState').empty().append('<option>Chọn Dịch Vụ</option>');
                        getOP()
                        alert('Lưu thành công')
                    }
                }
            });
        }else{
            alert('Chưa nhập đầy đủ thông tin')
        }
        
    });
    
    $('#btn_search').click(function () { 
        $('#table_phieu .phieu_list').empty();
        $.ajax({
            type: "post",
            url: "./php/getPhieu.php",
            data: {
                time: $('.grid_view_Phieu #Time').val()
            },
            success: function (response) {
                var obj = JSON.parse(response)
                //console.log(obj)
                for (let i = 1; i <= Object.keys(obj).length; i++) {
                    var MaPhieu = $('<td>',{
                        text: obj[i].MaPhieu
                    })
                    var NgayGui = $('<td>',{
                        text: obj[i].NgayGui.date.substr(0, 10)
                    })
                    var LaiSuat = $('<td>',{
                        text: obj[i].LaiSuat
                    })
                    var SoTIenGui = $('<td>',{
                        text: obj[i].TienGui
                    })
                    var NgayDenHan = $('<td>',{
                        text: obj[i].NgayDenHan.date.substr(0,10)
                    })
                    var GDVGui = $('<td>',{
                        text: obj[i].GDVGui
                    })
                    var GDVRut = $('<td>',{
                        text: obj[i].GDVRut
                    })
                    var LapPhieuRut = $('<a>',{
                        href : 'javascript:void(0);',
                        'class': 'PhieuRut',
                        'data-MaPhieu' : obj[i].MaPhieu,
                        'data-NgayGui' : obj[i].NgayGui.date.substr(0, 10),
                        'data-CMND' : obj[i].cmnd,
                        'data-LaiSuat' :obj[i].LaiSuat,
                        'data-TienGui' : obj[i].TienGui,
                        'data-NgayDenHan' : obj[i].NgayDenHan.date.substr(0, 10),
                        text : 'Lập Phiếu Rút'
                    })
                    // var span = $('<span>',{
                    //     text : ' | '
                    // })
                    // var del = $('<a>',{
                    //     href : '#',
                    //     'class': 'Delete',
                    //     'data-hoten' : obj[i].HoTen,
                    //     'data-diachi' :  obj[i].diachi,
                    //     'data-cmnd' : obj[i].cmnd,
                    //     'data-ngaycap' :obj[i].ngaycap.date.substr(0, 10),
                    //     'data-macn' : obj[i].MACN,
                    //     text : 'Xóa'
                    // })
                    var action = $('<td>')
                    $(LapPhieuRut).appendTo(action);
                    // $(span).appendTo(action);
                    // $(del).appendTo(action);
                    var row = $('<tr>',{'class': 'phieu_list'})
                    $(MaPhieu).appendTo(row);
                    $(NgayGui).appendTo(row);
                    $(LaiSuat).appendTo(row);
                    $(SoTIenGui).appendTo(row);
                    $(NgayDenHan).appendTo(row);
                    $(GDVGui).appendTo(row);
                    $(GDVRut).appendTo(row);
                    $(action).appendTo(row);
                    $(row).appendTo('#table_phieu');
                }
            }
        });
    });
    // $('.PhieuRut').click(function () { 
    //     console.log('dat')
    // });
    $(document).on('click','.PhieuRut',function(){
        document.getElementById('form_ruttien').style.display = 'block';
        
    });
});