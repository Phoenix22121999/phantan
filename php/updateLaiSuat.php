<?php
require_once('conn2.php');
$MaDV = $_POST['MaDV'];
$LaiSuat = $_POST['LaiSuat'];
$NgayAD = $_POST['NgayAD'];
$sql = "UPDATE LAISUAT
        SET LAISUAT = $LaiSuat, NGAYAD = '$NgayAD'
        WHERE MADV = '$MaDV';";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    echo 'fail';
    die(print_r(sqlsrv_errors(), true));
} else {
    echo 1;
}