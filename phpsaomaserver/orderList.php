<?php
//

// 在浏览器请求中，出现跨域访问资源的问题，我们肯定会遇到。如果跨域请求被阻止，有可能导致css、js 、ajax请求、font字体等资源出现无法正常访问的问题。接下来，就介绍下解决同源策略不允许读取远程资源的问题。

// 今天就谈下远程字体跨域的问题。

// 直接了当了说，解决此类问题，最直接的方法就是，就是给被请求的服务器，添加HTTP头响应头，这里提供两种添加HTTP头的方法：

// 第一种，就是在程序中添加HTTP头：   
// 复制代码

// 如： Response.Headers.Add("Access-Control-Allow-Origin", "*");
// // JSON
// {
// 'Access-Control-Allow-Origin': '*', 
// }
// // HTML
// <meta http-equiv="Access-Control-Allow-Origin" content="*">
// // PHP
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// 复制代码

// 添加此段代码的目的很简单，也就是告诉浏览器，这个资源是运行远程所有域名访问的。当然，此处的*也可以替换为指定的域名，出于安全考虑，建议将*替换成指定的域名。
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//链接数据库
$conn = new mysqli("localhost", "phpsaomaserver", "123456", "phpsaomaserver");
// $conn = new mysqli("localhost", "root", "", "phpsaomaserver");

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

//门店获取订单数据接口
if ($action == "read") {
    $merchantId = $_POST['merchantId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `orderlist` WHERE `merchantId` = '$merchantId'");
    // var_dump($result);
    $orderList = array();
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            array_push($orderList, $row);
        }
        $res["message"] = "user added successfully";
    } else {
        $res['error'] = true;
        $res["message"] = "user added failed";
    }

    $res['orderList'] = $orderList;
}
//获取该用户所有订单数据接口
if ($action == "getusersAllorder") {
    $userId = $_POST['userId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `orderlist` WHERE  `userId` = '$userId'");
    // var_dump($result);
    $orderList = array();
    while ($row = $result->fetch_assoc()) {
        array_push($orderList, $row);
    }
    $res['orderList'] = $orderList;
}
//获取该用户在该门店获取订单数据接口
if ($action == "getusersorder") {
    $merchantId = $_POST['merchantId'];
    $userId = $_POST['userId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("SELECT * FROM `orderlist` WHERE `merchantId` = '$merchantId' and `userId` = '$userId'");
    // var_dump($result);
    $orderList = array();
    while ($row = $result->fetch_assoc()) {
        array_push($orderList, $row);
    }
    $res['orderList'] = $orderList;
}
//增加数据接口
if ($action == "create") {
    $userId = $_POST['userId'];
    $merchantId = $_POST['merchantId'];
    $tableNumber = $_POST['tableNumber'];
    $mealCode = $_POST['mealCode'];

    $paymentStatus = $_POST['paymentStatus'];
    $paymentTime = $_POST['paymentTime'];
    $packingFee = $_POST['packingFee'];
    $remarks = $_POST['remarks'];
    $purchasedGoods = $_POST['purchasedGoods'];
    $goodsNumber = $_POST['goodsNumber'];
    $payPrice = $_POST['payPrice'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("INSERT INTO `orderlist` (`userId`,`merchantId`,`tableNumber`,`mealCode`,`paymentStatus`,`paymentTime`,`packingFee`,`remarks`,`purchasedGoods`,`goodsNumber`,`payPrice`) VALUE ('$userId','$merchantId','$tableNumber','$mealCode','$paymentStatus','$paymentTime','$packingFee','$remarks','$purchasedGoods','$goodsNumber','$payPrice')");

    if ($result) {
        $res["code"] = "200";
        var_dump($userId);
        var_dump($tableNumber);
        var_dump($mealCode);
        var_dump($tableNumber);
        var_dump($purchasedGoods);
    } else {
        $res['error'] = true;
        $res["code"] = "404";
        var_dump($userId);
        var_dump($tableNumber);
        var_dump($mealCode);
        var_dump($tableNumber);
        var_dump($purchasedGoods);
    }
}
/*
//更新数据接口
if ($action=="update") {
    $id=$_POST['userId'];
    $nickName=$_POST['nickName'];
    // $realName=$_POST['realName'];
    $telNumber=$_POST['telNumber'];
    // $gender=$_POST['gender'];
    $birthday=$_POST['birthday'];
    // $area=$_POST['area'];

    //设置字符类型
    $conn->query("set names utf8");

    //执行sql语句
    $result=$conn->query("UPDATE `users` SET `nickName` = '$nickName',`telNumber` = '$telNumber',`birthday` = '$birthday' WHERE `userId` = '$id'");

    if ($result) {
        $res["message"]="user updated successfully";
    }
    else{
        $res['error']=true;
        $res["message"]="user updated failed";
    }
} */


//删除数据接口
if ($action == "delete") {
    $orderId = $_POST['orderId'];
    //设置字符类型
    $conn->query("set names utf8");
    //执行sql语句
    $result = $conn->query("DELETE FROM `orderlist` WHERE `orderId` = '$orderId'");
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