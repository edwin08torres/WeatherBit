import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Theme, ThemeService } from '../../../core/services/theme.service';
import { SettingsService } from '../../../core/services/settings.service';
import { CacheService } from '../../../core/services/cache.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    currentTheme: Theme;
    ttl: number;
    navOpen = false;
    settingsOpen = false;

    constructor(
        private readonly themeService: ThemeService,
        private readonly settingsService: SettingsService,
        private readonly cacheService: CacheService
    ) {
        this.currentTheme = this.themeService.theme;
        this.ttl = this.settingsService.cacheTtlMinutes;
    }

    toggleTheme(): void {
        this.themeService.toggle();
        this.currentTheme = this.themeService.theme;
    }

    toggleSettings(event?: MouseEvent): void {
        if (event) event.stopPropagation();
        this.settingsOpen = !this.settingsOpen;
    }

    openMobileMenu(event: MouseEvent): void {
        event.stopPropagation();
        this.navOpen = !this.navOpen;
    }

    closeMobileMenu(): void {
        this.navOpen = false;
    }

    onTtlChange(value: number): void {
        this.settingsService.updateCacheTtlMinutes(value);
    }

    clearCache(): void {
        this.cacheService.clear();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(_: MouseEvent): void {
        this.navOpen = false;
    }
}
