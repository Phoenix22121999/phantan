<?php
require_once('conn2.php');
$CMND = $_POST['CMND'];
$NgayRut = $_POST['NgayRut'];
$TienLai = $_POST['TienLai'];
$MaGDVR = $_POST['MaGDVR'];
$sql = "UPDATE PHIEU
        SET NGAYRUT = '$NgayRut', TIENLAI = $TienLai , MAGDV_LPR = '$MaGDVR'
        WHERE CMND = '$CMND';";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    echo 'fail';
    die(print_r(sqlsrv_errors(), true));
} else {
    echo 1;
}