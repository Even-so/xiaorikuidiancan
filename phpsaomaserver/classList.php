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
if ($action == "read") {
    $merchantId = $_POST['merchantId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `classlist` WHERE `merchantId` = '$merchantId'");
    // var_dump($result);
    $classList = array();
    while ($row = $result->fetch_assoc()) {
        array_push($classList, $row);
    }
    // var_dump($users);
    $res['classList'] = $classList;
}

//增加数据接口
if ($action == "create") {
    $className = $_POST['className'];
    $merchantId = $_POST['merchantId'];

    //设置字符类型
    $conn->query("set names utf8");

    //执行sql语句
    $result = $conn->query("INSERT INTO `classlist` (`className`,`merchantId`) VALUE ('$className','$merchantId')");
    if ($result) {
        $res["code"] = "200";
    } else {
        $res['error'] = true;
        $res["code"] = "400";
    }
}

//更新数据接口
if ($action == "update") {
    $classId = $_POST['classId'];
    $className = $_POST['className'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("UPDATE `classlist` SET `className` = '$className' WHERE `classId` = '$classId'");
    if ($result) {
        $res["code"] = "200";
    } else {
        $res['error'] = true;
        $res["code"] = "400";
    }
}


//删除数据接口
if ($action == "delete") {
    $classId = $_POST['classId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("DELETE FROM `classlist` WHERE `classId` = '$classId'");
    if ($result) {
        $res["code"] = "200";
    } else {
        $res['error'] = true;
        $res["code"] = "400";
    }
}

$conn->close();
header("Content-type:application/json");

//返回数据
echo json_encode($res);
die();