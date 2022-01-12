<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: image/jpg');
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
//获取该商户的菜品详细信息
if ($action == "read") {
    $merchantId = $_POST['merchantId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `menulsit` WHERE `merchantId` = '$merchantId'");
    // var_dump($result);
    $menuLsit = array();
    while ($row = $result->fetch_assoc()) {
        array_push($menuLsit, $row);
    }
    $res['menuLsit'] = $menuLsit;
}
//获取一组菜品详细信息
if ($action == "readArr") {
    $purchasedGoods = $_POST['purchasedGoods'];
    $arr = explode(',', $purchasedGoods);
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $dishList = array();
    for ($i = 0; $i < count($arr); $i++) {
        $result = $conn->query("SELECT * FROM `menulsit` WHERE `dishId` = '$arr[$i]'");
        while ($row = $result->fetch_assoc()) {
            array_push($dishList, $row);
        }
    }
    $res['dishList'] = $dishList;
}

//根据菜品分类获取菜品详细信息
if ($action == "readClassArr") {
    $classId = $_POST['classId'];
    $arr = explode(',', $classId);
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $dishList = array();
    for ($i = 0; $i < count($arr); $i++) {
        $result = $conn->query("SELECT * FROM `menulsit` WHERE `classId` = '$classId'");
        while ($row = $result->fetch_assoc()) {
            array_push($dishList, $row);
        }
    }
    $res['dishList'] = $dishList;
}
//增加菜品
if ($action == "create") {
    $merchantId = $_POST['merchantId'];
    $classId = $_POST['classId'];
    $className = $_POST['className'];
    $dishName = $_POST['dishName'];
    $dishPrice = $_POST['dishPrice'];
    $imgname = $_POST['imgname'];

    //设置字符类型
    $conn->query("set names utf8");

    //执行sql语句
    $result = $conn->query("INSERT INTO `menulsit` (`classId`,`dishName`,`className`,`dishPrice`,`merchantId`,`menuImg`) VALUE ('$classId','$dishName','$className','$dishPrice','$merchantId','$imgname')");

    if ($result) {
        $res["code"] = "200";
    } else {
        $res['error'] = true;
        $res["code"] = "400";
    }
}

//修改菜品信息
if ($action == "update") {
    //获取传过来的data值
    $dishId = $_POST['dishId'];
    $classId = $_POST['classId'];
    $className = $_POST['className'];
    $dishName = $_POST['dishName'];
    $dishPrice = $_POST['dishPrice'];
    $imgname = $_POST['imgname'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("UPDATE `menulsit` SET  `menuImg` = '$imgname',`classId` = '$classId',`dishName` = '$dishName',`dishPrice` = '$dishPrice',`className` = '$className' WHERE `dishId` = '$dishId'");
    if ($result) {
        $res["code"] = "200";
        $res["dishId"] = $dishId;
    } else {
        $res['error'] = true;
        $res["code"] = "400";
        $res["dishId"] = $dishId;
    }
}


//删除菜品
if ($action == "delete") {
    $dishId = $_POST['dishId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("DELETE FROM `menulsit` WHERE `dishId` = '$dishId'");
    if ($result) {
        $res["code"] = "200";
    } else {
        $res['error'] = true;
        $res["code"] = "400";
    }
}
//获取菜品类名
if ($action == "getClass") {
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
    $res['classList'] = $classList;
}
$conn->close();
header("Content-type:application/json");

//返回数据
echo json_encode($res);
die();