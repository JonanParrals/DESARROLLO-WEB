import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';               // Para los enlaces a los ejercicios
import { ApiService } from '../../services/api.service';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  private api = inject(ApiService);           // Servicio que llama a la API

  estudiantes = signal<Estudiante[]>([]);     // Lista de estudiantes (empieza vacía)
  cargando = signal(false);                   // true mientras espera la respuesta
  error = signal('');                         // Mensaje de error, si lo hay

  // Se ejecuta al hacer clic en "Cargar estudiantes"
  cargarEstudiantes() {
    this.cargando.set(true);
    this.error.set('');

    this.api.getEstudiantes().subscribe({
      next: (data) => {                       // Si la API responde bien...
        this.estudiantes.set(data);           // ...guarda la lista
        this.cargando.set(false);
      },
      error: () => {                          // Si falla (API apagada, etc.)...
        this.error.set('No se pudo conectar con la API. ¿Está corriendo?');
        this.cargando.set(false);
      }
    });
  }
}