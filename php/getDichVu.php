<?php
require_once("conn2.php");
$sql = "SELECT  *
        FROM DICHVU";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}
$data = array();
$data_tmp = array();
$i = 1;
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_BOTH)) {
    $data_tmp[$i] = array('MaDV' => $row['MADV'], 'KyHang' => $row['KYHANG'], 'TenDV' => $row['TENDV']);
    $i++;
    // echo $row['LastName'] . ", " . $row['FirstName'] . "<br />";
}
$data_json = json_encode($data_tmp);
echo $data_json;