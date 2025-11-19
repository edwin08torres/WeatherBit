import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

import {
    WeatherForecastDay,
    WeatherForecastResponse
} from '../../../../core/model/weather-forecast.model';
import { WeatherApiService } from '../../../../core/services/weather-api.service';
import { ForecastListComponent } from '../../components/forecast-list/forecast-list.component';

@Component({
    selector: 'app-forecast-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, ForecastListComponent],
    templateUrl: './forecast-detail.component.html',
    styleUrl: './forecast-detail.component.scss'
})
export class ForecastDetailComponent implements OnInit {
    loading = false;
    errorMessage: string | null = null;

    cityName = '';
    zipCode = '';
    days: WeatherForecastDay[] = [];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly weatherApi: WeatherApiService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const zip = params.get('zip');
            if (!zip) {
                this.errorMessage = 'Código postal no especificado.';
                return;
            }
            this.zipCode = zip;
            this.loadForecast(zip);
        });
    }

    private loadForecast(zip: string): void {
        this.loading = true;
        this.errorMessage = null;

        this.weatherApi
            .getFiveDayForecast(zip)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (res: WeatherForecastResponse) => {
                    this.cityName = res.city_name || this.zipCode;
                    this.days = (res.data || []).slice(0, 5);
                    console.log('Forecast days', this.days);
                },
                error: err => {
                    console.error('Error cargando pronóstico', err);
                    this.errorMessage =
                        'No se pudo cargar el pronóstico de 5 días. Inténtalo nuevamente.';
                }
            });
    }

    onBack(): void {
        this.router.navigate(['/']);
    }
}
