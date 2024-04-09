<?php

require_once __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/SanPham/SanPham.php';
include __DIR__ . '/../model/SanPham/SanPhamRepo.php';

class SanPhamController {
    private $sanPhamRepo;

    public function __construct() {
        $this->sanPhamRepo = new SanPhamRepo();
    }

    public function getProducts() {
        $products = $this->sanPhamRepo->getProducts();
        $result = [];

        foreach ($products as $product) {
            if ($product['trang_thai'] == 0) {
                $result[] = $product;
            }
        }

        echo json_encode($result);
    }

    public function getAllProducts() {
        echo json_encode($this->sanPhamRepo->getProducts());
    }

    public function getProduct($productId) {
        echo json_encode($this->sanPhamRepo->getProduct($productId));
    }

    public function getProductFullInfo($productId) {
        echo json_encode($this->sanPhamRepo->getProductFullInfo($productId));
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

    public function saveImage($fileInputName, $name) {
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

    public function filterProducts($brandId, $startPrice, $endPrice, $cpu, $search, $orderBy, $orderType, $start, $limit) {
        echo json_encode([
            'count' => $this->sanPhamRepo->getFilterProductsCount($brandId, $startPrice, $endPrice, $cpu, $search, $orderBy, $orderType),
            'pagination' => $this->sanPhamRepo->filterProducts($brandId, $startPrice, $endPrice, $cpu, $search, $orderBy, $orderType, $start, $limit)
        ]);
    }
}

$sanPhamCtl = new SanPhamController();
$action = $_REQUEST['action'];

switch ($action) {
    case 'get-data':
        $sanPhamCtl->getProducts();
        break;
    case 'get-all':
        $sanPhamCtl->getAllProducts();
        break;
    case 'get':
        $productId = $_POST['productId'];
        $sanPhamCtl->getProduct($productId);
        break;
    case 'get-full-info':
        $productId = $_POST['productId'];
        $sanPhamCtl->getProductFullInfo($productId);
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
        $productId = $obj->{'productId'};
        $image = "server/src/assets/images/products/$productId.png";

        $product = new SanPham(
            $obj->{'productId'},
            $obj->{'brandId'},
            $obj->{'typeId'},
            $obj->{'osId'},
            $obj->{'productName'},
            $image,
            $obj->{'screen'},
            $obj->{'resolution'},
            $obj->{'battery'},
            $obj->{'keyboard'},
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
        $productId = $_POST['productId'];
        if ($productId) {
            $name = $productId;
            $sanPhamCtl->saveImage("fileInputName", $name);
        } else {
            $length = $sanPhamCtl->getProductsLength();
            if ($length >= 0) {
                $length += 1;
                $name = 'SP'.sprintf("%03d", $length);
    
                $sanPhamCtl->saveImage("fileInputName", $name);
            }
        }
        break;
    case 'filter':
        $brandId = $_GET['brandId'];
        $price = $_GET['price'];
        $cpu = $_GET['cpu'];
        $search = $_GET['search'];
        $order = $_GET['order'];
        $page = $_GET['page'];
        $limit = $_GET['limit'];
        $start = ($page - 1) * $limit;
        $startPrice = 0;
        $endPrice = PHP_INT_MAX;
        $orderBy = 'sp.ma_sp';
        $orderType = 'ASC';
        
        switch ($price) {
            case '':
                $startPrice = 0;
                $endPrice = PHP_INT_MAX;
                break;
            case '<10':
                $startPrice = 0;
                $endPrice = 10000000 + 1;
                break;
            case '10-15':
                $startPrice = 10000000;
                $endPrice = 15000000;
                break;
            case '15-20':
                $startPrice = 15000000;
                $endPrice = 20000000;
                break;
            case '20-25':
                $startPrice = 20000000;
                $endPrice = 25000000;
                break;
            case '>25':
                $startPrice = 25000000 + 1;
                $endPrice = 100000000;
                break;
            default:
                $startPrice = 0;
                $endPrice = PHP_INT_MAX;
                break;
        }

        switch ($order) {
            case '':
                $orderBy = 'sp.ma_sp';
                $orderType = 'ASC';
                break;
            case 'high-low':
                $orderBy = 'ctsp.gia_tien';
                $orderType = 'DESC';
                break;
            case 'low-high':
                $orderBy = 'ctsp.gia_tien';
                $orderType = 'ASC';
                break;
            default:
                $orderBy = 'sp.ma_sp';
                $orderType = 'ASC';
                break;
        }

        $sanPhamCtl->filterProducts($brandId, $startPrice, $endPrice, $cpu, $search, $orderBy, $orderType, $start, $limit);
        break;
    default:
        break;
}