-- =============================================
-- Base de datos de la Clase 1: App Estudiantes
-- Ejecutar en SQL Server (SSMS) antes de levantar la API
-- =============================================

-- Crea la base de datos
CREATE DATABASE AppEstudiantes;
GO

USE AppEstudiantes;
GO

-- Tabla de estudiantes (usada en Inicio, Buscar y el CRUD)
CREATE TABLE Estudiantes (
    Id     INT IDENTITY(1,1) PRIMARY KEY,  -- Autonumérico
    Nombre NVARCHAR(100) NOT NULL,
    Curso  NVARCHAR(100) NOT NULL,
    Estado NVARCHAR(20)  NOT NULL          -- 'Activo' o 'Inactivo'
);

-- Tabla de productos (usada en el Ejercicio 1)
CREATE TABLE Productos (
    Id     INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Stock  INT NOT NULL
);

-- Datos de ejemplo (la N permite guardar tildes)
INSERT INTO Estudiantes (Nombre, Curso, Estado) VALUES
(N'Ana Torres',      N'Matemática',     N'Activo'),
(N'Luis Ramírez',    N'Programación',   N'Activo'),
(N'María López',     N'Base de Datos',  N'Activo'),
(N'Carlos Mendoza',  N'Desarrollo Web', N'Inactivo'),
(N'Lucía Fernández', N'Inglés',         N'Activo');

INSERT INTO Productos (Nombre, Precio, Stock) VALUES
(N'Cuaderno A4',      8.50, 120),
(N'Lapicero azul',    1.50, 300),
(N'Mochila escolar', 65.00,  25),
(N'Calculadora',     45.90,  40),
(N'Regla 30 cm',      3.00, 150);