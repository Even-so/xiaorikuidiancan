<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//链接数据库
// $conn = new mysqli("localhost", "phpsaomaserver", "123456", "phpsaomaserver");
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
/* if ($action == "read") {
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
} */


//根据门店Id获取预定信息
if ($action == "readMerchantId") {
    $merchantId = $_POST['merchantId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `reserve` WHERE `merchantId` = '$merchantId'");
    $reserveList = array();
    while ($row = $result->fetch_assoc()) {
        array_push($reserveList, $row);
    }
    $res['reserveList'] = $reserveList;
}


//操作用户预定
if ($action == "agree") {
    $id = $_POST['id'];
    $merchantStatus = $_POST['merchantStatus'];

    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("UPDATE `reserve` SET `merchantStatus` = '$merchantStatus' WHERE `id` = '$id'");
    if ($result) {
        $res["code"] = "200";
    } else {
        $res['error'] = true;
        $res["code"] = "406";
    }
}
//提交·预定·
if ($action == "submit") {
    $userId = $_POST['userId'];
    $time = $_POST['time'];
    $peopleNum = $_POST['peopleNum'];
    $merchantId = $_POST['merchantId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("INSERT INTO `reserve` (`userId`,`time`,`peopleNum`,`merchantStatus`,`merchantId`) VALUE ('$userId','$time','$peopleNum','1','$merchantId') ");

    if ($result) {
        $res["message"] = "user added successfully";
    } else {
        $res['error'] = true;
        $res["message"] = "user added failed";
    }
}
//增加数据接口
/* if ($action == "create") {
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
} */

//删除数据接口
/* if ($action == "delete") {
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
} */

$conn->close();
header("Content-type:application/json");

//返回数据
echo json_encode($res);
die();