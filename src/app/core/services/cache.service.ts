import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

interface CacheEntry<T> {
    value: T;
    expiresAt: number; // timestamp de expiración
}

@Injectable({ providedIn: 'root' })
export class CacheService {
    private readonly prefix = 'weather-cache:'; // aislamos claves de este proyecto

    constructor(private readonly settings: SettingsService) { }

    get<T>(key: string): T | null {
        const raw = localStorage.getItem(this.prefix + key);
        if (!raw) return null;

        try {
            const entry = JSON.parse(raw) as CacheEntry<T>;
            if (!entry.expiresAt || entry.expiresAt < Date.now()) {
                localStorage.removeItem(this.prefix + key);
                return null;
            }
            return entry.value;
        } catch {
            // si el formato está mal, borramos la entrada
            localStorage.removeItem(this.prefix + key);
            return null;
        }
    }

    set<T>(key: string, value: T): void {
        const ttlMinutes = this.settings.cacheTtlMinutes;
        const entry: CacheEntry<T> = {
            value,
            expiresAt: Date.now() + ttlMinutes * 60 * 1000
        };

        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(entry));
        } catch (err) {
            console.warn('No se pudo guardar en caché', err);
        }
    }

    clear(): void {
        // solo borramos las claves propias del caché
        const keys = Object.keys(localStorage);
        for (const key of keys) {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        }
    }
}
