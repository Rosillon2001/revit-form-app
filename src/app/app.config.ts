import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Angular in Memory Web API
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Services
import { DbServiceService } from './shared/services/mock-db/db-service.service';
// Http
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(DbServiceService))
  ]
};
