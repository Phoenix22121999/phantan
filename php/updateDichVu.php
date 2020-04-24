<?php
require_once('conn2.php');
$MaDV = $_POST['MaDV'];
$KyHan = $_POST['KyHan'];
$TenDV = $_POST['TenDV'];
$sql = "UPDATE DICHVU
        SET KYHANG = $KyHan, TENDV = '$TenDV'
        WHERE MADV = '$MaDV';";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    echo 'fail';
    die(print_r(sqlsrv_errors(), true));
} else {
    echo 1;
}