import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { WeatherApiService } from '../../../../core/services/weather-api.service';
import {
    LocationsStoreService,
    LocationsViewModel
} from '../../../../core/services/locations-store.service';
import { Location } from '../../../../core/model/location.model';
import { WeatherCurrentResponse } from '../../../../core/model/weather-current.model';

import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { TabsComponent } from '../../../../shared/components/tabs/tabs.component';
import { CurrentConditionsCardComponent } from '../../components/current-conditions-card/current-conditions-card.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        LocationSearchComponent,
        TabsComponent,
        CurrentConditionsCardComponent
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnDestroy {
    loading = false;
    errorMessage: string | null = null;

    readonly vm$: Observable<LocationsViewModel>;

    private errorTimeoutId: any = null;

    constructor(
        private readonly weatherApi: WeatherApiService,
        private readonly locationsStore: LocationsStoreService,
        private readonly router: Router
    ) {
        this.vm$ = this.locationsStore.vm$;
    }

    onSearch(zip: string): void {
        const value = zip.trim();
        if (!value) return;

        this.loading = true;
        this.errorMessage = null;
        if (this.errorTimeoutId) {
            clearTimeout(this.errorTimeoutId);
            this.errorTimeoutId = null;
        }

        this.weatherApi
            .getCurrentConditions(value)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: data => {
                    const location = this.mapToLocation(value, data);
                    this.locationsStore.addLocation(location);
                },
                error: err => {
                    console.error('Error cargando condiciones', err);
                    this.errorMessage =
                        'No se pudo encontrar esa ubicación. Verifica el código postal o inténtalo de nuevo.';

                    this.errorTimeoutId = setTimeout(() => {
                        this.errorMessage = null;
                        this.errorTimeoutId = null;
                    }, 4000);
                }
            });
    }

    private mapToLocation(zip: string, response: WeatherCurrentResponse): Location {
        const obs = response.data[0];
        return {
            id: zip,
            zipCode: zip,
            cityName: obs.city_name,
            stateCode: obs.state_code,
            countryCode: obs.country_code
        };
    }

    onTabSelected(id: string): void {
        this.locationsStore.setActive(id);
    }

    onTabClosed(id: string): void {
        this.locationsStore.remove(id);
    }

    onShowForecast(zip: string): void {
        this.router.navigate(['/forecast', zip]);
    }

    ngOnDestroy(): void {
        if (this.errorTimeoutId) {
            clearTimeout(this.errorTimeoutId);
        }
    }
}
