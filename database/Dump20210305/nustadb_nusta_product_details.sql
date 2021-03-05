-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: nustadb
-- ------------------------------------------------------
-- Server version	5.5.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `nusta_product_details`
--

DROP TABLE IF EXISTS `nusta_product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nusta_product_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `sub_text` varchar(255) DEFAULT NULL,
  `price` varchar(45) DEFAULT '0',
  `discount` varchar(45) DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `model_name` varchar(255) DEFAULT NULL,
  `dimen` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `time_date` varchar(45) DEFAULT NULL,
  `admin_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nusta_product_details`
--

LOCK TABLES `nusta_product_details` WRITE;
/*!40000 ALTER TABLE `nusta_product_details` DISABLE KEYS */;
INSERT INTO `nusta_product_details` VALUES (5,'TV','Smart TV','50000','6000','Excellent Quality','lg_tv.jpg','LG','Smart','Smart +','15*52*23','LG','26-02-2021 12:44','admin@email.com'),(11,'Earphone','Smart Earphone','2000','700','Excellent EarPhone','boat_earphone.jpg','Boar','Smart','Smart +','12*85','Boat','26-02-2021 12:50','admin@email.com'),(19,'Laptop','HP Laptop','50000','10000','This is an HP laptop.','hp_laptop.jpg','Hp','k2y4','Pavilion','12.5*56*62','HP','24-02-2021 18:50','admin@email.com'),(22,'Laptop','Asus Laptop','40000','10000','This is an Asus laptop.','asus_laptop.jpg','Asus','A2Y4','Preditor','12.5*56*62','Asus','24-02-2021 18:50','admin2@email.com'),(23,'TV','Samsung','980000','80000','This is TV','samsung_tv.jpg','Sam','Sam','Smart','5*9*98','Samsung','12-05-2021 12:50','admin2@email.com'),(30,'Wire','Wire','589','360','Good Wire','wire_havels.jpg','Havels','Unify','Unify +','1*2*3','Havels','27-02-2021 12:50','admin@email.com'),(31,'Accelerometer','Smart Device','600','200','USed IN mobile phones','accelrometer.png','Sma','Sam','oishdf9','23-52-65','Smae','28-02-2021 21:14','admin@email.com');
/*!40000 ALTER TABLE `nusta_product_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-05 15:25:37
