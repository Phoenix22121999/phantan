<?php
require_once("conn2.php");
$time = $_POST['time'];
$date = date('Y-m-d', time());
// echo $date . " ";
// echo $final;
if ($time == 'day') {
    $final = date('Y-m-d', time());
} else if ($time == 'month') {
    $final = date("Y-m-d", strtotime("-1 month", strtotime($date)));
} else if ($time == 'year') {
    $final = date("Y-m-d", strtotime("-1 year", strtotime($date)));
}
// echo $final;
$sql = "SELECT *
        FROM PHIEU
        WHERE NGAYGUI >=  '$final'";
$stmt = sqlsrv_query($conn, $sql);
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}
$data = array();
$data_tmp = array();
$i = 1;
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_BOTH)) {
    $data_tmp[$i] = array('MaPhieu' => $row['MAPHIEU'], 'MaDV' => $row['MADV'], 'cmnd' => $row['CMND'], 'NgayGui' => $row['NGAYGUI'], 'LaiSuat' => $row['LAISUAT'], 'TienGui' =>  $row['SOTIEN_GUI'], 'NgayDenHan' =>  $row['NGAYDENHAN'], 'GDVGui' =>  $row['MAGDV_LPG'], 'GDVRut' =>  $row['MAGDV_LPR']);
    $i++;
    // echo $row['LastName'] . ", " . $row['FirstName'] . "<br />";
}
$data_json = json_encode($data_tmp);
echo $data_json;