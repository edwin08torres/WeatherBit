import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Location } from '../../../../core/model/location.model';
import {
    WeatherCurrentObservation,
    WeatherCurrentResponse,
} from '../../../../core/model/weather-current.model';
import { WeatherApiService } from '../../../../core/services/weather-api.service';

@Component({
    selector: 'app-current-conditions-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './current-conditions-card.component.html',
    styleUrl: './current-conditions-card.component.scss',
})
export class CurrentConditionsCardComponent implements OnChanges {
    @Input() location!: Location;
    @Output() showForecast = new EventEmitter<string>();

    loading = false;
    errorMessage: string | null = null;
    observation: WeatherCurrentObservation | null = null;

    constructor(private readonly weatherApi: WeatherApiService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['location'] && this.location) {
            this.loadCurrentConditions();
        }
    }

    private loadCurrentConditions(): void {
        if (!this.location?.zipCode) return;

        this.loading = true;
        this.errorMessage = null;
        this.observation = null;

        this.weatherApi
            .getCurrentConditions(this.location.zipCode)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (response: WeatherCurrentResponse) => {
                    this.observation = response.data[0] ?? null;
                },
                error: err => {
                    console.error('Error cargando condiciones actuales', err);
                    this.errorMessage =
                        'No se pudieron cargar las condiciones actuales.';
                },
            });
    }

    onShowForecastClick(): void {
        if (this.location?.zipCode) {
            this.showForecast.emit(this.location.zipCode);
        }
    }
}
