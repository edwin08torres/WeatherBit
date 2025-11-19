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

    onZipInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const cleaned = input.value.replace(/\D/g, '').slice(0, 5);

        this.zip = cleaned;
        input.value = cleaned;
    }

    onSubmit(): void {
        const value = this.zip.trim();

        if (value.length !== 5) return;

        this.search.emit(value);

        this.zip = '';
    }
}
