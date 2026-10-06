import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';   // Para saber qué tipo de error devolvió la API
import { ApiService } from '../../services/api.service';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-buscar',
  imports: [RouterLink],
  templateUrl: './buscar.html',
  styleUrl: './buscar.css'
})
export class Buscar {
  private api = inject(ApiService);

  estudiante = signal<Estudiante | null>(null);   // Estudiante encontrado (null = ninguno todavía)
  cargando = signal(false);
  error = signal('');

  // Se ejecuta al hacer clic en "Buscar" o presionar Enter
  buscar(valor: string) {
    const id = Number(valor);   // Convierte el texto del input a número

    // Validación: que sea un número entero mayor que 0
    if (!valor || !Number.isInteger(id) || id <= 0) {
      this.error.set('Ingresa un ID válido (número entero mayor que 0)');
      this.estudiante.set(null);
      return;   // Detiene aquí, no llama a la API
    }

    this.cargando.set(true);
    this.error.set('');
    this.estudiante.set(null);

    this.api.getEstudiantePorId(id).subscribe({
      next: (data) => {
        this.estudiante.set(data);
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        // 404 = la API respondió que ese ID no existe (el NotFound() del controlador)
        if (err.status === 404) {
          this.error.set(`No existe un estudiante con ID ${id}`);
        } else {
          this.error.set('No se pudo conectar con la API. ¿Está corriendo?');
        }
        this.cargando.set(false);
      }
    });
  }
}