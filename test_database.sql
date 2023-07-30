-- Create database wertik if not exists
CREATE DATABASE IF NOT EXISTS `wertik` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `wertik`;

DROP TABLE IF EXISTS `shirts`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

CREATE TABLE `shirts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sizes` enum('lg','sm','xl','xxl','xxxl') DEFAULT NULL,
  `user_id` bigint(20),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `users` (`id`, `name`, `email`) VALUES
(12, '123', 'ads'),
(13, '123', 'ads');

INSERT INTO `shirts` (`id`, `sizes`, `user_id`) VALUES
(1, 'xl', 12);
