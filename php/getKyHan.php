<?php
require_once("conn2.php");
$MaDV = $_POST['MaDV'];
$sql = "SELECT  *
        FROM DICHVU
        WHERE MADV ='$MaDV'";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}
$data = array();
$data_tmp = array();

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_BOTH)) {
    $data_tmp = array('MaDV' => $row['MADV'], 'KyHan' => $row['KYHANG'], 'TenDV' => $row['TENDV']);

    // echo $row['LastName'] . ", " . $row['FirstName'] . "<br />";
}
$data_json = json_encode($data_tmp);
echo $data_json;