<?php
$serverName = "25.89.202.22,1432"; //serverName\instanceName, portNumber (default is 1433)
$connectionInfo = array("Database" => "QLTK", "UID" => "sa", "PWD" => "123456");
$conn = sqlsrv_connect($serverName, $connectionInfo);
if (!$conn) {
    // $serverName = "DESKTOP"; //serverName\instanceName, portNumber (default is 1433)
    // $connectionInfo = array("Database" => "QLTK");
    // $conn = sqlsrv_connect($serverName, $connectionInfo);
    // if (!$conn) {
    exit('Kết nối không thành công!');
    // }
}