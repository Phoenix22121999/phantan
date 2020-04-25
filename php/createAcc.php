<?php
require('conn2.php');
$CN = $_POST['CN'];
$CMND = $_POST['CMND'];
$pass = $_POST['NewPass'];
$role = $_POST['role'];

$sql1 = "INSERT INTO Account (username,matkhau,QUYEN,MACN) VALUES ('$CMND','$pass','$role','$CN');";

$stmt2 = sqlsrv_query($conn, $sql1);
if ($stmt2 === false) {
    echo 'fail';
    die(print_r(sqlsrv_errors(), true));
} else {
    echo 1;
}