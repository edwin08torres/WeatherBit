import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-location-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './location-search.component.html',
    styleUrl: './location-search.component.scss',
})
export class LocationSearchComponent {
    @Output() search = new EventEmitter<string>();
    @Input() loading = false;

    zip = '';
    emptyError = false;

    onZipChange(raw: string): void {
        const cleaned = raw.replace(/\D/g, '').slice(0, 5);
        this.zip = cleaned;

        if (this.zip.length > 0 && this.emptyError) {
            this.emptyError = false;
        }
    }

    onSubmit(): void {
        const value = this.zip.trim();

        if (!value) {
            this.emptyError = true;
            return;
        }

        this.emptyError = false;
        this.search.emit(value);

        this.zip = '';
    }
}
