import { Injectable } from '@angular/core';

export interface CacheSettings {
    ttlMinutes: number;
}

const CACHE_SETTINGS_KEY = 'weather-dashboard-cache-settings';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    private settings: CacheSettings;

    constructor() {
        const stored = localStorage.getItem(CACHE_SETTINGS_KEY);
        if (stored) {
            try {
                this.settings = JSON.parse(stored) as CacheSettings;
            } catch {
                this.settings = { ttlMinutes: 120 };
            }
        } else {
            this.settings = { ttlMinutes: 120 };
        }
    }

    get cacheTtlMinutes(): number {
        return this.settings.ttlMinutes;
    }

    updateCacheTtlMinutes(ttlMinutes: number): void {
        this.settings.ttlMinutes = ttlMinutes;
        localStorage.setItem(CACHE_SETTINGS_KEY, JSON.stringify(this.settings));
    }
}
