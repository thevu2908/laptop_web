-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2024 at 06:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web2`
--

-- --------------------------------------------------------

--
-- Table structure for table `chipxuly`
--

CREATE TABLE `chipxuly` (
  `ma_chip_xu_ly` varchar(20) NOT NULL,
  `ten_chip` varchar(100) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietcongketnoi`
--

CREATE TABLE `chitietcongketnoi` (
  `ma_cong` varchar(20) NOT NULL,
  `ma_ctsp` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `ma_hd` varchar(20) NOT NULL,
  `ma_ctsp` varchar(20) NOT NULL,
  `gia_sp` double NOT NULL,
  `so_luong` int(11) NOT NULL,
  `thanh_tien` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietkhuyenmai`
--

CREATE TABLE `chitietkhuyenmai` (
  `ma_km` varchar(20) NOT NULL,
  `ma_hd` varchar(20) NOT NULL,
  `gia_tien` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietphieubaohanh`
--

CREATE TABLE `chitietphieubaohanh` (
  `ma_pbh` varchar(20) NOT NULL,
  `ma_ctsp` varchar(20) NOT NULL,
  `ly_do` varchar(150) NOT NULL,
  `noi_dung_bao_hanh` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietphieudoitra`
--

CREATE TABLE `chitietphieudoitra` (
  `ma_pdt` varchar(20) NOT NULL,
  `ma_ctsp` varchar(20) NOT NULL,
  `ly_do` varchar(150) NOT NULL,
  `gia_sp` double NOT NULL,
  `so_luong` int(11) NOT NULL,
  `thanh_tien` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietphieunhap`
--

CREATE TABLE `chitietphieunhap` (
  `ma_pn` varchar(20) NOT NULL,
  `ma_ctsp` varchar(20) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `gia_tien` double NOT NULL,
  `thanh_tien` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietquyen`
--

CREATE TABLE `chitietquyen` (
  `ma_quyen` varchar(20) NOT NULL,
  `ma_chuc_nang` varchar(20) NOT NULL,
  `hanh_dong` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietsanpham`
--

CREATE TABLE `chitietsanpham` (
  `ma_ctsp` varchar(20) NOT NULL,
  `ma_sp` varchar(20) NOT NULL,
  `ma_chip_xu_ly` varchar(20) NOT NULL,
  `ma_mau` varchar(20) NOT NULL,
  `ram` varchar(50) NOT NULL,
  `rom` varchar(50) NOT NULL,
  `hinh_anh` varchar(200) NOT NULL,
  `card_do_hoa` varchar(50) NOT NULL,
  `gia_tien` float NOT NULL,
  `so_luong` int(11) NOT NULL,
  `tinh_trang` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chucnangquyen`
--

CREATE TABLE `chucnangquyen` (
  `ma_chuc_nang` varchar(20) NOT NULL,
  `ten_chuc_nang` varchar(100) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `congketnoi`
--

CREATE TABLE `congketnoi` (
  `ma_cong` varchar(20) NOT NULL,
  `ten_cong` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `danhgia`
--

CREATE TABLE `danhgia` (
  `ma_ctsp` varchar(20) NOT NULL,
  `ma_kh` varchar(20) NOT NULL,
  `rating` float NOT NULL,
  `thoi_gian_danh_gia` date NOT NULL,
  `noi_dung` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `ma_ctsp` varchar(20) NOT NULL,
  `ma_kh` varchar(20) NOT NULL,
  `gia_sp` float NOT NULL,
  `so_luong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hedieuhanh`
--

CREATE TABLE `hedieuhanh` (
  `ma_hdh` varchar(20) NOT NULL,
  `ten_hdh` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `ma_hd` varchar(20) NOT NULL,
  `ma_kh` varchar(20) NOT NULL,
  `ma_nv` varchar(20) NOT NULL,
  `ngay_tao` date NOT NULL,
  `tong_tien` double NOT NULL,
  `khuyen_mai` double NOT NULL,
  `thanh_tien` double NOT NULL,
  `hinh_thuc` varchar(50) NOT NULL,
  `tinh_trang` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `ma_kh` varchar(20) NOT NULL,
  `ten_kh` varchar(100) NOT NULL,
  `so_dien_thoai` varchar(10) NOT NULL,
  `tuoi` int(11) NOT NULL,
  `dia_chi` varchar(150) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `ma_km` varchar(20) NOT NULL,
  `muc_khuyen_mai` double NOT NULL,
  `dieu_kien` varchar(50) NOT NULL,
  `thoi_gian_bat_dau` date NOT NULL,
  `thoi_gian_ket_thuc` date NOT NULL,
  `tinh_trang` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mausac`
--

CREATE TABLE `mausac` (
  `ma_mau` varchar(20) NOT NULL,
  `ten_mau` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `ma_ncc` varchar(20) NOT NULL,
  `ten_ncc` varchar(100) NOT NULL,
  `dia_chi` varchar(150) NOT NULL,
  `so_dien_thoai` varchar(10) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `ma_nv` varchar(20) NOT NULL,
  `ten_nv` varchar(100) NOT NULL,
  `tuoi` int(11) NOT NULL,
  `so_dien_thoai` varchar(10) NOT NULL,
  `hinh_anh` varchar(200) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`ma_nv`, `ten_nv`, `tuoi`, `so_dien_thoai`, `hinh_anh`, `trang_thai`) VALUES
('NV01', 'Nguyễn Thế Vũ', 20, '0976124506', '', 0),
('NV02', 'Mai Văn Tài', 20, '0123456789', '', 0),
('NV03', 'Lê Ngọc Giàu', 20, '0123456788', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `nhomquyen`
--

CREATE TABLE `nhomquyen` (
  `ma_quyen` varchar(20) NOT NULL,
  `ten_quyen` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhomquyen`
--

INSERT INTO `nhomquyen` (`ma_quyen`, `ten_quyen`, `trang_thai`) VALUES
('NQ01', 'Admin', 0),
('NQ02', 'Quản lý', 0),
('NQ03', 'Nhân viên bán hàng', 0);

-- --------------------------------------------------------

--
-- Table structure for table `phieubaohanh`
--

CREATE TABLE `phieubaohanh` (
  `ma_pbh` varchar(20) NOT NULL,
  `ma_nv` varchar(20) NOT NULL,
  `ma_kh` varchar(20) NOT NULL,
  `ma_hd` varchar(20) NOT NULL,
  `ngay_bao_hanh` int(11) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phieudoitra`
--

CREATE TABLE `phieudoitra` (
  `ma_pdt` varchar(20) NOT NULL,
  `ma_nv` varchar(20) NOT NULL,
  `ma_hd` varchar(20) NOT NULL,
  `ngay_tra` date NOT NULL,
  `tong_so_luong` int(11) NOT NULL,
  `tong_tien_tra` double NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phieunhap`
--

CREATE TABLE `phieunhap` (
  `ma_pn` varchar(20) NOT NULL,
  `ma_ncc` varchar(20) NOT NULL,
  `ma_nv` varchar(20) NOT NULL,
  `ngay_nhap` date NOT NULL,
  `tong_tien` double NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `ma_sp` varchar(20) NOT NULL,
  `ma_thuong_hieu` varchar(20) NOT NULL,
  `ma_the_loai` varchar(20) NOT NULL,
  `ma_hdh` varchar(20) NOT NULL,
  `ten_sp` varchar(100) NOT NULL,
  `kich_co_man_hinh` varchar(50) NOT NULL,
  `do_phan_giai` varchar(50) NOT NULL,
  `pin` varchar(50) NOT NULL,
  `ban_phim` varchar(50) NOT NULL,
  `gia_ban` double NOT NULL,
  `gia_nhap` double NOT NULL,
  `chiet_khau` int(11) NOT NULL,
  `trong_luong` float NOT NULL,
  `chat_lieu` int(11) NOT NULL,
  `xuat_xu` varchar(50) NOT NULL,
  `so_luong_ton` int(11) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `ma_tk` varchar(20) NOT NULL,
  `ma_quyen` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`ma_tk`, `ma_quyen`, `username`, `password`, `trang_thai`) VALUES
('admin', 'NQ01', 'admin', 'admin', 0),
('NV01', 'NQ02', 'NV01', '123', 0),
('NV02', 'NQ03', 'NV02', '123', 1),
('NV03', 'NQ03', 'NV03', '123', 1);

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

CREATE TABLE `theloai` (
  `ma_the_loai` varchar(20) NOT NULL,
  `ten_loai` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thongbao`
--

CREATE TABLE `thongbao` (
  `ma_sp` varchar(20) NOT NULL,
  `ma_kh` varchar(20) NOT NULL,
  `ma_nv` varchar(20) NOT NULL,
  `ma_tk` varchar(20) NOT NULL,
  `ma_hd` varchar(20) NOT NULL,
  `ma_pn` varchar(20) NOT NULL,
  `ma_pdt` varchar(20) NOT NULL,
  `ma_pbh` varchar(20) NOT NULL,
  `ma_ncc` varchar(20) NOT NULL,
  `ma_km` varchar(20) NOT NULL,
  `ma_quyen` varchar(20) NOT NULL,
  `ma_chuc_nang` varchar(20) NOT NULL,
  `noi_dung` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thuonghieu`
--

CREATE TABLE `thuonghieu` (
  `ma_thuong_hieu` varchar(20) NOT NULL,
  `ten_thuong_hieu` varchar(50) NOT NULL,
  `trang_thai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chipxuly`
--
ALTER TABLE `chipxuly`
  ADD PRIMARY KEY (`ma_chip_xu_ly`);

--
-- Indexes for table `chitietcongketnoi`
--
ALTER TABLE `chitietcongketnoi`
  ADD PRIMARY KEY (`ma_cong`,`ma_ctsp`),
  ADD KEY `ctckn_fk_ctsp` (`ma_ctsp`);

--
-- Indexes for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD PRIMARY KEY (`ma_hd`,`ma_ctsp`),
  ADD KEY `cthd_fk_ctsp` (`ma_ctsp`);

--
-- Indexes for table `chitietkhuyenmai`
--
ALTER TABLE `chitietkhuyenmai`
  ADD PRIMARY KEY (`ma_km`,`ma_hd`),
  ADD KEY `ma_km` (`ma_km`),
  ADD KEY `ma_km_2` (`ma_km`),
  ADD KEY `ctkm_fk_hd` (`ma_hd`);

--
-- Indexes for table `chitietphieubaohanh`
--
ALTER TABLE `chitietphieubaohanh`
  ADD PRIMARY KEY (`ma_pbh`,`ma_ctsp`),
  ADD KEY `ctpbh_fk_ctsp` (`ma_ctsp`);

--
-- Indexes for table `chitietphieudoitra`
--
ALTER TABLE `chitietphieudoitra`
  ADD PRIMARY KEY (`ma_pdt`,`ma_ctsp`),
  ADD KEY `ctpdt_fk_ctsp` (`ma_ctsp`);

--
-- Indexes for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD PRIMARY KEY (`ma_pn`,`ma_ctsp`),
  ADD KEY `ctpn_fk_ctsp` (`ma_ctsp`);

--
-- Indexes for table `chitietquyen`
--
ALTER TABLE `chitietquyen`
  ADD PRIMARY KEY (`ma_quyen`,`ma_chuc_nang`,`hanh_dong`),
  ADD KEY `ctq_fk_chucnang` (`ma_chuc_nang`);

--
-- Indexes for table `chitietsanpham`
--
ALTER TABLE `chitietsanpham`
  ADD PRIMARY KEY (`ma_ctsp`),
  ADD KEY `ctsp_fk_sp` (`ma_sp`),
  ADD KEY `ctsp_fk_chip` (`ma_chip_xu_ly`),
  ADD KEY `ctsp_fk_mausac` (`ma_mau`) USING BTREE;

--
-- Indexes for table `chucnangquyen`
--
ALTER TABLE `chucnangquyen`
  ADD PRIMARY KEY (`ma_chuc_nang`);

--
-- Indexes for table `congketnoi`
--
ALTER TABLE `congketnoi`
  ADD PRIMARY KEY (`ma_cong`);

--
-- Indexes for table `danhgia`
--
ALTER TABLE `danhgia`
  ADD PRIMARY KEY (`ma_ctsp`,`ma_kh`),
  ADD KEY `danhgia_fk_kh` (`ma_kh`);

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`ma_ctsp`,`ma_kh`),
  ADD KEY `giohang_fk_kh` (`ma_kh`);

--
-- Indexes for table `hedieuhanh`
--
ALTER TABLE `hedieuhanh`
  ADD PRIMARY KEY (`ma_hdh`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`ma_hd`),
  ADD KEY `hd_fk_kh` (`ma_kh`),
  ADD KEY `hd_fk_nv` (`ma_nv`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`ma_kh`);

--
-- Indexes for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`ma_km`);

--
-- Indexes for table `mausac`
--
ALTER TABLE `mausac`
  ADD PRIMARY KEY (`ma_mau`);

--
-- Indexes for table `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`ma_ncc`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`ma_nv`);

--
-- Indexes for table `nhomquyen`
--
ALTER TABLE `nhomquyen`
  ADD PRIMARY KEY (`ma_quyen`);

--
-- Indexes for table `phieubaohanh`
--
ALTER TABLE `phieubaohanh`
  ADD PRIMARY KEY (`ma_pbh`),
  ADD KEY `pbh_fk_nv` (`ma_nv`),
  ADD KEY `pbh_fk_kh` (`ma_kh`);

--
-- Indexes for table `phieudoitra`
--
ALTER TABLE `phieudoitra`
  ADD PRIMARY KEY (`ma_pdt`),
  ADD KEY `pdt_fk_nv` (`ma_nv`),
  ADD KEY `pdt_fk_hd` (`ma_hd`);

--
-- Indexes for table `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`ma_pn`),
  ADD KEY `pn_fk_ncc` (`ma_ncc`),
  ADD KEY `pn_fk_nv` (`ma_nv`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`ma_sp`),
  ADD KEY `sp_fk_thuonghieu` (`ma_thuong_hieu`),
  ADD KEY `sp_fk_theloai` (`ma_the_loai`),
  ADD KEY `sp_fk_hdh` (`ma_hdh`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`ma_tk`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `tk_fk_quyen` (`ma_quyen`);

--
-- Indexes for table `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`ma_the_loai`);

--
-- Indexes for table `thongbao`
--
ALTER TABLE `thongbao`
  ADD PRIMARY KEY (`ma_sp`,`ma_kh`,`ma_nv`,`ma_tk`,`ma_hd`,`ma_pn`,`ma_pdt`,`ma_pbh`,`ma_ncc`,`ma_km`,`ma_quyen`,`ma_chuc_nang`),
  ADD KEY `tb_fk_kh` (`ma_kh`),
  ADD KEY `tb_fk_nv` (`ma_nv`),
  ADD KEY `tb_fk_tk` (`ma_tk`),
  ADD KEY `tb_fk_hd` (`ma_hd`),
  ADD KEY `tb_fk_pn` (`ma_pn`),
  ADD KEY `tb_fk_pdt` (`ma_pdt`),
  ADD KEY `tb_fk_pbh` (`ma_pbh`),
  ADD KEY `tb_fk_ncc` (`ma_ncc`),
  ADD KEY `tb_fk_km` (`ma_km`),
  ADD KEY `tb_fk_quyen` (`ma_quyen`),
  ADD KEY `tb_fk_chucnang` (`ma_chuc_nang`);

--
-- Indexes for table `thuonghieu`
--
ALTER TABLE `thuonghieu`
  ADD PRIMARY KEY (`ma_thuong_hieu`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chitietcongketnoi`
--
ALTER TABLE `chitietcongketnoi`
  ADD CONSTRAINT `ctckn_fk_ckn` FOREIGN KEY (`ma_cong`) REFERENCES `congketnoi` (`ma_cong`),
  ADD CONSTRAINT `ctckn_fk_ctsp` FOREIGN KEY (`ma_ctsp`) REFERENCES `chitietsanpham` (`ma_ctsp`);

--
-- Constraints for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `cthd_fk_ctsp` FOREIGN KEY (`ma_ctsp`) REFERENCES `chitietsanpham` (`ma_ctsp`),
  ADD CONSTRAINT `cthd_fk_hd` FOREIGN KEY (`ma_hd`) REFERENCES `hoadon` (`ma_hd`);

--
-- Constraints for table `chitietkhuyenmai`
--
ALTER TABLE `chitietkhuyenmai`
  ADD CONSTRAINT `ctkm_fk_hd` FOREIGN KEY (`ma_hd`) REFERENCES `hoadon` (`ma_hd`),
  ADD CONSTRAINT `ctkm_fk_km` FOREIGN KEY (`ma_km`) REFERENCES `khuyenmai` (`ma_km`);

--
-- Constraints for table `chitietphieubaohanh`
--
ALTER TABLE `chitietphieubaohanh`
  ADD CONSTRAINT `ctpbh_fk_ctsp` FOREIGN KEY (`ma_ctsp`) REFERENCES `chitietsanpham` (`ma_ctsp`),
  ADD CONSTRAINT `ctpbh_fk_pbh` FOREIGN KEY (`ma_pbh`) REFERENCES `phieubaohanh` (`ma_pbh`);

--
-- Constraints for table `chitietphieudoitra`
--
ALTER TABLE `chitietphieudoitra`
  ADD CONSTRAINT `ctpdt_fk_ctsp` FOREIGN KEY (`ma_ctsp`) REFERENCES `chitietsanpham` (`ma_ctsp`),
  ADD CONSTRAINT `ctpdt_fk_pdt` FOREIGN KEY (`ma_pdt`) REFERENCES `phieudoitra` (`ma_pdt`);

--
-- Constraints for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD CONSTRAINT `ctpn_fk_ctsp` FOREIGN KEY (`ma_ctsp`) REFERENCES `chitietsanpham` (`ma_ctsp`),
  ADD CONSTRAINT `ctpn_fk_pn` FOREIGN KEY (`ma_pn`) REFERENCES `phieunhap` (`ma_pn`);

--
-- Constraints for table `chitietquyen`
--
ALTER TABLE `chitietquyen`
  ADD CONSTRAINT `ctq_fk_chucnang` FOREIGN KEY (`ma_chuc_nang`) REFERENCES `chucnangquyen` (`ma_chuc_nang`),
  ADD CONSTRAINT `ctq_fk_quyen` FOREIGN KEY (`ma_quyen`) REFERENCES `nhomquyen` (`ma_quyen`);

--
-- Constraints for table `chitietsanpham`
--
ALTER TABLE `chitietsanpham`
  ADD CONSTRAINT `ctsp_fk_chip` FOREIGN KEY (`ma_chip_xu_ly`) REFERENCES `chipxuly` (`ma_chip_xu_ly`),
  ADD CONSTRAINT `ctsp_fk_mau` FOREIGN KEY (`ma_mau`) REFERENCES `mausac` (`ma_mau`),
  ADD CONSTRAINT `ctsp_fk_sp` FOREIGN KEY (`ma_sp`) REFERENCES `sanpham` (`ma_sp`);

--
-- Constraints for table `danhgia`
--
ALTER TABLE `danhgia`
  ADD CONSTRAINT `danhgia_fk_ctsp` FOREIGN KEY (`ma_ctsp`) REFERENCES `chitietsanpham` (`ma_ctsp`),
  ADD CONSTRAINT `danhgia_fk_kh` FOREIGN KEY (`ma_kh`) REFERENCES `khachhang` (`ma_kh`);

--
-- Constraints for table `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `giohang_fk_ctsp` FOREIGN KEY (`ma_ctsp`) REFERENCES `chitietsanpham` (`ma_ctsp`),
  ADD CONSTRAINT `giohang_fk_kh` FOREIGN KEY (`ma_kh`) REFERENCES `khachhang` (`ma_kh`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hd_fk_kh` FOREIGN KEY (`ma_kh`) REFERENCES `khachhang` (`ma_kh`),
  ADD CONSTRAINT `hd_fk_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhanvien` (`ma_nv`);

--
-- Constraints for table `phieubaohanh`
--
ALTER TABLE `phieubaohanh`
  ADD CONSTRAINT `pbh_fk_kh` FOREIGN KEY (`ma_kh`) REFERENCES `khachhang` (`ma_kh`),
  ADD CONSTRAINT `pbh_fk_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhanvien` (`ma_nv`);

--
-- Constraints for table `phieudoitra`
--
ALTER TABLE `phieudoitra`
  ADD CONSTRAINT `pdt_fk_hd` FOREIGN KEY (`ma_hd`) REFERENCES `hoadon` (`ma_hd`),
  ADD CONSTRAINT `pdt_fk_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhanvien` (`ma_nv`);

--
-- Constraints for table `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `pn_fk_ncc` FOREIGN KEY (`ma_ncc`) REFERENCES `nhacungcap` (`ma_ncc`),
  ADD CONSTRAINT `pn_fk_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhanvien` (`ma_nv`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sp_fk_hdh` FOREIGN KEY (`ma_hdh`) REFERENCES `hedieuhanh` (`ma_hdh`),
  ADD CONSTRAINT `sp_fk_theloai` FOREIGN KEY (`ma_the_loai`) REFERENCES `theloai` (`ma_the_loai`),
  ADD CONSTRAINT `sp_fk_thuonghieu` FOREIGN KEY (`ma_thuong_hieu`) REFERENCES `thuonghieu` (`ma_thuong_hieu`);

--
-- Constraints for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `tk_fk_quyen` FOREIGN KEY (`ma_quyen`) REFERENCES `nhomquyen` (`ma_quyen`);

--
-- Constraints for table `thongbao`
--
ALTER TABLE `thongbao`
  ADD CONSTRAINT `tb_fk_chucnang` FOREIGN KEY (`ma_chuc_nang`) REFERENCES `chucnangquyen` (`ma_chuc_nang`),
  ADD CONSTRAINT `tb_fk_hd` FOREIGN KEY (`ma_hd`) REFERENCES `hoadon` (`ma_hd`),
  ADD CONSTRAINT `tb_fk_kh` FOREIGN KEY (`ma_kh`) REFERENCES `khachhang` (`ma_kh`),
  ADD CONSTRAINT `tb_fk_km` FOREIGN KEY (`ma_km`) REFERENCES `khuyenmai` (`ma_km`),
  ADD CONSTRAINT `tb_fk_ncc` FOREIGN KEY (`ma_ncc`) REFERENCES `nhacungcap` (`ma_ncc`),
  ADD CONSTRAINT `tb_fk_nv` FOREIGN KEY (`ma_nv`) REFERENCES `nhanvien` (`ma_nv`),
  ADD CONSTRAINT `tb_fk_pbh` FOREIGN KEY (`ma_pbh`) REFERENCES `phieubaohanh` (`ma_pbh`),
  ADD CONSTRAINT `tb_fk_pdt` FOREIGN KEY (`ma_pdt`) REFERENCES `phieudoitra` (`ma_pdt`),
  ADD CONSTRAINT `tb_fk_pn` FOREIGN KEY (`ma_pn`) REFERENCES `phieunhap` (`ma_pn`),
  ADD CONSTRAINT `tb_fk_quyen` FOREIGN KEY (`ma_quyen`) REFERENCES `nhomquyen` (`ma_quyen`),
  ADD CONSTRAINT `tb_fk_sp` FOREIGN KEY (`ma_sp`) REFERENCES `sanpham` (`ma_sp`),
  ADD CONSTRAINT `tb_fk_tk` FOREIGN KEY (`ma_tk`) REFERENCES `taikhoan` (`ma_tk`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
