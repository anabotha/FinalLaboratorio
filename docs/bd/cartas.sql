-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-07-2025 a las 21:23:44
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `juegodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartas`
--

DROP TABLE IF EXISTS `cartas`;
CREATE TABLE IF NOT EXISTS `cartas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) DEFAULT NULL,
  `carta` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=253 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cartas`
--

INSERT INTO `cartas` (`id`, `tipo`, `carta`) VALUES
(8, 'poker', '../assets/pokercards/2_of_spades.png'),
(7, 'poker', '../assets/pokercards/2_of_hearts.png'),
(6, 'poker', '../assets/pokercards/2_of_diamonds.png'),
(5, 'poker', '../assets/pokercards/2_of_clubs.png'),
(9, 'poker', '../assets/pokercards/3_of_clubs.png'),
(10, 'poker', '../assets/pokercards/3_of_diamonds.png'),
(11, 'poker', '../assets/pokercards/3_of_hearts.png'),
(12, 'poker', '../assets/pokercards/3_of_spades.png'),
(13, 'poker', '../assets/pokercards/4_of_clubs.png'),
(14, 'poker', '../assets/pokercards/4_of_diamonds.png'),
(15, 'poker', '../assets/pokercards/4_of_hearts.png'),
(16, 'poker', '../assets/pokercards/4_of_spades.png'),
(17, 'poker', '../assets/pokercards/5_of_clubs.png'),
(18, 'poker', '../assets/pokercards/5_of_diamonds.png'),
(19, 'poker', '../assets/pokercards/5_of_hearts.png'),
(29, 'poker', '../assets/pokercards/8_of_clubs.png'),
(30, 'poker', '../assets/pokercards/8_of_diamonds.png'),
(50, 'poker', '../assets/pokercards/jack_of_hearts.png'),
(51, 'poker', '../assets/pokercards/jack_of_hearts2.png'),
(122, 'snoopy', '../assets/cartasSnoopy/snopy_music'),
(121, 'snoopy', '../assets/cartasSnoopy/snoopy_totoro'),
(120, 'snoopy', '../assets/cartasSnoopy/snoopy_rainbow'),
(119, 'snoopy', '../assets/cartasSnoopy/snoopy_moon'),
(118, 'snoopy', '../assets/cartasSnoopy/snoopy_japan'),
(117, 'snoopy', '../assets/cartasSnoopy/snoopy_hippie'),
(116, 'snoopy', '../assets/cartasSnoopy/Snoopy'),
(115, 'snoopy', '../assets/cartasSnoopy/descarga (18)'),
(113, 'snoopy', '../assets/cartasSnoopy/descarga (16)'),
(114, 'snoopy', '../assets/cartasSnoopy/descarga (17)'),
(111, 'snoopy', '../assets/cartasSnoopy/descarga (14)'),
(112, 'snoopy', '../assets/cartasSnoopy/descarga (15)'),
(109, 'snoopy', '../assets/cartasSnoopy/descarga (12)'),
(110, 'snoopy', '../assets/cartasSnoopy/descarga (13)'),
(108, 'snoopy', '../assets/cartasSnoopy/descarga (11)'),
(107, 'snoopy', '../assets/cartasSnoopy/descarga (10)'),
(106, 'snoopy', '../assets/cartasSnoopy/descarga (9)'),
(123, 'avion', '../assets/cartasaviones/an-225.jpeg'),
(124, 'avion', '../assets/cartasaviones/avion.jpg'),
(125, 'avion', '../assets/cartasaviones/b747-8.jpg'),
(126, 'avion', '../assets/cartasaviones/b767-300f.jpg'),
(127, 'avion', '../assets/cartasaviones/b777x.webp'),
(128, 'avion', '../assets/cartasaviones/beluga-xl.jpg'),
(129, 'avion', '../assets/cartasaviones/c-5m.jpg'),
(130, 'avion', '../assets/cartasaviones/c-17.jpg'),
(131, 'avion', '../assets/cartasaviones/ilyushin-il-96.jpg'),
(132, 'avion', '../assets/cartasaviones/image-4-1-1200x857.jpg'),
(133, 'avion', '../assets/cartasaviones/image-4-2-1200x796.jpg'),
(134, 'avion', '../assets/cartasaviones/image-4-3.jpg'),
(135, 'avion', '../assets/cartasaviones/J-20-Mighty-Dragon.jpg'),
(136, 'avion', '../assets/cartasaviones/l-1011-100.jpg'),
(137, 'avion', '../assets/cartasaviones/stratolaunch-roc.jpg'),
(250, 'argentina', '../assets/cartasArgentina/postalAvestruz'),
(251, 'argentina', '../assets/cartasArgentina/worldcup'),
(252, 'avion', '../assets/cartasaviones/bombardier.jpg'),
(249, 'argentina', '../assets/cartasArgentina/postal'),
(248, 'argentina', '../assets/cartasArgentina/pajaro'),
(247, 'argentina', '../assets/cartasArgentina/mate'),
(243, 'argentina', '../assets/cartasArgentina/album'),
(244, 'argentina', '../assets/cartasArgentina/animal'),
(245, 'argentina', '../assets/cartasArgentina/Argentina'),
(246, 'argentina', '../assets/cartasArgentina/Fitz'),
(242, 'argentina', '../assets/cartasArgentina/(pilardibujito)'),
(241, 'argentina', '../assets/cartasArgentina/(11)'),
(240, 'argentina', '../assets/cartasArgentina/(10)'),
(239, 'argentina', '../assets/cartasArgentina/(9)'),
(238, 'argentina', '../assets/cartasArgentina/(8)'),
(237, 'argentina', '../assets/cartasArgentina/(7)'),
(236, 'argentina', '../assets/cartasArgentina/(6)'),
(235, 'argentina', '../assets/cartasArgentina/(5)'),
(234, 'argentina', '../assets/cartasArgentina/(4)'),
(233, 'argentina', '../assets/cartasArgentina/(3)');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
