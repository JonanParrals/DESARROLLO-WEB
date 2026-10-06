import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-gestion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './gestion.html',
  styleUrl: './gestion.css',
  host: {
    '(document:keydown.escape)': 'cancelarEliminar()'   // NUEVO: la tecla Esc cierra el modal
  }
})
export class Gestion implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  estudiantes = signal<Estudiante[]>([]);
  editandoId = signal<number | null>(null);
  mensaje = signal('');
  error = signal('');

  porEliminar = signal<Estudiante | null>(null);   // NUEVO: estudiante elegido para eliminar (null = modal cerrado)
  eliminando = signal(false);                      // NUEVO: true mientras se ejecuta el DELETE

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    curso: ['', Validators.required],
    estado: ['Activo']
  });

  ngOnInit() {
    this.cargar();
  }

  // READ
  cargar() {
    this.api.getEstudiantes().subscribe({
      next: (data) => this.estudiantes.set(data),
      error: () => this.error.set('No se pudo conectar con la API. ¿Está corriendo?')
    });
  }

  // CREATE o UPDATE
  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = this.form.getRawValue();
    const id = this.editandoId();
    this.limpiarMensajes();

    if (id === null) {
      this.api.crearEstudiante(datos).subscribe({
        next: (nuevo) => this.exito(`Estudiante "${nuevo.nombre}" creado con ID ${nuevo.id}`),
        error: () => this.error.set('No se pudo crear el estudiante')
      });
    } else {
      this.api.actualizarEstudiante(id, datos).subscribe({
        next: () => this.exito(`Estudiante con ID ${id} actualizado`),
        error: () => this.error.set('No se pudo actualizar el estudiante')
      });
    }
  }

  editar(e: Estudiante) {
    this.editandoId.set(e.id);
    this.form.setValue({ nombre: e.nombre, curso: e.curso, estado: e.estado });
    this.limpiarMensajes();
  }

  // CAMBIADO: ya no usa confirm(), solo abre el modal con el estudiante elegido
  eliminar(e: Estudiante) {
    this.porEliminar.set(e);
  }

  // NUEVO: se ejecuta al presionar "Sí, eliminar" en el modal → hace el DELETE
  confirmarEliminar() {
    const e = this.porEliminar();
    if (!e) return;

    this.eliminando.set(true);
    this.limpiarMensajes();

    this.api.eliminarEstudiante(e.id).subscribe({
      next: () => {
        if (this.editandoId() === e.id) this.cancelar();
        this.mensaje.set(`Estudiante "${e.nombre}" eliminado`);
        this.cerrarModal();
        this.cargar();
      },
      error: () => {
        this.error.set('No se pudo eliminar el estudiante');
        this.cerrarModal();
      }
    });
  }

  // NUEVO: cierra el modal sin eliminar (botón Cancelar, clic fuera o Esc)
  cancelarEliminar() {
    if (this.eliminando()) return;   // No se cierra a mitad de una eliminación
    this.porEliminar.set(null);
  }

  cancelar() {
    this.editandoId.set(null);
    this.form.reset();
  }

  private cerrarModal() {
    this.eliminando.set(false);
    this.porEliminar.set(null);
  }

  private exito(texto: string) {
    this.mensaje.set(texto);
    this.cancelar();
    this.cargar();
  }

  private limpiarMensajes() {
    this.mensaje.set('');
    this.error.set('');
  }
}