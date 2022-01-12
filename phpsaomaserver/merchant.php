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

//获取指定商户数据接口
if ($action == "getInfo") {
    $merchantId = $_POST['merchantId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `merchant` WHERE `merchantId` = '$merchantId'");
    // var_dump($result);
    $merchant = array();
    while ($row = $result->fetch_assoc()) {
        array_push($merchant, $row);
    }
    // var_dump($users);
    $res['merchant'] = $merchant;
}
//获取所有门店信息
if ($action == "read") {
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `merchant`");
    // var_dump($result);
    $merchant = array();
    while ($row = $result->fetch_assoc()) {
        array_push($merchant, $row);
    }
    $res['merchant'] = $merchant;
}
//登陆
if ($action == "login") {
    $telNumber = $_POST['telNumber'];
    $merchantPwd = $_POST['merchantPwd'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $resultTel = $conn->query("SELECT * FROM `merchant` WHERE `telNumber` = '$telNumber'");
    if ($resultTel->num_rows > 0) {
        $result = $conn->query("SELECT * FROM `merchant` WHERE `merchantPwd` = '$merchantPwd' AND `telNumber` = '$telNumber'");
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $res["code"] = "200"; //成功
            $res['token'] = $row["merchantId"];
        } else {
            $res['error'] = true;
            $res["code"] = "401"; //密码错误
        }
    } else {
        $res["code"] = "406"; //该号码还没注册


    }
}
//注册商户
if ($action == "register") {
    $telNumber = $_POST['telNumber'];
    $merchantPwd = $_POST['merchantPwd'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $resultTel = $conn->query("SELECT * FROM `merchant` WHERE `telNumber` = '$telNumber'");
    //判断
    if ($resultTel->num_rows > 0) {
        $res["code"] = "405"; //电话号码重复
    } else {
        $result = $conn->query("INSERT INTO `merchant` (`telNumber`,`merchantPwd`) VALUE ('$telNumber','$merchantPwd')");
        if ($result) {
            $res["code"] = "200"; //成功
        } else {
            $res['error'] = true;
            $res["code"] = "400"; //失败
        }
    }
}
//修改商户密码
if ($action == "changePwd") {
    $telNumber = $_POST['telNumber'];
    $merchantPwd = $_POST['merchantPwd'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $resultTel = $conn->query("SELECT * FROM `merchant` WHERE `telNumber` = '$telNumber'");
    //判断有该号码则继续修改密码
    if ($resultTel->num_rows > 0) {
        $result = $conn->query("UPDATE `merchant` SET `merchantPwd` = '$merchantPwd' WHERE `telNumber` = '$telNumber'");
        $res["code"] = "200"; //该号码还没注册

    } else {
        $res["code"] = "406"; //该号码还没注册
    }
}


//修改基本商户信息
if ($action == "changebase") {
    $id = $_POST['merchantId'];
    $merchantName = $_POST['merchantName'];
    $adddess = $_POST['adddess'];
    $Telephone = $_POST['Telephone'];
    $businessStatus = $_POST['businessStatus'];
    $packingFee = $_POST['packingFee'];
    $dateB = $_POST['dateB'];
    $dateE = $_POST['dateE'];
    $Lat = $_POST['Lat'];
    $Lng = $_POST['Lng'];

    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("UPDATE `merchant` SET `merchantName` = '$merchantName',`adddess` = '$adddess',`Telephone` = '$Telephone',`businessStatus` = '$businessStatus',`packingFee` = '$packingFee',`dateB` = '$dateB',`dateE` = '$dateE',`Lat` = '$Lat',`Lng` = '$Lng' WHERE `merchantId` = '$id'");

    if ($result) {
        $res["code"] = "200"; //成功
    } else {
        $res['error'] = true;
        $res["code"] = "400"; //失败
    }
}
//修改商户密码
if ($action == "changepwd") {
    $id = $_POST['merchantId'];
    $merchantPwd = $_POST['merchantPwd'];
    //设置字符类型
    $conn->query("set names utf8");

    //执行sql语句
    $result = $conn->query("UPDATE `merchant` SET `merchantPwd` = '$merchantPwd' WHERE `merchantId` = '$id'");

    if ($result) {
        $res["code"] = "200"; //成功
    } else {
        $res['error'] = true;
        $res["code"] = "400"; //失败
    }
}

//修改商户头像
if ($action == "changeindexImage") {
    $merchantId = $_POST['merchantId'];
    $indexImage = $_POST['imgname'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("UPDATE `merchant` SET `indexImage` = '$indexImage' WHERE `merchantId` = '$merchantId'");
    if ($result) {
        $res["code"] = "200"; //成功
    } else {
        $res['error'] = true;
        $res["code"] = "400"; //失败
    }
}
//修改轮播图1
if ($action == "changeswiperImage1") {
    $merchantId = $_POST['merchantId'];
    $swiperImage = $_POST['imgname'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("UPDATE `merchant` SET `swiperImage1` = '$swiperImage' WHERE `merchantId` = '$merchantId'");
    if ($result) {
        $res["code"] = "200"; //成功
    } else {
        $res['error'] = true;
        $res["code"] = "400"; //失败
    }
}
//修改轮播图2
if ($action == "changeswiperImage2") {
    $merchantId = $_POST['merchantId'];
    $swiperImage = $_POST['imgname'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("UPDATE `merchant` SET `swiperImage2` = '$swiperImage' WHERE `merchantId` = '$merchantId'");
    if ($result) {
        $res["code"] = "200"; //成功
    } else {
        $res['error'] = true;
        $res["code"] = "400"; //失败
    }
}
//修改轮播图3
if ($action == "changeswiperImage3") {
    $merchantId = $_POST['merchantId'];
    $swiperImage = $_POST['imgname'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("UPDATE `merchant` SET `swiperImage3` = '$swiperImage' WHERE `merchantId` = '$merchantId'");
    if ($result) {
        $res["code"] = "200"; //成功
    } else {
        $res['error'] = true;
        $res["code"] = "400"; //失败
    }
}

$conn->close();
header("Content-type:application/json");

//返回数据
echo json_encode($res);
die();