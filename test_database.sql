-- Create database wertik if not exists
CREATE DATABASE IF NOT EXISTS `wertik` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `wertik`;

DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `category`;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `sizes` enum('lg','sm','xl','xxl','xxxl') DEFAULT NULL,
  `user_id` bigint(20),
  `category_id` bigint(20),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- add table category
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- insert two users
INSERT INTO `user` (`id`, `name`, `email`) VALUES
(1, 'John', 'asdfasdf@gmail.com'),
(2, 'ali', 'ali@gmail.com');

-- insert two categories
INSERT INTO `category` (`id`, `title`) VALUES
(1, 'T-shirt'),
(2, 'Pants');

-- insert two products
INSERT INTO `product` (`id`, `title`, `sizes`, `user_id`, `category_id`) VALUES
(1, 'T-shirt 1', 'lg', 1, 1),
(2, 'T-shirt 2', 'sm', 1, 2);
