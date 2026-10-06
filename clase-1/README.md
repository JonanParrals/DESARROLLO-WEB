# Clase 1 — App Estudiantes

Aplicación web full stack que consume una API REST para gestionar estudiantes y productos.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | Angular 22 |
| Backend | .NET 10 (ASP.NET Core Web API + Entity Framework Core) |
| Base de datos | SQL Server 2025 Express |

## Funcionalidades

- **Inicio:** lista de estudiantes cargada con un botón (`GET /api/estudiantes`)
- **Ejercicio 1:** pantalla que lista los productos (`GET /api/productos`)
- **Ejercicio 2:** búsqueda de un estudiante por su ID (`GET /api/estudiantes/{id}`)
- **CRUD de estudiantes:** crear, editar y eliminar, con validaciones y confirmación antes de eliminar

## Estructura

```
clase-1/
├── ApiEstudiantes/     Backend .NET (controladores, modelos, DbContext)
├── app-estudiantes/    Frontend Angular (pantallas, servicio, modelos)
└── database/
    └── script.sql      Script para crear la base de datos con datos de ejemplo
```

## Requisitos

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js LTS](https://nodejs.org) y Angular CLI: `npm install -g @angular/cli`
- SQL Server (Express o Developer) y SQL Server Management Studio

## Cómo ejecutarlo

### 1. Base de datos
Abrir `database/script.sql` en SSMS y ejecutarlo. Crea la BD `AppEstudiantes` con sus tablas y datos.

### 2. API (.NET)
```bash
cd ApiEstudiantes
dotnet run
```
Queda disponible en `http://localhost:5212`.

> Si tu instancia de SQL Server no se llama `localhost\SQLEXPRESS`, cambia el `Server=` de la cadena de conexión en `ApiEstudiantes/appsettings.json`.

### 3. Frontend (Angular)
En otra terminal:
```bash
cd app-estudiantes
npm install
ng serve -o
```
Se abre en `http://localhost:4200`.

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estudiantes` | Lista todos los estudiantes |
| GET | `/api/estudiantes/{id}` | Obtiene un estudiante por ID |
| POST | `/api/estudiantes` | Crea un estudiante |
| PUT | `/api/estudiantes/{id}` | Actualiza un estudiante |
| DELETE | `/api/estudiantes/{id}` | Elimina un estudiante |
| GET | `/api/productos` | Lista todos los productos |

## Autor

Jonathan Parrales