<?php
require_once('conn2.php');
if (isset($_POST['pwd']) && isset($_POST['username'])) {
    $pwd = $_POST['pwd'];
    $username = $_POST["username"];
    $sql  =  "SELECT *
            FROM account
            WHERE username = '$username' ";
    $result = sqlsrv_query($conn, $sql);
    if ($result) {
        // Hàm `mysql_fetch_row()` sẽ chỉ fetch dữ liệu một record mỗi lần được gọi
        // do đó cần sử dụng vòng lặp While để lặp qua toàn bộ dữ liệu trên bảng posts
        $row = sqlsrv_fetch_array($result);
        if ($row) {

            if ($row[1] == $pwd) {
                echo '1';
                $isLogin = true;
                setcookie('username', preg_replace('/\s+/', '', $row[0]), time() + (86400 * 30), "/");
                setcookie('isLogin', $isLogin, time() + (86400 * 30), "/");
                setcookie('role', $row[2], time() + (86400 * 30), "/");
            } else
                echo 'Sai Mật Khẩu';
        } else {
            echo "Sai Email";
        }
    }
} else {
    echo 'Chưa Điền Đầy Đủ Thông Tin';
}