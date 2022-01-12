<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//链接数据库
$conn = new mysqli("localhost", "phpsaomaserver", "123456", "phpsaomaserver");
if ($conn->connect_error) {
    die("Could not connect to database!");
};
//构建接口
$action = "read";

//返回的数据对象
$res = array('error' => false);
if (isset($_GET['action'])) {
    $action = $_GET['action'];
}

//获取数据接口
if ($action == "read") {
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `users`");
    // var_dump($result);
    $users = array();
    while ($row = $result->fetch_assoc()) {
        array_push($users, $row);
    }
    // var_dump($users);
    $res['users'] = $users;
}



//根据Id获取用户信息
if ($action == "readUserId") {
    $userId = $_POST['userId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `users` WHERE `userId` = '$userId'");
    $user = array();
    while ($row = $result->fetch_assoc()) {
        array_push($user, $row);
    }
    $res['user'] = $user;
}
//注册用户
if ($action == "login") {
    $nickName = $_POST['nickName'];

    //设置字符类型
    $conn->query("set names utf8");

    //执行sql语句
    $result = $conn->query("INSERT INTO `users` (`nickName`,`realName`,`telNumber`,`gender`,`birthday`,`area`) VALUE ('$nickName','$realName','$telNumber','$gender','$birthday','$area')");

    if ($result) {
        $res["message"] = "user added successfully";
    } else {
        $res['error'] = true;
        $res["message"] = "user added failed";
    }
}
//增加数据接口
if ($action == "create") {
    $nickName = $_POST['nickName'];
    $realName = $_POST['realName'];
    $telNumber = $_POST['telNumber'];
    $gender = $_POST['gender'];
    $birthday = $_POST['birthday'];
    $area = $_POST['area'];

    //设置字符类型
    $conn->query("set names utf8");

    //执行sql语句
    $result = $conn->query("INSERT INTO `users` (`nickName`,`realName`,`telNumber`,`gender`,`birthday`,`area`) VALUE ('$nickName','$realName','$telNumber','$gender','$birthday','$area')");

    if ($result) {
        $res["message"] = "user added successfully";
    } else {
        $res['error'] = true;
        $res["message"] = "user added failed";
    }
}

//更新数据接口
if ($action == "update") {
    $id = $_POST['userId'];
    $nickName = $_POST['nickName'];
    // $realName=$_POST['realName'];
    $telNumber = $_POST['telNumber'];
    // $gender=$_POST['gender'];
    $birthday = $_POST['birthday'];
    // $area=$_POST['area'];

    //设置字符类型
    $conn->query("set names utf8");

    //执行sql语句
    $result = $conn->query("UPDATE `users` SET `nickName` = '$nickName',`telNumber` = '$telNumber',`birthday` = '$birthday' WHERE `userId` = '$id'");

    if ($result) {
        $res["message"] = "user updated successfully";
    } else {
        $res['error'] = true;
        $res["message"] = "user updated failed";
    }
}


//删除数据接口
if ($action == "delete") {
    $id = $_POST['userId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("DELETE FROM `users` WHERE `userId` = '$id'");

    if ($result) {
        $res["message"] = "user delete successfully";
    } else {
        $res['error'] = true;
        $res["message"] = "user delete failed";
    }
}

$conn->close();
header("Content-type:application/json");

//返回数据
echo json_encode($res);
die();