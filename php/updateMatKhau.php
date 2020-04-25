<?php
require_once('conn2.php');
$CMND = $_POST['CMND'];
$NewPass = $_POST['NewPass'];
$sql = "UPDATE Account
        SET matkhau = '$$NewPass'
        WHERE username = '$CMND';";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    echo 'fail';
    die(print_r(sqlsrv_errors(), true));
} else {
    echo 1;
}