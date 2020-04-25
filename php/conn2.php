<?php
$CN = $_COOKIE['role'];
if ($CN == 1) {
    // $serverName = "DESKTOP-1DPN8B8\ACCOUNT_SERVER2"; //serverName\instanceName, portNumber (default is 1433)
    // $connectionInfo = array("Database" => "QLTK", "UID" => "sa", "PWD" => "123456");
    require('connCN1.php');
} else if ($CN == 2) {
    // $serverName = "25.89.202.22,1433"; //serverName\instanceName, portNumber (default is 1433)
    // $connectionInfo = array("Database" => "QLTK", "UID" => "sa", "PWD" => "123456");
    require('connCN2.php');
} else if ($CN == 3) {

    // $serverName = "25.89.202.22,1433"; //serverName\instanceName, portNumber (default is 1433)
    // $connectionInfo = array("Database" => "QLTK", "UID" => "sa", "PWD" => "123456");
    require('connAD.php');
} else {
    // $serverName = "25.89.202.22,1433"; //serverName\instanceName, portNumber (default is 1433)
    // $connectionInfo = array("Database" => "QLTK", "UID" => "sa", "PWD" => "123456");
    require('connAD.php');
}
$conn = sqlsrv_connect($serverName, $connectionInfo);
if (!$conn) {
    exit('Kết nối không thành công!');
}