$(document).ready(function () {
    if(getCookie('role')!=4){
        getOP()
        getKH()
    }else if (getCookie('role')==4) {
        getKH(getCookie('username'))
        $('.btn_ruttien').css('display', 'none');
        $('.btn_guitien').css('display', 'none');
        $('.btn_service').css('display', 'none');
        $('.btn_rate').css('display', 'none');
        $('.btn_signup').val('Đổi Mật Khẩu');
        $('#form_add_user #CMND').prop('disabled', true);
        $('#form_add_user #MaCN').prop('disabled', true);
        $('#form_add_user #MaRole').prop('disabled', true);
    }

    $('.btn_signup').click(function () { 
        if(getCookie('role')==4){
            $('#form_add_user #CMND').val(getCookie('username'));
            $('#form_add_user #MaCN').val(getCookie('CN'));
            $('#form_add_user #MaRole').val(getCookie('role'));
        }
        
    });
    $('#form_add_user .btn_adduser').click(function () {
        if(getCookie('role')==4){
            var url = "./php/updateMatKhau.php"
        }else {
            var url = "./php/createAcc.php"
        }
        if($('#form_add_user #password').val() == $('#form_add_user #re-password').val()){
            $.ajax({
                type: "post",
                url: url,
                data: {
                    CMND: $('#form_add_user #CMND').val(),
                    NewPass: $('#form_add_user #password').val(),
                    CN: $('#form_add_user #MaCN').val(),
                    role: $('#form_add_user #MaRole').val(),
                },
                success: function (response) {
                    if(response==1){
                        alert('Cập Nhật Thành Công')
                    }else(
                        alert(response)
                    )
                }
            });
        }else{
            alert('Mật Khẩu Không Trùng')
        }
    });
    
    
    function getKH(cmnd = null) {
        $.ajax({
            type: "post",
            url: "./php/get_inf.php",
            data:{
                cmnd : cmnd
            },
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
                    $(edit).appendTo(action);
                    // $(span).appendTo(action);
                    // $(del).appendTo(action);
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
    }
   
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
    
    $('#btn_admin').css('display', 'block');
    
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
    async function getPhieu(cmnd = null) {
        $('#table_phieu .phieu_list').empty();
        await $.ajax({
            type: "post",
            url: "./php/getPhieu.php",
            data: {
                time: $('.grid_view_Phieu #Time').val(),
                cmnd:cmnd
                
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
                        'data-madv' : obj[i].MaDV,
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
        return true
    }
    $('#btn_search').click(async function () { 
        if(getCookie('role')==4){
            await getPhieu(getCookie('username'))
            $('.save_ruttien').prop('disabled', true);
        }else{
            getPhieu()
            
        }
        
    });
    // $('.PhieuRut').click(function () { 
    //     console.log('dat')
    // });
    function name(params) {
        
    }
    function date_diff_indays (date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    var lai_suat_khong_ky_han 
    $.ajax({
        type: "post",
        url: "./php/getLaiSuat.php",
        data: {
            MaDV:  '40'
        },
        success: function (response) {
            let obj = JSON.parse(response)
            lai_suat_khong_ky_han = obj.LaiSuat
        }
    });
    var Lai =0;
    $(document).on('click','.PhieuRut',async function(){
        $.ajax({
            type: "post",
            url: "./php/getKhachHang.php",
            data: {
                cmnd:$(this).data('cmnd')
            },
            success: function (response) {
                let obj = JSON.parse(response)
                console.log(obj)
                $('#form_ruttien #Name').val(obj.HoTen);
                $('#form_ruttien #Address').val(obj.diachi);
                $('#form_ruttien #MaCN').val(obj.MACN);
            }
        });
        $('#form_ruttien #CMND').val($(this).data('cmnd'));
        $('#form_ruttien #MaPhieu').val($(this).data('maphieu'));
        $('#form_ruttien #NgayGui').val($(this).data('ngaygui'));
        $('#form_ruttien #NgayDenHan').val($(this).data('ngaydenhan'));
        $('#form_ruttien #SoTien').val($(this).data('tiengui'));
        $('#form_ruttien #LaiSuat').val($(this).data('laisuat'));
        let today = new Date()
        $('#form_ruttien #NgayRut').val(today.toISOString().slice(0, 10));
        await $.ajax({
            type: "post",
            url: "./php/getKyHan.php",
            data: {
                MaDV:$(this).data('madv')
            },
            success: function (response) {
                let obj = JSON.parse(response)
                $('#form_ruttien #myState').val(obj.KyHan);
                $('#form_ruttien #TenDichVu').val($('#form_ruttien #myState option:selected').data('name'));
            }
        });
        
        //tính toán date_diff_indays($(this).data('ngaydenhan'),$(this).data('ngaygui'))
        // console.log('gửi đến hạn: '+date_diff_indays($(this).data('ngaygui'),$(this).data('ngaydenhan')))
        // console.log('gửi đến now: '+date_diff_indays($(this).data('ngaygui'),today.toISOString().slice(0, 10)))
        // console.log('rút đến hạn: '+date_diff_indays(today.toISOString().slice(0, 10),$(this).data('ngaydenhan')))
        var money = $(this).data('tiengui')
        var time_remaining = date_diff_indays(today.toISOString().slice(0, 10),$(this).data('ngaydenhan'))
        var time_has_passed = date_diff_indays($(this).data('ngaygui'),today.toISOString().slice(0, 10))
        console.log('time remaing '+time_remaining)
        console.log(' time_has_passed '+time_has_passed)
        if(time_remaining>0){
            Lai = parseFloat(money) * (time_has_passed/30) * lai_suat_khong_ky_han
        }else if(time_remaining == 0){
            Lai =  parseFloat(money) * $(this).data('laisuat') * $('#form_ruttien #myState option:selected').val();
        }else if (time_remaining < 0){
            Lai =  parseFloat(money) * $(this).data('laisuat') * $('#form_ruttien #myState option:selected').val();
            time_remaining = time_remaining + ($('#form_ruttien #myState option:selected').val()*30)
            var so_lan_ky_han = (time_remaining*-1) /  ($('#form_ruttien #myState option:selected').val()*30)
            var so_ngay_du = (time_remaining*-1) %  ($('#form_ruttien #myState option:selected').val()*30)
            if (so_lan_ky_han != 0) {
                for (let i = 0; i < so_lan_ky_han; i++) {
                    Lai = (parseFloat(money) + Lai) * $(this).data('laisuat') * $('#form_ruttien #myState option:selected').val();
                }
            }
            if (so_ngay_du != 0){
                Lai_tmp= (parseFloat(money)) * ((so_ngay_du)/30) * lai_suat_khong_ky_han
                Lai = parseFloat(Lai)+Lai_tmp  
            }
            // while ( num < 0 ) {
            //     Lai = (parseFloat(money) + Lai) * $(this).data('laisuat') * $('#form_ruttien #myState option:selected').val();
            //     num = num + ($('#form_ruttien #myState option:selected').val()*30)
            // }
            // var Lai = money * $(this).data('laisuat') * $('#form_ruttien #myState option:selected').val();
        }
        $('#form_ruttien #TienLai').val(Lai);
        $('#form_ruttien #TongTien').val((parseFloat(money) + Lai));
        
        document.getElementById('form_ruttien').style.display = 'block';
    });
});