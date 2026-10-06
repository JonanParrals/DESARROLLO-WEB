using Microsoft.EntityFrameworkCore;   // Librería de Entity Framework
using ApiEstudiantes.Models;           // Para usar Estudiante y Producto

namespace ApiEstudiantes.Data;

// Clase que representa la conexión con la base de datos AppEstudiantes
public class AppDbContext : DbContext
{
    // Recibe la configuración (como la cadena de conexión) desde Program.cs
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Cada DbSet representa una tabla de la BD
    public DbSet<Estudiante> Estudiantes { get; set; }   // Tabla Estudiantes
    public DbSet<Producto> Productos { get; set; }       // Tabla Productos

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Indica que Precio es DECIMAL(10,2), igual que en SQL Server
        modelBuilder.Entity<Producto>().Property(p => p.Precio).HasPrecision(10, 2);
    }
}