using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiEstudiantes.Data;
using ApiEstudiantes.Models;

namespace ApiEstudiantes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EstudiantesController : ControllerBase
{
    private readonly AppDbContext _context;

    public EstudiantesController(AppDbContext context)
    {
        _context = context;
    }

    // READ: GET /api/estudiantes → todos
    [HttpGet]
    public async Task<ActionResult<List<Estudiante>>> GetEstudiantes()
    {
        return await _context.Estudiantes.ToListAsync();
    }

    // READ: GET /api/estudiantes/3 → uno por Id
    [HttpGet("{id}")]
    public async Task<ActionResult<Estudiante>> GetEstudiante(int id)
    {
        var estudiante = await _context.Estudiantes.FindAsync(id);
        if (estudiante == null) return NotFound();
        return estudiante;
    }

    // CREATE: POST /api/estudiantes → crea uno nuevo con los datos enviados
    [HttpPost]
    public async Task<ActionResult<Estudiante>> CrearEstudiante(Estudiante estudiante)
    {
        if (string.IsNullOrWhiteSpace(estudiante.Nombre) || string.IsNullOrWhiteSpace(estudiante.Curso))
            return BadRequest("Nombre y curso son obligatorios");   // 400: datos inválidos

        estudiante.Id = 0;                          // El Id lo genera SQL Server (IDENTITY)
        _context.Estudiantes.Add(estudiante);       // Prepara el INSERT
        await _context.SaveChangesAsync();          // Lo ejecuta en la BD

        // 201: creado. Devuelve el estudiante con su nuevo Id
        return CreatedAtAction(nameof(GetEstudiante), new { id = estudiante.Id }, estudiante);
    }

    // UPDATE: PUT /api/estudiantes/3 → reemplaza los datos del estudiante 3
    [HttpPut("{id}")]
    public async Task<IActionResult> ActualizarEstudiante(int id, Estudiante datos)
    {
        if (string.IsNullOrWhiteSpace(datos.Nombre) || string.IsNullOrWhiteSpace(datos.Curso))
            return BadRequest("Nombre y curso son obligatorios");

        var estudiante = await _context.Estudiantes.FindAsync(id);
        if (estudiante == null) return NotFound();  // 404 si no existe

        // Copia los nuevos valores
        estudiante.Nombre = datos.Nombre;
        estudiante.Curso = datos.Curso;
        estudiante.Estado = datos.Estado;

        await _context.SaveChangesAsync();          // Ejecuta el UPDATE
        return NoContent();                         // 204: actualizado, sin contenido que devolver
    }

    // DELETE: DELETE /api/estudiantes/3 → elimina el estudiante 3
    [HttpDelete("{id}")]
    public async Task<IActionResult> EliminarEstudiante(int id)
    {
        var estudiante = await _context.Estudiantes.FindAsync(id);
        if (estudiante == null) return NotFound();

        _context.Estudiantes.Remove(estudiante);    // Prepara el DELETE
        await _context.SaveChangesAsync();          // Lo ejecuta en la BD
        return NoContent();                         // 204: eliminado
    }
}