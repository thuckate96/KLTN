-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 24, 2018 at 12:57 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hocnhom_tt`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `abcd`
-- (See below for the actual view)
--
CREATE TABLE `abcd` (
`id` int(11)
,`id_user` int(11)
,`id_group` int(11)
,`status` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `id` int(11) NOT NULL,
  `exercise_name` text CHARACTER SET utf8 NOT NULL,
  `id_toppic` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`id`, `exercise_name`, `id_toppic`, `create_time`, `update_at`) VALUES
(1, 'Bai tap 1', 1, '2018-03-09 09:11:02', '2018-03-09 09:17:00'),
(2, 'Bai tap 2', 6, '2018-03-09 09:20:38', '2018-03-09 09:20:38'),
(3, 'Bai tap 3', 5, '2018-03-09 09:24:11', '2018-03-09 09:24:11'),
(4, 'Bai tap 5', 5, '2018-03-09 09:25:19', '2018-03-09 09:25:19'),
(5, 'Bai tap 7', 8, '2018-03-09 09:46:37', '2018-03-09 09:46:37'),
(6, 'tap the thao', 9, '2018-03-09 14:58:57', '2018-03-09 14:58:57'),
(7, 'baitapn', 1, '2018-03-10 09:45:28', '2018-03-10 09:45:28'),
(8, 'baitap33', 4, '2018-03-10 10:20:28', '2018-03-10 10:20:28'),
(9, 'baitap11', 2, '2018-03-10 10:21:10', '2018-03-10 10:21:10'),
(10, 'baitap_n_1', 1, '2018-03-12 03:27:37', '2018-03-12 03:27:37'),
(11, 'bai tap cua nhom a', 7, '2018-03-13 09:32:06', '2018-03-13 09:32:06'),
(12, 'baitap1', 11, '2018-03-14 03:58:14', '2018-03-14 03:58:14'),
(13, 'baitap Luong giac', 11, '2018-03-14 08:30:35', '2018-03-14 08:30:35'),
(14, 'Học môn toán ', 9, '2018-03-20 14:28:53', '2018-03-20 14:28:53'),
(15, 'Sức khỏe là gì ', 12, '2018-03-21 14:47:32', '2018-03-21 14:47:32'),
(16, '1+1 = ?', 8, '2018-03-24 00:31:41', '2018-03-24 00:31:41');

-- --------------------------------------------------------

--
-- Stand-in structure for view `friend_box_chat`
-- (See below for the actual view)
--
CREATE TABLE `friend_box_chat` (
`id` int(11)
,`fullname` varchar(100)
,`status` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `friend_chat`
-- (See below for the actual view)
--
CREATE TABLE `friend_chat` (
`id` int(11)
,`fullname` varchar(100)
,`status` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `friend_list`
-- (See below for the actual view)
--
CREATE TABLE `friend_list` (
`id` int(11)
,`id_friend` int(11)
,`status` bigint(20)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `friend_ship`
-- (See below for the actual view)
--
CREATE TABLE `friend_ship` (
`id_friend_ship` int(11)
,`friend_id` int(11)
,`status` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `friend_state_user`
-- (See below for the actual view)
--
CREATE TABLE `friend_state_user` (
`id` int(11)
,`id_user_a` int(11)
,`id_user_b` int(11)
,`status` bigint(20)
);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `id_user` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `id_user`, `create_time`, `update_at`, `is_public`) VALUES
(2, 'NhomA', 2, '2018-03-05 07:45:38', '2018-03-13 08:57:07', 1),
(3, 'Nhom3', 2, '2018-03-05 09:18:18', '2018-03-05 09:18:18', 0),
(4, 'Nhom4', 3, '2018-03-05 09:32:46', '2018-03-05 09:32:46', 1),
(5, 'Nhom5', 3, '2018-03-06 03:32:43', '2018-03-06 03:32:43', 0),
(6, 'Nhom6', 2, '2018-03-06 07:37:22', '2018-03-06 07:37:22', 1),
(7, 'Nhom Toan Hoc', 3, '2018-03-13 09:30:50', '2018-03-13 09:30:50', 1),
(8, 'Nhom B', 2, '2018-03-13 14:44:07', '2018-03-13 14:44:07', 0),
(9, 'Tư vấn sức khỏe', 5, '2018-03-21 14:32:17', '2018-03-21 14:32:17', 1),
(10, 'Tư vấn tình yêu ', 5, '2018-03-21 14:33:02', '2018-03-21 14:33:02', 1),
(11, 'Tư vấn tài chính ', 5, '2018-03-21 14:35:47', '2018-03-21 14:35:47', 1),
(12, 'Nhóm từ thiện ', 5, '2018-03-21 14:36:54', '2018-03-21 14:36:54', 0),
(13, 'Tư vấn trực tuyến ', 5, '2018-03-21 14:39:46', '2018-03-21 14:39:46', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('-6GXnoXdxxnUW0SfdIHO0b6iW3azEWtA', 1521546484, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Vi Van Thuc\",\"email\":\"thuckate@gmail.com\"}'),
('1A3qWT8yju5r2StmKEelx1F-Lym6waaO', 1521553558, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('2UYre4PBJus1Nys9pY_sDzhB0ks2Ovwt', 1521553562, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('4TMGw7h6OhVsWnREfUU4SM-2K-5NgcPI', 1521553539, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('5Sauiv0vrm9bWh-eGx-g29tb3MhYBKEq', 1521553822, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('6DfyCstF7lnEtIPvwNfUEPVRVd-ComaV', 1521553818, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('7VTuvykwK9CY243ZlOVL23XC2bBaA5n1', 1521552787, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('94KNF80BtSSzTxCk_nTXY9HpIVXQecpV', 1521553729, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('A8mV2zQiqkwF5JsBvsYwJvdzE3TbQ_ji', 1521553823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('AW5oQlo6E_JimWGYolIQJqs2P4u3p8Uh', 1521553711, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('DoIBVWNNsJRGvoO_mYrCc0-414Vk5qvy', 1521553571, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('DxHImU2g_WZdwISGee_K560k9RzDYc_I', 1521553589, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Ee04RFvpQqcta2HLDXycBACh8TQ-2smy', 1521553612, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Kp9GVN-3DcpFQBpdRs2IZB5vTCzYBkSx', 1521553557, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('LBK4EdVmXB9JvHQH1MRm2F9jxKBU-uSh', 1521553815, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('LS2-rGc-uMzMj3YuM4A3uCN6kvGhYcst', 1521553817, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Lz8f4072wTkRi7Q93qlkiw0cmhsSIdyg', 1521547142, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Nguyen Van A\",\"email\":\"thuckienthanh@nokiamail.com\"}'),
('M9b1fd_nB-lA0vUznjMde9sIdKvxbNb3', 1521553539, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('MUzF7c_hp0kf4m4V4ICH5FcM0VFvoKaj', 1521553590, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('NcjV3tH15xhLN8AMQ4HtRdBMilDpm5mh', 1521553578, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('OKWo3bgqoY8ZuOckpn3az8ZKhpLeSN61', 1521553821, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Opqchg7nNw4VlsKMts7nP1fz095ERJkR', 1521553569, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('OuluPfehBvhrLvreJA4bK1eY4M5p-XYt', 1521547422, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Vi Van Thuc\",\"email\":\"thuckate@gmail.com\"}'),
('OxBIx_h2DyCyOKERxJFO4Kx1j2asS0Nv', 1521553592, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Q8peMKa2C9_RddmfgG3_OTI6Hm-l6do8', 1521553565, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('QZGBdSjJJzO3rx7sXq1E14m_QEKKfNyr', 1521552774, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('RSmFB8DABw-PcCVamXYce_JwFKpmVKcb', 1521547076, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Vi Van Thuc\",\"email\":\"thuckate@gmail.com\"}'),
('RiW2IiF_vhKo5JG_uLIK8E-ToxxKX0Hk', 1521553579, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('S5fZgpjee3ZP_1m2Sw25WT_3k669NuZx', 1521552785, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('U7kXokgbt2hx4O-GJddYwZ9opWZ8HWL9', 1521547104, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Vi Van Thuc\",\"email\":\"thuckate@gmail.com\"}'),
('UnvpwukZFKOYFfyBYULxFZjaUINTG54T', 1521553571, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('WXjgpRsD27GadOMxGgV2bDdmEErEOqns', 1521553558, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('XE7JNniimRDe0B5_PdBBWp63Tliq6fl4', 1521547481, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Vi Van Thuc\",\"email\":\"thuckate@gmail.com\"}'),
('YJljqrqb3T8xbhmka8FxWAtDRusmNSqk', 1521553576, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('a75ZU7wERbanpSXK13yHYP1g_sanvmYy', 1521553723, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('aqAWe87X0W_YfCnmFa8KtJyQRgGx6lQP', 1521552771, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('aw00LqD2L9iRanm5qTNIjMXmq-ETvYRy', 1521553563, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('bQKXo24zGb1jOt2VP1B2mzqs3tiWA18Z', 1521553748, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('bjZtqYz9SHwlF2HomO0OewaL42T-GJxa', 1521553552, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('c7CJBOtXYTQN-hh5Ftt2RhGUNHmGpNpD', 1521553552, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('cO25VQ-t6bGvS1m6y0uFhlhTp1tdwTKJ', 1521546494, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Vi Van Thuc\",\"email\":\"thuckate@gmail.com\"}'),
('dEig9CLlFkOjNxVSP3LZoOO7voRZQz2E', 1521553720, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('edB8NrOCJ2enIYpAi-2hziF0UtuiT1Pq', 1521553723, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('fHe-z-7c7k6K3BExwYSBjXGIputWDIlG', 1521552786, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('fMSuFqbtSjNM3PxRw8vljiGYB5Cd-grJ', 1521546347, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Vi Van Thuc\"}'),
('fv0YTisF17Do8qfUlwP_OVcsmLhEwWwc', 1521553608, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('gZA18W3FkJW481yVNq54bTeboK5ncpl7', 1521553547, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('giBZMSyExypyTlhRE3HVr_uHR2rticS0', 1521552791, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('hSLzc9p6easPHaF3J40Yp6TxiGpat_TK', 1521553543, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('jf8hpO3bSKgF8r0UOWmMi_KObQCWj53T', 1521553591, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('lTlCmL2YOWnwlZ3plHqfMIGGHI6PhbBf', 1521553555, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('nNQRWET5hMa7AVZKa3vQCB_-vPw8tIz3', 1521553570, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('nxEnb2uogotvEHZucjlJ_WPXc4EKLXS1', 1521552780, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('q7qvMmZ4qwVowrLgM9R11KxhyJsaHdUe', 1521553560, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('qvwmP1RCXfm9SdEhyi1CdILVYU99Bgbz', 1521552780, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('rg8bu68R4U3Svj-dqotCGa_b7IGEmTUA', 1521553717, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('u6Zw4PpXUVdr0mPrHZ67z6InYVpfM2sU', 1521553202, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('ukaYvnT-TiDCPQagBObWwKMAEWLmtAVk', 1521553577, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('vBbV1aeHpPjcOjIOoSdb23sj9fhgSQPX', 1521547883, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"fullname\":\"Vi Van Thuc\",\"email\":\"thuckate@gmail.com\"}'),
('xPTRuq9-AU8HnbCdomAb_Mpv1-9qFV_U', 1521553746, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('yltN9sqjKyhu9wwxeA_LeEjegpkLq75B', 1521552771, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('zi2N01uaV_mZGIRnz7aa8LIWJ0SFDOVY', 1521553567, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `id` int(11) NOT NULL,
  `topic_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `is_public` tinyint(1) NOT NULL,
  `id_group` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`id`, `topic_name`, `is_public`, `id_group`, `id_user`) VALUES
(1, 'Powerpoint ', 0, 1, 2),
(2, 'word', 0, 1, 2),
(3, 'excel', 0, 1, 2),
(4, 'H?t', 0, 1, 2),
(5, 'chude1', 1, 5, 3),
(6, 'To?n h?c ', 1, 2, 2),
(7, 'v?n h?c ', 0, 2, 2),
(8, 'Khoa hoc', 1, 3, 2),
(9, 'abc', 0, 6, 2),
(10, 'def', 0, 6, 2),
(11, 'Chu de 1', 0, 7, 3),
(12, 'Sức khỏe tinh thần ', 0, 9, 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `birthday` date NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 NOT NULL,
  `role` tinyint(1) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `jobs` varchar(255) CHARACTER SET utf8 NOT NULL,
  `hobbies` text CHARACTER SET utf8 NOT NULL,
  `favorite_motto` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullname`, `email`, `birthday`, `address`, `role`, `password`, `jobs`, `hobbies`, `favorite_motto`) VALUES
(2, 'Vi Văn Thức ', 'thuckate@gmail.com', '1996-03-04', 'Lục ngạn - Bắc Giang ', 0, '123', 'Sinh viên ', 'Chơi là chính , học là chuyện nhỏ ', 'Đi một ngày đàng, học nhiều sàng khôn '),
(3, 'Nguyen Van A', 'thuckienthanh@nokiamail.com', '1187-06-06', 'Kien Thanh Luc Ngan', 0, 'thuc', '', '', ''),
(4, 'Nguyen Van B', 'thucuet@gmail.com', '2018-03-15', 'BG', 0, 'nvb', 'Học sinh ', 'Yêu cái mới ', 'Không có gì mới, đẹp mà lại rẻ cả '),
(5, 'Nguyen Van C', 'cnguyen@gmail.com', '0000-00-00', 'Ha Noi', 0, '123', '', '', ''),
(6, 'Nguyen Van D', 'dnguyen@gmail.com', '0000-00-00', 'Hai Phong', 0, '123', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_chat_user`
--

CREATE TABLE `user_chat_user` (
  `id` int(11) NOT NULL,
  `id_user_a` int(11) NOT NULL,
  `id_user_b` int(11) NOT NULL,
  `message` text CHARACTER SET utf8 NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_chat_user`
--

INSERT INTO `user_chat_user` (`id`, `id_user_a`, `id_user_b`, `message`, `create_at`) VALUES
(1, 2, 4, 'Xin Chao. ! Minh ten la Thuc', '2018-03-18 17:20:13'),
(2, 4, 2, 'Um. ! Chao nhe... tao eo can biet ten m dau', '2018-03-18 17:22:23'),
(3, 2, 5, 'M oi ... m dang lam gi', '2018-03-18 17:24:32'),
(4, 5, 2, 'Tao dang an com ... toi di choi nhe', '2018-03-18 17:24:55'),
(5, 2, 4, 'Xin l?i, m?nh h?i ch?t ???c kh?ng ?? ', '2018-03-19 15:00:47'),
(6, 2, 4, 'sao lai the nhi ', '2018-03-19 15:02:35'),
(7, 4, 2, 'haha .. sorry ban nhieu ', '2018-03-19 16:04:05'),
(8, 2, 4, 'ch?o b?n nh? ', '2018-03-20 14:24:22'),
(9, 2, 4, 'oke vừa sửa xong dấu vietkey rồi .. ', '2018-03-20 14:26:55'),
(10, 2, 5, 'ừm... vậy tí gọi sau ', '2018-03-21 15:07:44');

-- --------------------------------------------------------

--
-- Table structure for table `user_exchanged_info`
--

CREATE TABLE `user_exchanged_info` (
  `id` int(11) NOT NULL,
  `id_user_a` int(11) NOT NULL,
  `id_user_b` int(11) NOT NULL,
  `question_answer` text NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_exchanged_info`
--

INSERT INTO `user_exchanged_info` (`id`, `id_user_a`, `id_user_b`, `question_answer`, `create_at`) VALUES
(1, 2, 5, 'Xin chao ban ... Ban oi cho minh hoi cai ban vua giai thich duoc khong', '2018-03-20 09:10:46'),
(2, 5, 2, 'Oke .. La the nay ... minh noi the y hieu cua minh thoi nhe', '2018-03-20 09:11:15'),
(3, 5, 3, 'AD oi cho minh hoi', '2018-03-20 09:26:05'),
(4, 3, 5, 'Hoi gi ban ', '2018-03-20 09:26:30'),
(5, 2, 5, 'um ..vậy cũng được ', '2018-03-20 14:10:59'),
(6, 5, 2, 'theo như mình nhớ thì ... 1+1 = 2', '2018-03-20 14:12:52'),
(7, 2, 5, '1+1 = 2 thì bố tao cũng biết mà', '2018-03-20 14:15:24'),
(8, 2, 5, 'sao', '2018-03-20 14:58:40');

-- --------------------------------------------------------

--
-- Table structure for table `user_exercise`
--

CREATE TABLE `user_exercise` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_exercise` int(11) NOT NULL,
  `discuss` text CHARACTER SET utf8 NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_exercise`
--

INSERT INTO `user_exercise` (`id`, `id_user`, `id_exercise`, `discuss`, `create_at`, `update_at`) VALUES
(1, 2, 2, 'hello', '2018-03-10 12:02:33', '2018-03-10 12:02:33'),
(2, 3, 3, 'bai 3 ak', '2018-03-10 12:13:47', '2018-03-10 12:13:47'),
(3, 3, 4, 'HIHI', '2018-03-10 13:21:50', '2018-03-10 13:21:50'),
(4, 3, 3, '??o tin ???c r?i ', '2018-03-10 14:33:12', '2018-03-10 14:33:12'),
(5, 2, 1, 'tao hoi nhe... m muon gi', '2018-03-12 03:26:54', '2018-03-12 03:26:54'),
(6, 2, 6, 'cai cc', '2018-03-12 04:20:47', '2018-03-12 04:20:47'),
(7, 2, 13, 'vai ', '2018-03-14 08:31:33', '2018-03-14 08:31:33'),
(8, 3, 13, 'tao binh luan day', '2018-03-14 09:02:02', '2018-03-14 09:02:02'),
(9, 4, 13, 'Wa ... dep trai the', '2018-03-14 09:03:44', '2018-03-14 09:03:44'),
(10, 5, 12, 'ai', '2018-03-15 19:41:06', '2018-03-15 19:41:06'),
(11, 5, 13, 'vai cc', '2018-03-15 19:41:32', '2018-03-15 19:41:32'),
(12, 2, 13, 'chào các anh em nhé ', '2018-03-20 17:37:30', '2018-03-20 17:37:30'),
(13, 2, 13, 'các anh em còn nhớ mình chứ ', '2018-03-20 17:41:33', '2018-03-20 17:41:33'),
(14, 5, 13, 'có e nhớ anh ạ ', '2018-03-20 17:42:55', '2018-03-20 17:42:55'),
(15, 5, 15, 'theo em sức khỏe là một cái gì đó nó lớn lao ', '2018-03-21 14:47:55', '2018-03-21 14:47:55'),
(16, 2, 16, '2. Hoi ngu vai ', '2018-03-24 00:31:55', '2018-03-24 00:31:55');

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_group` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`id`, `id_user`, `id_group`, `status`, `create_at`) VALUES
(10, 5, 7, 2, '2018-03-15 07:42:32'),
(13, 2, 7, 2, '2018-03-15 17:10:22'),
(15, 3, 2, 2, '2018-03-15 18:43:14'),
(16, 5, 2, 3, '2018-03-15 18:44:10'),
(17, 2, 9, 3, '2018-03-21 14:48:32'),
(19, 2, 4, 1, '2018-03-24 03:57:56'),
(20, 4, 7, 3, '2018-03-24 07:55:29');

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_in_gr`
-- (See below for the actual view)
--
CREATE TABLE `user_in_gr` (
`id` int(11)
,`id_user` int(11)
,`id_group` int(11)
,`status` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `user_is_friend`
--

CREATE TABLE `user_is_friend` (
  `id` int(11) NOT NULL,
  `id_user_a` int(11) NOT NULL,
  `id_user_b` int(11) NOT NULL,
  `status` int(3) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_is_friend`
--

INSERT INTO `user_is_friend` (`id`, `id_user_a`, `id_user_b`, `status`, `create_at`) VALUES
(1, 2, 3, 2, '2018-03-16 02:19:50'),
(2, 2, 4, 2, '2018-03-16 02:20:14'),
(3, 2, 5, 2, '2018-03-16 02:20:30'),
(13, 2, 6, 2, '2018-03-23 10:45:29');

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_relation_group`
-- (See below for the actual view)
--
CREATE TABLE `user_relation_group` (
`id` int(11)
,`id_user` int(11)
,`id_group` int(11)
,`status` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `user_topic`
--

CREATE TABLE `user_topic` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_topic` int(11) NOT NULL,
  `disscuss` text CHARACTER SET utf8 NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure for view `abcd`
--
DROP TABLE IF EXISTS `abcd`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `abcd`  AS  select `user_group`.`id` AS `id`,`user_group`.`id_user` AS `id_user`,`user_group`.`id_group` AS `id_group`,`user_group`.`status` AS `status` from `user_group` where (`user_group`.`id_group` = 7) ;

-- --------------------------------------------------------

--
-- Structure for view `friend_box_chat`
--
DROP TABLE IF EXISTS `friend_box_chat`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `friend_box_chat`  AS  select distinct `u`.`id` AS `id`,`u`.`fullname` AS `fullname`,`uif`.`status` AS `status` from (`user` `u` join `user_is_friend` `uif` on((`u`.`id` = `uif`.`id_user_a`))) where ((`uif`.`status` = 2) and (`uif`.`id_user_b` = 6)) union select distinct `u`.`id` AS `id`,`u`.`fullname` AS `fullname`,`uif`.`status` AS `status` from (`user` `u` join `user_is_friend` `uif` on((`u`.`id` = `uif`.`id_user_b`))) where ((`uif`.`status` = 2) and (`uif`.`id_user_a` = 6)) ;

-- --------------------------------------------------------

--
-- Structure for view `friend_chat`
--
DROP TABLE IF EXISTS `friend_chat`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `friend_chat`  AS  select distinct `u`.`id` AS `id`,`u`.`fullname` AS `fullname`,`uif`.`status` AS `status` from (`user` `u` join `user_is_friend` `uif` on((`u`.`id` = `uif`.`id_user_a`))) where ((`uif`.`status` = 2) and (`u`.`fullname` like '% 2%') and (`u`.`id` <> 6) and (`uif`.`id_user_b` = 6)) union select distinct `u`.`id` AS `id`,`u`.`fullname` AS `fullname`,`uif`.`status` AS `status` from (`user` `u` join `user_is_friend` `uif` on((`u`.`id` = `uif`.`id_user_b`))) where ((`uif`.`status` = 2) and (`u`.`fullname` like '% 2%') and (`u`.`id` <> 6) and (`uif`.`id_user_a` = 6)) ;

-- --------------------------------------------------------

--
-- Structure for view `friend_list`
--
DROP TABLE IF EXISTS `friend_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `friend_list`  AS  select `user_is_friend`.`id` AS `id`,`user_is_friend`.`id_user_b` AS `id_friend`,`user_is_friend`.`status` AS `status` from `user_is_friend` where (`user_is_friend`.`id_user_a` = '6') union select `user_is_friend`.`id` AS `id`,`user_is_friend`.`id_user_a` AS `id_friend`,if((`user_is_friend`.`status` = 1),3,2) AS `status` from `user_is_friend` where (`user_is_friend`.`id_user_b` = '6') ;

-- --------------------------------------------------------

--
-- Structure for view `friend_ship`
--
DROP TABLE IF EXISTS `friend_ship`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `friend_ship`  AS  select `uif`.`id` AS `id_friend_ship`,`uif`.`id_user_b` AS `friend_id`,`uif`.`status` AS `status` from `user_is_friend` `uif` where (`uif`.`id_user_a` = '6') union select `uif`.`id` AS `id_friend_ship`,`uif`.`id_user_a` AS `friend_id`,`uif`.`status` AS `status` from `user_is_friend` `uif` where (`uif`.`id_user_b` = '6') ;

-- --------------------------------------------------------

--
-- Structure for view `friend_state_user`
--
DROP TABLE IF EXISTS `friend_state_user`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `friend_state_user`  AS  select `user_is_friend`.`id` AS `id`,`user_is_friend`.`id_user_a` AS `id_user_a`,`user_is_friend`.`id_user_b` AS `id_user_b`,`user_is_friend`.`status` AS `status` from `user_is_friend` where (`user_is_friend`.`id_user_a` = '2') union select `user_is_friend`.`id` AS `id`,`user_is_friend`.`id_user_b` AS `id_user_a`,`user_is_friend`.`id_user_a` AS `id_user_b`,if((`user_is_friend`.`status` = 1),3,2) AS `status` from `user_is_friend` where (`user_is_friend`.`id_user_b` = '2') ;

-- --------------------------------------------------------

--
-- Structure for view `user_in_gr`
--
DROP TABLE IF EXISTS `user_in_gr`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_in_gr`  AS  select `user_group`.`id` AS `id`,`user_group`.`id_user` AS `id_user`,`user_group`.`id_group` AS `id_group`,`user_group`.`status` AS `status` from `user_group` where (`user_group`.`id_user` = '2') ;

-- --------------------------------------------------------

--
-- Structure for view `user_relation_group`
--
DROP TABLE IF EXISTS `user_relation_group`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_relation_group`  AS  select `user_group`.`id` AS `id`,`user_group`.`id_user` AS `id_user`,`user_group`.`id_group` AS `id_group`,`user_group`.`status` AS `status` from `user_group` where (`user_group`.`id_group` = '6') ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_chat_user`
--
ALTER TABLE `user_chat_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_exchanged_info`
--
ALTER TABLE `user_exchanged_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_exercise`
--
ALTER TABLE `user_exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_is_friend`
--
ALTER TABLE `user_is_friend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_topic`
--
ALTER TABLE `user_topic`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `user_chat_user`
--
ALTER TABLE `user_chat_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `user_exchanged_info`
--
ALTER TABLE `user_exchanged_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `user_exercise`
--
ALTER TABLE `user_exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `user_is_friend`
--
ALTER TABLE `user_is_friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `user_topic`
--
ALTER TABLE `user_topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
