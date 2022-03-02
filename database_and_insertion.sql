-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: bsg
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

-- Table structure for table `players`
--

-- PLAYERS TABLE --

DROP TABLE IF EXISTS `Players`;
CREATE TABLE `Players` (
  `player_id` int(15) NOT NULL UNIQUE AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `games` INT,
  `wins` INT,
  `losses` INT,
  PRIMARY KEY (`player_id`)
);


LOCK TABLES `Players` WRITE;
INSERT INTO `Players` VALUES (1, 'user@gmail.com', '144c9defac04969c7bfad8efaa8ea194', 3, 0 , 2),
                               (2, 'user@gmail.com', '144c9defac04969c7bfad8efaa8ea194', 2, 1 , 0),
                               (3, 'user@gmail.com', '144c9defac04969c7bfad8efaa8ea194', 1, 1, 0);
UNLOCK TABLES;

-- games table --

DROP TABLE IF EXISTS `Games`;
CREATE TABLE `Games` (
  `game_id` int(15) NOT NULL UNIQUE AUTO_INCREMENT,
  `time_played` DATETIME,
  `duration` TIME,
  `player_1` INT,
  `player_2` INT,
  `winner` INT,
  `socket_id` INT,
  `active_game` TINYINT,
  PRIMARY KEY (`game_id`)
);

LOCK TABLES `Games` WRITE;
INSERT INTO `Games` VALUES (1, '2022/03/26 15:55:04', 3600, 1, 2, 1, 3425, 0),
                               (2, '2022/04/20 16:20:69', 2400, 1, 2, 2, 3500, 0),
                               (3, '2022/05/15 12:22:15',	5000, 1, 3, 3, 3400, 0);
UNLOCK TABLES;

-- Messages table--

DROP TABLE IF EXISTS `Messages`;
CREATE TABLE `Messages` (
  `chat_message_id` int(15) NOT NULL UNIQUE AUTO_INCREMENT,
  `chat_message` LONGTEXT,
  `timestamp` TIMESTAMP,
  `players_player_id` INT(15),
  `games_game_id` INT(15),
  PRIMARY KEY (`chat_message_id`, `players_player_id`, `games_game_id`),
  CONSTRAINT `FK_player_id_Messages` FOREIGN KEY (`players_player_id`) REFERENCES `Players` (`player_id`),
  CONSTRAINT `FK_game_id_Messages` FOREIGN KEY (`games_game_id`) REFERENCES `Games` (`game_id`)
);

LOCK TABLES `Messages` WRITE;
INSERT INTO `Messages` VALUES (500, 'Hello my name is bob', '2022/03/26 00:10:52', 1, 2),
                               (1000, 'GG!' ,'2022/04/20 00:01:52', 3, 3),
                               (1500, 'Lets have fun!', '2022/05/15 00:02:33', 2, 1);
UNLOCK TABLES;
-- MEMBERSHIP TABLE --

DROP TABLE IF EXISTS `Premium_Membership_Status`;
CREATE TABLE `Premium_Membership_Status` (
`membership_player_id` INT(15),
  `premium_status` TINYINT,
  `next_payment` DATETIME,
  PRIMARY KEY (`membership_player_id`),
  CONSTRAINT `FK_player_id_membership` FOREIGN KEY (`membership_player_id`) REFERENCES `Players` (`player_id`)
);

LOCK TABLES `Premium_Membership_Status` WRITE;
INSERT INTO `Premium_Membership_Status` VALUES (1, 1, '2022-12-21 00:00:00'),
                               (2, NULL, 0),
                               (3, NULL, 0);
UNLOCK TABLES;

-- PLAYERS HAS GAMES M:M RELATIONSHIP TABLE --

DROP TABLE IF EXISTS `Player_Has_Games`;
CREATE TABLE `Player_Has_Games` (
  `players_player_id` int(15) NOT NULL DEFAULT '0',
  `games_game_id` int(15) NOT NULL DEFAULT '0',
  PRIMARY KEY (`players_player_id`,`games_game_id`),
  KEY `players_player_id` (`players_player_id`),
  CONSTRAINT `FK_player_id_PHG` FOREIGN KEY (`players_player_id`) REFERENCES `Players` (`player_id`),
  CONSTRAINT `FK_game_id_PHG` FOREIGN KEY (`games_game_id`) REFERENCES `Games` (`game_id`)
);

LOCK TABLES `Player_Has_Games` WRITE;
INSERT INTO `Player_Has_Games` VALUES (1, 1),
                               (2, 1),
                               (1, 2);
UNLOCK TABLES;


