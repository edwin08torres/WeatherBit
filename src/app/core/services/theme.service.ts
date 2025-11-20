import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'weather-dashboard-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private current: Theme;

    constructor() {
        const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

        if (stored === 'light' || stored === 'dark') {
            this.current = stored;
        } else {
            // respetamos theme del sistema
            const prefersDark =
                window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
            this.current = prefersDark ? 'dark' : 'light';
        }

        this.applyTheme(this.current);
    }

    get theme(): Theme {
        return this.current;
    }

    toggle(): void {
        this.setTheme(this.current === 'light' ? 'dark' : 'light');
    }

    setTheme(theme: Theme): void {
        this.current = theme;
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        this.applyTheme(theme);
    }

    private applyTheme(theme: Theme): void {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }
}
