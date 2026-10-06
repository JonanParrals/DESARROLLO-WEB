namespace ApiEstudiantes.Models;   // "Dirección" de la clase dentro del proyecto

// Representa una fila de la tabla Estudiantes
public class Estudiante
{
    public int Id { get; set; }                            // Columna Id
    public string Nombre { get; set; } = string.Empty;     // Columna Nombre (vacía por defecto, nunca null)
    public string Curso { get; set; } = string.Empty;      // Columna Curso
    public string Estado { get; set; } = string.Empty;     // Columna Estado: "Activo" / "Inactivo"
}