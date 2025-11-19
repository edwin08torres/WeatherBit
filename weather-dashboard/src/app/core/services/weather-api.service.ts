import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../enviroments/envviroments';
import { WeatherCurrentResponse } from '../model/weather-current.model';
import { WeatherForecastResponse } from '../model/weather-forecast.model';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
    private readonly baseUrl = environment.weatherApiBaseUrl;
    private readonly apiKey = environment.weatherApiKey;

    constructor(
        private readonly http: HttpClient,
        private readonly cache: CacheService
    ) { }

    getCurrentConditions(zipCode: string): Observable<WeatherCurrentResponse> {
        const cacheKey = `current:${zipCode}`;
        const cached = this.cache.get<WeatherCurrentResponse>(cacheKey);
        if (cached) return of(cached);

        const params = new HttpParams()
            .set('key', this.apiKey)
            .set('postal_code', zipCode)
            .set('country', 'US')
            .set('include', 'minutely');

        return this.http
            .get<WeatherCurrentResponse>(`${this.baseUrl}/current`, { params })
            .pipe(tap(data => this.cache.set(cacheKey, data)));
    }

    getFiveDayForecast(zipCode: string): Observable<WeatherForecastResponse> {
        const cacheKey = `forecast:${zipCode}`;
        const cached = this.cache.get<WeatherForecastResponse>(cacheKey);
        if (cached) return of(cached);

        const params = new HttpParams()
            .set('key', this.apiKey)
            .set('postal_code', zipCode)
            .set('country', 'US')
            .set('days', 5);

        return this.http
            .get<WeatherForecastResponse>(`${this.baseUrl}/forecast/daily`, { params })
            .pipe(tap(data => this.cache.set(cacheKey, data)));
    }
}
