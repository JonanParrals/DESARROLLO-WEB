import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5212/api';

  // ===== ESTUDIANTES =====

  // READ: GET /api/estudiantes → todos
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiantes`);
  }

  // READ: GET /api/estudiantes/{id} → uno
  getEstudiantePorId(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/estudiantes/${id}`);
  }

  // CREATE: POST /api/estudiantes → envía los datos y recibe el estudiante creado (con su Id)
  // Omit<Estudiante, 'id'> = un Estudiante SIN id, porque el id lo genera la BD
  crearEstudiante(datos: Omit<Estudiante, 'id'>): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.apiUrl}/estudiantes`, datos);
  }

  // UPDATE: PUT /api/estudiantes/{id} → envía los nuevos datos
  actualizarEstudiante(id: number, datos: Omit<Estudiante, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/estudiantes/${id}`, datos);
  }

  // DELETE: DELETE /api/estudiantes/{id}
  eliminarEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/estudiantes/${id}`);
  }

  // ===== PRODUCTOS =====

  // READ: GET /api/productos → todos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }
}