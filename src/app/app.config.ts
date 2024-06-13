import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Angular in Memory Web API
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Services
import { DbServiceService } from './shared/services/mock-db/db-service.service';
// Http
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// Interceptors
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptors([loadingInterceptor])),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(DbServiceService)),
  ]
};
