import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Productos } from './pages/productos/productos';
import { Buscar } from './pages/buscar/buscar';
import { Gestion } from './pages/gestion/gestion';   // NUEVO: pantalla del CRUD

export const routes: Routes = [
  { path: '', component: Inicio },                // localhost:4200/           → Inicio
  { path: 'productos', component: Productos },    // localhost:4200/productos  → Ejercicio 1
  { path: 'buscar', component: Buscar },          // localhost:4200/buscar     → Ejercicio 2
  { path: 'gestion', component: Gestion },        // localhost:4200/gestion    → CRUD
  { path: '**', redirectTo: '' }                  // Cualquier otra URL → Inicio (siempre al final)
];