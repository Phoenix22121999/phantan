$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "./php/get_inf.php",
        success: function (response) {
            var obj = JSON.parse(response)
            console.log(obj)
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
});