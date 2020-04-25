<?php
require('conn2.php');
$HoTen = $_POST['HoTen'];
$DiaChi = $_POST['DiaChi'];
$CN = $_POST['CN'];
$CMND = $_POST['CMND'];
$MaDV = $_POST['MaDV'];
$NgayGui = $_POST['NgayGui'];
$LaiSuat = $_POST['LaiSuat'];
$SoTien = $_POST['SoTien'];
$NgayDenHan = $_POST['NgayDenHan'];
$MaGDVG = $_POST['MaGDVG'];
$sqlCheck = "SELECT TOP 1 KHACHHANG.CMND FROM KHACHHANG WHERE KHACHHANG.CMND = '$CMND';";
$sql1 = "INSERT INTO KHACHHANG (HOTEN,DIACHI,CMND,NGAYCAP,MACN) VALUES ('$HoTen','$DiaChi','$CMND','$NgayGui','$CN');";
$sql2 = "INSERT INTO PHIEU (CMND,MADV,NGAYGUI,LAISUAT,SOTIEN_GUI,NGAYDENHAN,MAGDV_LPG) VALUES ('$CMND','$MaDV','$NgayGui',$LaiSuat,$SoTien,'$NgayDenHan','$MaGDVG');";
$stmtCheck = sqlsrv_query($conn, $sqlCheck);
if ($stmtCheck === false) {
    echo 'fail';
    die(print_r(sqlsrv_errors(), true));
} else {
    $row = sqlsrv_fetch_array($stmtCheck, SQLSRV_FETCH_BOTH);
    if ($row != null) {
        $stmt2 = sqlsrv_query($conn, $sql2);
        if ($stmt2 === false) {
            echo 'fail';
            die(print_r(sqlsrv_errors(), true));
        } else {
            echo 1;
        }
    } else {
        $stmt1 = sqlsrv_query($conn, $sql1);
        if ($stmt1 === false) {
            echo 'fail';
            die(print_r(sqlsrv_errors(), true));
        }
        sleep(1);
        $stmt2 = sqlsrv_query($conn, $sql2);
        if ($stmt2 === false) {
            echo 'fail';
            die(print_r(sqlsrv_errors(), true));
        } else {
            echo 1;
        }
    }
}