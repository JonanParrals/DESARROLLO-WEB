using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiEstudiantes.Data;
using ApiEstudiantes.Models;

namespace ApiEstudiantes.Controllers;

[ApiController]
[Route("api/[controller]")]      // Ruta base: /api/productos
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/productos → devuelve todos los productos
    [HttpGet]
    public async Task<ActionResult<List<Producto>>> GetProductos()
    {
        return await _context.Productos.ToListAsync();   // Equivale a SELECT * FROM Productos
    }
}