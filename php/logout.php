<?php
$isLogin = 0;
setcookie('username', ' ', time() + (86400 * 30), "/");
setcookie('isLogin', $isLogin, time() + (86400 * 30), "/");
setcookie('role', ' ', time() + (86400 * 30), "/");
//header('Location: ../index.html');
echo '1';