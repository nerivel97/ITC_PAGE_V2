-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: itc_page_v2
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.10.1

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
-- Table structure for table `carrera`
--

DROP TABLE IF EXISTS `carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrera` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `introduccion` text,
  `mision` text,
  `vision` text,
  `objetivos` text,
  `acreditacion` text,
  `perfilingreso` text,
  `perfilegreso` text,
  `urlimagen` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bfba8ce11d3813b92b11185fda` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrera`
--

LOCK TABLES `carrera` WRITE;
/*!40000 ALTER TABLE `carrera` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrera` ENABLE KEYS */;
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
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `totalcreditos` int NOT NULL,
  `creditos` int NOT NULL,
  `urltemario` varchar(255) DEFAULT NULL,
  `esespecialidad` tinyint NOT NULL DEFAULT '0',
  `especialidad` text,
  `estructuragenerica` tinyint NOT NULL DEFAULT '0',
  `residenciaprofesional` tinyint NOT NULL DEFAULT '0',
  `serviciosocial` tinyint NOT NULL DEFAULT '0',
  `actividadescomplementarias` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `reticulaid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6b47d9bb20cfe8813e66e19489` (`clave`),
  KEY `FK_15e28a5373670b8678b3a02c726` (`reticulaid`),
  CONSTRAINT `FK_15e28a5373670b8678b3a02c726` FOREIGN KEY (`reticulaid`) REFERENCES `reticula` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
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
-- Table structure for table `reticula`
--

DROP TABLE IF EXISTS `reticula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reticula` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text,
  `urlimagen` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `carreraid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_11d3c9eff8d8e64c3cdd07d0fe` (`carreraid`),
  CONSTRAINT `FK_11d3c9eff8d8e64c3cdd07d0fe9` FOREIGN KEY (`carreraid`) REFERENCES `carrera` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reticula`
--

LOCK TABLES `reticula` WRITE;
/*!40000 ALTER TABLE `reticula` DISABLE KEYS */;
/*!40000 ALTER TABLE `reticula` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-14 18:04:10
