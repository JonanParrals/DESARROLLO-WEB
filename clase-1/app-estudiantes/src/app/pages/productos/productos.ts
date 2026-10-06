import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';      // Para el enlace "Volver al inicio"
import { CurrencyPipe } from '@angular/common';    // Para mostrar precios como moneda (S/ 8.50)
import { ApiService } from '../../services/api.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {
  private api = inject(ApiService);

  productos = signal<Producto[]>([]);   // Lista de productos
  cargando = signal(true);              // Empieza en true porque carga apenas se abre
  error = signal('');

  // ngOnInit se ejecuta automáticamente al abrir la pantalla
  ngOnInit() {
    this.api.getProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con la API. ¿Está corriendo?');
        this.cargando.set(false);
      }
    });
  }
}