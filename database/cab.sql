-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2024 a las 06:13:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cab`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_salida`
--

CREATE TABLE `entrada_salida` (
  `id` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `tipo` text NOT NULL DEFAULT 'ENTRADA',
  `estado` int(11) NOT NULL DEFAULT 1,
  `creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrada_salida`
--

INSERT INTO `entrada_salida` (`id`, `id_persona`, `tipo`, `estado`, `creacion`) VALUES
(2, 1, 'ENTRADA', 1, '2024-06-10 15:30:05'),
(3, 1, 'SALIDA', 1, '2024-06-10 15:30:23'),
(4, 1, 'ENTRADA', 1, '2024-06-10 17:28:07'),
(5, 1, 'SALIDA', 1, '2024-06-10 17:28:22'),
(6, 1, 'ENTRADA', 1, '2024-06-10 17:30:08'),
(7, 1, 'ENTRADA', 1, '2024-06-10 17:33:23'),
(8, 1, 'ENTRADA', 1, '2024-06-10 19:42:37'),
(9, 1, 'ENTRADA', 1, '2024-06-11 01:10:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `excusa`
--

CREATE TABLE `excusa` (
  `id` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `id_horario` int(11) NOT NULL,
  `observaciones` text NOT NULL,
  `fecha` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1,
  `creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `excusa`
--

INSERT INTO `excusa` (`id`, `id_persona`, `id_horario`, `observaciones`, `fecha`, `estado`, `creacion`) VALUES
(1, 1, 1, 'No pudo venir por gripa y ya', '2024-06-12', 1, '2024-06-09 00:09:04'),
(2, 1, 2, 'adfad', '2024-06-12', 1, '2024-06-10 19:19:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `hora_inicio` text NOT NULL,
  `hora_fin` text NOT NULL,
  `dia_semana` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1,
  `creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id`, `id_persona`, `hora_inicio`, `hora_fin`, `dia_semana`, `estado`, `creacion`) VALUES
(1, 1, '10:00', '18:00', 'LUNES', 1, '2024-06-08 23:39:46'),
(2, 1, '08:00', '18:00', 'MARTES', 1, '2024-06-08 23:39:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `tipo` text NOT NULL DEFAULT '\'PROFESOR\'',
  `identificacion` text NOT NULL,
  `nombres` text NOT NULL,
  `apellidos` text NOT NULL,
  `telefono` text NOT NULL,
  `correo` text NOT NULL,
  `direccion` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1,
  `creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `tipo`, `identificacion`, `nombres`, `apellidos`, `telefono`, `correo`, `direccion`, `estado`, `creacion`) VALUES
(1, 'RECTOR', '1065826130', 'Angie Lorena', 'Perez Florian', '39015143005', 'angielperez@unicesar.edu.co', 'Mz b casa 8b Club house', 1, '2024-06-08 16:29:19'),
(2, 'PROFESOR', '1065843703', 'Alfonso Jose Maria', 'Perez Narvaez', '3255699896', 'alfonsojose@gmail.com', 'No definida', 1, '2024-06-08 18:08:27'),
(3, 'PROFESOR', '1065843700', 'Alfonso Jose', 'Perez Narvaez', '3255699896', 'alfonso@gmail.com', 'Mz r casa 30', 1, '2024-06-10 18:16:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `usuario` text NOT NULL,
  `clave` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1,
  `creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `id_persona`, `usuario`, `clave`, `estado`, `creacion`) VALUES
(15, 1, 'angie', '$2b$10$GRcgNC6tqbt2w3GwFbwkSeYcAyieR3v3WxEf6Pi6aK08dx/XEPfOq', 1, '2024-06-08 17:49:08'),
(16, 1, 'angielperez', '$2b$10$r/EIQn7Mcn970Qbox8MDo.P9ECkKMojyqKRR1pCHBL0pV/Urf0Jqi', 1, '2024-06-08 17:49:13'),
(17, 2, 'alfonsojose', '$2b$10$OzWAjg.RHdLKr9h38BDcL.8FjHgNiYq27kbX9VeTp0kZpNIIZUyMS', 1, '2024-06-10 18:46:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entrada_salida`
--
ALTER TABLE `entrada_salida`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `excusa`
--
ALTER TABLE `excusa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entrada_salida`
--
ALTER TABLE `entrada_salida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `excusa`
--
ALTER TABLE `excusa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
