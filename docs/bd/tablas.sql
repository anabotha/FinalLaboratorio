//base de datos JuegoDb
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS juegodb;
USE juegodb;

-- Tabla: cartas
CREATE TABLE cartas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    carta VARCHAR(50)
);

-- Tabla: partidas
CREATE TABLE partidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    j1 VARCHAR(100),
    j2 VARCHAR(100),
    ganadasComunJ1 INT DEFAULT 0,
    ganadasComunJ2 INT DEFAULT 0,
    partidasTotales INT DEFAULT 0,
    ultimaPartida DATETIME DEFAULT NULL,
    ultimoGanador VARCHAR(100) DEFAULT NULL
);

-- Tabla: usuarios
CREATE TABLE usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50),
    fechaNacimiento DATE DEFAULT '0000-00-00',
    PartidasGanadas INT DEFAULT 0,
    email VARCHAR(100),
    enUso TINYINT DEFAULT 0,
    puntaje INT DEFAULT 0
);

-- Tabla: ranking
CREATE TABLE ranking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    puntaje INT,
    fecha DATETIME,
    porcentaje FLOAT DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(idUsuario)
);

// BASE DE DATOS datosJuegoDb
-- Usar la base de datos correspondiente
USE datosjuegodb;

-- Crear tabla: contraseñas
CREATE TABLE contraseñas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    contraseñas TEXT NOT NULL
);
