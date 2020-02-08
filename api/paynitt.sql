-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: paynitt
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Form`
--

DROP TABLE IF EXISTS `Form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Form` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `Required` text,
  `links` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Form`
--

LOCK TABLES `Form` WRITE;
/*!40000 ALTER TABLE `Form` DISABLE KEYS */;
INSERT INTO `Form` VALUES (1,'Form1','[{\"name\":\"Form-pdf-1\",\"type\":1},{\"name\":\"Photo\",\"type\":0},{\"name\":\"Payment\",\"type\":2,\"amt\":\"7\"}]','[{\"name\":\"Form-pdf-1\",\"link\":\"nitt.edu/Form-pdf-1\"},{\"name\":\"Payment\",\"link\":null}]'),(2,'Form2','[{\"name\":\"Form-pdf-2\",\"type\":1},{\"name\":\"Photo\",\"type\":0},{\"name\":\"Payment\",\"type\":2,\"amt\":\"7\"}]','[{\"name\":\"Form-pdf-2\",\"link\":\"nitt.edu/Form-pdf-2\"},{\"name\":\"Payment\",\"link\":null}]');
/*!40000 ALTER TABLE `Form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `fromId` int(11) DEFAULT NULL,
  `toId` int(11) DEFAULT NULL,
  `amount` float DEFAULT '0',
  `paid` tinyint(1) DEFAULT '0',
  `paymentInit` datetime DEFAULT NULL,
  `paymentEnd` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fromId` (`fromId`),
  KEY `toId` (`toId`),
  CONSTRAINT `Payment_ibfk_1` FOREIGN KEY (`fromId`) REFERENCES `Users` (`id`),
  CONSTRAINT `Payment_ibfk_2` FOREIGN KEY (`toId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payments`
--

DROP TABLE IF EXISTS `Payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `fromId` int(11) DEFAULT NULL,
  `toId` int(11) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT '0',
  `paymentInit` datetime DEFAULT NULL,
  `paymentEnd` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `amount` float DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fromId` (`fromId`),
  KEY `toId` (`toId`),
  CONSTRAINT `Payments_ibfk_1` FOREIGN KEY (`fromId`) REFERENCES `Users` (`id`),
  CONSTRAINT `Payments_ibfk_2` FOREIGN KEY (`toId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payments`
--

LOCK TABLES `Payments` WRITE;
/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20200207191547-create-user.js'),('20200207191547-update-user-create.js'),('20200207191547-update-user-loc.js'),('20200207191547-update-user-long.js'),('20200207191547-update-user-update.js'),('20200207191547-update-user.js'),('20200207191917-create-payment.js'),('add-amount-col-to-payment.js'),('create-1.js'),('create-2.js'),('create-3.js'),('create-4.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserForm`
--

DROP TABLE IF EXISTS `UserForm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserForm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `formid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `submitted` text,
  `completed` tinyint(1) DEFAULT '0',
  `verified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `formid` (`formid`),
  KEY `userid` (`userid`),
  CONSTRAINT `UserForm_ibfk_1` FOREIGN KEY (`formid`) REFERENCES `Form` (`id`),
  CONSTRAINT `UserForm_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserForm`
--

LOCK TABLES `UserForm` WRITE;
/*!40000 ALTER TABLE `UserForm` DISABLE KEYS */;
INSERT INTO `UserForm` VALUES (1,2,3,NULL,0,0);
/*!40000 ALTER TABLE `UserForm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `upiId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `userType` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Shohan','shohanduttaroy99@oksbi','108118091',NULL,NULL,NULL,NULL,'student'),(2,'Aditya Rana','mailtoaditya.rana98@oksbi','110118002',NULL,NULL,NULL,NULL,'student'),(3,'Tejus','rameshtejus@oksbi','111118114',NULL,NULL,NULL,NULL,'admin'),(4,'Shop1','mailtoaditya.rana98@oksbi','SCZ',NULL,NULL,23,72,'shop'),(5,'Shop2','shohanduttaroy99@oksbi','SCZ01',NULL,NULL,40,-74,'shop'),(6,'Shop3','rameshtejus@oksbi','SCZ02',NULL,NULL,11,79,'shop');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-08 21:00:09
