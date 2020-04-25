<?php
require_once("conn2.php");
$CMND = $_POST['cmnd'];
$sql = "SELECT  [HOTEN],
                [DIACHI],
                [CMND],
                [NGAYCAP],
                [MACN]
        FROM [QLTK].[dbo].[KHACHHANG]
        WHERE CMND = $CMND";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}
$data_tmp = array();
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_BOTH)) {
    $data_tmp = array('HoTen' => $row['HOTEN'], 'diachi' => $row['DIACHI'], 'cmnd' => $row['CMND'], 'ngaycap' => $row['NGAYCAP'], 'MACN' => preg_replace('/\s+/', '', $row['MACN']));
    // echo $row['LastName'] . ", " . $row['FirstName'] . "<br />";
}
$data_json = json_encode($data_tmp);
echo $data_json;