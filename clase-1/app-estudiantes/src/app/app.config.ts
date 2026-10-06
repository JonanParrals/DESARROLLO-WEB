import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';   // Herramienta para hacer peticiones HTTP

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),   // Captura errores globales (ya venía)
    provideRouter(routes),                  // Navegación entre pantallas (ya venía)
    provideHttpClient()                     // NUEVO: habilita HttpClient para llamar a la API
  ]
};