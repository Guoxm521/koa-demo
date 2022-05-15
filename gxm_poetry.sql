/*
 Navicat MySQL Data Transfer

 Source Server         : mysql-server
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : 42.193.230.81:3306
 Source Schema         : gxm_poetry

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 15/05/2022 16:05:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for gxm_blog
-- ----------------------------
DROP TABLE IF EXISTS `gxm_blog`;
CREATE TABLE `gxm_blog`  (
  `id` int(0) NOT NULL,
  `title` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `des` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `category` int(0) NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tag` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(0) NOT NULL,
  `c_time` varbinary(13) NOT NULL,
  `u_time` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gxm_blog_admin
-- ----------------------------
DROP TABLE IF EXISTS `gxm_blog_admin`;
CREATE TABLE `gxm_blog_admin`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类主键ID',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录邮箱',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录密码',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员昵称',
  `c_time` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '创建时间戳',
  `u_time` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '更新时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `admin_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gxm_blog_category
-- ----------------------------
DROP TABLE IF EXISTS `gxm_blog_category`;
CREATE TABLE `gxm_blog_category`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类主键ID',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名称',
  `status` tinyint(0) NULL DEFAULT 1 COMMENT '类别状态,0-隐藏,1-正常',
  `sort_order` int(0) UNSIGNED NULL DEFAULT 1 COMMENT '排序编号',
  `parent_id` int(0) UNSIGNED NULL DEFAULT 0 COMMENT '父类别id,id=0代表根节点',
  `c_time` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '创建时间戳',
  `u_time` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '更新时间戳',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gxm_blog_tags
-- ----------------------------
DROP TABLE IF EXISTS `gxm_blog_tags`;
CREATE TABLE `gxm_blog_tags`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类主键ID',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名称',
  `status` tinyint(0) NULL DEFAULT 1 COMMENT '类别状态,0-隐藏,1-正常',
  `c_time` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '创建时间戳',
  `u_time` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '更新时间戳',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gxm_poetry_all
-- ----------------------------
DROP TABLE IF EXISTS `gxm_poetry_all`;
CREATE TABLE `gxm_poetry_all`  (
  `id` int(0) UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `author` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dynasty` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gxm_poetry_category
-- ----------------------------
DROP TABLE IF EXISTS `gxm_poetry_category`;
CREATE TABLE `gxm_poetry_category`  (
  `id` int(0) NOT NULL,
  `dynasty` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dynasty_id` int(0) NOT NULL,
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
