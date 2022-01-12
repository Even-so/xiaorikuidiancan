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

//修改图片
if ($action == "update") {
    if (isset($_FILES["file"])) {
        $ret = array();
        $uploadDir = 'uploads' . DIRECTORY_SEPARATOR;
        $dir = dirname(__FILE__) . DIRECTORY_SEPARATOR . $uploadDir;
        file_exists($dir) || (mkdir($dir, 0777, true) && chmod($dir, 0777));
        if (!is_array($_FILES["file"]["name"])) //single file
        {
            $fileName = $_FILES["file"]["name"];
            move_uploaded_file($_FILES["file"]["tmp_name"], $dir . $fileName);
            $ret['file'] = DIRECTORY_SEPARATOR . $uploadDir . $fileName;
            //存储路径
            $path = "./uploads/";
            $name = $_FILES["file"]["name"];
        }
        echo json_encode($ret);
    }
}

$conn->close();
header("Content-type:application/json");

//返回数据
echo json_encode($res);
die();