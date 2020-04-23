<?php
$serverName = "DESKTOP"; //serverName\instanceName, portNumber (default is 1433)
$connectionInfo = array("Database" => "QLTK");
$conn = sqlsrv_connect($serverName, $connectionInfo);

if (!$conn) {
    exit('Kết nối không thành công!');
}