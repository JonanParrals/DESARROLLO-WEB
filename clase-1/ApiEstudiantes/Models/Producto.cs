namespace ApiEstudiantes.Models;

// Representa una fila de la tabla Productos
public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }    // decimal = número exacto con decimales (ideal para dinero)
    public int Stock { get; set; }
}