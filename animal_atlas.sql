/*
Navicat MySQL Data Transfer

Source Server         : 43.139.79.84
Source Server Version : 50741
Source Host           : 43.139.79.84:3306
Source Database       : animal_atlas

Target Server Type    : MYSQL
Target Server Version : 50741
File Encoding         : 65001

Date: 2023-04-23 22:20:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for animal
-- ----------------------------
DROP TABLE IF EXISTS `animal`;
CREATE TABLE `animal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `like_num` int(10) NOT NULL DEFAULT '0',
  `sex` varchar(10) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `nick` varchar(20) DEFAULT NULL,
  `birthday` varchar(20) DEFAULT NULL,
  `species` varchar(255) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `status_info` varchar(255) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_del` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1630563943309168668 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of animal
-- ----------------------------
INSERT INTO `animal` VALUES ('1', '测试', '3', 'male', '后山', '/animal/57d86f8cb80943f9aaefe0e1638ed28a.jpg', 'nick', '2021-7', '布偶猫', '正常', '试', '异常信息异常信息', null, '0');
INSERT INTO `animal` VALUES ('3', '测试', '5', 'male', '后山', '/animal/test.jpg', 'nick', '2021-7', '布偶猫', '正常', '', '异常信息异常信息', null, '0');
INSERT INTO `animal` VALUES ('4', '测试', '0', 'male', '后山', '/animal/test.jpg', '1', '1', '1', '1', '1', '1', null, '0');
INSERT INTO `animal` VALUES ('5', '测试', '5', 'male', '后山', '', '5', '', '', '', '', '', null, '1');
INSERT INTO `animal` VALUES ('6', '测试', '0', 'male', '后山', null, null, null, null, null, null, null, null, '1');
INSERT INTO `animal` VALUES ('7', '测试', '0', 'male', '后山', null, null, null, null, null, null, null, null, '0');
INSERT INTO `animal` VALUES ('8', '测试', '0', 'male', '后山', null, null, null, null, null, null, null, null, '0');
INSERT INTO `animal` VALUES ('9', '测试', '0', 'male', '后山', null, null, null, null, null, null, null, null, '0');
INSERT INTO `animal` VALUES ('10', '测试', '0', 'male', '后山', null, null, null, null, null, null, null, null, '0');
INSERT INTO `animal` VALUES ('11', '测试', '0', 'male', '后山', null, null, null, null, null, null, null, null, '0');
INSERT INTO `animal` VALUES ('12', '测试', '0', 'male', '后山', null, null, null, null, null, null, null, null, '0');
INSERT INTO `animal` VALUES ('13', '测试', '0', 'male', '后山', null, null, null, null, null, null, null, null, '0');
INSERT INTO `animal` VALUES ('100', '测试F', '3', 'female', '后山', '/animal/test.jpg', 'nick', '2021-7', '布偶猫', '异常', '介绍测试介绍测试介绍测试介绍', '异常信息异常信息', null, '0');
INSERT INTO `animal` VALUES ('1630563943309168643', '游进煌', '0', '', '', '', '', '', '', '', '', '', '2023-04-17 00:30:28', '0');
INSERT INTO `animal` VALUES ('1630563943309168648', null, '0', '', '', '', '', '', '', '', '', '', '2023-04-17 17:02:22', '0');
INSERT INTO `animal` VALUES ('1630563943309168649', null, '0', '6', '6', '', '', '', '', '', '', '', '2023-04-17 17:03:33', '0');
INSERT INTO `animal` VALUES ('1630563943309168650', '5858', '0', '', '', '', '', '', '', '', '', '', '2023-04-17 17:04:16', '0');
INSERT INTO `animal` VALUES ('1630563943309168651', '', '0', '', '', '', '', '', '', '', '', '', '2023-04-17 17:23:09', '0');
INSERT INTO `animal` VALUES ('1630563943309168652', 'mini黑', '0', 'female', '后山', '', 'nick', '2021-2', '黑猫', '12132', '5434', '正常', '2023-04-19 00:21:27', '0');
INSERT INTO `animal` VALUES ('1630563943309168653', '', '0', '', '', '', '', '', '', '', '', '', '2023-04-19 10:23:04', '0');
INSERT INTO `animal` VALUES ('1630563943309168654', '胥佳乐', '0', '', '', '', '', '', '', '', '', '', '2023-04-19 23:52:14', '0');
INSERT INTO `animal` VALUES ('1630563943309168655', '3', '0', '', '', '', '', '', '', '', '', '', '2023-04-20 10:24:24', '0');
INSERT INTO `animal` VALUES ('1630563943309168656', '987', '0', '', '', '', '', '', '', '', '', '', '2023-04-20 10:24:29', '0');
INSERT INTO `animal` VALUES ('1630563943309168657', '吴晓阳', '1', '', '', '/animal/7687d608688047b8a26055326db67a22.jpg', '', '', '', '', '', '', '2023-04-20 13:41:50', '0');
INSERT INTO `animal` VALUES ('1630563943309168658', '胥佳乐', '0', '1', '', '', '', '', '', '', '54343', '', '2023-04-20 14:54:43', '0');
INSERT INTO `animal` VALUES ('1630563943309168659', '三花', '0', 'female', '图书馆', null, '三', '2022-3', '', '异常', '介绍', '皮肤病', '2023-04-21 22:21:56', '0');
INSERT INTO `animal` VALUES ('1630563943309168660', '三花', '0', 'female', '图书馆', null, '三', '2022-3', '', '异常', '介绍', '皮肤病', '2023-04-21 22:32:33', '0');
INSERT INTO `animal` VALUES ('1630563943309168661', '三花', '0', 'female', '图书馆', null, '三', '2022-3', '', '异常', '介绍', '皮肤病', '2023-04-21 22:33:46', '0');
INSERT INTO `animal` VALUES ('1630563943309168662', '000', '0', null, '', null, '', '', '', '', '', '', '2023-04-21 22:39:11', '0');
INSERT INTO `animal` VALUES ('1630563943309168663', '111', '1', null, '', '/animal/b3e9cc7e3736410fa41f4333cd1347f9.jpg', '', '', '', '', '哈哈还哈爱吃拆拆拆哈啊哈还哈哈哈哈哈吃吧哈哈还差拆拆明明嘻嘻嘻嘻嘻', '', '2023-04-21 22:45:46', '0');
INSERT INTO `animal` VALUES ('1630563943309168664', '小黄学长', '0', null, '图书馆', '/animal/5126ce9f8ec54f399ba99153ff24b3a5.jpg', '', '2022-9', '', '', '一只黄色的狗狗 看起来好像在微笑', '', '2023-04-22 00:03:06', '1');
INSERT INTO `animal` VALUES ('1630563943309168665', '哈哈哈', '0', null, '', '/animal/c0031cb5811442a191c674cc7ecff84e.jpg', '', '', '', '', '', '', '2023-04-22 00:07:48', '0');
INSERT INTO `animal` VALUES ('1630563943309168666', '666', '0', null, '', '/animal/637f6f20dc4f4c9c8242b4487daf8f22.jpg', '', '', '', '', '', '', '2023-04-22 00:23:02', '0');
INSERT INTO `animal` VALUES ('1630563943309168667', '***', '0', null, '', '/animal/747c198475ac48cb9862c8a88f79b0e5.jpg', '', '', '', '正常', '', '', '2023-04-22 00:25:33', '0');

-- ----------------------------
-- Table structure for animal_img
-- ----------------------------
DROP TABLE IF EXISTS `animal_img`;
CREATE TABLE `animal_img` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `animal_id` bigint(20) DEFAULT NULL,
  `create_name` varchar(255) DEFAULT NULL,
  `create_user` bigint(20) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_del` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1649677900464640002 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of animal_img
-- ----------------------------
INSERT INTO `animal_img` VALUES ('1', '1', '666', '666', '/animal/1bb039d502b0469b9f620def3470d7da.jpg', '2023-04-19 12:05:19', '1');
INSERT INTO `animal_img` VALUES ('2', '3', '1', '2', '/animal/2c9a5f13867444ff987a9dab440b25f2.jpg', '2023-04-17 16:51:19', '0');
INSERT INTO `animal_img` VALUES ('3', '1', '1', '2', '/animal/c445b046554c4a3e8513c551326ecb3f.jpg', '2023-04-17 16:59:09', '0');
INSERT INTO `animal_img` VALUES ('4', '3', '1', '11', '/animal/1bb039d502b0469b9f620def3470d7da.jpg', '2023-04-16 22:50:44', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558458', '8', '', null, '/animal/5a8d391b284a46a0b0384f96157b4f30.jpg', '2023-04-20 10:34:25', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558459', '8', '', null, '/animal/502f46d1c564461596245266666a5557.jpg', '2023-04-20 10:34:34', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558460', '8', '', null, '/animal/502f46d1c564461596245266666a5557.jpg', '2023-04-20 10:35:07', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558461', '8', '', null, '/animal/5448d4611693442ba84f3a7d8888f85e.jpg', '2023-04-20 10:35:16', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558462', '8', '', null, '/animal/d00d6bf14bbd4480b444a51e57dcb111.jpg', '2023-04-20 10:35:23', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558463', '8', '', null, '/animal/a21939cfd6d64bfa8a4b5c5bc4e13476.jpg', '2023-04-20 10:35:30', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558464', '8', '', null, '/animal/9aa22c7d133e4315b99479cc3aa0b107.jpg', '2023-04-20 10:36:28', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558465', '8', '', null, '/animal/c8baaf3c23184ac1af27b006becb6c23.jpg', '2023-04-20 10:37:47', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558466', '8', '', null, '/animal/c8baaf3c23184ac1af27b006becb6c23.jpg', '2023-04-20 10:37:53', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558467', '8', '', null, '/animal/8005e7b7b1524c1aa05cc9b154f103a1.jpg', '2023-04-20 10:38:16', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558468', '8', '', null, '/animal/630fb8e3363144ce9b9ec1fd3f1569ec.jpg', '2023-04-20 10:38:26', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558469', '7', '', null, '/animal/3105736866f448569b541ff7b23ac6b0.jpg', '2023-04-20 10:41:49', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558470', '1', '', null, '/animal/6e9b60398c38439ea363fc62e81c3988.jpg', '2023-04-20 10:42:13', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558471', '1', '', null, '/animal/0f877b3892b9480593a4bf7405fc883f.jpg', '2023-04-20 10:42:42', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558472', '6', '', null, '/animal/fb7afa1f97854066a93a3d5a48325d90.jpg', '2023-04-20 10:51:56', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558473', '3', '', null, '/animal/8c304953526e4be997c8b47e1bea3d11.jpg', '2023-04-20 11:23:17', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558474', '3', '', null, '/animal/c63648b19a9a429fa6b8f0c275de5371.jpg', '2023-04-20 11:23:23', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558475', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:33', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558476', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:33', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558477', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:33', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558478', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:33', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558479', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:33', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558480', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:33', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558481', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:33', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558482', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:34', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558483', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:34', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558484', '3', '', null, '/animal/426e6eb7f17f49f38c40a3e243b081fd.jpg', '2023-04-20 11:23:34', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558485', '3', '', null, '/animal/d34356fb4bcb4d709c696308e05dd7b7.jpg', '2023-04-20 11:39:24', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558486', '6', '', null, '/animal/7c5e1154bc7849c2a9d5197524e05312.jpg', '2023-04-20 11:41:08', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558487', '6', '', null, '/animal/97277fc0534c461cae58ef7b41df3cfc.jpg', '2023-04-20 11:41:14', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558488', '6', '', null, '/animal/ad0d48c1ee0f4e058dd8bfda99f99b0e.jpg', '2023-04-20 11:41:21', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558489', '6', '', null, '/animal/64163833d92245da802055d1b7aa824e.jpg', '2023-04-20 11:41:27', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558490', '6', '', null, '/animal/fa136517a29242d7b20975b05357e4c7.jpg', '2023-04-20 11:41:33', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558491', '1', '', null, '/animal/36ded0bde0204a64beac53b94603fbda.jpg', '2023-04-20 14:47:19', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558492', '1', '', null, '', '2023-04-20 14:47:31', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558493', '1', '', null, '/animal/db12e5f609ff472e92c7886629196ca5.jpg', '2023-04-20 14:48:51', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558494', '1', '1', '1', '/animal/b9518c995bfd4f1cb9682dd98696c29c.jpg', '2023-04-20 14:51:05', '0');
INSERT INTO `animal_img` VALUES ('1648533226131558495', '1', 'Giftia', '1633859576048775170', '/animal/3ddeda9d93594aa59776d8c23f336e89.jpg', '2023-04-20 22:00:06', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558496', '1', 'Giftia', '1633859576048775170', '/animal/5ab2fd4b9a0143d98b32af1fb5103195.jpg', '2023-04-20 22:00:32', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558497', '1', 'Giftia', '1633859576048775170', '/animal/8bb784faf9a94a27a2ca452768ec0db9.jpg', '2023-04-20 22:02:33', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558498', '1', 'Giftia', '1633859576048775170', '/animal/c5c33e1d50f44ef0b378b00f55fcb60d.jpg', '2023-04-20 22:04:43', '1');
INSERT INTO `animal_img` VALUES ('1648533226131558499', '1', 'Giftia', '1633859576048775170', '/animal/58470a6dadbf467b983bfdda474f98b2.jpg', '2023-04-20 22:04:43', '1');
INSERT INTO `animal_img` VALUES ('1649057460796801025', '1', 'Giftia', '1633859576048775170', '/animal/427c1be0c7e84ec2bc5b563cd44f96ea.jpg', '2023-04-20 22:28:30', '1');
INSERT INTO `animal_img` VALUES ('1649062044655243266', '1', 'Giftia', '1633859576048775170', '/animal/a9e77502fd4845dfbb0c2f1376f01ecf.jpg', '2023-04-20 22:46:43', '1');
INSERT INTO `animal_img` VALUES ('1649062044944650242', '1', 'Giftia', '1633859576048775170', '/animal/81945b1f04de4bb5ad8d0b261e0f2aeb.jpg', '2023-04-20 22:46:43', '1');
INSERT INTO `animal_img` VALUES ('1649062890046500866', '1', 'Giftia', '1633859576048775170', '/animal/1d65349142c7407ba4d0802641bd8414.jpg', '2023-04-20 22:50:05', '0');
INSERT INTO `animal_img` VALUES ('1649062890046500867', '1', 'Giftia', '1633859576048775170', '/animal/73e415806a094056b8a9a29d808149b3.jpg', '2023-04-20 22:50:05', '0');
INSERT INTO `animal_img` VALUES ('1649066269686640642', '3', 'Giftia', '1633859576048775170', '/animal/c4e0774f74f44d54b4c15ed72155bbf5.jpg', '2023-04-20 23:03:30', '0');
INSERT INTO `animal_img` VALUES ('1649066269816664066', '3', 'Giftia', '1633859576048775170', '/animal/0071979bd953477bbbe8707dd636ddc9.jpg', '2023-04-20 23:03:30', '0');
INSERT INTO `animal_img` VALUES ('1649066710826758146', '1', 'Giftia', '1633859576048775170', '/animal/a11e0c5182a94ad4bcd8382b4476aeb7.jpg', '2023-04-20 23:05:16', '0');
INSERT INTO `animal_img` VALUES ('1649066711946637314', '1', 'Giftia', '1633859576048775170', '/animal/679e06a626704b45adef3193df07aaf2.jpg', '2023-04-20 23:05:16', '0');
INSERT INTO `animal_img` VALUES ('1649067087550754818', '1', 'Giftia', '1633859576048775170', '/animal/d69b027e31a34f7aa3c4eefff5c025e8.jpg', '2023-04-20 23:06:45', '0');
INSERT INTO `animal_img` VALUES ('1649067087810801665', '1', 'Giftia', '1633859576048775170', '/animal/8ad7a9c782434bd299eb2328eb0302c9.jpg', '2023-04-20 23:06:45', '0');
INSERT INTO `animal_img` VALUES ('1649067286981521410', '1', 'Giftia', '1633859576048775170', '/animal/2d257016ca9d44128105dd8eb7176f47.jpg', '2023-04-20 23:07:33', '0');
INSERT INTO `animal_img` VALUES ('1649067287115739138', '1', 'Giftia', '1633859576048775170', '/animal/aeb7639c14644f2792b1aa795b23fe30.jpg', '2023-04-20 23:07:33', '0');
INSERT INTO `animal_img` VALUES ('1649067512614105090', '1', 'Giftia', '1633859576048775170', '/animal/44b8e22b5fe743eeb387b548acfbb9d7.jpg', '2023-04-20 23:08:27', '1');
INSERT INTO `animal_img` VALUES ('1649067513008369665', '1', 'Giftia', '1633859576048775170', '/animal/f4c12e46883d407ca80079508c950f76.jpg', '2023-04-20 23:08:27', '1');
INSERT INTO `animal_img` VALUES ('1649088672470958081', '3', 'Giftia', '1633859576048775170', '/animal/909e77762f8f4d6db6142d9e38e47066.jpg', '2023-04-21 00:32:32', '1');
INSERT INTO `animal_img` VALUES ('1649088672814891010', '3', 'Giftia', '1633859576048775170', '/animal/e8c30e8b30494b7b982f69107a5b2794.jpg', '2023-04-21 00:32:32', '1');
INSERT INTO `animal_img` VALUES ('1649090236921184257', '4', 'Giftia', '1633859576048775170', '/animal/eb19d4f302624f08a7b72f8df969d6fb.jpg', '2023-04-21 00:38:45', '0');
INSERT INTO `animal_img` VALUES ('1649090237080567810', '4', 'Giftia', '1633859576048775170', '/animal/5169f8958f694d6fa76d3f785f92e589.jpg', '2023-04-21 00:38:45', '0');
INSERT INTO `animal_img` VALUES ('1649090237281894401', '4', 'Giftia', '1633859576048775170', '/animal/8dc218b5b5a0493cbee2a43ed17fc9d4.jpg', '2023-04-21 00:38:45', '0');
INSERT INTO `animal_img` VALUES ('1649390814578671618', '1630563943309168657', 'Giftia', '1633859576048775170', '/animal/91add795ae944769a70934c95b36d81a.jpg', '2023-04-21 20:33:08', '0');
INSERT INTO `animal_img` VALUES ('1649422567372578817', '1630563943309168662', 'Giftia', '1633859576048775170', '/animal/5318895f9c1b488eb79a7761a34b0577.jpg', '2023-04-21 22:39:18', '0');
INSERT INTO `animal_img` VALUES ('1649422602353074177', '1630563943309168662', 'Giftia', '1633859576048775170', '/animal/c0438141b74743bf8786d15ce5037677.jpg', '2023-04-21 22:39:27', '0');
INSERT INTO `animal_img` VALUES ('1649424204724015105', '1630563943309168663', 'Giftia', '1633859576048775170', '/animal/0468561686b342fb977c94fdcf4105b9.jpg', '2023-04-21 22:45:49', '0');
INSERT INTO `animal_img` VALUES ('1649424204724015106', '1630563943309168663', 'Giftia', '1633859576048775170', '/animal/b3e9cc7e3736410fa41f4333cd1347f9.jpg', '2023-04-21 22:45:49', '0');
INSERT INTO `animal_img` VALUES ('1649424498149134337', '1630563943309168663', 'Giftia', '1633859576048775170', '/animal/065c0ea3a693477cba8a97dea351eec5.jpg', '2023-04-21 22:46:59', '0');
INSERT INTO `animal_img` VALUES ('1649443668018434049', '1630563943309168664', 'Giftia', '1633859576048775170', '/animal/5126ce9f8ec54f399ba99153ff24b3a5.jpg', '2023-04-22 00:03:09', '0');
INSERT INTO `animal_img` VALUES ('1649443668538527745', '1630563943309168664', 'Giftia', '1633859576048775170', '/animal/49964cb4304d4eebbf05c09b313bc120.jpg', '2023-04-22 00:03:19', '0');
INSERT INTO `animal_img` VALUES ('1649444845816745986', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/c0031cb5811442a191c674cc7ecff84e.jpg', '2023-04-22 00:07:50', '0');
INSERT INTO `animal_img` VALUES ('1649444853030948866', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/e2a2051803c845db838f1eaffd5f7dea.jpg', '2023-04-22 00:07:52', '0');
INSERT INTO `animal_img` VALUES ('1649445004671815681', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/702d12a4ec484a9d934fc632e2f138d7.jpg', '2023-04-22 00:08:28', '0');
INSERT INTO `animal_img` VALUES ('1649445020400455681', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/577844922ce443858b1863e8507d2f22.jpg', '2023-04-22 00:08:32', '0');
INSERT INTO `animal_img` VALUES ('1649445020467564545', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/f617fba78ba344088c01fbfbc64aecc7.jpg', '2023-04-22 00:08:32', '0');
INSERT INTO `animal_img` VALUES ('1649445553941090306', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/29a317facaee4cbd9cad3810c10b03bd.jpg', '2023-04-22 00:10:39', '0');
INSERT INTO `animal_img` VALUES ('1649445554071113730', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/59c6cac32ed1437dbb9e6654419b40d9.jpg', '2023-04-22 00:10:39', '0');
INSERT INTO `animal_img` VALUES ('1649446000080752641', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/446ccc4e04fd44eb9a58bb29015c7cc6.jpg', '2023-04-22 00:12:25', '0');
INSERT INTO `animal_img` VALUES ('1649446000416296962', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/604dbf9aad37459980b768981af2e173.jpg', '2023-04-22 00:12:25', '0');
INSERT INTO `animal_img` VALUES ('1649446168037462018', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/e4cca00235f44657a2f3992d38d80a07.jpg', '2023-04-22 00:13:05', '0');
INSERT INTO `animal_img` VALUES ('1649446168238788609', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/a15ed07ef1024cbe84ecee372d9f040d.jpg', '2023-04-22 00:13:05', '0');
INSERT INTO `animal_img` VALUES ('1649446879362142209', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/e067bf10b2a242fa9212f396a2c2e340.jpg', '2023-04-22 00:15:55', '0');
INSERT INTO `animal_img` VALUES ('1649446880255528961', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/439779bfc0c548d998ef97d174018558.jpg', '2023-04-22 00:15:55', '0');
INSERT INTO `animal_img` VALUES ('1649446880398135297', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/10aea69a5fb944eca1f847efe1ac827d.jpg', '2023-04-22 00:15:55', '1');
INSERT INTO `animal_img` VALUES ('1649446890535768066', '1630563943309168665', 'Giftia', '1633859576048775170', '/animal/a98653ec13004e49850698e857af2a96.jpg', '2023-04-22 00:15:58', '1');
INSERT INTO `animal_img` VALUES ('1649448687954415617', '1630563943309168666', 'Giftia', '1633859576048775170', '/animal/637f6f20dc4f4c9c8242b4487daf8f22.jpg', '2023-04-22 00:23:06', '0');
INSERT INTO `animal_img` VALUES ('1649448689145597953', '1630563943309168666', 'Giftia', '1633859576048775170', '/animal/bbdb8703c3bb4ec09b456cca2b2d0c0a.jpg', '2023-04-22 00:23:06', '0');
INSERT INTO `animal_img` VALUES ('1649448727276015618', '1630563943309168666', 'Giftia', '1633859576048775170', '/animal/a7a4969f3e3b4bf190800fa963b956ff.jpg', '2023-04-22 00:23:15', '0');
INSERT INTO `animal_img` VALUES ('1649448727921938434', '1630563943309168666', 'Giftia', '1633859576048775170', '/animal/bde0e92c266a48e9a5f62591e02fddaf.jpg', '2023-04-22 00:23:16', '0');
INSERT INTO `animal_img` VALUES ('1649449345570951169', '1630563943309168667', 'Giftia', '1633859576048775170', '/animal/747c198475ac48cb9862c8a88f79b0e5.jpg', '2023-04-22 00:25:43', '0');
INSERT INTO `animal_img` VALUES ('1649449346552418305', '1630563943309168667', 'Giftia', '1633859576048775170', '/animal/9fa3b9555fba41109024e5090d775492.jpg', '2023-04-22 00:25:43', '0');
INSERT INTO `animal_img` VALUES ('1649677894714249217', '1', 'Giftia', '1633859576048775170', '/animal/5ddbe163c0a4452e8a82f57d99cc1598.jpg', '2023-04-22 15:33:54', '0');
INSERT INTO `animal_img` VALUES ('1649677900464640001', '1', 'Giftia', '1633859576048775170', '/animal/dd725a943f0242c59b056e468804dc54.jpg', '2023-04-22 15:33:55', '0');

-- ----------------------------
-- Table structure for invitation
-- ----------------------------
DROP TABLE IF EXISTS `invitation`;
CREATE TABLE `invitation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` varchar(1005) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_avatar` varchar(255) DEFAULT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1649755293157990402 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of invitation
-- ----------------------------
INSERT INTO `invitation` VALUES ('1', '1', '帖子1', '帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1帖子1', 'Giftia', null, '2023-04-21 23:46:45');
INSERT INTO `invitation` VALUES ('2', '1', '帖子2', '帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2帖子2', 'Giftia', null, '2023-04-21 23:48:19');
INSERT INTO `invitation` VALUES ('3', '1633859576048775170', '222', 'addPost', 'Giftia', '/animal/test.jpg', '2023-04-22 16:53:17');
INSERT INTO `invitation` VALUES ('1649698096797573121', '1633859576048775170', '222', 'addPost', 'Giftia', '/animal/test.jpg', '2023-04-22 16:54:11');
INSERT INTO `invitation` VALUES ('1649703500445249537', '1633859576048775170', '测试贴', 'test', 'Giftia', '/animal/test.jpg', '2023-04-22 17:15:39');
INSERT INTO `invitation` VALUES ('1649703815571697665', '1633859576048775170', '测试贴', 'test', 'Giftia', '/animal/test.jpg', '2023-04-22 17:16:54');
INSERT INTO `invitation` VALUES ('1649732199047622657', '1633859576048775170', '标题', '内容', 'Giftia', '/animal/test.jpg', '2023-04-22 19:09:41');
INSERT INTO `invitation` VALUES ('1649753456803618818', '1633859576048775170', '发发发发', '帖子', 'Giftia', '/animal/test.jpg', '2023-04-22 20:34:10');
INSERT INTO `invitation` VALUES ('1649754878160969729', '1633859576048775170', '12345', 'qqqqqqqqq', 'Giftia', '/animal/test.jpg', '2023-04-22 20:39:49');
INSERT INTO `invitation` VALUES ('1649755293157990401', '1633859576048775170', '88', '22222', 'Giftia', '/animal/test.jpg', '2023-04-22 20:41:28');

-- ----------------------------
-- Table structure for invitation_img
-- ----------------------------
DROP TABLE IF EXISTS `invitation_img`;
CREATE TABLE `invitation_img` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `invitation_id` bigint(20) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_del` int(5) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1649755316377657346 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of invitation_img
-- ----------------------------
INSERT INTO `invitation_img` VALUES ('1649703846714404866', '/post/68ded29a3e38461385a658f328b7a6ce.jpg', '1633859576048775170', 'Giftia', '1649703815571697665', '2023-04-22 17:17:02', '0');
INSERT INTO `invitation_img` VALUES ('1649703846714404867', '/post/c327c37864f147479928127e34854010.jpg', '1633859576048775170', 'Giftia', '1649703815571697665', '2023-04-22 17:17:02', '0');
INSERT INTO `invitation_img` VALUES ('1649703846714404868', '/post/889a3ca3ef98465cba940843e760297f.jpg', '1633859576048775170', 'Giftia', '1649703815571697665', '2023-04-22 17:17:02', '0');
INSERT INTO `invitation_img` VALUES ('1649703846945091585', '/post/4bfaf2c8e6e44c649b0042bd7c019111.jpg', '1633859576048775170', 'Giftia', '1649703815571697665', '2023-04-22 17:17:02', '0');
INSERT INTO `invitation_img` VALUES ('1649732228973981697', '/post/46a835fd6c874ce6be4b93f4af9476d4.jpg', '1633859576048775170', 'Giftia', '1649732199047622657', '2023-04-22 19:09:49', '0');
INSERT INTO `invitation_img` VALUES ('1649732229607321601', '/post/0c75fb1a196c4a05bd5cd17ef58e8bf5.jpg', '1633859576048775170', 'Giftia', '1649732199047622657', '2023-04-22 19:09:49', '0');
INSERT INTO `invitation_img` VALUES ('1649732233604493314', '/post/4c4c779633e9465488016fcab37d32c3.jpg', '1633859576048775170', 'Giftia', '1649732199047622657', '2023-04-22 19:09:50', '0');
INSERT INTO `invitation_img` VALUES ('1649732233700962306', '/post/fb681000699d4d18a2889f093beb19ee.jpg', '1633859576048775170', 'Giftia', '1649732199047622657', '2023-04-22 19:09:50', '0');
INSERT INTO `invitation_img` VALUES ('1649753489993146370', '/post/2b4aa12d3fc348d996436dc848536c25.jpg', '1633859576048775170', 'Giftia', '1649753456803618818', '2023-04-22 20:34:18', '0');
INSERT INTO `invitation_img` VALUES ('1649753490764898306', '/post/674dda6d7fe34271affe6059e561b6d6.jpg', '1633859576048775170', 'Giftia', '1649753456803618818', '2023-04-22 20:34:18', '0');
INSERT INTO `invitation_img` VALUES ('1649753497807134722', '/post/ea8e0b9279a846ea80276a826e75d9b9.jpg', '1633859576048775170', 'Giftia', '1649753456803618818', '2023-04-22 20:34:19', '0');
INSERT INTO `invitation_img` VALUES ('1649753498058792961', '/post/672ee0dc2a1d4e649ea6fc2ff342a847.jpg', '1633859576048775170', 'Giftia', '1649753456803618818', '2023-04-22 20:34:20', '0');
INSERT INTO `invitation_img` VALUES ('1649754890043432962', '/post/624b3884d4f54da4933aeb9c255f7a31.jpg', '1633859576048775170', 'Giftia', '1649754878160969729', '2023-04-22 20:39:51', '0');
INSERT INTO `invitation_img` VALUES ('1649754920192090114', '/post/5325d86a9acb4c88bc305f8d3e81c549.jpg', '1633859576048775170', 'Giftia', '1649754878160969729', '2023-04-22 20:39:59', '0');
INSERT INTO `invitation_img` VALUES ('1649754920280170497', '/post/bbbd78cba1f14c2583d70f1b12cacabe.jpg', '1633859576048775170', 'Giftia', '1649754878160969729', '2023-04-22 20:39:59', '0');
INSERT INTO `invitation_img` VALUES ('1649754921274220546', '/post/110598f846894c3e86e8cd6d27e3055d.jpg', '1633859576048775170', 'Giftia', '1649754878160969729', '2023-04-22 20:39:59', '0');
INSERT INTO `invitation_img` VALUES ('1649755316377657345', '/post/1b564f8ecc9b416abc35cb8b50d17fdc.jpg', '1633859576048775170', 'Giftia', '1649755293157990401', '2023-04-22 20:41:33', '0');

-- ----------------------------
-- Table structure for like_record
-- ----------------------------
DROP TABLE IF EXISTS `like_record`;
CREATE TABLE `like_record` (
  `id` bigint(20) NOT NULL,
  `animal_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of like_record
-- ----------------------------
INSERT INTO `like_record` VALUES ('1646491893611200514', '2', '1633859576048775170');
INSERT INTO `like_record` VALUES ('1647615173839572994', '21', '1633859576048775170');
INSERT INTO `like_record` VALUES ('1648729283004297218', '100', '1633859576048775170');
INSERT INTO `like_record` VALUES ('1648879147268751361', '1', '1633859576048775170');
INSERT INTO `like_record` VALUES ('1649100652929908737', '3', '1633859576048775170');
INSERT INTO `like_record` VALUES ('1649390864478306306', '1630563943309168657', '1633859576048775170');
INSERT INTO `like_record` VALUES ('1649424652625350658', '1630563943309168663', '1633859576048775170');

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `belong` bigint(20) NOT NULL,
  `belong_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_avatar` varchar(255) DEFAULT NULL,
  `type` int(5) NOT NULL DEFAULT '0',
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES ('1', '', '1', '1', '1', '1', '1', '0', '2023-04-19 13:26:59');
INSERT INTO `reply` VALUES ('2', '', '2', '2', '2', '2', '2', '0', '2023-04-19 13:27:18');
INSERT INTO `reply` VALUES ('3', '我是内容我是内容', '1633859576048775170', '1649755293157990401', '88', 'Giftia', '/animal/44e362bbece340ee845908653f2ef7e1.jpg', '0', '2023-04-23 20:48:34');

-- ----------------------------
-- Table structure for reply_img
-- ----------------------------
DROP TABLE IF EXISTS `reply_img`;
CREATE TABLE `reply_img` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `reply_id` bigint(20) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of reply_img
-- ----------------------------
INSERT INTO `reply_img` VALUES ('1', '/animal/44e362bbece340ee845908653f2ef7e1.jpg', '1633859576048775170', 'Giftia', '3', '2023-04-23 20:20:08');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(11) NOT NULL,
  `role` varchar(10) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_del` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '7', '/animal/91e90a02f4264b04bde9e03e273456da.jpg', null, '7', '1', '2023-03-27 18:16:27', '1');
INSERT INTO `user` VALUES ('2', '165555', '/animal/d6e05314ec34454eb41e84e213e67c74.jpg', null, '6665555', '2', '2023-03-27 18:16:34', '0');
INSERT INTO `user` VALUES ('3', '16', '/animal/a626e4ca4b1d44b59b0b4853b5f171fb.jpg', null, '666', '3', '2023-03-27 18:16:41', '0');
INSERT INTO `user` VALUES ('4', '16888888', '', null, '666888888', '4', '2023-03-27 18:16:46', '1');
INSERT INTO `user` VALUES ('5', '16999', '/animal/3d24f4c3941c4fa692374a37d965863c.jpg', null, '666', '5', '2023-03-27 18:16:52', '0');
INSERT INTO `user` VALUES ('6', '16678754', '', null, '666', '6', '2023-03-27 18:16:56', '1');
INSERT INTO `user` VALUES ('7', '16', '', null, '666', '7', '2023-03-27 18:17:02', '1');
INSERT INTO `user` VALUES ('8', '16', '', null, '666', '8', '2023-03-27 18:17:06', '1');
INSERT INTO `user` VALUES ('9', '16', '', null, '666', '9', '2023-03-27 18:17:11', '1');
INSERT INTO `user` VALUES ('33', '8989', null, null, '999', 'user', '2023-04-20 14:37:27', '1');
INSERT INTO `user` VALUES ('1633859576048775170', 'Giftia', '/animal/test.jpg', null, '<REDACTED_PHONE>', 'admin', '2023-03-09 23:57:32', '0');
INSERT INTO `user` VALUES ('1639231376702169090', '16', '', null, '66', 'user', '2023-03-24 19:43:10', '1');
INSERT INTO `user` VALUES ('1648939847018192897', 'yjh', '/animal/260de579f1b84d20af3ee504a820f309.jpg', '', '<REDACTED_PHONE>', 'user', '2023-04-20 14:41:11', '0');
INSERT INTO `user` VALUES ('1648940637602570242', '吴晓阳', '', '', '011111', 'user', '2023-04-20 14:44:20', '1');
INSERT INTO `user` VALUES ('1648940712160518145', '吴晓阳', '', '', '011111', 'user', '2023-04-20 14:44:38', '1');
INSERT INTO `user` VALUES ('1648941035377672194', '吴晓阳', '/animal/a95c55ba3416400ebb0afd2914a601a8.jpg', '', '011111', 'user', '2023-04-20 14:45:55', '0');
INSERT INTO `user` VALUES ('1648941063706001410', '吴晓阳', '', '', '011111', 'user', '2023-04-20 14:46:02', '1');
INSERT INTO `user` VALUES ('1648943022966087681', '胥佳乐', '/animal/44e362bbece340ee845908653f2ef7e1.jpg', '', '8989898989', 'user', '2023-04-20 14:53:49', '0');
INSERT INTO `user` VALUES ('1648943988817911810', 'xb', '/animal/026effe9ca2c403490667f3a64c067a2.jpg', '', '123', 'user', '2023-04-20 14:57:39', '0');
INSERT INTO `user` VALUES ('1648944091746131970', '胥佳乐', '', '', '<REDACTED_PHONE>', 'user', '2023-04-20 14:58:04', '0');
INSERT INTO `user` VALUES ('1648944212860854273', '胥佳乐', '/animal/28011de52e3147e180b1288dcfde5c5e.jpg', '', '<REDACTED_PHONE>', 'user', '2023-04-20 14:58:32', '1');
