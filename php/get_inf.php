<?php
require_once("conn2.php");
if (isset($_POST['cmnd'])) {
    $CMND = $_POST['cmnd'];
    $sql = "SELECT  [HOTEN],
                [DIACHI],
                [CMND],
                [NGAYCAP],
                [MACN]
        FROM [QLTK].[dbo].[KHACHHANG]
        WHERE CMND = '$CMND'";
} else {
    $sql = "SELECT  [HOTEN],
                [DIACHI],
                [CMND],
                [NGAYCAP],
                [MACN]
        FROM [QLTK].[dbo].[KHACHHANG]";
}


$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}
$data = array();
$data_tmp = array();
$i = 1;
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_BOTH)) {
    $data_tmp[$i] = array('HoTen' => $row['HOTEN'], 'diachi' => $row['DIACHI'], 'cmnd' => $row['CMND'], 'ngaycap' => $row['NGAYCAP'], 'MACN' => preg_replace('/\s+/', '', $row['MACN']));
    $i++;
    // echo $row['LastName'] . ", " . $row['FirstName'] . "<br />";
}
$data_json = json_encode($data_tmp);
echo $data_json;