<?php
require_once('conn2.php');
$HoTen = $_POST['HoTen'];
$CMND = $_POST['CMND'];
$NgayCap = $_POST['NgayCap'];
$DiaChi = $_POST['DiaChi'];
$MaCN = $_POST['MaCN'];
$sql = "UPDATE KHACHHANG
        SET HOTEN = '$HoTen', DIACHI = '$DiaChi', NGAYCAP = '$NgayCap', MACN = '$MaCN'
        WHERE CMND = '$CMND';";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    echo 'fail';
    die(print_r(sqlsrv_errors(), true));
} else {
    echo 1;
}