import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
    provideHttpClient,
    withInterceptorsFromDi
} from '@angular/common/http';
import { routes } from './app.routes';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/components/shared.module';
import { WeatherModule } from './features/weather.module';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        // aquí enganchamos los módulos “clásicos”
        importProvidersFrom(CoreModule, SharedModule, WeatherModule)
    ]
};
