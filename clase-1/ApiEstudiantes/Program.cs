using Microsoft.EntityFrameworkCore;   // Para UseSqlServer
using ApiEstudiantes.Data;             // Para AppDbContext

var builder = WebApplication.CreateBuilder(args);

// Habilita los controladores (donde irán las rutas GET)
builder.Services.AddControllers();

// Genera la documentación de la API (solo en desarrollo)
builder.Services.AddOpenApi();

// Registra el AppDbContext usando la cadena de conexión de appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS: permite que Angular (que correrá en localhost:4200) llame a esta API
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirAngular", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirAngular");   // Activa la política CORS
app.UseAuthorization();
app.MapControllers();             // Conecta las rutas de los controladores

app.Run();                        // Arranca la API