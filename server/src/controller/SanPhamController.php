<?php

require_once __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/SanPham/SanPham.php';
include __DIR__ . '/../model/SanPham/SanPhamRepo.php';

class SanPhamController {
    private $sanPhamRepo;

    public function __construct() {
        $this->sanPhamRepo = new SanPhamRepo();
    }

    public function getData() {
        $products = $this->sanPhamRepo->getData();
        $result = [];

        foreach ($products as $product) {
            if ($product['trang_thai'] == 0) {
                $result[] = $product;
            }
        }

        echo json_encode($result);
    }

    public function getAllProducts() {
        echo json_encode($this->sanPhamRepo->getData());
    }

    public function getProduct($productId) {
        echo json_encode($this->sanPhamRepo->getProduct($productId));
    }

    public function getProductsLength(): int {
        return $this->sanPhamRepo->getProductsLength();
    }

    public function addProduct($product) {
        if ($this->sanPhamRepo->addProduct($product)) {
            echo $product->getMaSp();
        } else {
            echo null;
        }
    }

    public function updateProduct($product) {
        if ($this->sanPhamRepo->updateProduct($product)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function deleteProduct($productId) {
        if ($this->sanPhamRepo->deleteProduct($productId)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    function saveImage($fileInputName, $name) {
        $targetDir = '../assets/images/products/';
        $targetFile = $targetDir . $name . '.png';

        if (!empty($_FILES[$fileInputName]["tmp_name"])) {
            $imageFileType = strtolower(pathinfo($_FILES[$fileInputName]["name"], PATHINFO_EXTENSION));
            if (!in_array($imageFileType, array("jpg", "jpeg", "png"))) {
                echo "Chỉ những file JPG, JPEG, PNG được chấp nhận";
            }

            if (move_uploaded_file($_FILES[$fileInputName]["tmp_name"], $targetFile)) {
                echo 'success';
            } else {
                echo "Đã có lỗi trong quá trình lưu ảnh";
            }
        } else {
            echo 'no image updated';
        }
    }
}

$sanPhamCtl = new SanPhamController();
$action = $_POST['action'];

switch ($action) {
    case 'get-data':
        $sanPhamCtl->getData();
        break;
    case 'get-all':
        $sanPhamCtl->getAllProducts();
        break;
    case 'get':
        $productId = $_POST['productId'];
        $sanPhamCtl->getProduct($productId);
        break;
    case 'add':
        $length = $sanPhamCtl->getProductsLength();
        if ($length >= 0) {
            $length += 1;
            $productId = 'SP'.sprintf("%03d", $length);
            $obj = json_decode(json_encode($_POST['product']));
            $image = "server/src/assets/images/products/$productId.png";
            $importPrice = 0;
            $chietkhau = 0;
            $price = 0;
            $quantity = 0;

            $product = new SanPham(
                $productId,
                $obj->{'brandId'},
                $obj->{'typeId'},
                $obj->{'osId'},
                $obj->{'productName'},
                $image,
                $obj->{'screen'},
                $obj->{'resolution'},
                $obj->{'battery'},
                $obj->{'keyboard'},
                $price,
                $importPrice,
                $chietkhau,
                $obj->{'weight'},
                $obj->{'material'},
                $obj->{'origin'},
                $quantity,
                0
            );

            $sanPhamCtl->addProduct($product);
        }
        break;
    case 'update':
        $obj = json_decode(json_encode($_POST['product']));

        $product = new SanPham(
            $obj->{'productId'},
            $obj->{'brandId'},
            $obj->{'typeId'},
            $obj->{'osId'},
            $obj->{'productName'},
            $obj->{'img'},
            $obj->{'screen'},
            $obj->{'resolution'},
            $obj->{'battery'},
            $obj->{'keyboard'},
            $obj->{'price'},
            $obj->{'importPrice'},
            $obj->{'chietkhau'},
            $obj->{'weight'},
            $obj->{'material'},
            $obj->{'origin'},
            $obj->{'quantity'},
            0
        );

        $sanPhamCtl->updateProduct($product);
        break;
    case 'delete':
        $productId = $_POST['productId'];
        $sanPhamCtl->deleteProduct($productId);
        break;
    case 'save-image':
        $length = $sanPhamCtl->getProductsLength();
        if ($length >= 0) {
            $length += 1;
            $name = 'SP'.sprintf("%03d", $length);

            $sanPhamCtl->saveImage("fileInputName", $name);
        }
        break;
    default:
        break;
}