import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WeatherForecastDay } from '../../../../core/model/weather-forecast.model';

@Component({
    selector: 'app-forecast-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './forecast-list.component.html',
    styleUrl: './forecast-list.component.scss'
})
export class ForecastListComponent {
    @Input() days: WeatherForecastDay[] = [];

    getIconUrl(iconCode?: string): string | null {
        if (!iconCode) return null;
        return `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
    }
}
