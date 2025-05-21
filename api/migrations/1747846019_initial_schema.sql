-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: itc_page_og
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campos_laborales`
--

DROP TABLE IF EXISTS `campos_laborales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campos_laborales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `orden` int DEFAULT '0',
  `carrera_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e17d348b1a927f72b92a7a58f26` (`carrera_id`),
  CONSTRAINT `FK_e17d348b1a927f72b92a7a58f26` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campos_laborales`
--

LOCK TABLES `campos_laborales` WRITE;
/*!40000 ALTER TABLE `campos_laborales` DISABLE KEYS */;
/*!40000 ALTER TABLE `campos_laborales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url_slug` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `tipo` enum('licenciatura','maestria','doctorado') NOT NULL,
  `imagen_banner` varchar(255) DEFAULT NULL,
  `bg_color` varchar(7) DEFAULT '#cdcdcd',
  `foto_mascota` varchar(255) DEFAULT NULL,
  `description` text,
  `foto_ingreso` varchar(255) DEFAULT NULL,
  `foto_egreso` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_791edd95de6c4ec72fbf750d2d` (`url_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id_evento` int NOT NULL AUTO_INCREMENT,
  `nombre_evento` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` varchar(50) NOT NULL,
  `fecha_final` varchar(50) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_evento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funciones_profesionales`
--

DROP TABLE IF EXISTS `funciones_profesionales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funciones_profesionales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `orden` int DEFAULT '0',
  `carrera_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f6c8e5543a70459a8a726b2ee68` (`carrera_id`),
  CONSTRAINT `FK_f6c8e5543a70459a8a726b2ee68` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funciones_profesionales`
--

LOCK TABLES `funciones_profesionales` WRITE;
/*!40000 ALTER TABLE `funciones_profesionales` DISABLE KEYS */;
/*!40000 ALTER TABLE `funciones_profesionales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mision_vision_objetivos`
--

DROP TABLE IF EXISTS `mision_vision_objetivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mision_vision_objetivos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('mision','vision','objetivo') NOT NULL,
  `contenido` text NOT NULL,
  `orden` int DEFAULT '0',
  `carrera_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0c33344758dfc91d20de081ec69` (`carrera_id`),
  CONSTRAINT `FK_0c33344758dfc91d20de081ec69` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mision_vision_objetivos`
--

LOCK TABLES `mision_vision_objetivos` WRITE;
/*!40000 ALTER TABLE `mision_vision_objetivos` DISABLE KEYS */;
/*!40000 ALTER TABLE `mision_vision_objetivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticias` (
  `id_noticia` int NOT NULL AUTO_INCREMENT,
  `nombre_noticia` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_publicacion` varchar(50) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_noticia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil_alumno`
--

DROP TABLE IF EXISTS `perfil_alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil_alumno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('ingreso','egreso') NOT NULL,
  `descripcion` text NOT NULL,
  `carrera_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f5fa0598faa096dd9cc46dc154d` (`carrera_id`),
  CONSTRAINT `FK_f5fa0598faa096dd9cc46dc154d` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil_alumno`
--

LOCK TABLES `perfil_alumno` WRITE;
/*!40000 ALTER TABLE `perfil_alumno` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfil_alumno` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-21 11:47:04
