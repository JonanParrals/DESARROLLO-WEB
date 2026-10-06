// Forma de un estudiante tal como lo devuelve la API (en minúsculas, igual que el JSON)
export interface Estudiante {
  id: number;
  nombre: string;
  curso: string;
  estado: string;   // "Activo" o "Inactivo"
}