<?php
$serverName = "DESKTOP-1DPN8B8\ACCOUNT_SERVER2"; //serverName\instanceName, portNumber (default is 1433)
$connectionInfo = array( "Database"=>"QLTK", "UID"=>"sa", "PWD"=>"123456");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if (!$conn) {
    exit('Kết nối không thành công!');
}